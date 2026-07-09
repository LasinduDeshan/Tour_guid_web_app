"use client";

import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Tour } from "@/lib/data";
import { motion } from "framer-motion";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslation } from "@/lib/LanguageContext";

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  const { formatPrice } = useCurrency();
  const { language } = useTranslation();

  const formatFromPrice = (usdPrice: number) => {
    const formatted = formatPrice(usdPrice);
    if (language === "zh") {
      return `${formatted} 起`;
    }
    const fromText = language === "fr" ? "Dès" : language === "de" ? "Ab" : language === "es" ? "Desde" : "From";
    return `${fromText} ${formatted}`;
  };
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative h-[220px] bg-neutral-200 overflow-hidden">
        {tour.image ? (
          <Image 
            src={tour.image} 
            alt={tour.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-black to-neutral-900 flex items-center justify-center relative">
            <span className="text-white/40 text-xs font-light font-poppins">No Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 z-20 border border-white/10 shadow-md">
          <span className="text-[0.65rem] font-bold font-poppins">{tour.category}</span>
        </div>
        <div className="absolute bottom-0 right-4 bg-white text-black px-4 py-2 rounded-t-xl font-bold text-sm shadow-md z-20 font-montserrat uppercase">
          {formatFromPrice(tour.price)}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium mb-3">
          <Clock size={14} />
          <span className="font-poppins">{tour.duration}</span>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2 font-montserrat tracking-tight leading-snug">{tour.title}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6 flex-1 line-clamp-2 font-light font-poppins">{tour.description}</p>
        <button className="mt-auto flex items-center gap-1.5 text-black font-semibold text-sm transition-all duration-200 group-hover:gap-2.5 font-poppins">
          Explore Details <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TourCard;
