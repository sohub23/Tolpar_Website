import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  AlertCircle,
  Building,
  User,
  MessageSquare,
  Clock,
  Navigation,
  X
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/routes/index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SOHUB - Tolpar | Get in Touch" },
      {
        name: "description",
        content: "Have questions about the Tolpar smart ecosystem or need tech support? Contact Solution Hub Technologies (SOHUB) today.",
      },
    ],
  }),
  component: ContactPage,
});

const ease = [0.25, 0.1, 0.25, 1] as const;

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleConnectClick = () => {
    // Trigger SOHUB connect widget
    if (!document.getElementById("sohub-connect-widget")) {
      const script = document.createElement("script");
      script.id = "sohub-connect-widget";
      script.src = "https://connect-client.sohub.com.bd/widget-loader?id=widget_69c8dfb1d33cb_1774772145";
      script.async = true;
      document.body.appendChild(script);
    }
    
    // Direct call as requested
    window.location.href = "tel:+8809678007007";
    
    setShowQRModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    // Simulate polished API submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-10 md:pt-40 md:pb-24 px-6 relative overflow-hidden bg-slate-50/30">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-block rounded-full border border-emerald-500/15 bg-emerald-500/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-600"
            >
              Get In Touch
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mt-4 text-[clamp(34px,5vw,52px)] font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Let's connect.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="mt-4 text-[15px] leading-relaxed text-slate-500 md:text-[17px] font-semibold"
            >
              Have a question about Tolpar smart machines or want to explore partnerships? Reach out to the SOHUB team below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 lg:gap-16 items-start mt-8 md:mt-12">
            
            {/* Left Column: Direct Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <h3 className="text-[22px] md:text-[28px] font-extrabold text-slate-900 tracking-tight mb-4 md:mb-6">Contact Information</h3>
              
              {/* Email Us */}
              <div className="flex items-start gap-4 p-2 md:p-3 bg-transparent">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-emerald-500">
                  <Mail size={22} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left mt-1">
                  <h4 className="text-[16px] font-bold text-slate-800">Email Us</h4>
                  <p className="text-[15px] text-slate-500 font-medium">
                    hello@sohub.com.bd
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4 p-2 md:p-3 bg-transparent">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-emerald-500">
                  <Phone size={22} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left mt-1 w-full">
                  <h4 className="text-[16px] font-bold text-slate-800">Call Us</h4>
                  
                  {/* QR Code trigger box */}
                  <div 
                    onClick={() => setShowQRModal(true)}
                    className="mt-3 flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-[20px] shadow-sm cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all w-max pr-6"
                  >
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-[100px] h-[100px] shrink-0">
                       <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://connect-client.sohub.com.bd/" alt="QR Code" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[12px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                        Call with<br/>Hotscan<br/>or<br/>Click to connect
                      </span>
                      <span className="text-[11px] font-medium text-slate-300 mt-1">Tap to enlarge</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Us */}
              <div className="flex items-start gap-4 p-2 md:p-3 bg-transparent mt-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-emerald-500">
                  <MapPin size={22} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left mt-1">
                  <h4 className="text-[16px] font-bold text-slate-800">Visit Us</h4>
                  <p className="text-[15px] leading-relaxed text-slate-500 font-medium">
                    29 Katasur Rd, Mohammadpur, Dhaka 1207
                  </p>
                  <a href="https://maps.google.com/?q=29+Katasur+Rd,+Mohammadpur,+Dhaka+1207" target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors">
                    <Navigation size={14} className="rotate-45" /> Get Directions
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-2 md:p-3 bg-transparent">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-emerald-500">
                  <Clock size={22} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left mt-1">
                  <h4 className="text-[16px] font-bold text-slate-800">Working Hours</h4>
                  <p className="text-[15px] text-slate-500 font-medium">
                    Sun – Thu: 10:00 AM – 6:30 PM
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="relative p-7 md:p-10 bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[28px] md:rounded-[36px] overflow-hidden"
            >
              <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl pointer-events-none" />
              
              <h3 className="text-[20px] md:text-[24px] font-extrabold text-slate-900 tracking-tight mb-6 md:mb-8 text-left">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {/* Name field */}
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <User size={14} className="text-emerald-500/70" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-[16px] border border-slate-200/80 bg-white/50 backdrop-blur-sm px-5 py-4 text-[15px] font-medium text-slate-900 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/80"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Mail size={14} className="text-emerald-500/70" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-[16px] border border-slate-200/80 bg-white/50 backdrop-blur-sm px-5 py-4 text-[15px] font-medium text-slate-900 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/80"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {/* Phone field */}
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Phone size={14} className="text-emerald-500/70" /> Phone Number <span className="lowercase text-[10px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 text-slate-400 font-semibold">Optional</span>
                    </label>
                    <input 
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-[16px] border border-slate-200/80 bg-white/50 backdrop-blur-sm px-5 py-4 text-[15px] font-medium text-slate-900 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/80"
                      placeholder="e.g. +88017..."
                    />
                  </div>

                  {/* Subject field */}
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Building size={14} className="text-emerald-500/70" /> Subject
                    </label>
                    <input 
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-[16px] border border-slate-200/80 bg-white/50 backdrop-blur-sm px-5 py-4 text-[15px] font-medium text-slate-900 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/80"
                      placeholder="e.g. Partnership Proposal"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-emerald-500/70" /> Your Message
                  </label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-[16px] border border-slate-200/80 bg-white/50 backdrop-blur-sm px-5 py-4 text-[15px] font-medium text-slate-900 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/80 resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                {/* Status Alerts */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold"
                    >
                      <AlertCircle size={14} /> Please fill out all required fields.
                    </motion.div>
                  )}
                  
                  {success && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-xs font-semibold"
                    >
                      <Check size={14} strokeWidth={3} /> Thank you! Your message was submitted successfully.
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-[16px] bg-slate-950 py-4.5 text-[15px] font-bold text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.5)] active:scale-[0.98] flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer select-none group"
                >
                  {loading ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
      
      {/* QR Code Connect Modal */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowQRModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowQRModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={16} />
              </button>

              <h3 className="text-[18px] font-extrabold text-slate-900 leading-tight mt-2 px-4">
                Call With Hotscan or Click To Connect
              </h3>
              <p className="text-[14px] font-medium text-slate-500 mt-2 mb-6">
                Point your phone camera at this QR code
              </p>

              <div className="w-56 h-56 bg-slate-50 rounded-[24px] p-4 flex items-center justify-center border border-slate-100">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://connect-client.sohub.com.bd/" alt="QR Code" className="w-full h-full object-contain" />
              </div>

              <p className="text-[13px] font-semibold text-slate-500 mt-6 mb-6">
                Solution Hub Technologies (SOHUB)
              </p>

              <div className="w-full flex items-center gap-4 mb-6">
                <div className="h-px bg-slate-200 flex-grow" />
                <span className="text-[12px] font-extrabold text-emerald-500 uppercase">OR</span>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>

              <button 
                onClick={handleConnectClick}
                className="w-full rounded-[16px] bg-emerald-500 py-4.5 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-600 hover:shadow-[0_12px_24px_rgba(16,185,129,0.4)] transition-all active:scale-[0.98]"
              >
                Click To Connect
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
