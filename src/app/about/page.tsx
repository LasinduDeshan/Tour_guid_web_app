"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Compass,
  Star,
  Heart,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Car,
  Hotel,
  Trees,
  MessageSquare,
  BadgeCheck
} from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";



const pillars = [
  {
    icon: Clock,
    title: "Unhurried, Flexible Pacing",
    desc: "We believe the best trips leave room to breathe. We design balanced itineraries that let you linger at sites, enjoy scenic drives, and travel at your own comfortable pace.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Compass,
    title: "Tailored to Your Style",
    desc: "Every traveler is unique. Whether you are traveling as a couple, family, or solo adventurer, we plan your route, stays, and activities around your exact preferences.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    icon: Car,
    title: "Smooth, Private Travel",
    desc: "Travel comfortably across the island in modern, air-conditioned vehicles with experienced, friendly local chauffeur-guides dedicated solely to your party.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    icon: Shield,
    title: "Transparent & Honest",
    desc: "Clear pricing with no hidden surprises. We itemize your accommodations, transport, and site admissions upfront so you can travel with complete peace of mind.",
    color: "bg-teal-50 text-teal-700 border-teal-100",
  },
];

const services = [
  {
    title: "Private Multi-Day Round Tours",
    desc: "5 to 12-day comprehensive island journeys connecting ancient kingdoms, misty tea highlands, wildlife safaris, and golden southern beaches.",
    badge: "5–12 Days",
    link: "/tours?category=Private%20Sri%20Lanka%20Tours"
  },
  {
    title: "Custom & Tailor-Made Itineraries",
    desc: "Bespoke itineraries designed from scratch around your specific dates, interests, preferred accommodation tiers, and pacing.",
    badge: "100% Bespoke",
    link: "/contact"
  },
  {
    title: "Day Tours & Excursions",
    desc: "Focused single-day private trips to Colombo highlights, Galle Fort, Sigiriya Lion Rock, or Kandy sacred shrines with private transport.",
    badge: "1 Day",
    link: "/tours?category=Day%20Tours%20%26%20Excursions"
  },
  {
    title: "Wildlife & Safari Expeditions",
    desc: "Dedicated 4x4 game drives in Yala, Minneriya, and Kaudulla to observe wild elephants, leopards, and birdlife with experienced park trackers.",
    badge: "Safaris",
    link: "/tours?category=Wildlife%20%26%20Safari"
  }
];

const teamHighlights = [
  {
    role: "Itinerary Specialists",
    title: "Personal Trip Planning",
    desc: "Our travel planners listen to your ideas, recommend realistic routes, and craft personalized day-by-day itineraries tailored to your style.",
    icon: Compass
  },
  {
    role: "Local Chauffeur-Guides",
    title: "Friendly Island Drivers",
    desc: "Courteous, knowledgeable local drivers with extensive island experience ensuring safe, smooth journeys and great local recommendations.",
    icon: Car
  },
  {
    role: "National Park Trackers",
    title: "Licensed Safari Guides",
    desc: "Experienced local park trackers in Yala and Minneriya who know the terrain and wildlife habits intimately for rewarding game drives.",
    icon: Trees
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-poppins">

      {/* 1. Hero Section */}
      <section className="relative pt-44 pb-36 px-6 overflow-hidden text-white min-h-[520px] flex flex-col justify-center">
        {/* Background Image */}
        <NextImage
          src="/about/hero-about.jpg"
          alt="Traditional fishing boat on Sri Lankan beach"
          fill
          priority
          className="object-cover object-[center_80%] z-0"
        />
        {/* Dark Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80 z-1" />

        <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-end text-right">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight"
          >
            Discover Sri Lanka,<br />
            <span className="text-[#9CBFA7]">Your Way.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-neutral-200 text-sm md:text-base max-w-xl ml-auto font-light leading-relaxed font-poppins"
          >
            Windmark Tours was created with a simple belief: the best journeys are the ones that leave room for you to truly enjoy them not rush through a rigid checklist.
          </motion.p>
        </div>

        {/* Photo Attribution Credit */}
        <div className="absolute bottom-3 left-6 z-10 text-[10px] text-white/50 font-light font-poppins">
          Photo by{" "}
          <a
            href="https://www.pexels.com/photo/traditional-fishing-boat-on-sri-lankan-beach-31887565/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80 transition-colors"
          >
            Sergey Polyakov on Pexels
          </a>
        </div>
      </section>

      {/* 2. Our Story & The Experience Behind Windmark */}
      <section className="container mx-auto max-w-5xl px-6 pt-28 md:pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-5"
        >
          <span className="text-5xl md:text-7xl font-semibold text-black font-poppins block mb-2">Who We Are</span>
          <h2 className="text-3xl md:text-4xl font-medium   leading-tight">
            Personal, Flexible Travel with Real Local Knowledge.
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed font-light ">
            With over 6 years of relevant experience planning custom itineraries and touring Sri Lanka, our team understands that travel is deeply personal. Rather than herding travelers into standardized bus tours, we focus exclusively on private, tailor-made journeys.
          </p>
          <p className="text-neutral-600 text-sm leading-relaxed font-light font-poppins">
            From the cool pine forests of Ella to the historic ramparts of Galle Fort, we connect you with authentic local experiences, reliable transport, and trusted accommodations tailored to your budget and interests.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            {[
              "Private air-conditioned vehicles with driver",
              "Handpicked boutique hotels & lodges",
              "Customizable daily schedule & pacing",
              "Clear, honest pricing with no surprises"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-700 font-poppins">
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <div className="bg-[#0E1B15] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-white/10">
            <div className="space-y-4 relative z-10">
              <span className="text-xs  font-bold text-[#9CBFA7] font-poppins">Our Promise</span>
              <h3 className="text-2xl font-bold font-montserrat leading-snug">
                Travel at your pace, with someone who knows the way.
              </h3>
              <p className="text-neutral-300 text-xs font-light leading-relaxed font-poppins">
                We handle the logistics—from route timing and airport pick-ups to pre-arranged site tickets and hotel bookings—so you can immerse yourself in Sri Lanka with complete peace of mind.
              </p>
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#9CBFA7] hover:bg-[#8bb096] text-neutral-900 font-bold text-xs px-6 py-3 rounded-full transition-all duration-200"
                >
                  Plan Your Journey <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. How We Travel (Our Approach) */}
      <section className="bg-neutral-50 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            
            <h2 className="text-5xl md:text-6xl font-bold font-montserrat text-neutral-900 mt-2">How We Travel</h2>
            <p className="text-neutral-500 text-xs md:text-sm max-w-xl mx-auto mt-2 font-light font-poppins">
              Four simple commitments that shape every itinerary we create.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-2xl p-6 border ${v.color.split(" ")[2]} shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${v.color.split(" ").slice(0, 2).join(" ")}`}>
                    <v.icon size={18} />
                  </div>
                  <h3 className="font-montserrat font-bold text-neutral-900 text-sm leading-snug">{v.title}</h3>
                  <p className="text-xs text-neutral-500 mt-2.5 leading-relaxed font-light font-poppins">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What We Offer */}
      <section className="container mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-emerald-700 font-poppins">Travel Services</span>
          <h2 className="text-3xl font-bold font-montserrat text-neutral-900 mt-2">What We Offer</h2>
          <p className="text-neutral-500 text-xs md:text-sm max-w-xl mx-auto mt-2 font-light font-poppins">
            Explore our core travel services across Sri Lanka, all tailored to your travel plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((serv, idx) => (
            <motion.div
              key={serv.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-neutral-50 hover:bg-white p-7 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-semibold px-3 py-1 bg-white text-neutral-700 border border-neutral-200/80 rounded-full font-poppins shadow-2xs">
                    {serv.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-montserrat text-neutral-900 mb-2 group-hover:text-black transition-colors">
                  {serv.title}
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed font-poppins">
                  {serv.desc}
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-neutral-200/60 flex justify-end">
                <Link
                  href={serv.link}
                  className="text-xs font-bold text-neutral-900 group-hover:text-black flex items-center gap-1 font-poppins transition-colors"
                >
                  Explore Route <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Meet the Team / Local Expertise */}
      <section className="bg-neutral-50 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-700 font-poppins">Our Network</span>
            <h2 className="text-3xl font-bold font-montserrat text-neutral-900 mt-2">Local Expertise on the Ground</h2>
            <p className="text-neutral-500 text-xs md:text-sm max-w-xl mx-auto mt-2 font-light font-poppins">
              Backed by experienced travel planners, courteous chauffeur-guides, and licensed park naturalists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamHighlights.map((member, idx) => (
              <motion.div
                key={member.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-neutral-200/60 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mb-4">
                    <member.icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-poppins block mb-1">
                    {member.role}
                  </span>
                  <h3 className="font-montserrat font-bold text-base text-neutral-900 mb-2">
                    {member.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed font-poppins">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact / Plan Your Trip CTA */}
      <section className="bg-[#0E1B15] py-20 px-6 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-montserrat text-white leading-tight"
          >
            Ready to Plan Your Sri Lanka Journey?
          </motion.h2>
          <p className="text-neutral-300 text-xs md:text-sm mt-4 mb-8 font-light font-poppins max-w-xl mx-auto">
            Tell us where you want to go, how many days you have, and your preferred travel style. We’ll craft a personalized itinerary for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-[#9CBFA7] text-neutral-900 hover:bg-[#8bb096] font-bold text-xs px-8 py-4 rounded-full transition-all duration-200 shadow-md hover:-translate-y-0.5 font-poppins"
            >
              Contact Our Travel Team <ArrowRight size={14} />
            </Link>
            <Link
              href="/tours"
              className="flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium text-xs px-8 py-4 rounded-full transition-all duration-200 font-poppins"
            >
              Browse Tour Packages
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
