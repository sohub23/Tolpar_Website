<?php
/**
 * Tolpar partnership mailer.
 * Uses a direct SMTP socket so the static Tolpar form can send without Composer.
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

function load_env_file($path) {
    if (!file_exists($path)) {
        return false;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || strpos($trimmed, '#') === 0 || strpos($trimmed, '=') === false) {
            continue;
        }

        [$name, $value] = explode('=', $trimmed, 2);
        $value = trim($value);
        $quote = substr($value, 0, 1);
        if (($quote === '"' || $quote === "'") && substr($value, -1) === $quote) {
            $value = substr($value, 1, -1);
        }
        $_ENV[trim($name)] = $value;
    }

    return true;
}

function clean_text($value, $maxLength = 2000) {
    $value = trim((string)$value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    return mb_substr($value, 0, $maxLength);
}

function html_text($value) {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function smtp_read($socket) {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) < 4 || substr($line, 3, 1) !== '-') {
            break;
        }
    }
    return $response;
}

function smtp_expect($socket, $expected, $label) {
    $response = smtp_read($socket);
    if (substr($response, 0, 3) !== $expected) {
        throw new Exception($label . ' failed');
    }
    return $response;
}

function smtp_command($socket, $command, $expected, $label) {
    fputs($socket, $command . "\r\n");
    return smtp_expect($socket, $expected, $label);
}

$envPath = __DIR__ . '/../../.env';
if (!load_env_file($envPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Configuration file not found.']);
    exit;
}

$smtpHost = $_ENV['SMTP_HOST'] ?? 'mail.sohub.com.bd';
$smtpPort = (int)($_ENV['SMTP_PORT'] ?? 587);
$smtpUser = $_ENV['SMTP_USER'] ?? '';
$smtpPass = $_ENV['SMTP_PASS'] ?? '';
$fromEmail = $_ENV['SMTP_FROM_EMAIL'] ?? $smtpUser;
$fromName = $_ENV['SMTP_FROM_NAME'] ?? 'Solution hub technologies';
$toEmail = $_ENV['PARTNER_TO_EMAIL'] ?? 'hello@sohub.com.bd';

if (!$smtpUser || !$smtpPass || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || !filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMTP configuration is incomplete.']);
    exit;
}

$name = clean_text($_POST['name'] ?? '', 160);
$email = clean_text($_POST['email'] ?? '', 240);
$company = clean_text($_POST['company'] ?? '', 200);
$message = clean_text($_POST['message'] ?? '', 3000);

if (mb_strlen($name) < 3) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter a valid name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

if (mb_strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter a message.']);
    exit;
}

$submittedAt = date('F j, Y g:i A');
$safeName = html_text($name);
$safeEmail = html_text($email);
$safeCompany = $company !== '' ? html_text($company) : 'Not provided';
$safeMessage = nl2br(html_text($message));
$subject = 'Tolpar Partnership Proposal - ' . $name;

$emailBody = '
<div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #f8fafc; padding: 24px;">
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
    <div style="background: #0f172a; padding: 28px 30px;">
      <p style="margin: 0 0 8px; color: #34d399; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Tolpar Partnership</p>
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; line-height: 1.35;">New partner proposal received</h1>
      <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">Submitted on ' . html_text($submittedAt) . '</p>
    </div>
    <div style="padding: 28px 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 700;">Full Name</td>
          <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 15px; font-weight: 700; text-align: right;">' . $safeName . '</td>
        </tr>
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 700;">Email</td>
          <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #059669; font-size: 15px; font-weight: 700; text-align: right;">' . $safeEmail . '</td>
        </tr>
        <tr>
          <td style="padding: 14px 0; color: #64748b; font-size: 13px; font-weight: 700;">Company</td>
          <td style="padding: 14px 0; color: #0f172a; font-size: 15px; font-weight: 700; text-align: right;">' . $safeCompany . '</td>
        </tr>
      </table>
      <div style="margin-top: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px;">
        <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Message</p>
        <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.7;">' . $safeMessage . '</p>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:' . $safeEmail . '" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 999px; padding: 12px 24px; font-size: 14px; font-weight: 700;">Reply to partner</a>
      </div>
    </div>
  </div>
</div>';

try {
    $socket = stream_socket_client("tcp://{$smtpHost}:{$smtpPort}", $errno, $errstr, 20);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server.");
    }

    smtp_expect($socket, '220', 'SMTP greeting');
    smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), '250', 'EHLO');
    smtp_command($socket, 'STARTTLS', '220', 'STARTTLS');

    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        throw new Exception('TLS setup failed');
    }

    smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), '250', 'EHLO over TLS');
    smtp_command($socket, 'AUTH LOGIN', '334', 'AUTH LOGIN');
    smtp_command($socket, base64_encode($smtpUser), '334', 'SMTP username');
    smtp_command($socket, base64_encode($smtpPass), '235', 'SMTP password');
    smtp_command($socket, 'MAIL FROM: <' . $fromEmail . '>', '250', 'MAIL FROM');
    smtp_command($socket, 'RCPT TO: <' . $toEmail . '>', '250', 'RCPT TO');
    smtp_command($socket, 'DATA', '354', 'DATA');

    $headers = '';
    $headers .= 'From: =?UTF-8?B?' . base64_encode($fromName) . '?= <' . $fromEmail . ">\r\n";
    $headers .= 'To: ' . $toEmail . "\r\n";
    $headers .= 'Reply-To: ' . $email . "\r\n";
    $headers .= 'Subject: =?UTF-8?B?' . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: Tolpar Partnership Mailer\r\n\r\n";

    $payload = str_replace("\n.", "\n..", $headers . $emailBody) . "\r\n.\r\n";
    fputs($socket, $payload);
    smtp_expect($socket, '250', 'Message send');
    fputs($socket, "QUIT\r\n");
    fclose($socket);

    echo json_encode(['success' => true, 'message' => 'Proposal sent successfully.']);
} catch (Exception $e) {
    if (isset($socket) && is_resource($socket)) {
        fclose($socket);
    }
    error_log('Tolpar partner mailer error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email.']);
}
?>
