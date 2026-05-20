import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Play,
  Plus,
  Minus,
  Check,
  X as XIcon,
  ArrowRight,
  Smartphone,
  Facebook,
  Instagram,
  Youtube,
  ShieldCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
  Eye,
  LogOut,
  ArrowDownLeft,
  Apple,
  Utensils,
  BatteryCharging,
  Lock,
  Sun,
  Coffee,
  Moon,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import HeroWave from "@/components/ui/dynamic-wave-canvas-background";

const ease = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tolpar — A smarter way to interact with the world around you" },
      {
        name: "description",
        content:
          "Tolpar connects you to smart machines everywhere — food points, vending, powerbank stations, and lockers. Scan, pay, and go.",
      },
      { property: "og:title", content: "Tolpar — by SOHUB" },
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

// ============ Sections ============

function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start pt-40"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-100 bg-white/70 backdrop-blur-md p-1 pr-4 shadow-sm transition-transform hover:scale-105">
            <span className="rounded-full bg-[#FB8A09] px-4 py-1.5 text-[12px] font-bold tracking-wide text-white shadow-sm">
              SOHUB
            </span>
            <span className="text-[13.5px] font-semibold text-gray-700">
              Solution Hub Technologies
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="mt-8 text-[clamp(44px,6vw,72px)] font-extrabold leading-[1.1] tracking-tight text-gray-900">
            Your Everyday <br className="hidden sm:block" />
            <span className="relative inline-block whitespace-nowrap text-emerald-500 px-2">
              Smart App.
              {/* Custom Swoosh matching the reference exactly */}
              <svg 
                className="absolute -bottom-1 left-0 w-full h-4 text-emerald-500/90 z-0" 
                viewBox="0 0 100 20" 
                preserveAspectRatio="none"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 15 C 30 5, 70 5, 100 15"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
            </span>
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-relaxed text-gray-500 md:text-[18px]">
            <span className="font-medium text-gray-800">Everything you need, in one smart app.</span>
            <br className="mt-2" />
            Find vending machines, food points, lockers, and powerbanks near you. Just scan, pay, and go.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#download"
              className="flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
            >
              Download App
            </a>
            <a
              href="#how"
              className="flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-4 text-[15px] font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
            >
              See How It Works
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.4} className="mt-20 relative w-full flex justify-center">
          <div className="relative z-10 mx-auto w-[280px] md:w-[320px]">
            {/* Phone Frame */}
            <div className="relative rounded-[45px] border-[8px] border-gray-900 bg-gray-900 shadow-2xl shadow-emerald-500/10 overflow-hidden">
               {/* iPhone Notch */}
               <div className="absolute left-1/2 top-0 z-20 h-6 w-1/3 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
               <img src="/app_screen.png" alt="App Screen" className="h-auto w-full rounded-[37px] object-cover" />
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Bottom right arrow */}
      <FadeUp delay={0.6} className="absolute bottom-10 right-10 hidden md:block">
        <a href="#features" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-900 transition-transform hover:scale-110">
          <ArrowRight className="rotate-90" size={20} />
        </a>
      </FadeUp>
    </section>
  );
}

function TrustGrid() {
  const cards = [
    { icon: <ShieldCheck size={22} className="text-emerald-500" />, title: "Cashless & Secure", desc: "Every payment encrypted and protected." },
    { icon: <Zap size={22} className="text-emerald-500" />, title: "Instant Access", desc: "Scan, pay, and interact in seconds." },
    { icon: <Smartphone size={22} className="text-emerald-500" />, title: "One App, Everything", desc: "Four smart services, one unified experience." },
  ];
  const claims = ["Trusted by users", "Local support", "Built for Bangladesh", "Anyone can use it"];
  return (
    <section className="relative z-10 px-6 pb-24 md:pb-32 pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1}>
              <div className="group flex flex-col md:flex-row items-start gap-5 rounded-[24px] border border-white/60 bg-white/40 p-6 shadow-sm backdrop-blur-2xl transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-emerald-500/10 transition-transform duration-300 group-hover:scale-110">
                  {c.icon}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold tracking-tight text-gray-900">{c.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-[1.6] text-gray-500">{c.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        
        <FadeUp delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-full border border-white/40 bg-white/40 px-8 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl">
            {claims.map((c, i) => (
              <span key={c} className="flex items-center gap-6 text-[14px] font-semibold tracking-tight text-gray-600">
                {c}
                {i < claims.length - 1 && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40"></span>}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function LifeMoving() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 flex items-center justify-center">
      <div className="mx-auto max-w-3xl text-center">
        
        <FadeUp>
          <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-tight text-[#1D1D1F]">
            Life is moving faster.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 text-[18px] font-medium leading-[1.5] text-[#1D1D1F] md:text-[22px]">
            You grab food between meetings. You charge your phone on the run. You need a locker for 30 minutes. Every day, you interact with machines that should just work.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mx-auto mt-6 text-[18px] font-medium leading-[1.5] text-[#86868B] md:text-[22px]">
            But they don't. They need exact change. They have confusing buttons. Each one is its own little frustration.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-16 md:mt-20">
            <h3 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-tight text-[#1D1D1F]">
              Tolpar changes that. <br />
              <span className="text-emerald-500">One app. Every machine.</span>
            </h3>
            <p className="mt-4 text-[16px] font-medium text-[#86868B] md:text-[18px]">
              Making machine interactions human-friendly.
            </p>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

function VideoGallery() {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const videos = [
    { 
      title: "O Mama Smart Freeze Vending Machine", 
      id: "o8ahmgEQtZU",
      thumb: "https://img.youtube.com/vi/o8ahmgEQtZU/maxresdefault.jpg"
    },
    { 
      title: "Power Bank Rental Vending Machine", 
      id: "Y08VPoImhoA",
      thumb: "https://img.youtube.com/vi/Y08VPoImhoA/maxresdefault.jpg"
    },
    { 
      title: "Power Bank Rental (Demo)", 
      id: "Y08VPoImhoA",
      thumb: "https://img.youtube.com/vi/Y08VPoImhoA/maxresdefault.jpg"
    },
    { 
      title: "Remote Control by SOHUB", 
      id: "Vd2hu5TESRE",
      thumb: "https://img.youtube.com/vi/Vd2hu5TESRE/maxresdefault.jpg"
    },
    { 
      title: "O Mama Smart Freezer at SAVOR", 
      id: "mzh978dzt_E",
      thumb: "https://img.youtube.com/vi/mzh978dzt_E/maxresdefault.jpg"
    },
    { 
      title: "O Mama Launching Event", 
      id: "MOJZuKggX2c",
      thumb: "https://img.youtube.com/vi/MOJZuKggX2c/maxresdefault.jpg"
    },
    { 
      title: "O Mama Smart Freezer", 
      id: "h5ylw8PR3_s",
      thumb: "https://img.youtube.com/vi/h5ylw8PR3_s/maxresdefault.jpg"
    },
    { 
      title: "Locker Vending Machine Test", 
      id: "jZk6Zv-q-zw",
      thumb: "https://img.youtube.com/vi/jZk6Zv-q-zw/maxresdefault.jpg"
    },
  ];

  const activeVideo = activeVideoIndex !== null ? videos[activeVideoIndex] : null;

  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <Overline>GET INSPIRED</Overline>
        </FadeUp>
        <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeUp delay={0.1}>
              <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#1D1D1F]">
                See Tolpar in Action
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="mt-3 max-w-xl text-[15px] text-[#6E6E73] md:text-[17px]">
                Watch how people use Tolpar every day.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <a 
              href="https://youtube.com/playlist?list=PL5gB5kNB2iq31_cOhI2j6I1uXXSnRLmUE" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2.5 text-[14px] font-semibold text-emerald-600 transition-colors hover:bg-emerald-100"
            >
              Watch Full Playlist <ArrowRight size={16} />
            </a>
          </FadeUp>
        </div>

        {/* Clean Listed Grid Layout */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div 
                className="group cursor-pointer" 
                onClick={() => setActiveVideoIndex(i)}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-gray-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <img 
                    src={v.thumb} 
                    alt={v.title} 
                    className="absolute inset-0 h-full w-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110">
                      <Play size={18} className="ml-0.5 fill-[#1D1D1F] text-[#1D1D1F]" />
                    </div>
                  </div>
                </div>
                
                {/* Title Below Image */}
                <div className="mt-4">
                  <h3 className="text-[15px] font-bold leading-snug text-[#1D1D1F] line-clamp-2 transition-colors duration-200 group-hover:text-emerald-500">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#6E6E73]">Tolpar System Showcase</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {activeVideoIndex !== null && activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm md:px-12"
          >
            {/* Prev Button */}
            <button
              onClick={() => setActiveVideoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : videos.length - 1))}
              className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-8"
            >
              <ChevronLeft size={24} className="-ml-0.5" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setActiveVideoIndex((prev) => (prev !== null && prev < videos.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-8"
            >
              <ChevronRight size={24} className="ml-0.5" />
            </button>

            {/* Video Container */}
            <div className="relative flex w-full max-w-4xl flex-col items-center">
              {/* Close Button */}
              <button
                onClick={() => setActiveVideoIndex(null)}
                className="absolute -top-12 right-0 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <XIcon size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full overflow-hidden rounded-[16px] shadow-2xl"
              >
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  ></iframe>
                </div>
                
                {/* Orange Title Bar (Matching Reference) */}
                <div className="bg-[#FB8A09] px-6 py-4">
                  <h3 className="text-[16px] font-semibold text-white md:text-[18px]">
                    {activeVideo.title}
                  </h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DailyCompanion() {
  const features = [
    {
      icon: <Utensils size={24} className="text-[#FB8A09]" />,
      title: "Fresh food, no lines",
      desc: "Walk up to any O-Mama point. Scan the QR. Browse what's fresh right now. Pay from your wallet. Pick up your meal. Done.",
    },
    {
      icon: <BatteryCharging size={24} className="text-emerald-500" />,
      title: "Charge on the go",
      desc: "Phone dying? Find the nearest station on the map. Scan. A powerbank pops out. Return it anywhere when you're done.",
    },
    {
      icon: <Lock size={24} className="text-purple-500" />,
      title: "Your stuff, secured",
      desc: "Need to go hands-free? Lock your bags in a smart locker. Unlock from the app when you're back. Simple.",
    },
  ];
  return (
    <section id="features" className="bg-[#F5F5F7] px-6 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="relative h-[450px] overflow-hidden rounded-[24px] md:h-[550px] shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <img 
            src="/daily-companion.webp" 
            alt="Tolpar Daily Companion" 
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="md:pl-4">
          <FadeUp>
            <Overline>DAILY COMPANION</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#1D1D1F]">
              Not just an app. A daily companion.
            </h2>
          </FadeUp>
          <div className="mt-12 space-y-10">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={0.15 + i * 0.1}>
                <div className="group relative flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)]">
                    {f.icon}
                  </div>
                  <div className="pt-1.5">
                    <div className="text-[19px] font-bold tracking-tight text-[#1D1D1F] transition-colors group-hover:text-emerald-500">{f.title}</div>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#86868B]">{f.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({ 
  src, 
  className = "" 
}: { 
  src: string; 
  className?: string; 
}) {
  return (
    <div className={`absolute [perspective:1000px] z-20 transition-all duration-500 ${className}`}>
      <div className="relative w-[110px] sm:w-[130px] lg:w-[140px] aspect-[9/19.5] rounded-[24px] border-[3px] border-[#1c1c1e] bg-[#1c1c1e] shadow-[8px_16px_32px_rgba(0,0,0,0.25)] transition-all duration-700 ease-out [transform:rotateY(-12deg)_rotateX(8deg)_rotateZ(1.5deg)] group-hover:[transform:rotateY(-2deg)_rotateX(2deg)_rotateZ(0deg)_translateY(-4px)] group-hover:shadow-[12px_24px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#1c1c1e] rounded-full z-30" />
        {/* Glare effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />
        <img 
          src={src} 
          alt="App Screen" 
          className="h-full w-full object-cover rounded-[21px] select-none pointer-events-none" 
        />
      </div>
    </div>
  );
}

function Personas() {
  const items = [
    "Simple as scanning",
    "Everyone gets it",
    "Intuitive for all ages",
    "One tap. That's it.",
    "Works everywhere",
  ];
  const ticker = [...items, ...items];
  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="max-w-3xl text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#1D1D1F]">
            Students, professionals, and families. Everyone gets it.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-4 text-[16px] text-[#86868B] md:text-[18px]">
            No learning curve. No app gymnastics.
          </p>
        </FadeUp>

        <div className="relative mt-12 overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {ticker.map((t, i) => (
              <span key={i} className="flex items-center gap-8 text-[13px] font-medium text-[#86868B]">
                {t}
                <span className="text-emerald-500">●</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          
          {/* Card 1: Students (Text Top, Image Bottom) */}
          <FadeUp delay={0.15} className="lg:col-span-1 flex flex-col">
            <div className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#F5F5F7] border border-gray-200/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] min-h-[480px] relative">
              {/* Text Content */}
              <div className="p-8 pb-6 pr-28 sm:pr-32 lg:pr-24 z-10">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  For Campus Life
                </span>
                <h3 className="mt-4 text-[22px] font-bold text-[#1D1D1F] tracking-tight">
                  Students
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#86868B]">
                  Grab lunch from O-Mama between classes. Rent a powerbank before the library. No cash needed.
                </p>
                
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    O-Mama Fresh Meals
                  </div>
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    Library Powerbanks
                  </div>
                </div>
              </div>
              
              {/* Media Container - FULL BLEED */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EAE3DC] mt-auto">
                <img 
                  src="/student_diorama_new.png" 
                  alt="Students" 
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Tilted larger smartphone mockup absolute relative to card */}
              <PhoneMockup src="/image_copy_4.png" className="bottom-4 right-4 lg:bottom-6 lg:right-6" />
            </div>
          </FadeUp>

          {/* Card 2: Professionals (Image Top, Text Bottom) */}
          <FadeUp delay={0.3} className="lg:col-span-1 flex flex-col">
            <div className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#F5F5F7] border border-gray-200/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] min-h-[480px] relative">
              {/* Media Container - FULL BLEED AT TOP */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E2DFDC]">
                <img 
                  src="/office_diorama_new.png" 
                  alt="Professionals" 
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Tilted larger smartphone mockup absolute relative to card */}
              <PhoneMockup src="/image_copy_3.png" className="top-4 right-4 lg:top-6 lg:right-6" />

              {/* Text Content AT BOTTOM */}
              <div className="p-8 pt-6 pb-8 pr-28 sm:pr-32 lg:pr-24 z-10">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  For Work & Gym
                </span>
                <h3 className="mt-4 text-[22px] font-bold text-[#1D1D1F] tracking-tight">
                  Professionals
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#86868B]">
                  Quick snack from vending during a break. Lock your bag at the gym. Everything from one app.
                </p>
                
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    Snack Vending Machines
                  </div>
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    Secure Smart Lockers
                  </div>
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    On-the-go Powerbanks
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Families & Food Courts (Text Top, Image Bottom) */}
          <FadeUp delay={0.45} className="lg:col-span-1 flex flex-col">
            <div className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#F5F5F7] border border-gray-200/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] min-h-[480px] relative">
              {/* Text Content */}
              <div className="p-8 pb-6 pr-28 sm:pr-32 lg:pr-24 z-10">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  For Daily Dining
                </span>
                <h3 className="mt-4 text-[22px] font-bold text-[#1D1D1F] tracking-tight">
                  Families & Food Courts
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#86868B]">
                  Locate nearby O-Mama points instantly. Scan and pay safely from a single shared family wallet.
                </p>
                
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    Smart Machine Maps
                  </div>
                  <div className="flex items-center gap-2 text-[13.5px] text-[#6E6E73] font-medium">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">✓</span>
                    Shared Family Wallet
                  </div>
                </div>
              </div>
              
              {/* Media Container - FULL BLEED */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E6DEC9] mt-auto">
                <img 
                  src="/food_court_diorama_new.png" 
                  alt="Families and Food Courts" 
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Tilted larger smartphone mockup absolute relative to card */}
              <PhoneMockup src="/image_copy_2.png" className="bottom-4 right-4 lg:bottom-6 lg:right-6" />
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

function MachineShowcase() {
  const machines = [
    {
      name: "O-Mama Point",
      desc: "Fresh meals at workplaces and campuses. Scan, pick, eat.",
      img: "/sohub-omama-v2-Cb04jp3t.png",
    },
    {
      name: "Smart Vending",
      desc: "Snacks and drinks, 24/7. Cashless and instant.",
      img: "/sohub-snacks-CIEARMGV.png",
    },
    {
      name: "Powerbank Station",
      desc: "Rent a charge. Return anywhere. Auto-billing.",
      img: "/sohub-power-bank-v1-Bcca8uE6.png",
    },
    {
      name: "Smart Locker",
      desc: "Secure storage with digital keys. Lock, go, return.",
      img: "/sohub-locker-v1-Dsl9zKzH.png",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center md:text-left">
          <FadeUp>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight text-[#1D1D1F]">
              Smart machines, all around you.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-3 max-w-2xl text-[18px] font-medium text-[#86868B] md:text-[20px]">
              Each one designed to solve a real, everyday problem.
            </p>
          </FadeUp>
        </div>
        
        {/* Ultra-Minimal 4-Column Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {machines.map((m, i) => (
            <FadeUp key={m.name} delay={0.2 + i * 0.1}>
              <div className="group flex flex-col">
                
                {/* Pure Image - Fixed Aspect Ratio to guarantee identical sizes */}
                <div className="relative w-full aspect-square overflow-hidden rounded-[24px] transition-transform duration-500 group-hover:-translate-y-2">
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                
                {/* Clean Typography Below */}
                <div className="mt-6">
                  <h3 className="text-[20px] font-bold text-[#1D1D1F] md:text-[22px]">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6E6E73]">
                    {m.desc}
                  </p>
                  <a 
                    href="#" 
                    className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-emerald-500 transition-colors hover:text-emerald-600"
                  >
                    Learn more <ArrowRight size={14} />
                  </a>
                </div>
                
              </div>
            </FadeUp>
          ))}
        </div>
        
      </div>
    </section>
  );
}

function DailyTimeline() {
  const cards = [
    {
      time: "8:00 AM",
      subtitle: "MORNING RUSH",
      desc: "Grab breakfast from O-Mama on your way to work. Scan, pay, and pick up in 30 seconds.",
      bg: "#FFF9F2",
      text: "#D97706",
      dot: "#F59E0B",
    },
    {
      time: "2:00 PM",
      subtitle: "AFTERNOON BREAK",
      desc: "Craving a quick snack? Get your favorite from the vending machine instantly.",
      bg: "#F2F7FF",
      text: "#2563EB",
      dot: "#3B82F6",
    },
    {
      time: "5:00 PM",
      subtitle: "ON THE MOVE",
      desc: "Phone at 5%? Grab a powerbank from the nearest station on the go.",
      bg: "#F0FFF5",
      text: "#059669",
      dot: "#10B981",
    },
    {
      time: "8:00 PM",
      subtitle: "EVENING OUT",
      desc: "Heading to gym or an event? Lock your bag safely in a smart locker.",
      bg: "#FAF5FF",
      text: "#7C3AED",
      dot: "#8B5CF6",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        
        {/* Header */}
        <FadeUp>
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#86868B]">
            SEE IT IN ACTION
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-bold tracking-tight text-[#1D1D1F]">
            Smart, <span className="text-emerald-500">all day.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-4 text-[16px] text-[#86868B] md:text-[18px] max-w-2xl mx-auto">
            Tolpar fits into every moment of your daily routine.
          </p>
        </FadeUp>

        {/* Timeline Grid Container */}
        <div className="relative mt-20">
          
          {/* Horizontal Connecting Line */}
          <div 
            className="absolute left-[12.5%] right-[12.5%] top-[37px] hidden h-[1.5px] bg-[#E8E8ED] lg:block z-0" 
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {cards.map((c, i) => (
              <FadeUp key={c.subtitle} delay={i * 0.08}>
                <div
                  className="group relative flex flex-col items-center text-center rounded-[24px] pt-16 pb-10 px-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-transparent min-h-[260px]"
                  style={{ backgroundColor: c.bg }}
                >
                  {/* Color Timeline Dot */}
                  <span 
                    className="absolute top-[32px] left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover:scale-125"
                    style={{ 
                      backgroundColor: c.dot,
                      boxShadow: `0 0 0 4px ${c.dot}20`
                    }}
                  />

                  {/* Time Display */}
                  <div 
                    className="text-[28px] sm:text-[30px] font-bold tracking-tight"
                    style={{ color: c.text }}
                  >
                    {c.time}
                  </div>

                  {/* Subtitle */}
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#86868B] mt-1">
                    {c.subtitle}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-[14px] leading-relaxed text-[#6E6E73] max-w-[210px] mx-auto">
                    {c.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <FadeUp delay={0.4}>
          <p className="mt-16 text-[14px] font-semibold text-[#86868B] tracking-wide">
            One app. Four moments. Zero friction.
          </p>
        </FadeUp>

      </div>
    </section>
  );
}

function ScanAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50/50 flex items-center justify-center rounded-2xl overflow-hidden border border-gray-100/60">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      {/* QR Code Container */}
      <div className="relative w-16 h-16 border border-gray-200 rounded-lg p-1.5 bg-white flex flex-col justify-between shadow-sm">
        <div className="flex justify-between">
          <span className="w-4 h-4 bg-gray-800 rounded-[2px]" />
          <span className="w-4 h-4 bg-gray-800 rounded-[2px]" />
        </div>
        <div className="flex justify-between items-end">
          <span className="w-4 h-4 bg-gray-800 rounded-[2px]" />
          <div className="grid grid-cols-2 gap-[2px] w-4 h-4">
            <span className="bg-gray-800 rounded-[1px]" />
            <span className="bg-gray-800 rounded-[1px]" />
            <span className="bg-gray-800 rounded-[1px]" />
            <span className="bg-gray-800 rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Floating smartphone frame scanning the QR */}
      <motion.div 
        className="absolute w-28 h-32 border-2 border-emerald-500 rounded-xl bg-white/20 backdrop-blur-[1px] flex flex-col items-center justify-center shadow-lg"
        initial={{ y: 20, opacity: 0.8 }}
        animate={{ y: [20, -10, 20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Viewfinder corners */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-emerald-500" />
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-emerald-500" />
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-emerald-500" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-emerald-500" />

        {/* Scan line */}
        <motion.div 
          className="absolute left-2 right-2 h-[2px] bg-emerald-500 shadow-[0_0_8px_#10B981]"
          animate={{ top: ["20px", "104px", "20px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Phone details */}
        <div className="absolute top-1.5 w-6 h-1 bg-gray-400 rounded-full" />
      </motion.div>
    </div>
  );
}

function PayAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50/50 flex items-center justify-center rounded-2xl overflow-hidden border border-gray-100/60">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Product Card Container */}
      <div className="relative w-36 h-28 bg-white border border-gray-100 rounded-xl shadow-md p-3 flex flex-col justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">🍔</span>
          <div>
            <div className="h-2 w-16 bg-gray-200 rounded" />
            <div className="h-1.5 w-10 bg-gray-100 rounded mt-1" />
          </div>
        </div>

        {/* Dynamic button state */}
        <motion.div 
          className="w-full py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-bold text-center flex items-center justify-center gap-1 shadow-sm overflow-hidden"
          animate={{ 
            backgroundColor: ["#10B981", "#059669", "#10B981"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>Pay Securely</span>
        </motion.div>

        {/* Click pointer overlay */}
        <motion.span 
          className="absolute bottom-4 right-8 w-4 h-4 rounded-full bg-emerald-400/30 border border-emerald-500/40 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.6, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }}
        />

        {/* Success Checkmark Circle */}
        <motion.div 
          className="absolute inset-0 bg-white/95 rounded-xl flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0],
            scale: [0.9, 0.9, 1, 1, 0.9]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Check size={18} strokeWidth={3} />
          </motion.div>
          <span className="text-[10px] font-bold text-gray-800 mt-2">Payment Successful</span>
        </motion.div>
      </div>
    </div>
  );
}

function GrabAnimation() {
  return (
    <div className="relative w-full h-40 bg-slate-50/50 flex items-center justify-center rounded-2xl overflow-hidden border border-gray-100/60 [perspective:800px]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Locker Compartment Frame */}
      <div className="relative w-28 h-28 bg-gray-200 border-4 border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
        
        {/* Item Inside Locker (e.g. fresh burger box, powerbank) */}
        <motion.div 
          className="w-12 h-12 bg-white rounded-lg border border-gray-100 shadow-md flex items-center justify-center flex-col z-0"
          initial={{ z: -50, scale: 0.8 }}
          animate={{ 
            z: [ -50, 0, 0, -50 ],
            scale: [ 0.8, 1.1, 1.1, 0.8 ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[18px]">🍱</span>
          <span className="text-[7px] font-bold text-gray-400 mt-1">Grab Box</span>
        </motion.div>

        {/* Locker Door (swings open) */}
        <motion.div 
          className="absolute inset-0 bg-gray-100 border-l border-gray-300/80 rounded-sm z-10 flex flex-col justify-between p-2 shadow-inner [transform-origin:left_center]"
          initial={{ rotateY: 0 }}
          animate={{ 
            rotateY: [0, -115, -115, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Locker lock details */}
          <div className="flex justify-end">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[8px] font-extrabold text-emerald-600">
              ✓
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <div className="h-6 w-1 bg-gray-300 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Up-pointing hand indicator representing "Grab" */}
      <motion.div 
        className="absolute bottom-1 right-8 text-[22px] z-20 pointer-events-none"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: [20, 2, 2, 20],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🫴
      </motion.div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { 
      n: "01", 
      title: "Scan", 
      desc: "Point your camera at any machine's QR code. Tolpar recognizes it instantly.",
      animation: <ScanAnimation />
    },
    { 
      n: "02", 
      title: "Choose & Pay", 
      desc: "Browse what's available. Select what you want. Pay from your wallet in one tap.",
      animation: <PayAnimation />
    },
    { 
      n: "03", 
      title: "Grab", 
      desc: "Collect your meal, grab your charger, open your locker. The machine handles the rest.",
      animation: <GrabAnimation />
    },
  ];
  return (
    <section id="how" className="bg-[#F5F5F7] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <FadeUp>
          <Overline>HOW IT WORKS</Overline>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-5 text-[clamp(32px,5vw,46px)] font-bold tracking-tight text-[#1D1D1F]">
            Scan. Grab. Go.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-3 text-[15px] text-[#6E6E73] md:text-[17px]">
            Three steps. Every machine.
          </p>
        </FadeUp>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className="group relative bg-white p-8 rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full min-h-[360px]">
                <div>
                  {/* Custom CSS/SVG Interactive Animation */}
                  {s.animation}

                  {/* Title and Badge */}
                  <div className="flex items-center justify-between mt-6">
                    <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight">
                      {s.title}
                    </h3>
                    <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Step {s.n}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-left text-[14.5px] leading-relaxed text-[#6E6E73]">
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

function BeforeAfter() {
  const comparisons = [
    {
      before: "Hunt for exact change at vending machines",
      after: "Tap and pay, any machine, cashless",
      badge: "Vending"
    },
    {
      before: "Dead phone, no charger in sight",
      after: "Powerbank station around every corner",
      badge: "Powerbank"
    },
    {
      before: "Leave bags with strangers",
      after: "Smart locker, digital key in your pocket",
      badge: "Lockers"
    },
    {
      before: "Wait in O MAMA Point queues",
      after: "Scan, grab, and go in 30 seconds",
      badge: "O MAMA Points"
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <span className="block text-center text-[12px] font-bold uppercase tracking-widest text-[#86868B] mb-3">
            THE TRANSITION
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-center text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#1D1D1F]">
            Once you try it, no going back.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-3 text-center text-[15px] text-[#86868B] md:text-[17px] max-w-xl mx-auto">
            Say goodbye to old-school friction. Experience the future of instant smart services.
          </p>
        </FadeUp>

        {/* Modern Interactive Comparison Rows */}
        <div className="mt-16 space-y-4">
          {comparisons.map((c, i) => (
            <FadeUp key={c.badge} delay={i * 0.08}>
              <div className="group relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-0 bg-[#F5F5F7]/60 p-6 md:p-4 rounded-[24px] border border-gray-100/50 hover:bg-white hover:border-gray-200 hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] transition-all duration-300">
                
                {/* Before Column */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F7] rounded-xl md:bg-transparent md:rounded-none">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <XIcon size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[14.5px] font-medium text-gray-500 line-through decoration-gray-300">
                    {c.before}
                  </span>
                </div>

                {/* Transition Indicator (Arrow / Badge) */}
                <div className="flex md:flex-col items-center justify-center px-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] bg-white border border-gray-200/50 px-2 py-0.5 rounded-md shadow-sm mb-1 hidden md:block">
                    {c.badge}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-white transition-colors rotate-90 md:rotate-0" />
                  </div>
                </div>

                {/* After Column */}
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50/40 rounded-xl md:bg-transparent md:rounded-none group-hover:bg-emerald-50/20 transition-colors duration-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform">
                    <Check size={14} strokeWidth={3} className="animate-pulse" />
                  </span>
                  <span className="text-[14.5px] font-semibold text-[#1D1D1F]">
                    {c.after}
                  </span>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wallet() {
  const tx = [
    { 
      name: "O-Mama Point", 
      sub: "O-Mama Fridge #04", 
      date: "May 18, 2:49 PM", 
      amount: "-৳45.00", 
      icon: "/sohub-omama-v2-Cb04jp3t.png" 
    },
    { 
      name: "Smart Locker", 
      sub: "Locker Slot #B-12", 
      date: "May 17, 11:36 AM", 
      amount: "-৳15.00", 
      icon: "/sohub-locker-v1-Dsl9zKzH.png" 
    },
    { 
      name: "Powerbank Hub", 
      sub: "Station #PB-88", 
      date: "May 14, 3:56 PM", 
      amount: "-৳20.00", 
      icon: "/sohub-power-bank-v1-Bcca8uE6.png" 
    },
    { 
      name: "bKash Topup", 
      sub: "Ref: #983201", 
      date: "May 13, 4:26 PM", 
      amount: "+৳200.00", 
      icon: "topup" 
    },
  ];

  return (
    <section className="bg-[#F5F5F7] px-6 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        
        {/* Left Info Column */}
        <div>
          <FadeUp>
            <Overline>BUILT-IN WALLET</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-[clamp(32px,5vw,46px)] font-bold tracking-tight text-[#1D1D1F] leading-tight">
              Your money. <span className="text-emerald-500">Your way.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#6E6E73] md:text-[18px]">
              Top up instantly via bKash, SSL Commerz, or credit cards. Every transaction is encrypted, recorded, and right at your fingertips.
            </p>
          </FadeUp>

          {/* Core Features */}
          <div className="mt-8 space-y-4">
            <FadeUp delay={0.2}>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check size={14} strokeWidth={3} />
                </span>
                <div>
                  <h4 className="text-[15px] font-bold text-[#1D1D1F]">Instant Pay-On-Grab</h4>
                  <p className="text-[13.5px] text-[#86868B] mt-0.5">Simply scan and grab. The wallet deducts the amount seamlessly in real-time.</p>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.25}>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check size={14} strokeWidth={3} />
                </span>
                <div>
                  <h4 className="text-[15px] font-bold text-[#1D1D1F]">Encrypted Ledger</h4>
                  <p className="text-[13.5px] text-[#86868B] mt-0.5">No hidden charges. Check item logs and machine locations in your digital receipts.</p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Payment Methods */}
          <FadeUp delay={0.3}>
            <div className="mt-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Supported Methods</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#D12053]/10 bg-[#D12053]/5 px-4 py-2.5 text-[13px] font-bold text-[#D12053]">
                  bKash
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/10 bg-blue-500/5 px-4 py-2.5 text-[13px] font-bold text-blue-600">
                  SSL Commerz
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-gray-500 shadow-sm">
                  Visa & Mastercard
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
        
        {/* Right Phone Mockup Column */}
        <FadeUp delay={0.2}>
          <div className="relative mx-auto w-full max-w-[285px] rounded-[44px] border-[8px] border-slate-950 bg-white p-3 shadow-[0_25px_50px_rgba(0,0,0,0.12)] overflow-hidden">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-full z-30" />

            <div className="flex h-full w-full flex-col bg-white">
              
              {/* iPhone Status Bar */}
              <div className="flex justify-between items-center px-2.5 pt-1.5 pb-2 text-[10px] font-bold text-slate-800 z-20">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span className="flex gap-[1px] items-end h-1.5">
                    <span className="w-[1.2px] h-[2px] bg-slate-800 rounded-full" />
                    <span className="w-[1.2px] h-[3.5px] bg-slate-800 rounded-full" />
                    <span className="w-[1.2px] h-[5px] bg-slate-800 rounded-full" />
                    <span className="w-[1.2px] h-[6.5px] bg-slate-800 rounded-full" />
                  </span>
                  <svg className="w-2.5 h-2.5 fill-current text-slate-800" viewBox="0 0 16 16">
                    <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736l.518.518a.49.49 0 0 0 .707 0 10.941 10.941 0 0 1 13.32 0 .49.49 0 0 0 .707 0l.518-.518z"/>
                  </svg>
                  <div className="w-3.5 h-2 border border-slate-800 rounded-[2px] p-[0.5px] flex items-center">
                    <div className="w-2 h-1 bg-slate-800 rounded-[0.5px]" />
                  </div>
                </div>
              </div>

              {/* Green Balance Card from Screenshot */}
              <div className="relative overflow-hidden rounded-[20px] bg-[#00B050] p-4 text-white shadow-md mt-2.5">
                <div className="absolute -right-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -left-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/5 pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-white/95">
                      Total Balance <Eye size={12} className="opacity-95" />
                    </div>
                    <div className="mt-1 text-[23px] font-extrabold tracking-tight">
                      ৳ 21.00
                    </div>
                  </div>
                  <button className="rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-[10.5px] font-bold tracking-wide backdrop-blur-sm transition-all hover:bg-white/20">
                    Top Up
                  </button>
                </div>
              </div>

              {/* Recent Activity List */}
              <div className="mt-6 px-1">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[16px] font-bold tracking-tight text-[#1D1D1F]">Recent Activity</span>
                  <span className="text-[11px] font-bold text-emerald-500 cursor-pointer hover:underline">View All</span>
                </div>

                <div className="space-y-3.5">
                  {tx.map((t, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1.5 rounded-2xl transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        {/* Transaction Icon / Smart Fridge Thumbnail */}
                        {t.icon === "topup" ? (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-sm">
                            <ArrowDownLeft size={20} strokeWidth={2.5} className="animate-pulse" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-50 border border-gray-100 p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                            <img src={t.icon} className="h-full w-full object-contain" />
                          </div>
                        )}
                        <div>
                          <div className="text-[13px] font-semibold text-[#1D1D1F] tracking-tight leading-tight">{t.name}</div>
                          <div className="mt-0.5 text-[11px] text-gray-400">{t.sub}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[13.5px] font-bold ${t.amount.includes('+') ? 'text-emerald-500' : 'text-slate-800'}`}>
                          {t.amount}
                        </div>
                        <div className="mt-0.5 text-[10px] text-gray-400">{t.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </FadeUp>
        
      </div>
    </section>
  );
}

function QualityGrid() {
  const cards = [
    { emoji: "🔒", title: "Secure payments", desc: "End-to-end encrypted. Your money and data are always protected." },
    { emoji: "📶", title: "Works everywhere", desc: "Low connection? No problem. The app works reliably even on slow networks." },
    { emoji: "🌍", title: "Real-time updates", desc: "Live stock levels, live machine status, live transaction tracking." },
    { emoji: "🤝", title: "Local support", desc: "Built by SOHUB in Bangladesh. Support team that speaks your language." },
  ];
  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
            Built right. Built for you.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-3 max-w-xl text-[15px] text-[#6E6E73] md:text-[17px]">
            Every feature designed with real users in mind.
          </p>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.08}>
              <div className="h-full rounded-[20px] border border-gray-100 bg-[#F5F5F7] p-6">
                <div className="text-3xl">{c.emoji}</div>
                <div className="mt-3 text-[16px] font-semibold text-[#1D1D1F]">{c.title}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const items = [
    { title: "Smart Home", desc: "Automate your home with SOHUB Smart Home.", href: "https://home.sohub.com.bd" },
    { title: "AI Monitoring", desc: "Intelligent cameras that respond in real time.", href: "https://ai.sohub.com.bd" },
    { title: "Smart Buildings", desc: "Building management and control systems.", href: "https://controls.sohub.com.bd" },
    { title: "Home Protection", desc: "Security systems built for peace of mind.", href: "https://protect.sohub.com.bd" },
  ];
  return (
    <section className="bg-[#F5F5F7] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
            Part of something bigger.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-3 max-w-xl text-[15px] text-[#6E6E73] md:text-[17px]">
            Tolpar is one piece of SOHUB's technology ecosystem.
          </p>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <FadeUp key={it.title} delay={i * 0.08}>
              <a
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full cursor-pointer rounded-[20px] border border-gray-100 bg-white p-6 transition-all hover:border-emerald-500/20 hover:shadow-md"
              >
                <div className="text-[16px] font-semibold text-[#1D1D1F]">{it.title}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">{it.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-500">
                  Explore
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersNote() {
  return (
    <section className="bg-[#FFFBF5] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-2xl">
        <FadeUp>
          <h2 className="text-center text-[clamp(24px,3vw,36px)] font-bold tracking-tight text-[#1D1D1F]">
            A note from the team
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="mt-10 rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm md:p-12">
            <div className="space-y-5 text-[15px] leading-[1.8] text-[#424245]">
              <p>
                Every day, thousands of people walk up to machines — to buy a snack, grab a meal,
                charge their phone, or store their bags. And every time, the experience is the same:
                confusing buttons, exact change only, no way to know what's inside.
              </p>
              <p>
                We built Tolpar because we believed that interacting with a machine should be as
                simple as texting a friend. Scan. Browse. Pay. Done.
              </p>
              <p>No cash. No confusion. No friction.</p>
              <p>
                Tolpar isn't about flashy technology. It's about making the small moments in your
                day a little smoother. A little easier. A little more human.
              </p>
              <p>We're just getting started. And we'd love for you to be part of the journey.</p>
            </div>
            <div className="mt-6 font-bold text-[#1D1D1F]">— The SOHUB Team</div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "What is Tolpar?",
      a: "Tolpar is a mobile app by SOHUB that lets you interact with smart machines — food points, vending machines, powerbank stations, and smart lockers — all from your phone.",
    },
    {
      q: "How do I pay?",
      a: "Tolpar has a built-in wallet. Top up via bKash or SSL Commerz, then pay for any service with a single tap.",
    },
    {
      q: "Where are the machines?",
      a: "You can find all available machines on the in-app map. We're currently deployed across key locations in Dhaka with more coming soon.",
    },
    {
      q: "Is it free to download?",
      a: "Yes, Tolpar is completely free to download on iOS and Android. You only pay for services you use.",
    },
    {
      q: "What if I need help?",
      a: "Our support team is available in the app. Tap the Support tab anytime.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <h2 className="text-center text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
            Common questions
          </h2>
        </FadeUp>
        <div className="mt-12">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="cursor-pointer border-b border-gray-100 py-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-[16px] font-semibold text-[#1D1D1F]">{it.q}</span>
                  {isOpen ? (
                    <Minus size={18} className="shrink-0 text-emerald-500" />
                  ) : (
                    <Plus size={18} className="shrink-0 text-[#86868B]" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-[14px] leading-relaxed text-[#6E6E73]">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTAFooter() {
  return (
    <>
      <section id="download" className="relative overflow-hidden bg-black px-6 py-32 md:py-44">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Modern glowing background effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[100px]" />
        
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <FadeUp>
            <h2 className="mx-auto max-w-2xl text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.1] tracking-tight text-white">
              Start with Tolpar.<br />
              <span className="bg-gradient-to-r from-white/40 via-white/50 to-white/30 bg-clip-text text-transparent">We'll take care of the rest.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 text-[16px] text-white/50 font-medium tracking-wide">Available on iOS and Android.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4.5">
              {/* App Store Button with original Apple logo */}
              <a
                href="#"
                className="group flex w-full max-w-[240px] sm:max-w-none sm:w-auto items-center justify-center gap-3 rounded-[16px] bg-white text-black px-7 py-3 text-left transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-[0_12px_30px_rgba(255,255,255,0.18)]"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.1 1.51 12.06 1.004 1.45 2.19 3.078 3.766 3.02 1.524-.059 2.098-.98 3.937-.98 1.829 0 2.355.98 3.948.95 1.629-.029 2.675-1.479 3.67-2.93 1.153-1.68 1.629-3.3 1.66-3.379-.03-.02-3.178-1.22-3.218-4.839-.03-3.02 2.475-4.48 2.585-4.55-1.42-2.08-3.61-2.319-4.385-2.369-2.03-.16-3.96 1.24-4.96 1.24zm.82-3.49c.81-1 1.348-2.38 1.198-3.76-1.185.05-2.62.79-3.47 1.79-.75.87-1.4 2.27-1.22 3.63 1.319.1 2.68-.66 3.492-1.66z"/>
                </svg>
                <div className="flex flex-col select-none">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 leading-none">Download on the</span>
                  <span className="text-[16px] font-bold font-sans leading-tight mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play Button with original colored Play Store logo */}
              <a
                href="#"
                className="group flex w-full max-w-[240px] sm:max-w-none sm:w-auto items-center justify-center gap-3 rounded-[16px] bg-[#121212] border border-white/10 text-white px-7 py-3 text-left transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1C] hover:border-white/20 hover:shadow-[0_12px_30px_rgba(0,198,255,0.08)]"
              >
                <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <path fill="#EA4335" d="M17.52 14.37L13.9 10.75L2.1 22.55C2.94 23.44 4.3 23.53 5.37 22.92L17.52 14.37Z" />
                  <path fill="#4285F4" d="M2.1 1.45V22.55L13.9 10.75L2.1 1.45Z" />
                  <path fill="#34A853" d="M17.52 7.13L5.37.58C4.3-.03 2.94.06 2.1.95L13.9 10.75L17.52 7.13Z" />
                  <path fill="#FBBC05" d="M22.09 10.75C22.09 9.88 21.59 9.07 20.73 8.58L17.52 7.13V14.37L20.73 12.92C21.59 12.43 22.09 11.62 22.09 10.75Z" />
                </svg>
                <div className="flex flex-col select-none">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-white/40 leading-none">GET IT ON</span>
                  <span className="text-[16px] font-bold font-sans leading-tight mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <div className="text-base font-bold tracking-[0.06em] text-white">TOLPAR</div>
              <div className="mt-2 text-[13px] text-white/40">A SOHUB Initiative</div>
              <div className="mt-5 flex gap-3">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/30 hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-wider text-white/80">
                Services
              </div>
              <ul className="mt-4 space-y-3">
                {["O-Mama Point", "Smart Vending", "Powerbank", "Smart Locker"].map((s) => (
                  <li key={s}>
                    <a href="#" className="text-[13px] text-white/40 transition hover:text-white/70">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-wider text-white/80">
                Company
              </div>
              <ul className="mt-4 space-y-3">
                {["About Us", "Contact Us", "Privacy Policy", "Terms of Service"].map((s) => (
                  <li key={s}>
                    <a href="#" className="text-[13px] text-white/40 transition hover:text-white/70">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-[12px] text-white/40">
            © 2026 SOHUB. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

// ============ Page ============

function TolparLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="relative w-full overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <HeroWave />
          </div>
          <Hero />
          <TrustGrid />
        </div>
        <LifeMoving />
        <VideoGallery />
        <DailyCompanion />
        <Personas />
        <MachineShowcase />
        <DailyTimeline />
        <HowItWorks />
        <BeforeAfter />
        <Wallet />
        <QualityGrid />
        <Ecosystem />
        <FoundersNote />
        <FAQ />
        <FinalCTAFooter />
      </main>
    </div>
  );
}
