import { ReactNode } from "react";

export function PhoneMockup({
  children,
  className = "",
  glow = "rgba(251,138,9,0.18)",
  innerClassName = "",
}: {
  children?: ReactNode;
  className?: string;
  glow?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`relative mx-auto rounded-[48px] bg-gradient-to-b from-neutral-800 to-neutral-950 border-2 border-white/10 p-3 ${className}`}
      style={{ boxShadow: `0 0 120px ${glow}, 0 0 40px ${glow}` }}
    >
      <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-black/80" />
      <div
        className={`relative h-full w-full overflow-hidden rounded-[38px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
