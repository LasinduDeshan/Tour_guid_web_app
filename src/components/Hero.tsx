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
  
  const videos = ["/hero-video.mp4", "/hero-video-2.mp4"];
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
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
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
          <p className="text-base md:text-m max-w-[750px] mx-auto mb-16 font-light opacity-90 drop-shadow-md">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex flex-col md:flex-row items-center bg-black/50 backdrop-blur-xl p-2 rounded-2xl md:rounded-full w-full max-w-[850px]  shadow-2xl gap-3 md:gap-0"
        >
          {/* Where To */}
          <div className="flex-1 flex items-center gap-4 py-3.5 px-6 bg-white/5 md:bg-transparent rounded-xl md:rounded-none w-full">
            <div className="text-white flex-shrink-0"><MapPin size={18} /></div>
            <div className="flex flex-col items-start w-full">
              <label className="text-xs font-medium text-white/70 mb-0.5">{t("hero.where_to")}</label>
              <input 
                type="text" 
                value={whereTo}
                onChange={(e) => setWhereTo(e.target.value)}
                placeholder={t("hero.where_placeholder")} 
                className="border-none bg-transparent outline-none text-sm w-full text-white placeholder-white/50 font-poppins" 
              />
            </div>
          </div>
          
          {/* When Selector (With Direct Calendar Popup) */}
          <div 
            ref={calendarRef}
            className="relative flex-1 flex items-center gap-4 py-3.5 px-6 bg-white/5 md:bg-transparent rounded-xl md:rounded-none w-full md:border-l md:border-white/20 cursor-pointer"
            onClick={() => setIsCalendarOpen(prev => !prev)}
          >
            <div className="text-white flex-shrink-0"><CalendarIcon size={18} /></div>
            <div className="flex flex-col items-start w-full text-left">
              <label className="text-xs font-medium text-white/70 mb-0.5 cursor-pointer">{t("hero.when")}</label>
              <div className="text-sm font-poppins text-white truncate w-full flex items-center justify-between">
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
                  className="absolute bottom-full mb-4 left-0 md:left-1/2 md:-translate-x-1/2 w-[320px] sm:w-[350px] bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800 rounded-3xl p-5 shadow-2xl z-50 text-white flex flex-col gap-4 text-left"
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

          <button type="submit" className="bg-white text-black hover:bg-white/90 rounded-xl md:rounded-full py-4 px-8 text-sm font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5 w-full md:w-auto flex items-center justify-center gap-2 flex-shrink-0 font-poppins">
            <Search size={16} />
            {t("hero.search_btn")}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Hero;
