import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { Link, useLocation } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import sohubLogo from "@/assets/sohub-logo.png";
import solutionHubLogo from "@/assets/ace41ae7-2ae1-4476-85cf-1d1637a02cb0.png";

interface Initiative {
  id: string;
  name: string;
  description: string;
  href: string | null;
  logo: string;
  order: number;
  isActive: boolean;
}

const links = [
  { href: "/#features", anchor: "features", label: "Features" },
  { href: "/#how", anchor: "how", label: "How It Works" },
  { href: "/#faq", anchor: "faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("#top");
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const allLinks = [
    { href: isHomePage ? "#top" : "/#top", anchor: "top", label: "Overview" },
    ...links.map(l => ({ ...l, href: isHomePage ? `#${l.anchor}` : l.href }))
  ];

  // Fetch initiatives from SOHUB API
  useEffect(() => {
    fetch("https://sohub.com.bd/api/initiatives.json", {
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.initiatives || [];
        const active = list
          .filter((i: Initiative) => i.isActive)
          .sort((a: Initiative, b: Initiative) => a.order - b.order);
        setInitiatives(active);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setActiveTab("");
      return;
    }

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
  }, [isHomePage]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      {/* ─── Top Bar: SOHUB Branding + Initiatives ─── */}
      <div
        className={`bg-[#f8f9fa] border-b border-gray-100 overflow-hidden transition-all duration-300 md:transition-none md:duration-0 ${
          scrolled ? "max-h-0 opacity-0 border-none" : "max-h-20 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-1">
          <div className="flex items-center justify-between">
            {/* SOHUB branding link */}
            <a
              href="https://sohub.com.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <img
                src={solutionHubLogo}
                alt="Solution Hub"
                className="h-6"
              />
              <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                <span className="hidden md:inline">Solution Hub Technologies (SOHUB) Owned & Operated</span>
                <span className="md:hidden">SOHUB owned & operated</span>
              </p>
            </a>

            {/* Initiatives dropdown */}
            <DropdownMenu modal={false} onOpenChange={setInitiativesOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-xs hover:bg-transparent hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-500 gap-1 flex items-center h-8 transition-colors cursor-pointer"
                >
                  <span className="hidden md:inline">Our Initiatives</span>
                  <span className="md:hidden text-[10px] font-medium">Our Initiatives</span>
                  {initiativesOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[320px] p-3 z-[200] bg-white border border-gray-150 shadow-lg rounded-2xl">
                <div className="grid grid-cols-3 gap-3">
                  {initiatives.map((initiative) => {
                    const logoUrl = initiative.logo.startsWith("http")
                      ? initiative.logo
                      : `https://sohub.com.bd${initiative.logo}`;
                    return initiative.href ? (
                      <a
                        key={initiative.id}
                        href={initiative.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseDown={(e) => e.preventDefault()}
                        style={{
                          WebkitTapHighlightColor: "transparent",
                          outline: "none",
                        }}
                        className="flex items-center justify-center p-3 rounded-xl border border-gray-200 hover:border-emerald-500/40 transition-colors h-[60px]"
                      >
                        <img
                          src={logoUrl}
                          alt={initiative.name}
                          className="w-full h-full object-contain"
                        />
                      </a>
                    ) : (
                      <div
                        key={initiative.id}
                        className="flex items-center justify-center p-3 rounded-xl border border-gray-200 opacity-50 cursor-not-allowed h-[60px]"
                      >
                        <img
                          src={logoUrl}
                          alt={initiative.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Floating Navbar */}
      <nav className={`w-full flex justify-center transition-all duration-300 px-6 md:px-10 relative ${scrolled ? "mt-3" : "mt-6"}`}>
        <div className={`flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100' : 'bg-transparent'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => isHomePage && setActiveTab("#top")}>
            <img src={assetPath("/tolpar_logo.png")} alt="Tolpar" className="h-11 md:h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Links - Center Pill */}
          <div className="hidden items-center rounded-full bg-gray-50/80 p-1 md:flex border border-gray-100">
            {allLinks.map((l) => {
              const isActive = isHomePage && activeTab === `#${l.anchor}`;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => isHomePage && setActiveTab(`#${l.anchor}`)}
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
            <Link
              to="/contact"
              className={`relative px-5 py-2 text-[13px] font-medium transition-colors ${
                location.pathname === "/contact" ? "text-emerald-700" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {location.pathname === "/contact" && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-emerald-100/50"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">Contact</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center ml-2">
              <a
                href={isHomePage ? "#download" : "/#download"}
                className="rounded-full bg-emerald-500 px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
              >
                Download App
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Menu"
            className="ml-auto text-gray-900 md:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute left-6 right-6 top-full mt-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl backdrop-blur-2xl md:hidden">
            <div className="flex flex-col gap-4">
              {allLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-900"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${location.pathname === '/contact' ? 'text-emerald-600' : 'text-gray-900'}`}
              >
                Contact
              </Link>
              <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
                <a
                  href={isHomePage ? "#download" : "/#download"}
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
    </div>
  );
}
