import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface Initiative {
  id: string;
  name: string;
  description: string;
  logo: string;
  href: string | null;
  order: number;
  isActive: boolean;
}

const BASE_URL = "https://sohub.com.bd";
const CURRENT_SITE_ID = "tolpar";

const DesktopOurInitiatives = ({ initiatives }: { initiatives: Initiative[] }) => {
  return (
    <section id="initiatives" className="py-20 bg-[#f8f9fa] relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10 px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight text-[#1D1D1F]">
            Explore Our Initiatives
          </h2>
          <p className="mt-4 text-[#86868B] text-lg font-medium">
            Each initiative solves a real problem.
          </p>
        </div>

        {/* Grid — 4 columns */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {initiatives.map((item) => {
            const isCurrent = item.id === CURRENT_SITE_ID;

            const CardContent = (
              <>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={`${BASE_URL}${item.logo}`}
                    alt={item.name}
                    className="w-12 h-12 object-contain flex-shrink-0"
                  />
                  <span className="text-[16px] font-medium text-[#3c4043] truncate">
                    {item.name}
                  </span>
                </div>
                {item.href && !isCurrent && (
                  <ExternalLink className="w-5 h-5 text-[#9aa0a6] flex-shrink-0 group-hover:text-[#5f6368] transition-colors" />
                )}
              </>
            );

            return (
              <div key={item.id}>
                {isCurrent ? (
                  <a
                    href="/"
                    className="group flex items-center gap-4 bg-white border border-[#e8eaed] rounded-2xl px-6 py-5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-emerald-500/30 transition-all duration-200 cursor-pointer h-full"
                  >
                    {CardContent}
                  </a>
                ) : item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-white border border-[#e8eaed] rounded-2xl px-6 py-5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-emerald-500/30 transition-all duration-200 cursor-pointer h-full"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 bg-white border border-[#e8eaed] rounded-2xl px-6 py-5 h-full">
                    {CardContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MobileOurInitiatives = ({ initiatives }: { initiatives: Initiative[] }) => {
  return (
    <section id="initiatives" className="py-10 bg-[#f8f9fa]">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore Our Initiatives
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Each initiative solves a real problem.
          </p>
        </div>

        {/* Grid — 2 columns */}
        <div className="grid grid-cols-2 gap-2">
          {initiatives.map((item) => {
            const isCurrent = item.id === CURRENT_SITE_ID;

            const CardContent = (
              <div className="flex items-center justify-between w-full px-3.5 py-3 min-h-[68px]">
                <img
                  src={`${BASE_URL}${item.logo}`}
                  alt={item.name}
                  className="h-7 max-w-[85px] object-contain flex-shrink-0"
                />
                <span className="sr-only">{item.name}</span>
                {item.href && !isCurrent && (
                  <ExternalLink className="w-4 h-4 text-[#9aa0a6] flex-shrink-0 ml-2" />
                )}
              </div>
            );

            return isCurrent ? (
              <a
                key={item.id}
                href="/"
                className="block bg-white border border-[#e8eaed] rounded-2xl active:bg-gray-50 transition-colors"
              >
                {CardContent}
              </a>
            ) : item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-[#e8eaed] rounded-2xl active:bg-gray-50 transition-colors"
              >
                {CardContent}
              </a>
            ) : (
              <div
                key={item.id}
                className="block bg-white border border-[#e8eaed] rounded-2xl"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const OurInitiatives = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    fetch("https://sohub.com.bd/api/initiatives.json")
      .then((res) => res.json())
      .then((data) => {
        const active = (data.initiatives || [])
          .filter((i: Initiative) => i.isActive)
          .sort((a: Initiative, b: Initiative) => a.order - b.order);
        setInitiatives(active);
      })
      .catch(() => {});
  }, []);

  if (initiatives.length === 0) return null;

  if (isMobile) {
    return <MobileOurInitiatives initiatives={initiatives} />;
  }

  return <DesktopOurInitiatives initiatives={initiatives} />;
};
