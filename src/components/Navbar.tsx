import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("#top");

  const allLinks = [
    { href: "#top", label: "Overview" },
    ...links
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Scrolled state for navbar bg
        setScrolled(window.scrollY > 20);

        // Scroll spy logic
        const sectionIds = ["#top", "#features", "#how", "#faq"];
        let activeSection = "#top";
        const scrollPosition = window.scrollY + 250;
        let maxPassedTop = -1;

        for (const id of sectionIds) {
          const el = document.getElementById(id.replace("#", ""));
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= top && top > maxPassedTop) {
              maxPassedTop = top;
              activeSection = id;
            }
          }
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
          activeSection = "#faq";
        }

        setActiveTab(activeSection);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-6 z-50 px-6 md:px-10 flex justify-center transition-all duration-500">
      <div className={`flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100' : 'bg-transparent'}`}>
        
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2" onClick={() => setActiveTab("#top")}>
          <img src="/tolpar_logo.png" alt="Tolpar" className="h-11 md:h-12 w-auto object-contain" />
        </a>

        {/* Desktop Links - Center Pill */}
        <div className="hidden items-center rounded-full bg-gray-50/80 p-1 md:flex border border-gray-100">
          {allLinks.map((l) => {
            const isActive = activeTab === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setActiveTab(l.href)}
                className={`relative px-5 py-2 text-[13px] font-medium transition-colors ${
                  isActive ? "text-emerald-700" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-emerald-100/50"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-1 text-[13px] font-medium text-gray-600 cursor-pointer hover:text-gray-900">
            <Globe size={16} />
            <span>En</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex items-center ml-2">
            <a
              href="#download"
              className="rounded-full bg-emerald-500 px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
            >
              Download App
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Menu"
          className="ml-auto text-gray-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-6 right-6 top-[70px] mt-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-900"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
               <a
                href="#download"
                onClick={() => setOpen(false)}
                className="rounded-full bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-md"
               >
                Download App
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
