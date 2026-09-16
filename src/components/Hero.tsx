"use client";

import { Search, MapPin, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [whereTo, setWhereTo] = useState("");
  const [when, setWhen] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());

  const calendarRef = useRef<HTMLDivElement>(null);
  
  const HERO_VIDEOS = [
    {
      src: "/hero-video.mp4",
      title: "Nine Arches Bridge",
      creditUrl: "https://www.pexels.com/video/drone-view-of-demodara-nine-arches-bridge-34100511/",
    },
    {
      src: "/hero-video-2.mp4",
      title: "Sigiriya Rock",
      creditUrl: "https://www.pexels.com/video/stunning-aerial-view-of-sigiriya-rock-sri-lanka-34100385/",
    },
    {
      src: "/hero-video-3.mp4",
      title: "Mirissa Coastline",
      creditUrl: "https://www.pexels.com/video/breathtaking-aerial-view-of-mirissa-coastline-32504536/",
    },
    {
      src: "/hero-video-4.mp4",
      title: "Ruwanweli Maha Seya",
      creditUrl: "https://www.pexels.com/video/drone-footage-of-the-ruwanweli-maha-seya-10638148/",
    },
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Close calendar popup on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (whereTo.trim()) params.set("search", whereTo.trim());
    if (when.trim()) params.set("when", when.trim());
    const query = params.toString();
    router.push(`/tours${query ? `?${query}` : ""}`);
  };

  // Calendar days computation for exact date picker
  const currentYear = activeDate.getFullYear();
  const currentMonth = activeDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const monthName = activeDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => {
    setActiveDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setActiveDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const selectExactDate = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    const formatted = selected.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setWhen(formatted);
    setIsCalendarOpen(false);
  };

  return (
    <section className="min-h-[100dvh] md:h-screen w-full relative flex flex-col justify-end text-white overflow-hidden pb-14 sm:pb-16 md:pb-16 pt-24 sm:pt-28 md:pt-0">
      <video 
        key={HERO_VIDEOS[currentVideoIndex].src}
        autoPlay 
        muted 
        onEnded={handleVideoEnd}
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={HERO_VIDEOS[currentVideoIndex].src} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-black/40 to-black/85 z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-8 relative z-20 w-full flex flex-col items-center text-center max-w-[1280px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-5 drop-shadow-xl font-montserrat tracking-tight leading-tight">
            {t("hero.title_part1")} <br />
            <span className="font-purgatory text-5xl sm:text-6xl md:text-5xl text-white inline-block py-1 sm:py-2 leading-none">{t("hero.title_part2")}</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base max-w-[750px] mx-auto mb-6 sm:mb-8 md:mb-14 font-light opacity-90 drop-shadow-md px-2">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex flex-col md:flex-row items-center bg-black/60 md:bg-black/50 backdrop-blur-xl p-1.5 sm:p-2 rounded-2xl md:rounded-full w-full max-w-[850px] shadow-2xl gap-2 sm:gap-2.5 md:gap-0 border border-white/10 md:border-transparent"
        >
          {/* Where To */}
          <div className="flex-1 flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3.5 px-4 sm:px-6 bg-white/5 md:bg-transparent rounded-xl md:rounded-none w-full">
            <div className="text-white flex-shrink-0"><MapPin size={18} /></div>
            <div className="flex flex-col items-start w-full">
              <label className="text-[11px] sm:text-xs font-medium text-white/70 mb-0.5">{t("hero.where_to")}</label>
              <input 
                type="text" 
                value={whereTo}
                onChange={(e) => setWhereTo(e.target.value)}
                placeholder={t("hero.where_placeholder")} 
                className="border-none bg-transparent outline-none text-xs sm:text-sm w-full text-white placeholder-white/50 font-poppins" 
              />
            </div>
          </div>
          
          {/* When Selector (With Direct Calendar Popup) */}
          <div 
            ref={calendarRef}
            className="relative flex-1 flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3.5 px-4 sm:px-6 bg-white/5 md:bg-transparent rounded-xl md:rounded-none w-full md:border-l md:border-white/20 cursor-pointer"
            onClick={() => setIsCalendarOpen(prev => !prev)}
          >
            <div className="text-white flex-shrink-0"><CalendarIcon size={18} /></div>
            <div className="flex flex-col items-start w-full text-left">
              <label className="text-[11px] sm:text-xs font-medium text-white/70 mb-0.5 cursor-pointer">{t("hero.when")}</label>
              <div className="text-xs sm:text-sm font-poppins text-white truncate w-full flex items-center justify-between">
                <span className={when ? "text-white font-medium" : "text-white/50"}>
                  {when || t("hero.when_placeholder")}
                </span>
                {when && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setWhen("");
                    }}
                    className="text-white/60 hover:text-white p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Direct Calendar Modal */}
            <AnimatePresence>
              {isCalendarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-full mb-4 left-0 md:left-1/2 md:-translate-x-1/2 w-[300px] sm:w-[350px] bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800 rounded-3xl p-4 sm:p-5 shadow-2xl z-50 text-white flex flex-col gap-4 text-left"
                >
                  {/* Calendar Header with Navigation & Close */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="font-semibold text-sm font-montserrat text-white">{monthName}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                        aria-label="Next Month"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(false)}
                        className="p-1.5 ml-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Close"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 text-center text-[11px] font-medium text-neutral-500">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-2" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const checkDate = new Date(currentYear, currentMonth, day).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                      const isSelected = when === checkDate;
                      return (
                        <button
                          key={`day-${day}`}
                          type="button"
                          onClick={() => selectExactDate(day)}
                          className={`w-8 h-8 mx-auto flex items-center justify-center rounded-xl transition-all ${
                            isSelected
                              ? "bg-white text-black font-bold shadow-md"
                              : "text-neutral-300 hover:bg-white hover:text-black hover:font-bold"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setWhen("Flexible / Anytime");
                        setIsCalendarOpen(false);
                      }}
                      className="text-neutral-300 hover:text-white hover:underline flex items-center gap-1 transition-colors"
                    >
                       Flexible Dates
                    </button>
                    {when && (
                      <button
                        type="button"
                        onClick={() => setWhen("")}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button type="submit" className="bg-white text-black hover:bg-white/90 rounded-xl md:rounded-full py-3 sm:py-4 px-6 sm:px-8 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5 w-full md:w-auto flex items-center justify-center gap-2 flex-shrink-0 font-poppins">
            <Search size={16} />
            {t("hero.search_btn")}
          </button>
        </motion.form>
      </div>

      {/* Video Credit */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-8 z-20 flex items-center bg-black/50 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10 text-[10px] sm:text-[11px] text-white/85 font-poppins shadow-md">
        <p className="truncate max-w-[220px] sm:max-w-none">
          video by{" "}
          <a
            href={HERO_VIDEOS[currentVideoIndex].creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium underline underline-offset-2 hover:text-amber-300 transition-colors"
          >
            {HERO_VIDEOS[currentVideoIndex].title} on Pexels
          </a>
        </p>
      </div>
    </section>
  );
};

export default Hero;
