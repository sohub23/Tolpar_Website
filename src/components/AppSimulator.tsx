import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Sparkles, ChevronRight, CheckCircle2, ScanLine, Smartphone } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

type Flow = "NONE" | "OMAMA" | "VENDING" | "POWERBANK" | "LOCKER";
type Screen = "HOME" | "SELECT_MACHINE" | "POWERBANK_DETAILS" | "LOCKER_DETAILS" | "SCANNING" | "OMAMA_SUCCESS" | "VENDING_SUCCESS" | "POWERBANK_SUCCESS" | "LOCKER_SUCCESS";

export function AppSimulator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("HOME");
  const [flow, setFlow] = useState<Flow>("NONE");
  const [showBalance, setShowBalance] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    assetPath("/banner1.jpg"),
    assetPath("/banner2.jpg"),
    assetPath("/banner3.jpg"),
    assetPath("/banner4.jpg"),
    assetPath("/banner5.jpg"),
    assetPath("/banner6.jpg"),
    assetPath("/banner7.jpg"),
    assetPath("/banner8.jpg"),
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentScreen === "SCANNING") {
      timeout = setTimeout(() => {
        if (flow === "OMAMA") setCurrentScreen("OMAMA_SUCCESS");
        else if (flow === "VENDING") setCurrentScreen("VENDING_SUCCESS");
        else if (flow === "POWERBANK") setCurrentScreen("POWERBANK_SUCCESS");
        else if (flow === "LOCKER") setCurrentScreen("LOCKER_SUCCESS");
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [currentScreen, flow]);

  useEffect(() => {
    let bannerInterval: NodeJS.Timeout;
    if (currentScreen === "HOME") {
      bannerInterval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 2000);
    }
    return () => clearInterval(bannerInterval);
  }, [currentScreen, banners.length]);

  const goHome = () => {
    setCurrentScreen("HOME");
    setFlow("NONE");
    setShowBalance(false);
  };

  const startFlow = (f: Flow, screen: Screen) => {
    setFlow(f);
    setCurrentScreen(screen);
  };

  const getScreenImage = () => {
    switch(currentScreen) {
      case "HOME": return assetPath("/sim_home.png");
      case "SELECT_MACHINE": return assetPath("/sim_select_machine.png");
      case "POWERBANK_DETAILS": return assetPath("/sim_powerbank_details.png");
      case "LOCKER_DETAILS": return assetPath("/sim_locker_details.png");
      case "OMAMA_SUCCESS": return assetPath("/sim_omama_success.png");
      case "VENDING_SUCCESS": return assetPath("/sim_vending_success.png");
      case "POWERBANK_SUCCESS": return assetPath("/sim_powerbank_success.png");
      case "LOCKER_SUCCESS": return assetPath("/sim_locker_success.png");
      default: return "";
    }
  };

  const getStepInfo = () => {
    switch (currentScreen) {
      case "HOME": return { step: 1, title: "Choose a Service", desc: "Select O-Mama, Vending, Powerbank, or Locker from the Smart Machines grid.", icon: Smartphone };
      case "SELECT_MACHINE": return { step: 2, title: "Locate & Scan", desc: "Find the nearest machine on the map and tap 'Scan QR Code'.", icon: ScanLine };
      case "POWERBANK_DETAILS": return { step: 2, title: "Powerbank Service", desc: "Locate a powerbank station. Tap 'Scan QR Code' to rent one.", icon: ScanLine };
      case "LOCKER_DETAILS": return { step: 2, title: "Locker Service", desc: "Locate a smart locker. Tap 'Scan QR Code' to use it.", icon: ScanLine };
      case "SCANNING": return { step: 3, title: "Scanning QR", desc: "Automatically scanning the machine's QR code securely...", icon: QrCode };
      case "OMAMA_SUCCESS": return { step: 4, title: "Success!", desc: "O-Mama menu unlocked! Tap the home bar to restart.", icon: CheckCircle2 };
      case "VENDING_SUCCESS": return { step: 4, title: "Success!", desc: "Vending machine unlocked! Tap the home bar to restart.", icon: CheckCircle2 };
      case "POWERBANK_SUCCESS": return { step: 4, title: "Success!", desc: "Powerbank dispensed! Tap the home bar to restart.", icon: CheckCircle2 };
      case "LOCKER_SUCCESS": return { step: 4, title: "Success!", desc: "Locker unlocked! Tap the home bar to restart.", icon: CheckCircle2 };
    }
  };

  const info = getStepInfo();
  const Icon = info.icon;

  return (
    <section id="simulator" className="relative bg-slate-50 px-6 py-12 md:py-32 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#FB8A09]/10 blur-[80px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Interactive Experience
          </span>
          <h2 className="mt-4 text-[clamp(32px,5vw,48px)] font-bold tracking-tight text-[#1D1D1F]">
            Experience Tolpar Live
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] text-gray-500 font-medium md:text-lg">
            Tap on the mobile simulator below to browse through our various smart services just like the real app.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">
          
          {/* Modern Instruction Panel */}
          <div className="w-full max-w-md lg:max-w-none lg:w-[400px] flex flex-col gap-5 md:gap-6">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/80 p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full -z-10" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <Icon size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                    Step {info.step} of 4
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
                    {info.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <p className="text-[14px] md:text-[15px] leading-relaxed text-slate-600 font-medium">
                  {info.desc}
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="mt-8 flex items-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div 
                      className={`h-full ${info.step >= step ? 'bg-emerald-500' : 'bg-transparent'}`}
                      initial={{ width: 0 }}
                      animate={{ width: info.step >= step ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={goHome} 
              className="flex items-center justify-between w-full p-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-2xl transition-all shadow-sm cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                  <ChevronRight size={16} />
                </div>
                Restart Simulation
              </div>
              <Sparkles size={16} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
            </button>
          </div>

          {/* Ultra-Realistic Phone Frame (Matching O-MAMA Mockup) */}
          <div className="relative w-[250px] md:w-[260px] rounded-[44px] bg-slate-950 border-[8px] border-neutral-900 shadow-[0_20px_45px_-8px_rgba(0,0,0,0.35),0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 overflow-visible aspect-[9/19.5]">
             
             {/* Side Buttons (iPhone realism) */}
             <div className="hidden md:block absolute top-20 -left-[10px] w-[2px] h-6 bg-neutral-800 rounded-r pointer-events-none" />
             <div className="hidden md:block absolute top-32 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r pointer-events-none" />
             <div className="hidden md:block absolute top-44 -left-[10px] w-[2px] h-9 bg-neutral-800 rounded-r pointer-events-none" />
             <div className="hidden md:block absolute top-32 -right-[10px] w-[2px] h-12 bg-neutral-800 rounded-l pointer-events-none" />

             {/* Screen Container */}
             <div 
               className="relative w-full h-full bg-white rounded-[36px] overflow-hidden"
               style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
             >
                <AnimatePresence mode="wait">
                  {currentScreen === "SCANNING" ? (
                    <motion.div 
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black flex flex-col items-center justify-center"
                    >
                      {/* Scanning Animation */}
                      <div className="w-40 h-40 border-2 border-emerald-500/50 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <QrCode size={70} className="text-emerald-500/30" />
                        <motion.div 
                          className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]"
                          animate={{ top: ["5%", "95%", "5%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                      </div>
                      <div className="mt-6 text-emerald-400 font-bold tracking-[0.2em] text-xs animate-pulse">
                        SCANNING QR...
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0 flex flex-col"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <img src={getScreenImage()} alt={currentScreen} className="absolute inset-0 w-full h-full object-cover object-top rounded-[36px]" draggable={false} />
                      
                      {/* Hotspots */}
                      {currentScreen === "HOME" && (
                        <>
                          {/* Banner Slider Overlay */}
                          <div className="absolute top-[16%] left-[4%] w-[92%] h-[23%] rounded-[16px] overflow-hidden z-10 pointer-events-none">
                            <AnimatePresence initial={false}>
                              <motion.img
                                key={currentBanner}
                                src={banners[currentBanner]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </AnimatePresence>
                          </div>

                          {/* Services Grid Hotspots */}
                          <div 
                            onClick={() => startFlow("OMAMA", "SELECT_MACHINE")}
                            className="absolute top-[45%] left-[4%] w-[22%] h-[12%] cursor-pointer"
                          />
                          <div 
                            onClick={() => startFlow("VENDING", "SELECT_MACHINE")}
                            className="absolute top-[45%] left-[26%] w-[22%] h-[12%] cursor-pointer"
                          />
                          <div 
                            onClick={() => startFlow("POWERBANK", "POWERBANK_DETAILS")}
                            className="absolute top-[45%] left-[49%] w-[22%] h-[12%] cursor-pointer"
                          />
                          <div 
                            onClick={() => startFlow("LOCKER", "LOCKER_DETAILS")}
                            className="absolute top-[45%] left-[73%] w-[22%] h-[12%] cursor-pointer"
                          />

                          {/* Balance Toggle Hotspot & Overlay */}
                          {/* Eye Slash Icon Hotspot */}
                          <div 
                            onClick={() => setShowBalance(!showBalance)}
                            className="absolute top-[61%] left-[26%] w-[12%] h-[5%] cursor-pointer z-20"
                          />
                          

                          {/* Asterisks Area Hotspot */}
                          <div 
                            onClick={() => setShowBalance(!showBalance)}
                            className="absolute top-[65%] left-[5%] w-[35%] h-[8%] cursor-pointer z-20"
                          />

                          {/* Balance Overlay */}
                          <AnimatePresence>
                            {showBalance && (
                              <motion.div 
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                className="absolute top-[65.2%] left-[6%] w-[38%] h-[5.5%] bg-[#0ba558] flex items-center pointer-events-none z-10"
                                style={{
                                  background: "linear-gradient(90deg, #0ba558 0%, #0fb05e 100%)",
                                  boxShadow: "0 0 5px 2px #0ba558"
                                }}
                              >
                                <span className="text-white font-semibold tracking-normal flex items-center gap-1.5 ml-1">
                                  <span className="text-[20px]">৳</span>
                                  <span className="text-[15px] mt-0.5">1250.00</span>
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}

                      {(currentScreen === "SELECT_MACHINE" || currentScreen === "POWERBANK_DETAILS" || currentScreen === "LOCKER_DETAILS") && (
                        <>
                          {/* Scan QR Code button hotspot */}
                          <div 
                            onClick={() => setCurrentScreen("SCANNING")}
                            className="absolute bottom-[20%] left-[5%] w-[90%] h-[15%] cursor-pointer"
                          />
                          <div 
                            onClick={() => setCurrentScreen("SCANNING")}
                            className="absolute bottom-[10%] left-[5%] w-[90%] h-[10%] cursor-pointer"
                          />
                        </>
                      )}
                      
                      {((currentScreen as Screen) !== "HOME" && (currentScreen as Screen) !== "SCANNING") && (
                        <>
                          {/* Back Button hotspot */}
                          <div 
                            onClick={goHome}
                            className="absolute top-[5%] left-[2%] w-[20%] h-[8%] cursor-pointer rounded-full"
                          />
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Simulated Home Bar */}
                <div 
                  onClick={goHome}
                  className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-white/80 rounded-full cursor-pointer z-50 hover:bg-white transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                />
             </div>
             
             {/* Dynamic Island (Matching O-MAMA exactly) */}
             <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[52px] h-3.5 bg-black rounded-full z-50 flex items-center justify-end px-1.5 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.15)] pointer-events-none">
               <div className="w-1 h-1 rounded-full bg-emerald-950/80 mr-0.5 flex items-center justify-center">
                 <div className="w-0.5 h-0.5 rounded-full bg-emerald-400" />
               </div>
               <div className="w-0.5 h-0.5 rounded-full bg-blue-900/60" />
             </div>

             {/* Premium Screen Glow */}
             <div className="absolute -inset-[1px] rounded-[36px] border border-white/10 pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
