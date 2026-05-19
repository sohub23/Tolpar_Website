import { motion } from "framer-motion";
import { ReactNode } from "react";
import { PhoneMockup } from "./PhoneMockup";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function FeatureStory({
  number,
  category,
  headline,
  body,
  pills,
  reversed = false,
  orbClass,
  accent,
  phoneInner,
}: {
  number: string;
  category: string;
  headline: string;
  body: string;
  pills: string[];
  reversed?: boolean;
  orbClass: string;
  accent: string;
  phoneInner: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B] py-24 md:py-40">
      <div
        className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full ${orbClass}`}
        style={{
          filter: "blur(100px)",
          top: reversed ? "20%" : "10%",
          [reversed ? "left" : "right"]: "-10%",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div
          className={`flex flex-col items-center gap-16 ${
            reversed ? "md:flex-row-reverse" : "md:flex-row"
          } md:gap-20`}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="flex-1"
          >
            <div className="text-6xl font-black text-white/5 md:text-8xl">{number}</div>
            <div
              className="mt-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {category}
            </div>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              {headline}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/40">{body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {pills.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: reversed ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex-1 flex justify-center"
          >
            <PhoneMockup
              className="h-[600px] w-[290px] md:h-[650px] md:w-[320px]"
              glow={`${accent}33`}
            >
              {phoneInner}
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
