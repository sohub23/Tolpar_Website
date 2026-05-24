import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
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


const ease = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tolpar - A smarter way to interact with the world around you" },
      {
        name: "description",
        content:
          "Tolpar connects you to smart machines everywhere, including O MAMA points, vending, powerbank stations, and lockers. Scan, pay, and go.",
      },
      { property: "og:title", content: "Tolpar - by SOHUB" },
      {
        property: "og:description",
        content: "One app for every smart machine around you.",
      },
    ],
  }),
  component: TolparLanding,
});

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
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
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      <div className="relative w-14 h-14 border border-slate-200 rounded-lg p-1.5 bg-white flex flex-col justify-between shadow-sm">
        <div className="flex justify-between">
          <span className="w-3.5 h-3.5 bg-slate-800 rounded-[2px]" />
          <span className="w-3.5 h-3.5 bg-slate-800 rounded-[2px]" />
        </div>
        <div className="flex justify-between items-end">
          <span className="w-3.5 h-3.5 bg-slate-800 rounded-[2px]" />
          <div className="grid grid-cols-2 gap-[1.5px] w-3.5 h-3.5">
            <span className="bg-slate-800 rounded-[1px]" />
            <span className="bg-slate-800 rounded-[1px]" />
            <span className="bg-slate-800 rounded-[1px]" />
            <span className="bg-slate-800 rounded-[1px]" />
          </div>
        </div>
      </div>
      <motion.div
        className="absolute w-24 h-28 border-2 border-emerald-500 rounded-xl bg-white/20 backdrop-blur-[0.5px] flex flex-col items-center justify-center shadow-lg"
        initial={{ y: 15, opacity: 0.8 }}
        animate={{ y: [15, -10, 15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-emerald-500" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-emerald-500" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-emerald-500" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-emerald-500" />
        <motion.div
          className="absolute left-2 right-2 h-[1px] bg-emerald-500 shadow-[0_0_4px_#10B981]"
          animate={{ top: ["16px", "90px", "16px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-1 w-5 h-0.5 bg-slate-350 rounded-full" />
      </motion.div>
    </div>
  );
}

function PayAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      <div className="relative w-36 h-24 bg-white border border-slate-100 rounded-xl shadow-md p-3 flex flex-col justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[9px] select-none">📱</span>
          <div>
            <div className="h-1.5 w-14 bg-slate-200 rounded" />
            <div className="h-1 w-8 bg-slate-100 rounded mt-1" />
          </div>
        </div>
        <motion.div
          className="w-full py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-bold text-center flex items-center justify-center shadow-sm overflow-hidden"
          animate={{ backgroundColor: ["#10B981", "#059669", "#10B981"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>Ecosystem Tracked</span>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white/95 rounded-xl flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.95, 0.95, 1, 1, 0.95]
          }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Check size={14} strokeWidth={3} />
          </motion.div>
          <span className="text-[9px] font-bold text-slate-800 mt-1.5">Ledger Updated</span>
        </motion.div>
      </div>
    </div>
  );
}

function GrabAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100 [perspective:800px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      <div className="relative w-24 h-24 bg-slate-100 border-2 border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-10 h-10 bg-white rounded-lg border border-slate-100 shadow-md flex items-center justify-center flex-col z-0"
          initial={{ z: -30, scale: 0.8 }}
          animate={{ z: [-30, 0, 0, -30], scale: [0.8, 1, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[14px] select-none">🔑</span>
          <span className="text-[6px] font-bold text-slate-400 mt-0.5">Secure Access</span>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-slate-50 border-l border-slate-200 rounded-sm z-10 flex flex-col justify-between p-1.5 shadow-inner [transform-origin:left_center]"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: [0, -110, -110, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex justify-end">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[7px] font-black text-emerald-600">
              ✓
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div className="w-1 h-1 rounded-full bg-slate-350" />
            <div className="h-4 w-0.5 bg-slate-250 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ 1️⃣ HERO SECTION ============

function Hero({ onPartnerClick }: { onPartnerClick: () => void }) {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-start pt-32 pb-16 bg-white"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        
        <FadeUp>
          <h1 className="text-[clamp(44px,6vw,72px)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Everyday access, <br />
            <span className="text-emerald-500">redesigned.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-semibold">
            Tolpar connects people with smart machines, services, and connected experiences — through one simple Smart App.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-4 sm:px-0">
              {/* App Store Button */}
              <a
                href="https://apps.apple.com/app/tolpar/id6768960889"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 sm:flex-none items-center justify-center gap-2 sm:gap-3 rounded-[16px] bg-[#121212] border border-[#2a2a2a] text-white px-4 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current transition-transform group-hover:scale-110 duration-300">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z" />
                </svg>
                <div className="flex flex-col select-none text-left">
                  <span className="text-[7px] uppercase font-bold tracking-wider text-white/45 leading-none">Download on the</span>
                  <span className="text-[12px] font-bold font-sans leading-tight mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.tolpar.sohub&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 sm:flex-none items-center justify-center gap-2 sm:gap-3 rounded-[16px] bg-[#121212] border border-[#2a2a2a] text-white px-4 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <path fill="#EA4335" d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z" />
                  <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                  <path fill="#FBBC04" d="M17.52 14.37L22.62 11.45C23.69 10.84 23.69 9.16 22.62 8.55L17.52 5.63L13.9 10.75L17.52 14.37Z" />
                  <path fill="#34A853" d="M2.1 1.45C2.1 1.05 2.55 0.77 2.92 0.98L17.52 5.63L13.9 10.75L2.1 1.45Z" />
                </svg>
                <div className="flex flex-col select-none text-left">
                  <span className="text-[7px] uppercase font-bold tracking-wider text-white/45 leading-none">GET IT ON</span>
                  <span className="text-[12px] font-bold font-sans leading-tight mt-0.5">Google Play</span>
                </div>
              </a>
            </div>

            {/* Secondary CTA: Partner with Tolpar */}
            <button
              onClick={onPartnerClick}
              className="flex w-full max-w-[200px] sm:max-w-none sm:w-auto items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 py-3.5 text-[14px] font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Partner with Tolpar
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-5 text-[11px] font-bold tracking-wider text-slate-400 uppercase select-none">
            Developed, owned, and operated by Solution Hub Technologies — SOHUB.
          </p>
        </FadeUp>

        {/* Phone Mockups with App Screenshots */}
        <FadeUp delay={0.4} className="mt-16 w-full max-w-5xl relative flex justify-center">
          <div className="relative flex items-end justify-center gap-4 sm:gap-6 md:gap-8">
            {/* Left phone - tilted */}
            <motion.div
              className="relative w-[140px] sm:w-[180px] md:w-[220px] rounded-[24px] sm:rounded-[32px] border-2 border-slate-200 bg-slate-900 p-1.5 sm:p-2 shadow-2xl"
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <div className="w-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-white">
                <img
                  src="/image.png"
                  alt="Tolpar App - Map View"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>

            {/* Center phone - main, larger */}
            <motion.div
              className="relative w-[170px] sm:w-[220px] md:w-[260px] rounded-[28px] sm:rounded-[36px] border-2 border-slate-200 bg-slate-900 p-1.5 sm:p-2.5 shadow-2xl z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <div className="w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white">
                <img
                  src="/app_screen.png"
                  alt="Tolpar App - Home Screen"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>

            {/* Right phone - tilted */}
            <motion.div
              className="relative w-[140px] sm:w-[180px] md:w-[220px] rounded-[24px] sm:rounded-[32px] border-2 border-slate-200 bg-slate-900 p-1.5 sm:p-2 shadow-2xl"
              initial={{ opacity: 0, x: 40, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <div className="w-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-white">
                <img
                  src="/image_copy_3.png"
                  alt="Tolpar App - O-MAMA Point"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>

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
  const services = [
    {
      image: "/sohub-omama-v2-Cb04jp3t.png",
      title: "O-MAMA Point",
      desc: "Fresh food, beverages, snacks, and retail access through smart vending and QR-based experience.",
      accent: "bg-orange-50 border-orange-100",
    },
    {
      image: "/sohub-locker-v1-Dsl9zKzH.png",
      title: "Smart Lockers",
      desc: "Secure item access with simple digital control.",
      accent: "bg-purple-50 border-purple-100",
    },
    {
      image: "/sohub-power-bank-v1-Bcca8uE6.png",
      title: "Powerbank Stations",
      desc: "Stay connected with on-demand powerbank rental access.",
      accent: "bg-emerald-50 border-emerald-100",
    },
    {
      image: "/sohub-snacks-CIEARMGV.png",
      title: "Connected Services",
      desc: "Explore smart ecosystem services built and operated by SOHUB.",
      accent: "bg-blue-50 border-blue-100",
    },
  ];

  return (
    <section className="bg-slate-50/40 px-6 py-24 md:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="text-center md:text-left max-w-3xl">
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
            <p className="mt-4 text-[16px] leading-relaxed text-slate-500 md:text-[18px] font-medium">
              Tolpar brings together connected everyday services into one simple experience — designed for modern workplaces, campuses, commercial spaces, and public environments.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={0.2 + i * 0.08}>
              <div className="group h-full rounded-[28px] border border-slate-100/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-emerald-500/15 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                {/* Machine Image */}
                <div className={`w-full aspect-[4/3] flex items-center justify-center p-6 ${s.accent}`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-contain max-h-[160px] transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 pt-5">
                  <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-500 font-medium">{s.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ 3️⃣ O-MAMA SECTION ============

function OMamaSection() {
  const images = ["/image.png", "/image_copy_3.png"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white px-6 py-24 md:py-32 border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-6xl grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
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
              With Tolpar, users can access O-MAMA Point and connected smart vending services with item details, updated prices, and available offers shown before purchase.
            </p>
          </FadeUp>
        </div>

        {/* Phone mockup with alternating real screenshots */}
        <FadeUp delay={0.2} className="relative w-full flex justify-center lg:justify-end">
          <div className="relative w-[260px] sm:w-[300px] rounded-[36px] border-2 border-slate-200 bg-slate-900 p-2.5 shadow-2xl">
            <div className="w-full rounded-[30px] overflow-hidden bg-white relative aspect-[9/19.5]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
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
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-full z-10" />
          </div>
          {/* Glow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
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
      animation: <ScanAnimation />
    },
    {
      n: "02",
      title: "Access",
      desc: "Use connected services instantly. Choose, confirm, and interact with vending, lockers, or stations.",
      animation: <GrabAnimation />
    },
    {
      n: "03",
      title: "Track",
      desc: "View balance, usage, and transaction history inside the app. Keep tabs on every smart interaction.",
      animation: <PayAnimation />
    },
  ];
  return (
    <section id="how" className="bg-slate-50/40 px-6 py-24 md:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-6xl text-center">
        <FadeUp>
          <Overline>HOW IT WORKS</Overline>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-[clamp(32px,5vw,46px)] font-extrabold tracking-tight text-slate-900 leading-tight">
            Designed to feel simple.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-3 text-[15px] text-slate-500 md:text-[17px] font-medium">
            Three steps. Every service.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className="group bg-white p-8 rounded-[28px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.005)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-emerald-500/10 transition-all duration-500 flex flex-col justify-between h-full min-h-[360px]">
                <div>
                  {/* CSS/SVG Interactive Animation */}
                  {s.animation}

                  {/* Title and Badge */}
                  <div className="flex items-center justify-between mt-6">
                    <h3 className="text-[20px] font-bold text-slate-900 tracking-tight">
                      {s.title}
                    </h3>
                    <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Step {s.n}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-left text-[14px] leading-relaxed text-slate-500 font-medium">
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
  const features = [
    { icon: <Utensils size={20} />, label: "Smart vending" },
    { icon: <Lock size={20} />, label: "Connected lockers" },
    { icon: <BatteryCharging size={20} />, label: "Powerbank stations" },
    { icon: <Globe size={20} />, label: "Future connected services" },
    { icon: <Eye size={20} />, label: "QR-based access" },
  ];

  return (
    <section className="bg-white px-6 py-24 md:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-6xl">
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
              Tolpar is designed for offices, campuses, residential spaces, commercial environments, and modern facilities where everyday access should be smarter, simpler, and more reliable.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <FadeUp key={f.label} delay={0.2 + i * 0.06}>
              <div className="group flex flex-col items-center gap-4 rounded-[24px] border border-slate-100 bg-slate-50/30 p-8 text-center transition-all duration-500 hover:bg-white hover:border-emerald-500/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {f.icon}
                </div>
                <span className="text-[14px] font-bold text-slate-700 tracking-tight">{f.label}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
      onClose();
    }, 2500);
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
            onClick={onClose}
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
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all"
            >
              <XIcon size={16} />
            </button>

            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  <Check size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-[22px] font-extrabold text-slate-900 tracking-tight">Thank you!</h3>
                <p className="mt-2 text-[14px] text-slate-500 font-medium">We'll review your proposal and get back to you soon.</p>
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
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
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
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label>
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
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-800 outline-none transition resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      placeholder="Tell us about your product or service..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-slate-900 py-3.5 text-[14px] font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
                  >
                    Submit Proposal
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
    <section className="bg-slate-50/40 px-6 py-24 md:py-32 border-t border-slate-100">
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
            Tolpar is gradually building a connected smart service ecosystem for Bangladesh. If your business, product, service, or connected experience aligns with the Tolpar ecosystem, we'd love to hear from you.
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
            <a
              href="https://sohub.com.bd/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[16px] border border-slate-200 bg-white px-8 py-4 text-[14px] font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5"
            >
              Contact SOHUB
            </a>
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
      <section className="bg-[#f8f9fa] px-6 pt-24 md:pt-32 pb-0 border-t border-slate-100">
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
              Tolpar is part of the SOHUB ecosystem — a growing collection of connected technologies, smart services, and digital experiences designed for real everyday use in Bangladesh.
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
    <section className="bg-slate-900 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <FadeUp>
          <h2 className="text-[clamp(36px,5vw,52px)] font-extrabold tracking-tight text-white leading-tight">
            Start with <span className="text-emerald-400">Tolpar.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/50 md:text-[18px] font-medium">
            Scan, access, pay, track, and stay connected with supported smart services.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* App Store */}
            <a
              href="https://apps.apple.com/app/tolpar/id6768960889"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-[16px] bg-white border border-white/10 text-slate-900 px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500 leading-none">Download on the</span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">App Store</span>
              </div>
            </a>
            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tolpar.sohub&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-[16px] bg-white border border-white/10 text-slate-900 px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0">
                <path fill="#EA4335" d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z" />
                <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                <path fill="#FBBC04" d="M17.52 14.37L22.62 11.45C23.69 10.84 23.69 9.16 22.62 8.55L17.52 5.63L13.9 10.75L17.52 14.37Z" />
                <path fill="#34A853" d="M2.1 1.45C2.1 1.05 2.55 0.77 2.92 0.98L17.52 5.63L13.9 10.75L2.1 1.45Z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500 leading-none">GET IT ON</span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">Google Play</span>
              </div>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ============ 9️⃣ FOOTER ============

function Footer() {
  const links = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Support", href: "#" },
    { name: "SOHUB Website", href: "https://sohub.com.bd" },
  ];

  const socials = [
    { icon: <Facebook size={16} />, href: "https://www.facebook.com/sikinahomama", label: "Facebook" },
    { icon: <Instagram size={16} />, href: "https://www.instagram.com/tolpar.app", label: "Instagram" },
    { icon: <Youtube size={16} />, href: "https://www.youtube.com/@sohub_tech", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#0A0A0B] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-[11px] font-bold">T</span>
              <span className="text-[16px] font-extrabold text-white tracking-wider">TOLPAR</span>
            </div>
            <p className="mt-3 text-[13px] text-white/40 font-medium leading-relaxed">
              A smarter way to interact with the world around you.
            </p>
            {/* Social Icons */}
            <div className="mt-4 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white/70"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Links</h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[13px] text-white/40 transition hover:text-white/70 font-medium"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 text-[12px] text-white/30 text-center font-medium">
          © 2026 Tolpar is developed, owned, and operated by{" "}
          <a
            href="https://sohub.com.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white/50 hover:text-white/70 transition-colors"
          >
            Solution Hub Technologies — SOHUB
          </a>
          . All rights reserved.
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
      a: "Tolpar is a smart service app that connects people with machines, services, and experiences — from vending to lockers to powerbanks — all through one simple interface.",
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
    <section className="bg-slate-50/40 px-6 py-24 md:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <FadeUp>
            <Overline>FAQ</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-[clamp(32px,5vw,46px)] font-extrabold tracking-tight text-slate-900 leading-tight">
              Common questions
            </h2>
          </FadeUp>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={0.15 + i * 0.05}>
              <div
                className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-emerald-500/20 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-bold text-slate-800 pr-4">{faq.q}</span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${openIndex === i ? "bg-emerald-50 text-emerald-600 rotate-180" : "bg-slate-100 text-slate-500"}`}>
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-[14px] leading-relaxed text-slate-500 font-medium">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
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
