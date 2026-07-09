"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2, MessageSquare, Globe, Heart, Share2, AtSign
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Our Office",
    value: "45 Galle Road, Colombo 03, Sri Lanka",
    sub: "Head Office",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+94 77 123 4567",
    sub: "Mon–Sat, 9am–7pm",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@ceyoratours.com",
    sub: "We reply within 2 hours",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat: 9am – 7pm",
    sub: "Sunday by appointment",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Please tell us about your trip";
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
        body: JSON.stringify({ ...form, source: "CONTACT_FORM" }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-poppins">

        {/* Hero */}
        <section className="relative bg-[#0E1B15] pt-36 pb-24 px-6 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase font-poppins mb-4"
            >
              Get In Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-montserrat text-white tracking-tight leading-tight"
            >
              Let's Plan Your<br />
              <span className="text-emerald-400">Sri Lanka Journey</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-neutral-400 text-base max-w-xl mx-auto font-light leading-relaxed"
            >
              Whether you have a specific itinerary in mind or just a dream destination, our travel specialists are here to craft your perfect experience.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="container mx-auto max-w-5xl px-6 -mt-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-lg border border-neutral-100 flex flex-col gap-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-semibold text-neutral-900 mt-0.5 leading-snug">{item.value}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Content — Form + Map */}
        <section className="container mx-auto max-w-5xl px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-montserrat text-neutral-900">Send us a message</h2>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                Fill in the form and a travel specialist will reach out within 2 business hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 flex flex-col items-center text-center gap-4"
                >
                  <CheckCircle className="text-emerald-500 w-16 h-16" />
                  <h3 className="font-montserrat font-bold text-xl text-neutral-900">Message Received!</h3>
                  <p className="text-neutral-500 text-sm max-w-xs">
                    Thank you for reaching out. One of our travel specialists will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm text-emerald-600 font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className={`w-full text-sm px-4 py-3 rounded-xl border outline-none transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white"}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className={`w-full text-sm px-4 py-3 rounded-xl border outline-none transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white outline-none transition-all text-neutral-700"
                    >
                      <option value="">Select a topic…</option>
                      <option>Custom Tour Package</option>
                      <option>Group Travel</option>
                      <option>Honeymoon Package</option>
                      <option>Wildlife & Safari</option>
                      <option>Cultural Heritage Tour</option>
                      <option>Pricing & Availability</option>
                      <option>Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us your dream itinerary, travel dates, number of guests…"
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className={`w-full text-sm px-4 py-3 rounded-xl border outline-none transition-all resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-neutral-200 bg-neutral-50 focus:border-neutral-900 focus:bg-white"}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0E1B15] hover:bg-[#1a2e22] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/15 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — Map + Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-md h-[340px] bg-neutral-100 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58570999548!2d79.77642065!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ceyora Tours Office Location"
              />
            </div>

            {/* Social Links */}
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
              <h3 className="font-montserrat font-bold text-neutral-900 text-sm mb-4">Follow Our Journey</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Heart, label: "@ceyoratours.lk", handle: "Instagram", color: "text-pink-500" },
                  { icon: Share2, label: "Ceyora Tours Sri Lanka", handle: "Facebook", color: "text-blue-600" },
                  { icon: AtSign, label: "@ceyoratours", handle: "Twitter / X", color: "text-sky-500" },
                  { icon: Globe, label: "www.ceyoratours.com", handle: "Website", color: "text-emerald-600" },
                ].map(s => (
                  <div key={s.handle} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center ${s.color}`}>
                      <s.icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">{s.label}</p>
                      <p className="text-[10px] text-neutral-400">{s.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/94771234567?text=Hi%2C%20I%27m%20interested%20in%20a%20Sri%20Lanka%20tour!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-2xl px-6 py-4 transition-all duration-200 shadow-md shadow-green-500/20 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="font-bold text-sm font-montserrat">Chat on WhatsApp</p>
                <p className="text-xs text-white/80 font-poppins">Instant response from our team</p>
              </div>
              <span className="ml-auto text-white/60 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </section>
      </main>
  );
}

