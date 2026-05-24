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

function AccessAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100 [perspective:800px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      
      <div className="flex items-center gap-6 z-10">
        {/* Smartphone Screen Mockup */}
        <div className="w-14 h-24 bg-slate-900 rounded-xl p-1 shadow-md border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="w-6 h-1.5 bg-black rounded-full mx-auto" />
          
          <div className="flex-1 bg-slate-950 rounded-lg mt-1 p-1 flex flex-col justify-between items-center relative overflow-hidden">
            {/* Pulsing access circle */}
            <motion.div 
              className="w-8 h-8 rounded-full border border-purple-500/30 flex items-center justify-center relative mt-2"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-purple-500/10"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] select-none">🔓</span>
            </motion.div>
            
            {/* Status bar */}
            <div className="w-full flex flex-col items-center gap-1 mb-1">
              <div className="h-1 w-8 bg-purple-500/80 rounded" />
              <div className="h-0.5 w-5 bg-slate-800 rounded" />
            </div>
          </div>
        </div>

        {/* Transmission Waves */}
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
              animate={{ 
                scale: [1, 1.6, 1],
                opacity: [0.3, 1, 0.3],
                y: [0, -4, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>

        {/* Connected Smart Lock box */}
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl shadow-md p-2 flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div 
            className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-600 relative"
            animate={{ 
              backgroundColor: ["#FAF5FF", "#F3E8FF", "#FAF5FF"],
              borderColor: ["#F3E8FF", "#E9D5FF", "#F3E8FF"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-purple-300/60 pointer-events-none"
            />
            
            {/* Animated Lock Icon */}
            <motion.span 
              className="text-[14px] select-none z-10"
              animate={{ 
                scale: [1, 1.15, 1.15, 1],
                y: [0, -1, 0, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🔑
            </motion.span>
          </motion.div>
          <span className="text-[7.5px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Accessing</span>
        </div>
      </div>
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
  initial?: any;
  whileInView?: any;
  transition?: any;
}) {
  return (
    <motion.div
      className={`relative rounded-[44px] bg-slate-950 border-[8px] border-neutral-900 shadow-2xl overflow-visible transition-all duration-300 hover:scale-[1.03] ${className} ${tiltedClass}`}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={transition}
      style={{ boxShadow: `0 20px 45px -8px rgba(0,0,0,0.35), 0 0 30px ${glowColor}` }}
    >
      {/* Side Buttons (iPhone realism) */}
      <div className="absolute top-20 -left-[10px] w-[2px] h-6 bg-neutral-800 rounded-r pointer-events-none" />
      <div className="absolute top-30 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r pointer-events-none" />
      <div className="absolute top-42 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r pointer-events-none" />
      <div className="absolute top-30 -right-[10px] w-[2px] h-12 bg-neutral-800 rounded-l pointer-events-none" />

      {/* Screen Container */}
      <div className={`w-full rounded-[36px] overflow-hidden bg-white relative aspect-[9/19.5] ${innerClassName}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top absolute inset-0"
          loading="eager"
        />
      </div>

      {/* Dynamic Island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20 flex items-center justify-end px-1.5 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-emerald-950/80 mr-0.5 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-emerald-400" />
        </div>
        <div className="w-0.5 h-0.5 rounded-full bg-blue-900/60" />
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
      className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-start pt-32 pb-16 bg-transparent"
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
          <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            {/* App Store Button */}
            <a
              href="https://apps.apple.com/app/tolpar/id6768960889"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 sm:gap-3 rounded-[16px] bg-[#121212] border border-[#2a2a2a] text-white px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current transition-transform group-hover:scale-110 duration-300">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/45 leading-none">Download on the</span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">App Store</span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tolpar.sohub&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 sm:gap-3 rounded-[16px] bg-[#121212] border border-[#2a2a2a] text-white px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110 duration-300">
                <path fill="#EA4335" d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z" />
                <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                <path fill="#FBBC04" d="M17.52 14.37L22.62 11.45C23.69 10.84 23.69 9.16 22.62 8.55L17.52 5.63L13.9 10.75L17.52 14.37Z" />
                <path fill="#34A853" d="M2.1 1.45C2.1 1.05 2.55 0.77 2.92 0.98L17.52 5.63L13.9 10.75L2.1 1.45Z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/45 leading-none">GET IT ON</span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">Google Play</span>
              </div>
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-5 text-[11px] font-bold tracking-wider text-slate-400 uppercase select-none">
            Developed, owned, and operated by Solution Hub Technologies — SOHUB.
          </p>
        </FadeUp>

        {/* Authentic iPhone 15 Pro Mockups with App Screenshots */}
        <FadeUp delay={0.4} className="mt-16 w-full max-w-5xl relative flex justify-center">
          <div className="relative flex items-end justify-center gap-4 sm:gap-6 md:gap-8 overflow-visible pt-10">
            {/* Left phone - tilted */}
            <IPhoneMockup
              src="/image.png"
              alt="Tolpar App - Map View"
              className="w-[125px] sm:w-[165px] md:w-[205px]"
              tiltedClass="-rotate-6 -translate-y-2 hover:-rotate-3 hover:-translate-y-4"
              glowColor="rgba(251,138,9,0.12)"
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            />

            {/* Center phone - main, larger */}
            <IPhoneMockup
              src="/app_screen.png"
              alt="Tolpar App - Home Screen"
              className="w-[150px] sm:w-[195px] md:w-[235px] z-10"
              tiltedClass="hover:-translate-y-2"
              glowColor="rgba(16,185,129,0.18)"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            />

            {/* Right phone - tilted */}
            <IPhoneMockup
              src="/image_copy_3.png"
              alt="Tolpar App - O-MAMA Point"
              className="w-[125px] sm:w-[165px] md:w-[205px]"
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
  const services = [
    {
      image: "/sohub-omama-v2-Cb04jp3t.png",
      title: "O-MAMA Point",
      desc: "Fresh food, hot meals, beverages, and retail items accessible through smart vending and QR codes.",
      accent: "bg-orange-50/50 border-orange-100/50",
    },
    {
      image: "/sohub-snacks-CIEARMGV.png",
      title: "Snacks Vending",
      desc: "On-demand snacks, cold drinks, and confectionery items available instantly at workplaces and campuses.",
      accent: "bg-blue-50/50 border-blue-100/50",
    },
    {
      image: "/sohub-locker-v1-Dsl9zKzH.png",
      title: "Smart Lockers",
      desc: "Secure item storage and package delivery compartments with simple mobile control.",
      accent: "bg-purple-50/50 border-purple-100/50",
    },
    {
      image: "/sohub-power-bank-v1-Bcca8uE6.png",
      title: "Powerbank Stations",
      desc: "High-capacity on-demand rental powerbanks to keep your devices charged anywhere.",
      accent: "bg-emerald-50/50 border-emerald-100/50",
    },
  ];

  return (
    <section id="features" className="bg-slate-50/40 px-6 py-16 md:py-20 border-t border-slate-100">
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
                {/* Machine Image Container (Standard padding, centered container) */}
                <div className={`w-full aspect-[4/3] p-8 relative overflow-hidden flex items-center justify-center ${s.accent}`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="max-w-[85%] max-h-[85%] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
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
      <div className="mx-auto max-w-4xl grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="lg:pr-4">
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

            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
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
    <section id="how" className="bg-slate-50/40 px-6 py-16 md:py-20 border-t border-slate-100 relative overflow-hidden">
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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className={`group bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.005)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full min-h-[380px] ${s.glow}`}>
                <div>
                  {/* CSS/SVG Interactive Animation Wrapper */}
                  <div className="rounded-2xl overflow-hidden border border-slate-50 shadow-inner bg-slate-50/30">
                    {s.animation}
                  </div>

                  {/* Title and Badge */}
                  <div className="flex items-center justify-between mt-8">
                    <h3 className="text-[20px] font-extrabold text-slate-900 tracking-tight">
                      {s.title}
                    </h3>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${s.badge}`}>
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
  const features = [
    {
      animation: (
        <div className="relative w-full h-24 bg-orange-50/40 rounded-xl overflow-hidden border border-orange-100/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
          {/* Vending machine illustration */}
          <div className="w-10 h-16 bg-white border border-slate-200 rounded-md p-1 flex flex-col justify-between shadow-sm relative">
            <div className="h-6 w-full bg-slate-50 border border-slate-100 rounded flex flex-col justify-around p-0.5 gap-0.5">
              <div className="h-1 w-full bg-orange-400/80 rounded-sm" />
              <div className="h-1 w-2/3 bg-orange-300/60 rounded-sm" />
            </div>
            
            {/* Can Dropping mechanism */}
            <motion.div 
              className="w-2.5 h-3.5 bg-orange-500 rounded-sm absolute left-1.5 top-1/2"
              animate={{ 
                y: [0, 16],
                opacity: [0, 1, 1, 0],
                rotate: [0, 0, 45, 45]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn" }}
            />
            
            <div className="h-3 w-full bg-slate-150 border-t border-slate-200 rounded-b flex items-center justify-center">
              <div className="w-4 h-1.5 bg-slate-800 rounded-sm" />
            </div>
          </div>
          <span className="text-[18px] ml-3 select-none">🍱</span>
        </div>
      ),
      label: "Smart Vending",
      desc: "Instant access to fresh food, hot/cold beverages, and retail items.",
      accent: "from-orange-500 to-amber-500",
      bg: "bg-orange-50/40 border-orange-100/50 hover:border-orange-500/20",
      iconBg: "bg-orange-50 border-orange-100 text-orange-600",
    },
    {
      animation: (
        <div className="relative w-full h-24 bg-purple-50/40 rounded-xl overflow-hidden border border-purple-100/50 flex items-center justify-center [perspective:400px]">
          <div className="absolute inset-0 bg-[radial-gradient(#e9d5ff_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
          
          <div className="relative w-16 h-12 bg-slate-100 border border-slate-200 rounded-lg p-1 flex gap-1 shadow-sm">
            {/* Locker left drawer */}
            <div className="flex-1 bg-white border border-slate-200 rounded flex items-center justify-center">
              <span className="text-[5px] text-slate-350">••</span>
            </div>
            {/* Locker right open-swing door */}
            <motion.div 
              className="flex-1 bg-purple-50 border border-purple-200 rounded flex items-center justify-center relative [transform-origin:right_center]"
              animate={{ rotateY: [0, -75, -75, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-purple-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[9px] select-none z-10">🎁</span>
            </motion.div>
          </div>
        </div>
      ),
      label: "Connected Lockers",
      desc: "Secure package deliveries and automated storage solutions.",
      accent: "from-purple-500 to-indigo-500",
      bg: "bg-purple-50/40 border-purple-100/50 hover:border-purple-500/20",
      iconBg: "bg-purple-50 border-purple-100 text-purple-600",
    },
    {
      animation: (
        <div className="relative w-full h-24 bg-emerald-50/40 rounded-xl overflow-hidden border border-emerald-100/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#a7f3d0_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
          
          <div className="relative flex items-center gap-3">
            {/* Powerbank charging dock */}
            <div className="w-7 h-12 bg-slate-100 border border-slate-200 rounded-lg flex flex-col justify-around p-1 shadow-inner">
              <div className="w-full h-1 bg-slate-250 rounded-sm" />
              <div className="w-full h-1 bg-slate-250 rounded-sm" />
              <div className="w-full h-1 bg-slate-250 rounded-sm" />
            </div>
            
            {/* Slides in and out powerbank */}
            <motion.div 
              className="w-6 h-10 bg-white border border-slate-200 rounded-md p-1 shadow flex flex-col justify-between items-center"
              animate={{ x: [-8, 2, -8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex gap-0.5">
                <span className="w-0.5 h-1 bg-emerald-500 rounded-sm animate-pulse" />
                <span className="w-0.5 h-1 bg-emerald-500 rounded-sm animate-pulse" />
              </div>
              <motion.span 
                className="text-[9px] select-none text-emerald-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </motion.div>
          </div>
        </div>
      ),
      label: "Powerbanks",
      desc: "Stay powered up with high-speed rental powerbanks on the go.",
      accent: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50/40 border-emerald-100/50 hover:border-emerald-500/20",
      iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
    {
      animation: (
        <div className="relative w-full h-24 bg-blue-50/40 rounded-xl overflow-hidden border border-blue-100/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
          
          <div className="relative w-20 h-16 flex items-center justify-center">
            {/* Networking nodes with pulses */}
            <svg className="w-full h-full" viewBox="0 0 100 80">
              <line x1="20" y1="40" x2="50" y2="15" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="20" y1="40" x2="50" y2="65" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="50" y1="15" x2="80" y2="40" stroke="#93c5fd" strokeWidth="1" />
              <line x1="50" y1="65" x2="80" y2="40" stroke="#93c5fd" strokeWidth="1" />
              <line x1="20" y1="40" x2="80" y2="40" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2,2" />
              
              <circle cx="20" cy="40" r="4" fill="#3b82f6" />
              <circle cx="50" cy="15" r="4" fill="#60a5fa" />
              <circle cx="50" cy="65" r="4" fill="#60a5fa" />
              
              <motion.circle 
                cx="80" 
                cy="40" 
                r="4" 
                fill="#2563eb"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Traveling light packet */}
              <motion.circle 
                r="2" 
                fill="#3b82f6"
                animate={{ 
                  cx: [20, 50, 80, 50, 20],
                  cy: [40, 15, 40, 65, 40]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
        </div>
      ),
      label: "Connected Ecosystem",
      desc: "Scalable smart services custom-built for modern environments.",
      accent: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50/40 border-blue-100/50 hover:border-blue-500/20",
      iconBg: "bg-blue-50 border-blue-100 text-blue-600",
    },
    {
      animation: (
        <div className="relative w-full h-24 bg-pink-50/40 rounded-xl overflow-hidden border border-pink-100/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
          
          <div className="relative w-14 h-14 bg-white border border-slate-200 rounded-lg p-1.5 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between">
              <span className="w-3.5 h-3.5 bg-slate-800 rounded-[2px]" />
              <span className="w-3.5 h-3.5 bg-slate-800 rounded-[2px]" />
            </div>
            <div className="flex justify-between items-end">
              <span className="w-3.5 h-3.5 bg-slate-800 rounded-[2px]" />
              <div className="grid grid-cols-2 gap-[1px] w-3.5 h-3.5">
                <span className="bg-slate-850 rounded-[0.5px]" />
                <span className="bg-slate-850 rounded-[0.5px]" />
                <span className="bg-slate-850 rounded-[0.5px]" />
                <span className="bg-slate-850 rounded-[0.5px]" />
              </div>
            </div>
            
            {/* Laser scanning sweep line */}
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-pink-500 shadow-[0_0_4px_#ec4899]"
              animate={{ top: ["8px", "48px", "8px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      ),
      label: "QR-based Access",
      desc: "Zero friction setup. Just point your device camera to connect.",
      accent: "from-pink-500 to-rose-500",
      bg: "bg-pink-50/40 border-pink-100/50 hover:border-pink-500/20",
      iconBg: "bg-pink-50 border-pink-100 text-pink-600",
    },
  ];

  return (
    <section className="bg-slate-50/30 px-6 py-16 md:py-20 border-t border-slate-100 relative overflow-hidden">
      {/* Decorative premium radial gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

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
              Tolpar is designed for offices, campuses, residential spaces, commercial environments, and modern facilities where everyday access should be smarter, simpler, and more reliable.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <FadeUp key={f.label} delay={0.2 + i * 0.08}>
              <div className={`group flex flex-col justify-between rounded-[28px] border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.005)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 relative overflow-hidden h-full min-h-[300px] ${f.bg}`}>
                
                {/* Top glow accent */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${f.accent}`} />

                <div className="flex flex-col gap-5">
                  {/* Custom interactive micro animation */}
                  {f.animation}

                  {/* Text details */}
                  <div className="text-left">
                    <h3 className="text-[16px] font-extrabold text-slate-800 tracking-tight transition-colors duration-300">
                      {f.label}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-400 font-medium">
                      {f.desc}
                    </p>
                  </div>
                </div>

                {/* Subtle dynamic background orb */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />
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
    <section id="download" className="relative overflow-hidden bg-black px-6 py-20 md:py-24">
      {/* Modern glowing background effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <FadeUp>
          <h2 className="mx-auto max-w-xl text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-white">
            Start with <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Tolpar.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/50 font-medium leading-relaxed">
            Scan, pay, and manage your connected usage all in one simple app.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            {/* App Store Button */}
            <a
              href="https://apps.apple.com/app/tolpar/id6768960889"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-[16px] bg-white text-black px-5 py-3 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-black/45 leading-none">Download on the</span>
                <span className="text-[13px] font-bold font-sans leading-tight mt-0.5">App Store</span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.tolpar.sohub&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 sm:gap-3 rounded-[20px] bg-[#121212] border border-white/10 text-white px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-emerald-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110 duration-300">
                <path fill="#EA4335" d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z" />
                <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                <path fill="#FBBC04" d="M17.52 14.37L22.62 11.45C23.69 10.84 23.69 9.16 22.62 8.55L17.52 5.63L13.9 10.75L17.52 14.37Z" />
                <path fill="#34A853" d="M2.1 1.45C2.1 1.05 2.55 0.77 2.92 0.98L17.52 5.63L13.9 10.75L2.1 1.45Z" />
              </svg>
              <div className="flex flex-col select-none text-left">
                <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/45 leading-none">GET IT ON</span>
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

export function Footer() {
  const services = [
    { name: "O-MAMA Point", href: "#top" },
    { name: "Snacks Vending", href: "#top" },
    { name: "Smart Lockers", href: "#top" },
    { name: "Powerbank Stations", href: "#top" },
  ];

  const company = [
    { name: "SOHUB Website", href: "https://sohub.com.bd" },
    { name: "Contact SOHUB", href: "https://sohub.com.bd/contact" },
    { name: "Privacy Policy", href: "https://sohub.com.bd/privacy/tolpar" },
    { name: "Terms & Conditions", href: "https://sohub.com.bd/terms" },
  ];

  const socials = [
    { icon: <Facebook size={16} />, href: "https://www.facebook.com/sikinahomama", label: "Facebook" },
    { icon: <Instagram size={16} />, href: "https://www.instagram.com/tolpar.app", label: "Instagram" },
    { icon: <Youtube size={16} />, href: "https://www.youtube.com/@sohub_tech", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#030303] px-6 py-20 border-t border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-2 max-w-sm flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/tolpar_logo.png"
                alt="Tolpar Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[13px] leading-relaxed text-white/40 font-medium">
              Tolpar connects you to smart everyday services and connected ecosystems — built and operated by Solution Hub Technologies.
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
              Solution Hub Technologies — SOHUB
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
    <section id="faq" className="bg-slate-50/40 px-6 py-16 md:py-20 border-t border-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] gap-12 md:gap-8 items-start">
          {/* Left Column: Heading Info */}
          <div className="sticky top-28 text-left max-w-sm">
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
                Can't find the answer you're looking for? Reach out to our customer support team or contact SOHUB directly.
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
                      <span className={`text-[15px] font-bold tracking-tight pr-4 transition-colors duration-200 ${isOpen ? "text-emerald-700" : "text-slate-800"}`}>
                        {faq.q}
                      </span>
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-emerald-50 text-emerald-600 rotate-180" : "bg-slate-100 text-slate-500"}`}>
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
