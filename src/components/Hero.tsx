import { motion } from "framer-motion";
import { ChevronDown, Utensils, ShoppingBag, BatteryCharging, Lock } from "lucide-react";
import { GradientOrbs } from "./GradientOrbs";
import { PhoneMockup } from "./PhoneMockup";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] px-6 pb-20 pt-32 text-center md:pt-40"
    >
      <GradientOrbs />
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="rounded-full border border-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/30"
        >
          Introducing Tolpar
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          The future of
          <br />
          everyday{" "}
          <span className="bg-gradient-to-r from-[#FB8A09] to-[#F59E0B] bg-clip-text text-transparent">
            machines.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/40 md:text-xl"
        >
          One app to scan, pay, and interact with every smart machine around you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#download"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Download App
          </a>
          <a
            href="#story"
            className="rounded-full border border-white/10 bg-white/10 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/15"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
          className="mt-16"
        >
          <PhoneMockup className="h-[580px] w-[280px] md:h-[650px] md:w-[320px]">
            <HeroPhoneScreen />
          </PhoneMockup>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12"
        >
          <ChevronDown className="animate-bounce text-white/20" size={28} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPhoneScreen() {
  const services = [
    { Icon: Utensils, label: "O-Mama", color: "#FB8A09" },
    { Icon: ShoppingBag, label: "Vending", color: "#60A5FA" },
    { Icon: BatteryCharging, label: "Powerbank", color: "#34D399" },
    { Icon: Lock, label: "Locker", color: "#A78BFA" },
  ];
  return (
    <div className="flex h-full w-full flex-col p-6 pt-12">
      <div className="text-[10px] uppercase tracking-widest text-white/40">Welcome back</div>
      <div className="mt-1 text-xl font-semibold text-white">Hi, Rafiq</div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#FB8A09]/30 to-[#FB8A09]/5 p-5">
        <div className="text-[10px] uppercase tracking-widest text-white/50">Wallet Balance</div>
        <div className="mt-2 text-4xl font-bold text-white">৳ 1,250</div>
        <div className="mt-1 text-xs text-white/40">Tap to top up</div>
      </div>
      <div className="mt-6 text-[10px] uppercase tracking-widest text-white/40">Services</div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {services.map(({ Icon, label, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
              style={{ background: `${color}22` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div className="text-[9px] text-white/40">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto space-y-2">
        <div className="h-10 rounded-xl border border-white/5 bg-white/5" />
        <div className="h-10 rounded-xl border border-white/5 bg-white/5" />
      </div>
    </div>
  );
}
