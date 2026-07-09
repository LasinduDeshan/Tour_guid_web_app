"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/LanguageContext";

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  order?: number;
}

const staticFallbackFaqs: FAQItem[] = [
  {
    question: "Best time to visit Sri Lanka?",
    answer: "The best time to visit Sri Lanka depends on the coast you want to explore. For the south and west coasts (including Galle, Mirissa, and Colombo), the dry season runs from December to April. For the east coast and ancient cultural triangle (including Trincomalee, Pasikudah, and Sigiriya), the dry season is from May to September."
  },
  {
    question: "Is it Safe to Travel to Sri Lanka?",
    answer: "Yes, Sri Lanka is generally exceptionally safe for international travelers. Sri Lankans are world-renowned for their hospitality, warmth, and friendliness. Standard travel precautions apply: secure your belongings, use certified tour operators, and respect local cultural customs, especially when visiting sacred Buddhist and Hindu temples."
  },
  {
    question: "Do I need a visa to Sri Lanka?",
    answer: "Most foreign nationals require an Electronic Travel Authorization (ETA) or online tourist visa to enter Sri Lanka. You can easily apply for this online before your flight. It typically grants a 30-day stay with double-entry privileges, which can be extended at the Department of Immigration in Colombo if needed."
  },
  {
    question: "What to pack when you are visiting Sri Lanka?",
    answer: "We recommend lightweight, breathable cotton or linen clothing suitable for tropical weather. Modest clothing covering shoulders and knees is mandatory for sacred temple visits. If you plan to travel to the highlands (like Nuwara Eliya or Ella), bring a light jacket or sweater as temperatures drop. Sun protection and bug spray are also essential."
  },
  {
    question: "What currency is used in Sri Lanka, and are credit cards widely accepted?",
    answer: "The official currency is the Sri Lankan Rupee (LKR). Major credit and debit cards (Visa/Mastercard) are widely accepted in high-end hotels, boutiques, and restaurants in urban areas. However, carrying cash is highly recommended for small markets, local street food vendors, transport, and tipping."
  },
  {
    question: "Why should I use a travel agency to plan my trip to Sri Lanka?",
    answer: "Using a dedicated, licensed agency ensures a completely seamless, premium experience. We manage private, highly comfortable air-conditioned transport, handpicked 5-star or boutique hotel bookings, pre-purchased skip-the-line monument entries, and private expert naturalists, saving you extensive planning time."
  }
];

interface FAQSectionProps {
  initialFAQs?: FAQItem[];
}

const FAQSection = ({ initialFAQs }: FAQSectionProps) => {
  const { language, t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  
  // Use server-provided FAQs on initial load, falling back to static 6 questions if empty
  const defaultList = initialFAQs && initialFAQs.length > 0 ? initialFAQs : staticFallbackFaqs;
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultList);
  const [loading, setLoading] = useState(false);

  // Synchronize with active language changes client-side using translation API
  useEffect(() => {
    // If English, we can directly reset to the default English list to avoid network request
    if (language === "en") {
      setFaqs(defaultList);
      return;
    }

    let active = true;
    setLoading(true);

    fetch(`/api/faqs?lang=${language}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        return res.json();
      })
      .then((data) => {
        if (active) {
          if (Array.isArray(data) && data.length > 0) {
            setFaqs(data);
          } else {
            setFaqs(defaultList);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading translated FAQs:", err);
        if (active) {
          setFaqs(defaultList);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [language, initialFAQs]);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1280px]">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900 font-montserrat tracking-tight leading-tight">
            {t("faq.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Interactive Feature Card */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-[4/5] bg-neutral-900 overflow-hidden shadow-2xl group rounded-[2rem]">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <NextImage 
                  src="/bento/tobias-tullius-IiE50WMRa7I-unsplash.jpg" 
                  alt="Beautiful beach in Sri Lanka" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  priority
                />
              </div>

              {/* Readability Overlays */}
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/25 to-transparent z-10" />
              <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

              {/* Card Content */}
              <div className="relative z-20 p-8 h-full flex flex-col justify-end items-center text-center">
                
                {/* View All FAQ Pill Button */}
                <Link 
                  href="/tours" 
                  className="mb-4 flex items-center gap-3.5 group/btn"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg transition-transform duration-500 group-hover:rotate-[360deg] group-hover/btn:scale-105">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] font-bold text-white uppercase font-poppins transition-colors duration-300 group-hover/btn:text-neutral-200">
                    {t("faq.view_all")}
                  </span>
                </Link>

              </div>
            </div>
          </div>

          {/* Right Column: Sleek Editorial Accordion FAQ List */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-30 flex items-center justify-center transition-all duration-200">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <div className="divide-y divide-neutral-200/80">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={faq.id || idx} className="py-5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between text-left gap-4 py-2 group"
                    >
                      <span className="text-base md:text-lg font-medium text-neutral-900 group-hover:text-black transition-colors font-montserrat tracking-tight leading-snug">
                        {faq.question}
                      </span>
                      <span className={`w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 group-hover:bg-neutral-100 group-hover:text-black transition-all duration-300 transform ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown size={18} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-2 pr-10 text-neutral-500 font-light text-sm md:text-base leading-relaxed font-poppins whitespace-pre-line">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
