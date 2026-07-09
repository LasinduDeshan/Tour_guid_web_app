"use client";

import { useState } from "react";
import { X, MessageCircle, Send, CheckCircle, Loader2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "94771234567"; // Replace with real number

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "WIDGET" }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
          setForm({ name: "", email: "", phone: "", message: "" });
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Buttons Stack */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-[9000]">

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20a%20tour%20to%20Sri%20Lanka!`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 flex items-center justify-center bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-500/40 outline-none"
        >
          {/* WhatsApp SVG */}
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.358.636 4.663 1.842 6.677L2.667 29.333l6.843-1.794A13.28 13.28 0 0016.003 29.333C23.37 29.333 29.333 23.364 29.333 16c0-7.364-5.963-13.333-13.33-13.333zm0 24.267a11.05 11.05 0 01-5.627-1.539l-.403-.24-4.065 1.065 1.085-3.956-.264-.407A10.965 10.965 0 015.002 16C5.002 9.925 9.927 5 16.003 5S27 9.925 27 16c0 6.075-4.924 10.933-10.997 10.934zM22.04 19.2c-.333-.167-1.968-.972-2.273-1.083-.303-.11-.524-.167-.744.167-.22.333-.854 1.083-1.047 1.306-.193.22-.387.25-.72.083-.333-.167-1.407-.519-2.68-1.655-.99-.884-1.658-1.974-1.853-2.307-.193-.333-.02-.513.147-.68.15-.149.333-.39.5-.585.167-.196.22-.333.333-.555.11-.22.056-.417-.028-.584-.083-.167-.744-1.793-.02-2.46-.743-1.793-.154-.224-.268-.336-.383-.336z"/>
          </svg>
        </a>

        {/* Inquire Button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Send an inquiry"
          className="w-14 h-14 flex items-center justify-center bg-[#0E1B15] hover:bg-[#1a2e22] text-white rounded-full shadow-lg shadow-black/25 transition-all duration-300 hover:scale-110 hover:shadow-xl outline-none"
        >
          <MessageCircle size={22} />
        </button>
      </div>

      {/* Inquiry Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9001]"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer / Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="fixed bottom-6 right-6 w-[360px] bg-white rounded-3xl shadow-2xl z-[9002] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#0E1B15] px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-white font-montserrat font-bold text-base">Quick Inquiry</p>
                  <p className="text-neutral-400 text-xs font-poppins mt-0.5">We'll reply within 2 hours</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-6 text-center"
                    >
                      <CheckCircle className="text-emerald-500 w-14 h-14" />
                      <p className="font-montserrat font-bold text-neutral-900">Message Sent!</p>
                      <p className="text-neutral-500 text-sm font-poppins">We'll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            className={`w-full text-sm px-4 py-2.5 rounded-xl border font-poppins outline-none transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white"}`}
                          />
                          {errors.name && <p className="text-red-500 text-[10px] mt-1 font-poppins">{errors.name}</p>}
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone (opt.)"
                            value={form.phone}
                            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                            className="w-full text-sm px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white font-poppins outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          className={`w-full text-sm px-4 py-2.5 rounded-xl border font-poppins outline-none transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white"}`}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-poppins">{errors.email}</p>}
                      </div>
                      <div>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your dream trip..."
                          value={form.message}
                          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                          className={`w-full text-sm px-4 py-2.5 rounded-xl border font-poppins outline-none transition-all resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white"}`}
                        />
                        {errors.message && <p className="text-red-500 text-[10px] mt-1 font-poppins">{errors.message}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0E1B15] hover:bg-[#1a2e22] text-white font-semibold text-sm py-3 rounded-xl font-poppins transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <><Loader2 size={15} className="animate-spin" /> Sending...</>
                        ) : (
                          <><Send size={15} /> Send Inquiry</>
                        )}
                      </button>

                      {/* WhatsApp alternative */}
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-[#25D366] font-poppins transition-colors py-1"
                      >
                        <Phone size={12} />
                        Prefer WhatsApp instead?
                      </a>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
