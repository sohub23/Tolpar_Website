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
  MessageSquare
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
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
        subject: "General Inquiry",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
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
              className="mt-4 text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight text-slate-900 leading-tight"
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

          {/* Asymmetric Dual Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 lg:gap-16 items-start mt-12">
            
            {/* Left Column: Direct Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-[20px] font-extrabold text-slate-900 tracking-tight mb-2">Contact Details</h3>
              
              {/* Address card */}
              <div className="group flex items-start gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-emerald-500/15 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <MapPin size={22} />
                </div>
                <div className="text-left">
                  <h4 className="text-[15px] font-extrabold text-slate-800 tracking-tight">Our Address</h4>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500 font-medium">
                    Flat #C2, House #29, Kaderabad, Katasur, Mohammadpur, Dhaka-1207
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="group flex items-start gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-emerald-500/15 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-[15px] font-extrabold text-slate-800 tracking-tight">Hotline Phone</h4>
                  <p className="mt-1 text-[13.5px] text-slate-500 font-semibold">
                    +88 09678-007007
                  </p>
                </div>
              </div>

              {/* Email card */}
              <div className="group flex items-start gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-emerald-500/15 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-[15px] font-extrabold text-slate-800 tracking-tight">Email Support</h4>
                  <p className="mt-1 text-[13.5px] text-slate-500 font-semibold">
                    hello@sohub.com.bd
                  </p>
                </div>
              </div>

              {/* Map Illustration / Visual cue */}
              <div className="mt-4 p-1.5 bg-slate-50 border border-slate-100 rounded-[28px] overflow-hidden relative shadow-inner aspect-[4/2.2] flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20"
                  >
                    📍
                  </motion.div>
                  <span className="text-[9px] font-bold text-slate-500 mt-2 uppercase tracking-wider">Dhaka, Bangladesh</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="relative p-8 md:p-10 bg-white border border-slate-100 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              
              <h3 className="text-[20px] font-extrabold text-slate-900 tracking-tight mb-6 text-left">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <User size={12} className="text-slate-400" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-[14px] font-medium text-slate-800 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-[14px] font-medium text-slate-800 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone field */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-400" /> Phone Number (Optional)
                    </label>
                    <input 
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-[14px] font-medium text-slate-800 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                      placeholder="e.g. +88017..."
                    />
                  </div>

                  {/* Subject field */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Building size={12} className="text-slate-400" /> Subject
                    </label>
                    <select 
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-[14px] font-medium text-slate-850 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Machine Placement</option>
                      <option>Technical Support</option>
                      <option>Partnership Proposal</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                    <MessageSquare size={12} className="text-slate-400" /> Message
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-[14px] font-medium text-slate-800 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 resize-none"
                    placeholder="How can we help you?"
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

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl bg-slate-950 py-4 text-[14px] font-bold text-white transition-all duration-300 hover:bg-slate-850 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer select-none"
                >
                  {loading ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
