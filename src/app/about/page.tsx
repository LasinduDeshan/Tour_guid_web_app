"use client";

import { motion } from "framer-motion";
import {
  Shield, Leaf, Star, Heart, Users, Globe2, Award, TrendingUp, ArrowRight, CheckCircle2
} from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "12+", label: "Years of Experience", icon: TrendingUp },
  { value: "4,800+", label: "Tours Completed", icon: Award },
  { value: "38", label: "Countries Served", icon: Globe2 },
  { value: "99%", label: "Client Satisfaction", icon: Star },
];

const team = [
  {
    name: "Amara Silva",
    role: "Founder & Lead Guide",
    bio: "Born and raised in Kandy, Amara has spent 15 years crafting journeys that blend cultural depth with luxury comfort.",
    emoji: "👤",
    badge: "Expert Naturalist",
  },
  {
    name: "Dilshan Perera",
    role: "Wildlife & Safari Specialist",
    bio: "A former park ranger with 10 years in Yala National Park. Dilshan knows every leopard trail and elephant migration route.",
    emoji: "👤",
    badge: "Certified Ranger",
  },
  {
    name: "Nirosha Fernando",
    role: "Luxury Travel Curator",
    bio: "Nirosha specialises in high-end bespoke itineraries — private beach dinners, pool villa stays, and Ayurvedic retreats.",
    emoji: "👤",
    badge: "Luxury Certified",
  },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every tour is risk-assessed, guides are certified, and vehicles are insured to international standards.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We partner only with eco-certified resorts and offset our carbon footprint on every trip.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: Heart,
    title: "Authenticity",
    desc: "We go beyond tourist traps — village home-stays, local family dinners, and off-map trails.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Star,
    title: "Excellence",
    desc: "Premium vehicles, 5-star accommodation partnerships, and 24/7 on-trip concierge support.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

const timeline = [
  { year: "2012", title: "Founded in Colombo", desc: "Started as a two-person operation offering cultural day trips around the Cultural Triangle." },
  { year: "2015", title: "Wildlife Division Launched", desc: "Expanded into wildlife safaris with dedicated rangers and custom-built 4×4 safari jeeps." },
  { year: "2018", title: "International Recognition", desc: "Named 'Best Boutique Tour Operator in Sri Lanka' by the Asian Tourism Awards." },
  { year: "2021", title: "Luxury Portfolio Added", desc: "Launched a bespoke luxury line featuring private villa stays and personalised itineraries." },
  { year: "2024", title: "Digital Transformation", desc: "Launched the Ceyora Tours platform — making it seamless to discover, plan and book your ideal Sri Lanka journey." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-poppins">

        {/* Hero */}
        <section className="relative bg-[#0E1B15] pt-36 pb-28 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)"
            }}
          />
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-widest uppercase font-poppins mb-4"
            >
              <Users size={12} /> Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-montserrat text-white tracking-tight leading-tight"
            >
              Crafting Unforgettable<br />
              <span className="text-emerald-400">Sri Lanka Experiences</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-neutral-400 text-base max-w-2xl mx-auto font-light leading-relaxed"
            >
              Since 2012, Ceyora Tours has been the trusted companion for travellers seeking authentic, sustainable and deeply personal journeys across the wonder of Sri Lanka.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto max-w-5xl px-6 -mt-10 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                  <s.icon size={18} className="text-neutral-600" />
                </div>
                <p className="text-3xl font-bold font-montserrat text-neutral-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-neutral-500 mt-2 leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto max-w-5xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 font-poppins">Our Mission</span>
            <h2 className="text-3xl font-bold font-montserrat text-neutral-900 mt-3 mb-5 leading-tight">
              More than a tour.<br />A transformation.
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              We believe travel should be more than ticking off landmarks. Our carefully designed journeys immerse you in the real Sri Lanka — its people, traditions, flavours and landscapes — in a way that stays with you long after you return home.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Every itinerary is crafted by a local specialist who knows every hidden beach, every sacred temple, and every family-run spice farm worth visiting.
            </p>
            <div className="flex flex-col gap-2.5">
              {["Certified local guides with 10+ years experience", "24/7 on-trip support and emergency assistance", "Fully flexible itineraries — change plans any time", "Transparent pricing with no hidden charges"].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-neutral-700">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute left-[26px] top-2 bottom-2 w-[2px] bg-neutral-200 rounded-full" />
            <div className="flex flex-col gap-6">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-5 pl-2"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0E1B15] text-white flex items-center justify-center text-[10px] font-bold font-poppins flex-shrink-0 relative z-10 shadow-md">
                    {item.year.slice(2)}
                  </div>
                  <div className="pt-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-neutral-400 font-bold tracking-widest">{item.year}</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 font-montserrat">{item.title}</p>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="bg-neutral-50 py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 font-poppins">What We Stand For</span>
              <h2 className="text-3xl font-bold font-montserrat text-neutral-900 mt-3">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white rounded-2xl p-6 border ${v.color.split(" ")[2]} shadow-sm flex flex-col gap-4`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.color.split(" ").slice(0, 2).join(" ")}`}>
                    <v.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-neutral-900 text-sm">{v.title}</h3>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto max-w-5xl px-6 py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 font-poppins">The People Behind the Magic</span>
            <h2 className="text-3xl font-bold font-montserrat text-neutral-900 mt-3">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar area */}
                <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-full bg-[#0E1B15] flex items-center justify-center text-3xl shadow-lg">
                    {member.emoji}
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-bold bg-white border border-neutral-200 text-neutral-700 px-2.5 py-1 rounded-full">
                    {member.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat font-bold text-neutral-900">{member.name}</h3>
                  <p className="text-xs text-emerald-600 font-semibold mt-0.5">{member.role}</p>
                  <p className="text-xs text-neutral-500 mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0E1B15] py-20 px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-montserrat text-white"
            >
              Ready to Start Your<br />Sri Lanka Adventure?
            </motion.h2>
            <p className="text-neutral-400 text-sm mt-4 mb-8 font-light">
              Talk to one of our travel specialists today and get a free personalised itinerary.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-white text-[#0E1B15] hover:bg-neutral-100 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:-translate-y-0.5"
              >
                Contact Us <ArrowRight size={16} />
              </Link>
              <Link
                href="/packages"
                className="flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-200"
              >
                Browse Tour Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
