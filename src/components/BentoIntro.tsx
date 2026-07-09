"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { 
  Award, 
  Compass, 
  Leaf, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Globe 
} from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

const BentoIntro = () => {
  const { t } = useTranslation();

  // Stagger animations container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dark transition shade from Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 via-black/5 to-transparent pointer-events-none z-10" />

      {/* Subtle background glowing decorative elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container mx-auto px-8 relative z-10 max-w-[1280px]">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-black leading-[1.05] tracking-tight mb-6 font-montserrat text-left"
          >
            {t("bento.title_part1")} <br />
            <span className="text-black font-semibold">{t("bento.title_part2")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[#717171] max-w-[850px] leading-relaxed text-left font-light"
          >
            {t("bento.subtitle")}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          
          {/* Card 1: Main Legacy Card */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 lg:row-span-2 bg-black text-white p-8 md:p-14  relative overflow-hidden border border-white/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] group"
          >
            <div>
              
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl leading-tight font-light mb-6 text-white font-montserrat">
                  {t("bento.legacy_title")}
                </h3>
                <p className="text-white/70 text-base md:text-sm leading-relaxed font-light">
                  {t("bento.legacy_desc")}
                </p>
              </div>

              <div className="flex flex-col gap-3.5 mb-10">
                <div className="flex items-center gap-3 text-white/85 text-sm md:text-base">
                  <ShieldCheck size={18} className="text-white flex-shrink-0" />
                  <span>{t("bento.legacy_bullet1")}</span>
                </div>
                <div className="flex items-center gap-3 text-white/85 text-sm md:text-base">
                  <Users size={18} className="text-white flex-shrink-0" />
                  <span>{t("bento.legacy_bullet2")}</span>
                </div>
                <div className="flex items-center gap-3 text-white/85 text-sm md:text-base">
                  <Globe size={18} className="text-white flex-shrink-0" />
                  <span>{t("bento.legacy_bullet3")}</span>
                </div>
              </div>
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-white font-semibold text-lg transition-all duration-300 group-hover:gap-3.5 mt-auto hover:text-white/80">
              {t("bento.legacy_cta")} <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Card 2: Highland Wanderlust (Tall Image) */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-1 lg:row-span-2 aspect-[3/4] lg:aspect-auto  relative overflow-hidden border border-neutral-100/50 flex flex-col justify-end transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-black/30 group"
          >
            <div className="absolute inset-0 z-0">
              <Image 
                src="/bento/highland-wanderlust.jpg" 
                alt="Highland Wanderlust Sri Lanka" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />
            <div className="relative p-8 z-20 text-white">
              <h4 className="text-xl md:text-2xl font-semibold mb-2 flex items-center justify-between font-montserrat">
                <span>{t("bento.highland_title")}</span> 
                <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white" />
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-light">{t("bento.highland_desc")}</p>
            </div>
          </motion.div>

          {/* Card 3: Pristine Coasts (Landscape Image) */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-1 lg:row-span-1 aspect-[4/3] lg:aspect-auto  relative overflow-hidden border border-neutral-100/50 flex flex-col justify-end transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-black/30 group"
          >
            <div className="absolute inset-0 z-0">
              <Image 
                src="/bento/mirissa-beach.png" 
                alt="Mirissa tropical beach Sri Lanka" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />
            <div className="relative p-8 z-20 text-white">
              <h4 className="text-xl md:text-2xl font-semibold mb-2 flex items-center justify-between font-montserrat">
                <span>{t("bento.coasts_title")}</span> 
                <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white" />
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-light">{t("bento.coasts_desc")}</p>
            </div>
          </motion.div>

          {/* Card 4: Stat Card - 50+ Years */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-1 lg:row-span-1 p-8 rounded-2xl relative overflow-hidden bg-white  flex flex-col justify-center items-center text-center transition-all duration-500 "
          >
            
            <div className="text-4xl md:text-5xl font-bold mb-2 font-montserrat bg-clip-text text-black ">{t("bento.years_num")}</div>
            <h4 className="text-base md:text-lg font-semibold text-neutral-800 mb-1 font-montserrat">{t("bento.years_title")}</h4>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">{t("bento.years_desc")}</p>
          </motion.div>

          {/* Card 5: Yala Safari Wildlife (Wide Image) */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 lg:row-span-1 aspect-[2/1] lg:aspect-auto  relative overflow-hidden border border-neutral-100/50 flex flex-col justify-end transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-black/30 group"
          >
            <div className="absolute inset-0 z-0">
              <Image 
                src="/bento/sigiriya.png" 
                alt="Sigiriya Rock Fortress" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />
            <div className="relative p-8 z-20 text-white">
              <h4 className="text-xl md:text-2xl font-semibold mb-2 flex items-center justify-between font-montserrat">
                <span>{t("bento.heritage_title")}</span> 
                <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white" />
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-light">{t("bento.heritage_desc")}</p>
            </div>
          </motion.div>

          {/* Card 6: Stat Card - 100% Bespoke */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-1 lg:row-span-1 p-8 rounded-2xl relative overflow-hidden bg-white  flex flex-col justify-center items-center text-center transition-all duration-500 "
          >
            
            <div className="text-4xl md:text-5xl font-bold mb-2 font-montserrat bg-clip-text text-black ">{t("bento.bespoke_num")}</div>
            <h4 className="text-base md:text-lg font-semibold text-neutral-800 mb-1 font-montserrat">{t("bento.bespoke_title")}</h4>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light font-poppins">{t("bento.bespoke_desc")}</p>
          </motion.div>

          {/* Card 7: Stat Card - Eco-Conscious */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-1 lg:row-span-1 p-8 rounded-2xl relative overflow-hidden bg-white  flex flex-col justify-center items-center text-center transition-all duration-500 "
          >
            
            <div className="text-4xl md:text-5xl font-bold mb-2 font-montserrat bg-clip-text text-black ">{t("bento.carbon_num")}</div>
            <h4 className="text-base md:text-lg font-semibold text-neutral-800 mb-1 font-montserrat">{t("bento.carbon_title")}</h4>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">{t("bento.carbon_desc")}</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BentoIntro;
