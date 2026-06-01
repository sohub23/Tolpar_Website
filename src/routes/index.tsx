import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type ComponentProps } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Minus,
  Check,
  X as XIcon,
  Facebook,
  Instagram,
  Youtube,
  Eye,
  Utensils,
  BatteryCharging,
  Lock,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { OurInitiatives } from "@/components/OurInitiatives";
import HeroWave from "@/components/ui/dynamic-wave-canvas-background";
import { AppSimulator } from "@/components/AppSimulator";
import { assetPath } from "@/lib/asset-path";

const ease = [0.25, 0.1, 0.25, 1] as const;
const omamaImages = [assetPath("/image.png"), assetPath("/image_copy_3.png")];

type MotionDivProps = ComponentProps<typeof motion.div>;

// ============ Reusable bits ============

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

function Overline({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block rounded-full border border-[#FB8A09]/15 bg-[#FB8A09]/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-500">
      {children}
    </div>
  );
}

// ============ Reusable Animations & Assets ============

function ScanAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100 [perspective:600px]">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_60%)]" />

      {/* Orbiting ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-emerald-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
      </motion.div>

      {/* Second orbit */}
      <motion.div
        className="absolute w-20 h-20 rounded-full border border-emerald-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_#5eead4]" />
      </motion.div>

      {/* Center QR target */}
      <motion.div
        className="relative z-10"
        animate={{ rotateY: [0, 15, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-16 h-16 relative">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl-md shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr-md shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl-md shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br-md shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          
          {/* Inner QR dots */}
          <div className="absolute inset-3 grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="rounded-[2px] bg-emerald-400/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, delay: i * 0.12, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399,0_0_30px_rgba(52,211,153,0.3)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Floating data particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-emerald-300"
          style={{ left: `${30 + i * 20}%`, top: `${20 + i * 25}%` }}
          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function AccessAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_60%)]" />

      <div className="relative flex items-center gap-5 z-10">
        {/* Phone mockup */}
        <motion.div
          className="w-10 h-[68px] rounded-lg bg-gradient-to-b from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg flex flex-col items-center justify-center p-1 relative overflow-hidden"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-4 h-1 bg-slate-900 rounded-full absolute top-1" />
          <motion.div
            className="w-6 h-6 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
          </motion.div>
          <div className="w-5 h-0.5 bg-purple-500/60 rounded mt-1.5" />
        </motion.div>

        {/* Connection beam */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Smart device (locker/vending) */}
        <motion.div
          className="w-14 h-16 rounded-xl bg-gradient-to-b from-slate-700/80 to-slate-800/80 border border-slate-600/30 shadow-lg flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Status indicator */}
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center relative"
            animate={{ backgroundColor: ["rgba(168,85,247,0.1)", "rgba(16,185,129,0.2)", "rgba(168,85,247,0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 0, 0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Lock className="w-4 h-4 text-purple-400" />
            </motion.div>
          </motion.div>
          
          {/* Access granted bar */}
          <motion.div
            className="w-10 h-1 rounded-full"
            animate={{ backgroundColor: ["#a855f7", "#10b981", "#a855f7"], boxShadow: ["0 0 6px #a855f7", "0 0 10px #10b981", "0 0 6px #a855f7"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Pulsing concentric rings */}
      <motion.div className="absolute w-32 h-32 rounded-full border border-purple-500/10" animate={{ scale: [1, 1.3], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.div className="absolute w-32 h-32 rounded-full border border-purple-500/8" animate={{ scale: [1, 1.6], opacity: [0.3, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
    </div>
  );
}

function PayAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Holographic dashboard card */}
        <motion.div
          className="relative w-32 h-20 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 p-2.5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          animate={{ y: [-4, 4, -4], rotateX: [2, -1, 2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <div className="w-8 h-1 bg-white/20 rounded-full" />
            </div>
            <div className="text-[8px] text-emerald-400 font-mono font-bold">LIVE</div>
          </div>

          {/* Animated chart bars */}
          <div className="flex items-end gap-[3px] h-6">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.75].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/60 to-emerald-400/80"
                animate={{ height: [`${h * 100}%`, `${((h + 0.3) % 1) * 100}%`, `${h * 100}%`] }}
                transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Bottom stats */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-1 bg-white/15 rounded" />
            <motion.div
              className="text-[7px] font-bold font-mono text-emerald-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑ 24%
            </motion.div>
          </div>

          {/* Success badge */}
          <motion.div
            className="absolute -right-2.5 -top-2.5 w-7 h-7 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.5)] flex items-center justify-center border-2 border-slate-900"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.15, 1, 1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.15, 0.25, 0.8, 1] }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating data particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-emerald-400/80 shadow-[0_0_4px_#34d399]"
          style={{ left: `${20 + i * 18}%`, bottom: "20%" }}
          animate={{ y: [0, -50], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ============ 1️⃣ IP HONE MOCKUP COMPONENT ============

function IPhoneMockup({
  src,
  alt,
  className = "",
  innerClassName = "",
  glowColor = "rgba(16,185,129,0.15)",
  tiltedClass = "",
  initial = {},
  whileInView = {},
  transition = {},
}: {
  src: string;
  alt: string;
  className?: string;
  innerClassName?: string;
  glowColor?: string;
  tiltedClass?: string;
  initial?: MotionDivProps["initial"];
  whileInView?: MotionDivProps["whileInView"];
  transition?: MotionDivProps["transition"];
}) {
  return (
    <motion.div
      className={`relative rounded-[24px] md:rounded-[44px] bg-slate-950 border-[4px] md:border-[8px] border-neutral-900 shadow-2xl overflow-visible transition-all duration-300 hover:scale-[1.03] ${className} ${tiltedClass}`}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={transition}
      style={{ boxShadow: `0 20px 45px -8px rgba(0,0,0,0.35), 0 0 30px ${glowColor}` }}
    >
      {/* Side Buttons (iPhone realism) - Hidden on mobile to prevent artifacts */}
      <div className="hidden md:block absolute top-20 -left-[10px] w-[2px] h-6 bg-neutral-800 rounded-r pointer-events-none" />
      <div className="hidden md:block absolute top-32 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r pointer-events-none" />
      <div className="hidden md:block absolute top-44 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r pointer-events-none" />
      <div className="hidden md:block absolute top-32 -right-[10px] w-[2px] h-12 bg-neutral-800 rounded-l pointer-events-none" />

      {/* Screen Container */}
      <div
        className={`w-full h-full rounded-[20px] md:rounded-[36px] overflow-hidden bg-white relative aspect-[9/19.5] ${innerClassName}`}
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top absolute inset-0 rounded-[20px] md:rounded-[36px]"
          loading="eager"
        />
      </div>

      {/* Dynamic Island */}
      <div className="absolute top-[3px] md:top-3 left-1/2 -translate-x-1/2 w-[24px] md:w-[60px] h-[8px] md:h-[22px] bg-black rounded-full z-20 flex items-center justify-end px-[2px] md:px-2.5 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.15)] pointer-events-none">
        <div className="h-[4px] w-[4px] md:h-[8px] md:w-[8px] rounded-full bg-[#050505] border border-white/10" />
      </div>

      {/* Screen Reflection Overlay / Glow */}
      <div className="absolute -inset-[1px] rounded-[36px] border border-white/10 pointer-events-none z-10" />
    </motion.div>
  );
}

// ============ 1️⃣ HERO SECTION ============

function Hero({ onPartnerClick }: { onPartnerClick: () => void }) {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[75vh] md:min-h-[90vh] w-full flex-col items-center justify-start pt-28 md:pt-32 pb-10 md:pb-16 bg-transparent"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <FadeUp>
          <h1 className="text-[clamp(34px,6vw,72px)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Everyday access, <br />
            <span className="text-emerald-500">redesigned.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-semibold">
            Tolpar connects people with smart machines, services, and connected experiences, from
            through one simple Smart App.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            {/* App Store Button */}
            <a
              href="https://apps.apple.com/app/tolpar/id6768960889"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 sm:gap-3 rounded-[16px] bg-[#121212] border border-[#2a2a2a] text-white px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 shrink-0 fill-current transition-transform group-hover:scale-110 duration-300"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/45 leading-none">
                  Download on the
                </span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tolpar.sohub&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 sm:gap-3 rounded-[16px] bg-[#121212] border border-[#2a2a2a] text-white px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110 duration-300"
              >
                <path
                  fill="#EA4335"
                  d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z"
                />
                <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                <path
                  fill="#FBBC04"
                  d="M17.52 14.37L22.62 11.45C23.69 10.84 23.69 9.16 22.62 8.55L17.52 5.63L13.9 10.75L17.52 14.37Z"
                />
                <path
                  fill="#34A853"
                  d="M2.1 1.45C2.1 1.05 2.55 0.77 2.92 0.98L17.52 5.63L13.9 10.75L2.1 1.45Z"
                />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/45 leading-none">
                  GET IT ON
                </span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-5 text-[11px] font-bold tracking-wider text-slate-400 uppercase select-none">
            Developed, owned, and operated by Solution Hub Technologies (SOHUB).
          </p>
        </FadeUp>

        {/* Authentic iPhone 15 Pro Mockups with App Screenshots */}
        <FadeUp delay={0.4} className="mt-10 md:mt-16 w-full max-w-5xl relative flex justify-center">
          <div className="relative flex items-end justify-center gap-2 sm:gap-6 md:gap-8 overflow-visible pt-6 md:pt-10">
            {/* Left phone - tilted */}
            <IPhoneMockup
              src={assetPath("/image.png")}
              alt="Tolpar App - Map View"
              className="w-[85px] sm:w-[165px] md:w-[205px]"
              tiltedClass="-rotate-6 -translate-y-2 hover:-rotate-3 hover:-translate-y-4"
              glowColor="rgba(251,138,9,0.12)"
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            />

            {/* Center phone - main, larger */}
            <IPhoneMockup
              src={assetPath("/app_screen.png")}
              alt="Tolpar App - Home Screen"
              className="w-[130px] sm:w-[195px] md:w-[235px] z-10"
              tiltedClass="hover:-translate-y-2"
              glowColor="rgba(16,185,129,0.18)"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            />

            {/* Right phone - tilted */}
            <IPhoneMockup
              src={assetPath("/image_copy_3.png")}
              alt="Tolpar App - O-MAMA Point"
              className="w-[85px] sm:w-[165px] md:w-[205px]"
              tiltedClass="rotate-6 -translate-y-2 hover:rotate-3 hover:-translate-y-4"
              glowColor="rgba(59,130,246,0.12)"
              initial={{ opacity: 0, x: 40, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            />

            {/* Glow effect behind center phone */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ============ 2️⃣ CONNECTED SERVICES SECTION ============

function ConnectedServices() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "O-MAMA",
      desc: "To make Bangladesh a place where fresh and hygienic food is as easy as grabbing a bottle of water.",
      youtubeId: "h5ylw8PR3_s",
      buttonText: "Explore O-MAMA",
      exploreUrl: "https://omama.sohub.com.bd/",
      fbUrl: "https://www.facebook.com/omamabangladesh",
      igUrl: "https://www.instagram.com/omama_bd",
      ytUrl: "https://www.youtube.com/playlist?list=PL5gB5kNB2iq0yDtqzhuoh-abVT4kB9J11",
    },
    {
      title: "Snacks Vending Machine",
      desc: "On-demand snacks, cold drinks, and confectionery items available instantly at workplaces and campuses.",
      youtubeId: "4835onrVx34",
      buttonText: "Explore Machines",
      exploreUrl: "https://machines.sohub.com.bd/",
      ytUrl: "https://www.youtube.com/playlist?list=PL5gB5kNB2iq31_cOhI2j6I1uXXSnRLmUE",
    },
    {
      title: "Powerbank Vending Machine",
      desc: "Never run out of charge again. Rent a powerbank instantly from our smart vending stations. Just scan, grab and go.",
      youtubeId: "Y08VPoImhoA",
      buttonText: "Explore Machines",
      exploreUrl: "https://machines.sohub.com.bd/",
      ytUrl: "https://www.youtube.com/playlist?list=PL5gB5kNB2iq31_cOhI2j6I1uXXSnRLmUE",
    },
    {
      title: "Smart Lockers",
      desc: "Secure item storage and package delivery compartments with simple mobile control.",
      youtubeId: "jZk6Zv-q-zw",
      buttonText: "Explore Lockers",
      exploreUrl: "https://machines.sohub.com.bd/",
      ytUrl: "https://www.youtube.com/playlist?list=PL5gB5kNB2iq31_cOhI2j6I1uXXSnRLmUE",
    },
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section id="features" className="bg-[#f2fcf5] py-16 md:py-32 relative overflow-hidden flex flex-col justify-center min-h-[700px]">
      
      {/* Header Section */}
      <div className="mx-auto max-w-6xl w-full px-6 mb-12 md:mb-20 text-center md:text-left z-10 relative">
        <FadeUp>
          <Overline>CONNECTED ECOSYSTEM</Overline>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-extrabold tracking-tight text-slate-900 leading-tight">
            One app. <br className="sm:hidden" />
            Multiple smart services.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-medium max-w-3xl">
            Tolpar brings together connected everyday services into one simple experience, designed
            designed for modern workplaces, campuses, commercial spaces, and public environments.
          </p>
        </FadeUp>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <div className="hidden md:flex absolute inset-y-0 left-4 lg:left-12 items-center z-20 pointer-events-none mt-20">
        <button onClick={prevSlide} className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/50 hover:scale-105 transition-transform text-slate-800 pointer-events-auto active:scale-95">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-4 lg:right-12 items-center z-20 pointer-events-none mt-20">
        <button onClick={nextSlide} className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/50 hover:scale-105 transition-transform text-slate-800 pointer-events-auto active:scale-95">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <div className="mx-auto max-w-[1100px] w-full px-6 md:px-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
          >
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
              <h2 className="text-[clamp(32px,4vw,44px)] font-semibold text-[#111827] tracking-tight leading-[1.1]">
                {slides[currentSlide].title}
              </h2>
              <p className="mt-5 text-[15px] md:text-[17px] text-[#6b7280] leading-relaxed max-w-md font-medium">
                {slides[currentSlide].desc}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                <a href={slides[currentSlide].exploreUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-full shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition-all hover:scale-105 active:scale-95 text-[15px] inline-block text-center">
                  {slides[currentSlide].buttonText}
                </a>
                <div className="flex items-center gap-4 text-emerald-500">
                  {slides[currentSlide].fbUrl && (
                    <a href={slides[currentSlide].fbUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform opacity-90 hover:opacity-100" aria-label="Facebook"><Facebook className="w-[22px] h-[22px]" /></a>
                  )}
                  {slides[currentSlide].igUrl && (
                    <a href={slides[currentSlide].igUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform opacity-90 hover:opacity-100" aria-label="Instagram"><Instagram className="w-[22px] h-[22px]" /></a>
                  )}
                  {slides[currentSlide].ytUrl && (
                    <a href={slides[currentSlide].ytUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform opacity-90 hover:opacity-100" aria-label="YouTube"><Youtube className="w-6 h-6" /></a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Video Embed */}
            <div className="w-full lg:w-1/2">
               <div className="relative w-full aspect-[16/10] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-slate-900 isolate group" style={{ transform: "translateZ(0)" }}>
                 <iframe
                    src={`https://www.youtube.com/embed/${slides[currentSlide].youtubeId}?autoplay=1&mute=1&loop=1&playlist=${slides[currentSlide].youtubeId}&controls=1&rel=0&modestbranding=1&playsinline=1`}
                    title={slides[currentSlide].title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen={true}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? "bg-[#111827] w-6" : "bg-transparent border-[1.5px] border-[#9ca3af] w-2.5 hover:border-[#6b7280]"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Mobile Navigation Arrows (Visible only on small screens) */}
      <div className="flex md:hidden justify-center items-center gap-6 mt-8 relative z-20">
         <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-100 text-slate-800 active:scale-95">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-100 text-slate-800 active:scale-95">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </section>
  );
}

// ============ 3️⃣ O-MAMA SECTION ============

function OMamaSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % omamaImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white px-6 py-12 md:py-32 border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-4xl grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="lg:pr-4 text-center lg:text-left">
          <FadeUp>
            <Overline>O-MAMA POINT</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-extrabold tracking-tight text-slate-900 leading-tight">
              Fresh access, <br />
              <span className="text-emerald-500">made simple.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-medium">
              With Tolpar, users can access O-MAMA Point and connected smart vending services with
              item details, updated prices, and available offers shown before purchase.
            </p>
          </FadeUp>
        </div>

        {/* Compact, hyper-realistic, perfectly-sized iPhone Pro mockup */}
        <FadeUp delay={0.2} className="relative w-full flex justify-center lg:justify-start">
          <div className="relative w-[200px] sm:w-[230px] rounded-[44px] bg-slate-950 border-[8px] border-neutral-900 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.02] overflow-visible">
            {/* Side Buttons (iPhone realism) */}
            <div className="absolute top-20 -left-[10px] w-[2px] h-6 bg-neutral-800 rounded-r" />
            <div className="absolute top-30 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r" />
            <div className="absolute top-42 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r" />
            <div className="absolute top-30 -right-[10px] w-[2px] h-12 bg-neutral-800 rounded-l" />

            {/* Screen Container */}
            <div className="w-full rounded-[36px] overflow-hidden bg-white relative aspect-[9/19.5]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={omamaImages[currentImage]}
                  alt={`O-MAMA Point Screenshot ${currentImage + 1}`}
                  className="w-full h-full object-cover object-top absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease }}
                  loading="eager"
                />
              </AnimatePresence>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[52px] h-3.5 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-950/80 mr-0.5 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-emerald-400" />
              </div>
              <div className="w-0.5 h-0.5 rounded-full bg-blue-900/60" />
            </div>

            {/* Premium Screen Glow */}
            <div className="absolute -inset-[1px] rounded-[36px] border border-white/10 pointer-events-none z-10" />
          </div>
          {/* Subtle glow behind the phone */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[180px] h-[70px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        </FadeUp>
      </div>
    </section>
  );
}

// ============ 4️⃣ HOW IT WORKS SECTION ============

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Scan",
      desc: "Scan QR codes on supported machines. Point your camera and let the app connect.",
      animation: <ScanAnimation />,
      glow: "group-hover:border-orange-500/20 group-hover:shadow-[0_20px_40px_rgba(251,138,9,0.03)]",
      badge: "bg-orange-50 border-orange-100 text-orange-600",
    },
    {
      n: "02",
      title: "Access",
      desc: "Use connected services instantly. Choose, confirm, and interact with vending, lockers, or stations.",
      animation: <AccessAnimation />,
      glow: "group-hover:border-purple-500/20 group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.03)]",
      badge: "bg-purple-50 border-purple-100 text-purple-600",
    },
    {
      n: "03",
      title: "Track",
      desc: "View balance, usage, and transaction history inside the app. Keep tabs on every smart interaction.",
      animation: <PayAnimation />,
      glow: "group-hover:border-emerald-500/20 group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.03)]",
      badge: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
  ];
  return (
    <section
      id="how"
      className="bg-slate-50/40 px-6 py-12 md:py-20 border-t border-slate-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-6xl text-center relative z-10">
        <FadeUp>
          <Overline>HOW IT WORKS</Overline>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-[clamp(32px,5vw,46px)] font-extrabold tracking-tight text-slate-900 leading-tight">
            Designed to feel simple.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-3 text-[15px] text-slate-500 md:text-[17px] font-semibold">
            Three steps. Every service.
          </p>
        </FadeUp>

        <div className="mt-8 md:mt-16 grid grid-cols-1 gap-5 md:gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className={`group bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.005)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full md:min-h-[380px] ${s.glow}`}>
                <div>
                  {/* CSS/SVG Interactive Animation Wrapper */}
                  <div className="rounded-2xl overflow-hidden border border-slate-50 shadow-inner bg-slate-50/30">
                    {s.animation}
                  </div>

                  {/* Title and Badge */}
                  <div className="flex items-center justify-between mt-5 md:mt-8">
                    <h3 className="text-[20px] font-extrabold text-slate-900 tracking-tight">
                      {s.title}
                    </h3>
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${s.badge}`}
                    >
                      Step {s.n}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-left text-[14px] leading-relaxed text-slate-500 font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ 5️⃣ SMART ECOSYSTEM SECTION ============

function SmartEcosystem() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const features = [
    {
      label: "Smart Vending",
      desc: "Instant access to fresh food, hot/cold beverages, and retail items.",
      video: "/videos/Animate_this_D_isometric_dior.mp4",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      label: "Connected Lockers",
      desc: "Secure package deliveries and automated storage solutions.",
      video: "/videos/Man_taps_smartphone_locker_202606011354.mp4",
      span: "",
    },
    {
      label: "Powerbanks",
      desc: "Stay powered up with high-speed rental powerbanks on the go.",
      video: "/videos/Boy_scans_powerbank_station_202606011502.mp4",
      span: "",
    },
    {
      label: "Snacks & Beverages",
      desc: "Grab your favorite snacks and refreshing beverages on the go.",
      video: "/videos/future_connected_services.mp4",
      span: "",
    },
    {
      label: "QR-based Access",
      desc: "Zero friction setup. Just scan to connect.",
      video: "/videos/0601.mp4",
      span: "",
    },
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedIndex(null);
    };
    if (expandedIndex !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [expandedIndex]);

  return (
    <section className="bg-slate-50/50 px-6 py-12 md:py-24 border-t border-slate-100 relative overflow-hidden">
      {/* Decorative premium radial gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <FadeUp>
            <Overline>SMART ECOSYSTEM</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-extrabold tracking-tight text-slate-900 leading-tight">
              Built for connected environments.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-medium">
              Tolpar is designed for offices, campuses, residential spaces, commercial environments,
              and modern facilities where everyday access should be smarter, simpler, and more
              reliable.
            </p>
          </FadeUp>
        </div>

        {/* Bento Grid */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] gap-3 md:gap-4">
          {features.map((f, i) => (
            <FadeUp key={f.label} delay={0.1 + i * 0.06} className={f.span}>
              <div
                className="group relative flex flex-col rounded-[20px] md:rounded-[24px] bg-slate-200 overflow-hidden h-full cursor-pointer isolate"
                style={{ transform: "translateZ(0)" }}
                onClick={() => setExpandedIndex(i)}
              >
                {/* Autoplaying Video Background */}
                <video
                  src={f.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative mt-auto p-4 md:p-5 flex flex-col gap-1 pointer-events-none z-10">
                  <h3 className="text-[15px] md:text-[17px] font-bold text-white tracking-tight leading-tight">
                    {f.label}
                  </h3>
                </div>
                
                {/* Expand Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </div>

                {/* Inner Border */}
                <div className="absolute inset-0 rounded-[20px] md:rounded-[24px] border border-white/10 pointer-events-none" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Expanded Video Modal */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-auto"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedIndex(null)}
                className="absolute -top-12 right-0 md:right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <XIcon className="w-5 h-5" />
              </button>

              {/* Video Container */}
              <div className="rounded-[20px] md:rounded-[28px] overflow-hidden shadow-2xl bg-black relative flex items-center justify-center">
                <video
                  src={features[expandedIndex].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-video object-cover scale-[1.35] md:scale-[1.45]"
                />
              </div>

              {/* Title & Caption below video */}
              <div className="mt-5 text-center px-2">
                <h3 className="text-[22px] md:text-[28px] font-bold text-white tracking-tight">
                  {features[expandedIndex].label}
                </h3>
                <p className="mt-2 text-[14px] md:text-[16px] text-white/60 font-medium max-w-lg mx-auto leading-relaxed">
                  {features[expandedIndex].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============ 6️⃣ PARTNER / BUSINESS CTA SECTION ============

function PartnerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState("");

  const resetForm = () => {
    setFormData({ name: "", email: "", company: "", message: "" });
    setHoneypot("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitState === "submitting") return;

    if (honeypot.trim()) {
      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
        resetForm();
        onClose();
      }, 1800);
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const company = formData.company.trim();
    const message = formData.message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      setSubmitState("error");
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!emailPattern.test(email)) {
      setSubmitState("error");
      setSubmitError("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      setSubmitState("error");
      setSubmitError("Please share a little more about your proposal.");
      return;
    }

    setSubmitState("submitting");
    setSubmitError("");

    try {
      const response = await fetch(assetPath("/server/partner-mailer.php"), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name,
          email,
          company,
          message,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Mail sending failed");
      }

      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
        resetForm();
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Partner form email error:", error);
      setSubmitState("error");
      setSubmitError("Message could not be sent. Please try again in a moment.");
    }
  };

  const handleClose = () => {
    if (submitState !== "submitting") {
      setSubmitState("idle");
      setSubmitError("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-[28px] shadow-2xl max-w-lg w-full p-8 md:p-10 overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              disabled={submitState === "submitting"}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all"
            >
              <XIcon size={16} />
            </button>

            {submitState === "success" ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  <Check size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-[22px] font-extrabold text-slate-900 tracking-tight">
                  Thank you!
                </h3>
                <p className="mt-2 text-[14px] text-slate-500 font-medium">
                  Your proposal has been sent. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <Overline>PARTNERSHIP</Overline>
                  <h3 className="mt-3 text-[24px] font-extrabold text-slate-900 tracking-tight">
                    Partner with Tolpar
                  </h3>
                  <p className="mt-2 text-[14px] text-slate-500 font-medium leading-relaxed">
                    If your business aligns with the Tolpar ecosystem, we'd love to hear from you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-800 outline-none transition resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      placeholder="Tell us about your product or service..."
                    />
                  </div>
                  {submitState === "error" && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="mt-2 w-full rounded-xl bg-slate-900 py-3.5 text-[14px] font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
                  >
                    {submitState === "submitting" ? "Sending..." : "Submit Proposal"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PartnerCTA({ onPartnerClick }: { onPartnerClick: () => void }) {
  return (
    <section className="bg-slate-50/40 px-6 py-16 md:py-20 border-t border-slate-100">
      <div className="mx-auto max-w-4xl text-center">
        <FadeUp>
          <Overline>PARTNERSHIP</Overline>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-extrabold tracking-tight text-slate-900 leading-tight">
            Bring your service into <br className="sm:hidden" />
            <span className="text-emerald-500">everyday access.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-medium">
            Tolpar is gradually building a connected smart service ecosystem for Bangladesh. If your
            business, product, service, or connected experience aligns with the Tolpar ecosystem,
            we'd love to hear from you.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onPartnerClick}
              className="rounded-[16px] bg-slate-900 px-8 py-4 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Partner with Tolpar
            </button>
            <Link
              to="/contact"
              className="rounded-[16px] border border-slate-200 bg-white px-8 py-4 text-[14px] font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5"
            >
              Contact SOHUB
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ============ 7️⃣ SOHUB ECOSYSTEM SECTION ============

function SOHUBEcosystem() {
  return (
    <>
      {/* Custom header text for SOHUB Ecosystem */}
      <section className="bg-[#f8f9fa] px-6 pt-16 md:pt-20 pb-0 border-t border-slate-100">
        <div className="mx-auto max-w-6xl text-center">
          <FadeUp>
            <Overline>SOHUB ECOSYSTEM</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-extrabold tracking-tight text-slate-900 leading-tight">
              A SOHUB initiative. <br className="sm:hidden" />
              <span className="text-emerald-500">Connected by design.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-medium">
              Tolpar is part of the SOHUB ecosystem, a growing collection of connected
              technologies, smart services, and digital experiences designed for real everyday use
              in Bangladesh.
            </p>
          </FadeUp>
        </div>
      </section>
      {/* OurInitiatives grid from API */}
      <OurInitiatives />
    </>
  );
}

// ============ 8️⃣ DOWNLOAD CTA SECTION ============

function DownloadCTA() {
  return (
    <section id="download" className="relative overflow-hidden bg-black px-6 py-20 md:py-24">
      {/* Modern glowing background effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="mx-auto max-w-3xl text-center relative z-10">
        <FadeUp>
          <h2 className="mx-auto max-w-xl text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-white">
            Start with{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Tolpar.
            </span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/50 font-medium leading-relaxed">
            Scan, pay, and manage your connected usage all in one simple app.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-6 md:mt-8 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full px-2 sm:px-0">
            {/* App Store Button */}
            <a
              href="https://apps.apple.com/app/tolpar/id6768960889"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-[16px] bg-white text-black px-4 py-2.5 md:px-5 md:py-3 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-black/45 leading-none">
                  Download on the
                </span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tolpar.sohub&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 sm:gap-3 rounded-[16px] md:rounded-[20px] bg-[#121212] border border-white/10 text-white px-4 py-2.5 md:px-6 md:py-3.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110 duration-300"
              >
                <path
                  fill="#EA4335"
                  d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z"
                />
                <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                <path
                  fill="#FBBC04"
                  d="M17.52 14.37L22.62 11.45C23.69 10.84 23.69 9.16 22.62 8.55L17.52 5.63L13.9 10.75L17.52 14.37Z"
                />
                <path
                  fill="#34A853"
                  d="M2.1 1.45C2.1 1.05 2.55 0.77 2.92 0.98L17.52 5.63L13.9 10.75L2.1 1.45Z"
                />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/45 leading-none">
                  GET IT ON
                </span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ============ 9️⃣ FOOTER ============

export function Footer() {
  const services = [
    { name: "O-MAMA Point", href: "https://omama.sohub.com.bd/" },
    { name: "Snacks Vending", href: "https://machines.sohub.com.bd/" },
    { name: "Smart Lockers", href: "https://machines.sohub.com.bd/" },
    { name: "Powerbank Stations", href: "https://machines.sohub.com.bd/" },
  ];

  const company = [
    { name: "SOHUB Website", href: "https://sohub.com.bd" },
    { name: "Contact SOHUB", href: "https://sohub.com.bd/contact" },
    { name: "Privacy Policy", href: "https://sohub.com.bd/privacy/tolpar" },
    { name: "Terms & Conditions", href: "https://sohub.com.bd/terms" },
  ];

  const socials = [
    {
      icon: <Facebook size={16} />,
      href: "https://www.facebook.com/sikinahomama",
      label: "Facebook",
    },
    {
      icon: <Instagram size={16} />,
      href: "https://www.instagram.com/tolpar.app",
      label: "Instagram",
    },
    { icon: <Youtube size={16} />, href: "https://www.youtube.com/@sohub_tech", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#030303] px-6 py-12 md:py-20 border-t border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 md:pb-16">
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-2 max-w-sm flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                TOLPAR
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/40 font-medium">
              Tolpar connects you to smart everyday services and connected ecosystems, built and
              operated by Solution Hub Technologies.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-white/45 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:-translate-y-1 hover:shadow-md"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2 md:gap-8 w-full">
            {/* Column 2: Connected Services */}
            <div className="flex flex-col items-start">
              <h4 className="text-[11px] font-bold text-white/35 uppercase tracking-[0.2em] mb-5">
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                {services.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      className="text-[13px] text-white/40 transition hover:text-white/80 font-medium hover:translate-x-0.5 inline-block duration-200"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: SOHUB & Company */}
            <div className="flex flex-col items-start">
              <h4 className="text-[11px] font-bold text-white/35 uppercase tracking-[0.2em] mb-5">
                SOHUB
              </h4>
              <ul className="flex flex-col gap-3">
                {company.map((c) => (
                  <li key={c.name}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[13px] text-white/40 transition hover:text-white/80 font-medium hover:translate-x-0.5 inline-block duration-200"
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Block */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/35 font-medium">
          <div>
            © 2026 Tolpar is developed, owned, and operated by{" "}
            <a
              href="https://sohub.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white/50 hover:text-white/70 transition-colors"
            >
              Solution Hub Technologies (SOHUB)
            </a>
            . All rights reserved.
          </div>
          <div className="text-[11px] tracking-wider text-white/20 select-none">
            A SOHUB INITIATIVE • CONNECTED BY DESIGN
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ FAQ SECTION ============

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Tolpar?",
      a: "Tolpar is a smart service app that connects people with machines, services, and experiences, from vending to lockers to powerbanks, all through one simple interface.",
    },
    {
      q: "How do I use Tolpar?",
      a: "Simply download the app, scan a QR code on any supported smart machine, and you're ready to go. Browse items, confirm access, and track everything in one place.",
    },
    {
      q: "Is my payment secure?",
      a: "Yes. Every transaction is encrypted and protected with bank-grade security standards. Your data stays private and secure at all times.",
    },
    {
      q: "What services does Tolpar support?",
      a: "Currently, Tolpar supports O-MAMA Point (smart vending), smart lockers, powerbank stations, and is expanding with more connected services.",
    },
    {
      q: "Who operates Tolpar?",
      a: "Tolpar is developed, owned, and operated by Solution Hub Technologies (SOHUB), based in Dhaka, Bangladesh.",
    },
  ];

  return (
    <section id="faq" className="bg-slate-50/40 px-6 py-16 md:py-20 border-t border-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] gap-6 md:gap-8 items-start">
          {/* Left Column: Heading Info */}
          <div className="md:sticky md:top-28 text-center md:text-left">
            <FadeUp>
              <Overline>FAQ</Overline>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-4 text-[clamp(32px,5vw,46px)] font-extrabold tracking-tight text-slate-900 leading-tight">
                Common <br />
                questions
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-500 font-medium">
                Can't find the answer you're looking for? Reach out to our customer support team or
                contact SOHUB directly.
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Modern Minimalist Borderless Accordion */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <FadeUp key={i} delay={0.15 + i * 0.05}>
                  <div
                    className={`rounded-[24px] border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-emerald-500/15 bg-white shadow-[0_12px_30px_rgba(16,185,129,0.03)]"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span
                        className={`text-[15px] font-bold tracking-tight pr-4 transition-colors duration-200 ${isOpen ? "text-emerald-700" : "text-slate-800"}`}
                      >
                        {faq.q}
                      </span>
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-emerald-50 text-emerald-600 rotate-180" : "bg-slate-100 text-slate-500"}`}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="px-6 pb-6">
                            <div className="border-t border-slate-50 pt-4">
                              <p className="text-[14px] leading-relaxed text-slate-500 font-medium">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Page ============

export function TolparLanding() {
  const [partnerOpen, setPartnerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PartnerModal isOpen={partnerOpen} onClose={() => setPartnerOpen(false)} />
      <main>
        {/* 1️⃣ Hero */}
        <div className="relative w-full overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <HeroWave />
          </div>
          <Hero onPartnerClick={() => setPartnerOpen(true)} />
        </div>

        {/* 2️⃣ Connected Services */}
        <ConnectedServices />

        {/* 3️⃣ O-MAMA Section */}
        <OMamaSection />

        {/* 4️⃣ How It Works */}
        <HowItWorks />

        {/* 5️⃣ Smart Ecosystem */}
        <SmartEcosystem />

        {/* Interactive App Simulator */}
        <AppSimulator />

        {/* 6️⃣ Partner CTA */}
        <PartnerCTA onPartnerClick={() => setPartnerOpen(true)} />

        {/* 7️⃣ SOHUB Ecosystem */}
        <SOHUBEcosystem />

        {/* FAQ */}
        <FAQ />

        {/* 8️⃣ Download CTA */}
        <DownloadCTA />

        {/* 9️⃣ Footer */}
        <Footer />
      </main>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tolpar | A smarter way to interact with the world around you" },
      {
        name: "description",
        content:
          "Tolpar connects you to smart machines everywhere, including O MAMA points, vending, powerbank stations, and lockers. Scan, pay, and go.",
      },
      { property: "og:title", content: "Tolpar by SOHUB" },
      {
        property: "og:description",
        content: "One app for every smart machine around you.",
      },
    ],
  }),
  component: TolparLanding,
});
