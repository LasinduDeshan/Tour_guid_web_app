"use client";

import { Search, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";

import { useState } from "react";

const Hero = () => {
  const { t } = useTranslation();
  
  const videos = ["/hero-video.mp4", "/hero-video-2.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="h-screen w-full relative flex items-end text-white overflow-hidden pb-12 md:pb-16">
      <video 
        key={videos[currentVideoIndex]}
        autoPlay 
        muted 
        onEnded={handleVideoEnd}
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/80 z-10"></div>
      
      <div className="container mx-auto px-8 relative z-20 w-full flex flex-col items-center text-center max-w-[1280px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h1 className="text-5xl md:text-5xl font-light mb-6 drop-shadow-xl font-montserrat tracking-tight leading-tight">
            {t("hero.title_part1")} <br />
            <span className="font-purgatory text-7xl md:text-5xl text-white inline-block py-2 leading-none">{t("hero.title_part2")}</span>
          </h1>
          <p className="text-base md:text-lg max-w-[750px] mx-auto mb-16 font-light opacity-90 drop-shadow-md">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center bg-white p-2 rounded-[2rem] md:rounded-full w-full max-w-[850px] border border-black/5 shadow-2xl gap-3 md:gap-0"
        >
          <div className="flex-1 flex items-center gap-4 py-3.5 px-6 bg-neutral-50 md:bg-transparent rounded-2xl md:rounded-none w-full">
            <div className="text-black flex-shrink-0"><MapPin size={18} /></div>
            <div className="flex flex-col items-start w-full">
              <label className="text-[0.65rem] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">{t("hero.where_to")}</label>
              <input type="text" placeholder={t("hero.where_placeholder")} className="border-none bg-transparent outline-none text-sm w-full text-neutral-800 placeholder-neutral-400 font-poppins" />
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-4 py-3.5 px-6 bg-neutral-50 md:bg-transparent rounded-2xl md:rounded-none w-full md:border-l md:border-black/10">
            <div className="text-black flex-shrink-0"><Calendar size={18} /></div>
            <div className="flex flex-col items-start w-full">
              <label className="text-[0.65rem] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">{t("hero.when")}</label>
              <input type="text" placeholder={t("hero.when_placeholder")} className="border-none bg-transparent outline-none text-sm w-full text-neutral-800 placeholder-neutral-400 font-poppins" />
            </div>
          </div>

          <button className="bg-black text-white hover:bg-neutral-800 rounded-2xl md:rounded-full py-4 px-8 text-sm font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5 w-full md:w-auto flex items-center justify-center gap-2 flex-shrink-0 font-poppins">
            <Search size={16} />
            {t("hero.search_btn")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
