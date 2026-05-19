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
  Apple,
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
      icon: "🍱",
      title: "Fresh food, no lines",
      desc: "Walk up to any O-Mama point. Scan the QR. Browse what's fresh right now. Pay from your wallet. Pick up your meal. Done.",
    },
    {
      icon: "🔋",
      title: "Charge on the go",
      desc: "Phone dying? Find the nearest station on the map. Scan. A powerbank pops out. Return it anywhere when you're done.",
    },
    {
      icon: "🔐",
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

        <div>
          <FadeUp>
            <Overline>DAILY COMPANION</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
              Not just an app. A daily companion.
            </h2>
          </FadeUp>
          <div className="mt-10 space-y-8">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={0.15 + i * 0.1}>
                <div>
                  <div className="text-2xl">{f.icon}</div>
                  <div className="mt-2 text-[18px] font-semibold text-[#1D1D1F]">{f.title}</div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#6E6E73]">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
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
  const personas = [
    {
      icon: "📚",
      title: "Students",
      desc: "Grab lunch from O-Mama between classes. Rent a powerbank before the library. No cash needed.",
    },
    {
      icon: "💼",
      title: "Professionals",
      desc: "Quick snack from vending during a break. Lock your bag at the gym. Everything from one app.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Families",
      desc: "Parents manage the wallet. Kids scan and pay safely. Everyone can use it, from teens to grandparents.",
    },
  ];
  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="max-w-3xl text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
            Students, professionals, and families. Everyone gets it.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-3 text-[15px] text-[#6E6E73] md:text-[17px]">
            No learning curve. No app gymnastics.
          </p>
        </FadeUp>

        <div className="relative mt-10 overflow-hidden">
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

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {personas.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-[24px] bg-[#F5F5F7] p-8">
                <div className="text-3xl">{p.icon}</div>
                <div className="mt-3 text-[20px] font-bold text-[#1D1D1F]">{p.title}</div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#6E6E73]">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
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
      title: "Morning Rush",
      desc: "Grab breakfast from O-Mama on your way to work. Scan. Pay. Pick up. 30 seconds.",
      bg: "#FFF8F1",
    },
    {
      time: "2:00 PM",
      title: "Afternoon Break",
      desc: "Craving a snack? The vending machine has your favorite. Tap. Pay. Enjoy.",
      bg: "#F0F7FF",
    },
    {
      time: "5:00 PM",
      title: "On The Move",
      desc: "Phone at 5%? Grab a powerbank from the station. Stay charged on the go.",
      bg: "#F0FFF4",
    },
    {
      time: "8:00 PM",
      title: "Evening Out",
      desc: "Heading to an event? Lock your bag in a smart locker. Go hands-free.",
      bg: "#F5F0FF",
    },
  ];
  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
            Smart, all day.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-3 text-[15px] text-[#6E6E73] md:text-[17px]">
            Tolpar fits into every moment.
          </p>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.08}>
              <div
                className="h-full rounded-[24px] p-6 md:p-8"
                style={{ backgroundColor: c.bg }}
              >
                <div className="text-[12px] font-semibold text-emerald-500">{c.time}</div>
                <div className="mt-1 text-[18px] font-bold text-[#1D1D1F]">{c.title}</div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#6E6E73]">{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.4}>
          <p className="mt-10 text-center text-[14px] font-semibold text-[#1D1D1F]">
            One app. Four moments. Zero friction.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Scan", desc: "Point your camera at any machine's QR code. Tolpar recognizes it instantly." },
    { n: "02", title: "Choose & Pay", desc: "Browse what's available. Select what you want. Pay from your wallet in one tap." },
    { n: "03", title: "Pick Up", desc: "Collect your meal, grab your charger, open your locker. The machine handles the rest." },
  ];
  return (
    <section id="how" className="bg-[#F5F5F7] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <FadeUp>
          <Overline>HOW IT WORKS</Overline>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-5 text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#1D1D1F]">
            Scan. Pay. Go.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-3 text-[15px] text-[#6E6E73] md:text-[17px]">
            Three steps. Every machine.
          </p>
        </FadeUp>
        <div className="relative mt-14">
          <div className="absolute left-[10%] right-[10%] top-[40px] hidden h-[1px] bg-gray-200 md:block" />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-[64px] font-black leading-none text-emerald-500/15">{s.n}</div>
                  <div className="mt-4 text-[20px] font-bold text-[#1D1D1F]">{s.title}</div>
                  <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-[#6E6E73]">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const before = [
    "Hunt for exact change at vending machines",
    "Dead phone, no charger in sight",
    "Leave bags with strangers",
    "Wait in food court queues",
  ];
  const after = [
    "Tap and pay, any machine, cashless",
    "Powerbank station around every corner",
    "Smart locker, digital key in your pocket",
    "Scan, pay, pick up in 30 seconds",
  ];
  return (
    <section className="bg-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <h2 className="text-center text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-[#1D1D1F]">
            Once you try it, no going back.
          </h2>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeUp>
            <div className="h-full rounded-[24px] bg-[#F5F5F7] p-8">
              <div className="text-[20px] font-bold text-[#1D1D1F]">Before</div>
              <ul className="mt-6 space-y-4">
                {before.map((b) => (
                  <li key={b} className="flex gap-3 text-[14px] text-[#6E6E73]">
                    <XIcon size={18} className="mt-0.5 shrink-0 text-gray-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="h-full rounded-[24px] border border-emerald-500/10 bg-emerald-50 p-8">
              <div className="text-[20px] font-bold text-emerald-500">After</div>
              <ul className="mt-6 space-y-4">
                {after.map((a) => (
                  <li key={a} className="flex gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Wallet() {
  const tx = [
    { name: "O-Mama Point", sub: "SF16020260518144513", date: "May 18, 2:49 PM", amount: "-৳36.00", icon: <LogOut size={16} className="text-emerald-500" /> },
    { name: "O-Mama Point", sub: "SF40820260517112028", date: "May 17, 11:36 AM", amount: "-৳40.00", icon: <LogOut size={16} className="text-emerald-500" /> },
    { name: "O-Mama Point", sub: "SF84120260514154403", date: "May 14, 3:56 PM", amount: "-৳40.00", icon: <LogOut size={16} className="text-emerald-500" /> },
    { name: "O-Mama Point", sub: "SF86520260513162432", date: "May 13, 4:26 PM", amount: "-৳40.00", icon: <LogOut size={16} className="text-emerald-500" /> },
    { name: "Admin Adjustment", sub: "b802f511", date: "May 11, 6:28 PM", amount: "+৳40.00", icon: <ShieldCheck size={16} className="text-emerald-500" /> },
  ];
  return (
    <section className="bg-[#F5F5F7] px-6 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <FadeUp>
            <Overline>BUILT-IN WALLET</Overline>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#1D1D1F]">
              Your money. Your way.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#6E6E73] md:text-[17px]">
              Top up instantly via bKash or SSL Commerz. Every taka tracked. Every transaction
              recorded. Your finances, always at your fingertips.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="mt-6 flex flex-wrap gap-3">
              {["bKash", "SSL Commerz"].map((p) => (
                <span
                  key={p}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-600"
                >
                  {p}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
        
        {/* Pixel Perfect Wallet UI Mockup */}
        <FadeUp delay={0.2}>
          <div className="mx-auto w-full max-w-[360px] rounded-[40px] border-[8px] border-white bg-white p-4 shadow-[0_20px_40px_rgb(0,0,0,0.06)]">
            <div className="flex h-full w-full flex-col bg-white">
              
              {/* Green Balance Card */}
              <div className="relative overflow-hidden rounded-[20px] bg-emerald-500 p-5 text-white shadow-lg">
                <div className="absolute -right-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-emerald-600/40" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-50">
                      Total Balance <Eye size={14} />
                    </div>
                    <div className="mt-1 text-[28px] font-bold">৳-21.00</div>
                  </div>
                  <button className="rounded-full border border-white/20 bg-white/20 px-5 py-2.5 text-[13px] font-semibold backdrop-blur-sm transition-colors hover:bg-white/30">
                    Top Up
                  </button>
                </div>
              </div>

              {/* Recent Activity List */}
              <div className="mt-8">
                <div className="mb-5 text-[18px] font-bold tracking-tight text-[#1D1D1F]">Recent Activity</div>
                <div className="space-y-4">
                  {tx.map((t, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-emerald-500">
                          {t.icon}
                        </div>
                        <div>
                          <div className="text-[14px] font-semibold text-[#1D1D1F]">{t.name}</div>
                          <div className="mt-0.5 text-[12px] text-gray-400">{t.sub}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[14px] font-bold ${t.amount.includes('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                          {t.amount}
                        </div>
                        <div className="mt-0.5 text-[11px] text-gray-400">{t.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full rounded-xl bg-gray-50 py-3 text-[14px] font-semibold text-emerald-500 transition-colors hover:bg-gray-100">
                  View All
                </button>
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
      <section id="download" className="relative overflow-hidden bg-black px-6 py-32 md:py-48">
        {/* Modern glowing background effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
        
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <FadeUp>
            <h2 className="mx-auto max-w-2xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] tracking-tight text-white">
              Start with Tolpar.<br />
              <span className="text-white/40">We'll take care of the rest.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 text-[18px] text-white/50 font-medium">Available on iOS and Android.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <a
                href="#"
                className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-[24px] bg-white px-8 py-4 text-[16px] font-bold text-black transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-[0_0_40px_rgb(255,255,255,0.3)]"
              >
                <Apple size={22} className="shrink-0" fill="currentColor" />
                App Store
              </a>
              <a
                href="#"
                className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-[24px] bg-[#1C1C1E] border border-white/10 px-8 py-4 text-[16px] font-bold text-white transition-all hover:scale-105 hover:bg-[#2C2C2E] hover:border-white/20 hover:shadow-[0_0_40px_rgb(255,255,255,0.1)]"
              >
                <Play size={20} className="shrink-0" fill="currentColor" />
                Google Play
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
