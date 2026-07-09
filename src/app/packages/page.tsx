"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import TourCategories from "@/components/TourCategories";
import TourCard from "@/components/TourCard";
import { Tour } from "@/lib/data";
import { Map, MapControls } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Flower, 
  Sparkles, 
  MapPin, 
  Compass, 
  ArrowRight, 
  Search, 
  X, 
  Route, 
  Trees, 
  Waves, 
  Palmtree, 
  Binoculars, 
  Flame,
  Loader2,
  Check,
  Users,
  Calendar,
  User,
  MessageSquare,
  Hotel,
  Car,
  Ticket,
  Utensils,
  Wifi,
  Mail
} from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";
import { useCurrency } from "@/lib/CurrencyContext";

export default function PackagesPage() {
  const { t, language } = useTranslation();
  const { formatPrice } = useCurrency();

  const formatFromPrice = (usdPrice: number) => {
    const formatted = formatPrice(usdPrice);
    if (language === "zh") {
      return `${formatted} 起`;
    }
    const fromText = language === "fr" ? "Dès" : language === "de" ? "Ab" : language === "es" ? "Desde" : "From";
    return `${fromText} ${formatted}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

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

  const overviewPackages = [
    {
      name: "Day Tours",
      duration: "1 Day",
      category: "Short Escapes",
      priceValue: 85,
      description: "Single-day private custom excursions to top cultural landmarks, tropical beaches, or historic cities, designed for travelers wanting focused and swift local experiences.",
      link: "/tours?category=Colombo%20Tours",
      color: "bg-[#0A0A0C]",
      icon: "Compass"
    },
    {
      name: "Round Tours",
      duration: "5 - 12 Days",
      category: "Multi-Day Loops",
      priceValue: 1250,
      description: "All-inclusive multi-day loops charting the comprehensive cultural triangle, misty central highlands, and southern tropical coasts in one seamless private journey.",
      link: "/tours",
      color: "bg-[#0A0A0C]",
      icon: "Route"
    },
    {
      name: "Wildlife Safaris",
      duration: "3 - 7 Days",
      category: "Untamed Nature",
      priceValue: 650,
      description: "Thrilling 4x4 guided game drives and marine cruises tracking leopards inside dry-zone Yala forest, colossal wild elephant herds, and blue whales.",
      link: "/tours?category=Wildlife%20Tours",
      color: "bg-[#0A0A0C]",
      icon: "Trees"
    },
    {
      name: "Wellness & Yoga",
      duration: "4 - 8 Days",
      category: "Mind & Body",
      priceValue: 850,
      description: "Restorative Ayurvedic healing escapes featuring holistic steam baths, traditional herbal oil therapies, and guided sunrise yoga in private pool canopy villas.",
      link: "/tours?category=Ayurvedic%20Tours",
      color: "bg-[#0A0A0C]",
      icon: "Flower"
    }
  ];

  const getOverviewIcon = (iconName: string) => {
    const props = { className: "w-7 h-7 text-[#2E503B] mb-2.5 opacity-80" };
    switch (iconName) {
      case "Compass": return <Compass {...props} />;
      case "Route": return <Route {...props} />;
      case "Trees": return <Trees {...props} />;
      case "Flower": return <Flower {...props} />;
      default: return <Compass {...props} />;
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoadingTours(true);
        const res = await fetch(`/api/tours?lang=${language}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setTours(data);
        }
      } catch (err) {
        console.error("Failed to load tour packages:", err);
      } finally {
        setIsLoadingTours(false);
      }
    };
    fetchTours();
  }, [language]);

  // Modal states
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Custom Modal Detailed Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary">("overview");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: "2",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tourId: selectedTour.id,
          tourTitle: selectedTour.title
        })
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Failed to submit booking inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to servers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedTour(null);
    setIsSuccess(false);
    setActiveTab("overview");
    setActiveStepIndex(0);
    setFormData({
      name: "",
      email: "",
      date: "",
      guests: "2",
      message: ""
    });
  };

  // Helper to resolve custom Lucide vector icons based on facilities description text
  const getFacilityIcon = (facility: string) => {
    const lowercase = facility.toLowerCase();
    if (
      lowercase.includes("hotel") || 
      lowercase.includes("villa") || 
      lowercase.includes("bungalow") || 
      lowercase.includes("stay") || 
      lowercase.includes("sanctuary") ||
      lowercase.includes("resort")
    ) {
      return Hotel;
    }
    if (
      lowercase.includes("car") || 
      lowercase.includes("sedan") || 
      lowercase.includes("van") || 
      lowercase.includes("suv") || 
      lowercase.includes("driver") || 
      lowercase.includes("transport") || 
      lowercase.includes("chauffeur") ||
      lowercase.includes("jeep")
    ) {
      return Car;
    }
    if (
      lowercase.includes("guide") || 
      lowercase.includes("naturalist") || 
      lowercase.includes("instructor") || 
      lowercase.includes("expert") || 
      lowercase.includes("caddy")
    ) {
      return Compass;
    }
    if (
      lowercase.includes("ticket") || 
      lowercase.includes("pass") || 
      lowercase.includes("permit") || 
      lowercase.includes("fee") || 
      lowercase.includes("entrance") || 
      lowercase.includes("green fee")
    ) {
      return Ticket;
    }
    if (
      lowercase.includes("meals") || 
      lowercase.includes("breakfast") || 
      lowercase.includes("lunch") || 
      lowercase.includes("dinner") || 
      lowercase.includes("tea")
    ) {
      return Utensils;
    }
    if (
      lowercase.includes("wi-fi") || 
      lowercase.includes("water") || 
      lowercase.includes("internet") || 
      lowercase.includes("lounge")
    ) {
      return Wifi;
    }
    return Sparkles;
  };

  const filteredPackages = overviewPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTours = tours.filter(tour => 
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-neutral-50 pb-24 pt-0">
      
      {/* 1. Panoramic Editorial Page Hero (Full height with integrated search and cards) */}
      <section className="relative w-full lg:h-screen lg:min-h-[850px] overflow-hidden flex flex-col justify-between bg-black pt-28 pb-10">
        <NextImage 
          src="/anthony-lim-H-qDQSXBBBc-unsplash.jpg" 
          alt="Curated Premium Packages Sri Lanka" 
          fill 
          priority
          className="object-cover object-[center_40%] z-0"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75 z-10" />

        {/* Hero Content (Positioned in the upper half - Premium Glassmorphic Search Bar) */}
        <div className="container mx-auto px-8 max-w-[1280px] text-center relative z-20 mt-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center animate-fadeIn"
          >
            

            {/* Glassmorphic Pill Search Input */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4 mt-36 rounded-full w-full max-w-[650px] shadow-2xl focus-within:bg-white focus-within:border-white focus-within:text-neutral-900 focus-within:ring-4 focus-within:ring-[#9CBFA7]/20 transition-all duration-300 group">
              <Search className="text-white group-focus-within:text-neutral-500 w-5 h-5 flex-shrink-0 transition-colors duration-200" />
              <input
                type="text"
                placeholder={t("packages.hero_search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent outline-none text-base w-full text-white placeholder-neutral-300 focus:text-neutral-900 focus:placeholder-neutral-400 font-poppins transition-colors duration-200"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="text-white hover:text-red-400 group-focus-within:text-neutral-400 group-focus-within:hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

          </motion.div>
        </div>

        {/* 2. Quick Overview comparison cards grid (Rendered directly in the lower screen section for unified full height layout) */}
        <div className="relative z-30 container mx-auto px-8 max-w-[1280px] mb-auto w-full">
          <AnimatePresence mode="popLayout">
            {filteredPackages.length > 0 ? (
              <motion.div 
                layout
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
              >
                {filteredPackages.map((pkg) => {
                  return (
                    <Link key={pkg.name} href={pkg.link} className="block w-full">
                      <motion.div
                        layout
                        variants={cardVariants}
                        className="text-neutral-900 p-5 rounded-[1.8rem] flex flex-col justify-between h-[320px] bg-white border border-neutral-200/60 shadow-lg relative overflow-hidden group"
                      >
                        {/* Top: Metadata tags */}
                        <div className="flex justify-between items-start w-full">
                          <span className="text-[10px] text-neutral-500 font-medium font-poppins">{t(pkg.category)}</span>
                          <span className="text-[10px] font-bold font-poppins px-2 py-0.5 rounded text-[#2E503B] bg-[#9CBFA7]/25">
                            {t(pkg.duration)}
                          </span>
                        </div>

                        {/* Middle: Content centered vertically & horizontally */}
                        <div className="my-auto flex flex-col items-center text-center justify-center w-full py-2">
                          {getOverviewIcon(pkg.icon)}
                          <h3 className="text-2xl md:text-3xl font-light font-montserrat tracking-tight mb-2 leading-snug text-neutral-900 w-full text-center">
                            {t(pkg.name)}
                          </h3>
                          <p className="text-neutral-600 text-[10px] font-light leading-relaxed font-poppins line-clamp-3 w-full text-justify">
                            {t(pkg.description)}
                          </p>
                        </div>

                        {/* Bottom: Explore Link & Dynamic Price */}
                        <div className="pt-3 w-full border-t border-neutral-100 flex justify-between items-center">
                          <div className="flex flex-col text-left">
                            <span className="text-[9px] text-neutral-400 font-poppins leading-none mb-1">{t("packages.starting_from", "Starting from")}</span>
                            <span className="text-xs font-semibold font-poppins text-neutral-900 leading-none">
                              {formatFromPrice(pkg.priceValue)}
                            </span>
                          </div>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-neutral-900 text-white transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full text-center py-10 bg-white/5 backdrop-blur-md rounded-[1.8rem] border border-white/5 text-neutral-300"
              >
                <p className="font-poppins text-sm font-light">{t("packages.no_results")} "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="mt-3 text-xs font-semibold text-[#9CBFA7] hover:underline font-poppins"
                >
                  {t("packages.clear_search")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom smooth transition */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-neutral-50 to-transparent z-20" />
      </section>

      {/* 2.5 Separate Beach Packages Details Section (Asymmetrical Editorial Grid) */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-br from-white via-cyan-50/10 to-teal-50/20 relative overflow-hidden text-left">
        {/* Decorative background circle */}
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(20,184,166,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
        
        <div className="container mx-auto px-8 max-w-[1280px] relative z-10 space-y-12">
          {/* Main Section Header */}
          <div className="pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-500 font-poppins">
              {t("beach.sec_num")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Image & Text block (Wider, Col Span 7) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Micro Header */}
              <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400 font-poppins">
                {t("beach.micro_left")}
              </span>
              
              {/* Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-neutral-200/30 group">
                <NextImage 
                  src="/bento/mirissa-beach.png" 
                  alt="Mirissa Golden Coastal Sanctuaries" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
              </div>

              {/* Title & Description Directly Underneath Image */}
              <div className="space-y-4 pt-2">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-tight font-montserrat uppercase">
                  {t("beach.title_left")}
                </h3>
                
                <p className="text-neutral-600 text-xs md:text-sm font-light leading-relaxed font-poppins text-justify">
                  {t("beach.desc_left")}
                </p>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                  <div className="flex gap-3 items-start">
                    <Waves className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("beach.feat1_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("beach.feat1_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Palmtree className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("beach.feat2_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("beach.feat2_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image & Text block (Narrower, Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Micro Header */}
              <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400 font-poppins">
                {t("beach.micro_right")}
              </span>
              
              {/* Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-neutral-200/30 group">
                <NextImage 
                  src="/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg" 
                  alt="Scenic Galle Fort Shorelines" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
              </div>

              {/* Title & Description Directly Underneath Image */}
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-neutral-900 leading-tight font-montserrat uppercase">
                  {t("beach.title_right")}
                </h3>
                
                <p className="text-neutral-600 text-[11px] md:text-xs font-light leading-relaxed font-poppins text-justify">
                  {t("beach.desc_right")}
                </p>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("beach.feat3_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("beach.feat3_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Sparkles className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("beach.feat4_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("beach.feat4_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Action CTA Button positioned perfectly at the bottom */}
          <div className="pt-6 flex justify-start">
            <Link 
              href="/tours?category=Beach%20Tours" 
              className="inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-teal-950 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-teal-950/15 hover:-translate-y-0.5 group font-poppins"
            >
              <span>{t("beach.cta")}</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2.6 Separate Wildlife Packages Details Section (Flipped & Staggered Asymmetrical Editorial Grid) */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-br from-white via-emerald-50/10 to-stone-100/20 relative overflow-hidden text-left">
        {/* Decorative background circle */}
        <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
        
        <div className="container mx-auto px-8 max-w-[1280px] relative z-10 space-y-12">
          {/* Main Section Header */}
          <div className="pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-500 font-poppins">
              {t("wildlife.sec_num")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Image & Text block (Narrower, Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Micro Header */}
              <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400 font-poppins">
                {t("wildlife.micro_left")}
              </span>
              
              {/* Image */}
              <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-lg border border-neutral-200/30 group">
                <NextImage 
                  src="/tours/yala.jpg" 
                  alt="Elephant Gatherings Minneriya Basin" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
              </div>

              {/* Title & Description Directly Underneath Image */}
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-neutral-900 leading-tight font-montserrat uppercase">
                  {t("wildlife.title_left")}
                </h3>
                
                <p className="text-neutral-600 text-[11px] md:text-xs font-light leading-relaxed font-poppins text-justify">
                  {t("wildlife.desc_left")}
                </p>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                  <div className="flex gap-3 items-start">
                    <Trees className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("wildlife.feat1_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("wildlife.feat1_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Flame className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("wildlife.feat2_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("wildlife.feat2_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image & Text block (Wider, Col Span 7, Offset Staggered Downwards) */}
            <div className="lg:col-span-7 flex flex-col space-y-6 lg:pt-16">
              {/* Micro Header */}
              <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400 font-poppins">
                {t("wildlife.micro_right")}
              </span>
              
              {/* Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-neutral-200/30 group">
                <NextImage 
                  src="/bento/leopard.png" 
                  alt="Elusive Sri Lankan Leopard Wild Tracks" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
              </div>

              {/* Title & Description Directly Underneath Image */}
              <div className="space-y-4 pt-2">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-tight font-montserrat uppercase">
                  {t("wildlife.title_right")}
                </h3>
                
                <p className="text-neutral-600 text-xs md:text-sm font-light leading-relaxed font-poppins text-justify">
                  {t("wildlife.desc_right")}
                </p>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                  <div className="flex gap-3 items-start">
                    <Binoculars className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("wildlife.feat3_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("wildlife.feat3_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 font-montserrat text-xs mb-0.5">
                        {t("wildlife.feat4_title")}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-poppins font-light leading-relaxed">
                        {t("wildlife.feat4_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Action CTA Button positioned perfectly at the bottom */}
          <div className="pt-6 flex justify-start">
            <Link 
              href="/tours?category=Wildlife%20Tours" 
              className="inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-emerald-950 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-emerald-950/15 hover:-translate-y-0.5 group font-poppins"
            >
              <span>{t("wildlife.cta")}</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Fully Interactive Editorial Packages Component (Dynamic Tabs Showcase) */}
      <section className="w-full relative bg-white mb-16 py-4">
        <div className="container mx-auto px-8 max-w-[1280px] mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light font-montserrat tracking-tight mt-1 mb-2 text-neutral-900">
            {t("categories.section_title")}
          </h2>
          <p className="text-neutral-500 font-light text-xs md:text-sm font-poppins max-w-[600px] mx-auto">
            {t("categories.section_desc")}
          </p>
        </div>
        <TourCategories />
      </section>

      {/* 4. Luxury Philosophy trust badges section */}
      <section className="container mx-auto px-8 max-w-[1280px] py-12">
        <div className="bg-[#0E1B15] text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-center">
            
            <div className="lg:col-span-1 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <h3 className="text-2xl font-light font-montserrat tracking-tight mb-2">{t("philosophy.title_our")}</h3>
              <h3 className="text-2xl font-semibold font-montserrat text-[#9CBFA7] tracking-tight leading-none">{t("philosophy.title_philosophy")}</h3>
              <p className="text-neutral-400 text-xs font-light font-poppins leading-relaxed mt-4">
                {t("philosophy.desc")}
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 lg:pl-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#9CBFA7] flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat text-sm mb-1">{t("philosophy.feat1_title")}</h4>
                  <p className="text-neutral-400 text-[11px] font-poppins font-light leading-relaxed">{t("philosophy.feat1_desc")}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#9CBFA7] flex-shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat text-sm mb-1">{t("philosophy.feat2_title")}</h4>
                  <p className="text-neutral-400 text-[11px] font-poppins font-light leading-relaxed">{t("philosophy.feat2_desc")}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5 Dynamic Tour Packages Grid Catalog */}
      <section className="container mx-auto px-8 max-w-[1280px] py-16 text-left border-t border-neutral-200/50">
        <div className="space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-neutral-400 font-poppins">
            Signature Curation
          </span>
          <h2 className="text-3xl md:text-4xl font-light font-montserrat text-neutral-900 uppercase">
            All Signature Tour Packages
          </h2>
          <p className="text-neutral-500 font-light text-xs md:text-sm font-poppins max-w-2xl leading-relaxed">
            Browse our complete catalog of dynamically curated journeys, hand-designed by our specialists for seamless luxury travel, heritage discovery, and wild encounters.
          </p>
        </div>

        {isLoadingTours ? (
          <div className="flex flex-col gap-4 items-center justify-center py-20 bg-white rounded-3xl border border-neutral-100">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-600" />
            <span className="text-sm font-poppins text-neutral-400">Synchronizing dynamic experiences...</span>
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTours.map((tour) => (
              <div 
                key={tour.id} 
                className="cursor-pointer"
                onClick={() => setSelectedTour(tour)}
              >
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-neutral-100 text-center shadow-sm">
            <p className="font-poppins text-sm font-light text-neutral-500">
              No custom packages match your query "{searchQuery}".
            </p>
          </div>
        )}
      </section>

      {/* Premium Booking & Inquiry Modal */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/65 backdrop-blur-md z-0"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full max-w-6xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh] rounded-[2.5rem]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md md:bg-neutral-100 hover:bg-neutral-200 text-neutral-800 md:text-neutral-500 hover:text-black flex items-center justify-center transition-all duration-300 z-30"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Left Column: Rich Package Exploration (col-span-7) */}
              <div className="md:col-span-7 p-6 md:p-10 overflow-y-auto max-h-[90vh] md:max-h-[85vh] flex flex-col gap-6">
                
                {/* Header Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-left">
                    <span className="text-xs font-semibold text-blue-500 font-poppins">
                      {selectedTour.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                    <span className="text-[0.65rem] font-bold text-neutral-400 font-poppins">
                      {selectedTour.duration}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-semibold leading-tight text-neutral-950 font-montserrat tracking-tight text-left">
                    {selectedTour.title}
                  </h4>
                </div>

                {/* Custom Segmented Tabs Selector */}
                <div className="flex gap-2 border-b border-neutral-100 pb-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all duration-300 font-poppins ${
                      activeTab === "overview"
                        ? "bg-[#0E1B15] text-white shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    Overview & Facilities
                  </button>
                  <button
                    onClick={() => setActiveTab("itinerary")}
                    className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all duration-300 font-poppins ${
                      activeTab === "itinerary"
                        ? "bg-[#0E1B15] text-white shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    Itinerary & Road Map
                  </button>
                </div>

                {/* Tab Contents */}
                <AnimatePresence mode="wait">
                  {activeTab === "overview" ? (
                    <motion.div
                      key="overview-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Panoramic Banner Image inside modal */}
                      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-sm border border-neutral-100 flex-shrink-0">
                        {selectedTour.image ? (
                          <NextImage
                            src={selectedTour.image}
                            alt={selectedTour.title}
                            fill
                            className="object-cover"
                            priority
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-black to-neutral-950" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-1.5 rounded-xl font-bold text-xs shadow-md font-montserrat uppercase">
                          {formatFromPrice(selectedTour.price)}
                        </div>
                      </div>

                      {/* Package Description */}
                      <div className="text-left">
                        <h5 className="text-xs font-semibold text-blue-500 mb-2 font-poppins">
                          About the Journey
                        </h5>
                        <p className="text-neutral-600 font-light text-xs sm:text-sm leading-relaxed font-poppins text-justify">
                          {selectedTour.description}
                        </p>
                      </div>

                      {/* Facilities Checklist */}
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-neutral-400 mb-3.5 font-poppins">
                          What's Included (Facilities)
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {selectedTour.facilities && selectedTour.facilities.map((fac, i) => {
                            const IconComponent = getFacilityIcon(fac);
                            return (
                              <div
                                key={i}
                                className="flex items-start gap-3 p-3.5 bg-neutral-50/50 hover:bg-neutral-50 rounded-2xl border border-neutral-100 transition-all duration-300 group"
                              >
                                <div className="p-2 bg-white text-neutral-800 rounded-xl group-hover:text-blue-500 group-hover:scale-105 transition-all duration-300 border border-neutral-100 shadow-sm flex-shrink-0">
                                  <IconComponent size={16} />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <span className="text-xs font-semibold text-neutral-800 font-poppins leading-none mb-1">
                                    {fac}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-light font-poppins">
                                    Premium Service Included
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                          {(!selectedTour.facilities || selectedTour.facilities.length === 0) && (
                            <span className="text-xs font-light text-neutral-400 font-poppins">All standard amenities included.</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="itinerary-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                    >
                      {/* Left: Timeline Itinerary Steps */}
                      <div className="lg:col-span-6 relative flex flex-col gap-4 max-h-[360px] md:max-h-[420px] overflow-y-auto pr-2 text-left">
                        {/* Timeline Connector Line */}
                        <div className="absolute left-6 top-3 bottom-3 w-0.5 border-l-2 border-dashed border-neutral-100" />
                        
                        {selectedTour.roadmap && selectedTour.roadmap.map((step, index) => {
                          const isActive = index === activeStepIndex;
                          return (
                            <div
                              key={step.day}
                              onClick={() => setActiveStepIndex(index)}
                              className="relative pl-12 cursor-pointer group select-none text-left"
                            >
                              {/* Glowing Bullet Pin */}
                              <div
                                className={`absolute left-6 top-5 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 transition-all duration-300 border-2 ${
                                  isActive
                                    ? "bg-[#0E1B15] border-blue-500 scale-125 shadow-md"
                                    : "bg-white border-neutral-200 group-hover:border-blue-500 group-hover:scale-110"
                                }`}
                              />

                              {/* Timeline Card */}
                              <div
                                className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                                  isActive
                                    ? "bg-blue-50/40 border-blue-200/50 shadow-sm"
                                    : "bg-white border-neutral-100 hover:border-neutral-200"
                                }`}
                              >
                                <span className="text-xs font-semibold text-blue-500 font-poppins block mb-0.5">
                                  Day {step.day}: {step.location}
                                </span>
                                <h6 className="text-xs font-bold text-neutral-800 font-montserrat tracking-tight mb-1">
                                  {step.title}
                                </h6>
                                
                                {/* Collapsible description */}
                                <motion.div
                                  initial={false}
                                  animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                                  transition={{ duration: 0.35, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-[11px] text-neutral-500 font-light font-poppins leading-relaxed mt-2 pt-2 border-t border-neutral-200/50">
                                    {step.description}
                                  </p>
                                </motion.div>
                              </div>
                            </div>
                          );
                        })}
                        {(!selectedTour.roadmap || selectedTour.roadmap.length === 0) && (
                          <span className="text-xs font-light text-neutral-400 font-poppins py-6 text-center">Itinerary under curation.</span>
                        )}
                      </div>

                      {/* Right: Interactive Real Map of Sri Lanka */}
                      <Card className="lg:col-span-6 h-[360px] md:h-[420px] p-0 overflow-hidden relative border border-neutral-100/80 rounded-3xl shadow-inner">
                        {selectedTour.roadmap && selectedTour.roadmap.length > 0 ? (
                          <Map 
                            center={[selectedTour.roadmap[activeStepIndex]?.lat || 7.8731, selectedTour.roadmap[activeStepIndex]?.lng || 80.7718]}
                            zoom={9}
                            markers={selectedTour.roadmap.map(step => ({
                              lat: step.lat,
                              lng: step.lng,
                              label: step.location,
                              day: step.day
                            }))}
                            activeMarkerIndex={activeStepIndex}
                          >
                            <MapControls />
                          </Map>
                        ) : (
                          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                            <span className="text-neutral-400 text-xs">No coordinates map available</span>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Inquiry Form / Success Screen (col-span-5) */}
              <div className="md:col-span-5 p-6 md:p-10 bg-neutral-50/50 border-t md:border-t-0 md:border-l border-neutral-100 overflow-y-auto max-h-[90vh] md:max-h-[85vh]">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form-screen"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-8 text-left">
                        <span className="text-xs font-semibold text-blue-500 font-poppins md:hidden mb-1 block">
                          Inquire Tour
                        </span>
                        <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 font-montserrat tracking-tight mb-2">
                          Book Experience
                        </h3>
                        <p className="text-sm text-neutral-400 font-light font-poppins leading-relaxed">
                          Fill out the details below and our expert travel advisors will customize this package specifically for you.
                        </p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-bold text-neutral-400 font-poppins">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <input
                              type="text"
                              name="name"
                              required
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full bg-neutral-100/60 focus:bg-white border border-transparent focus:border-neutral-200 pl-11 pr-5 py-3 rounded-2xl text-sm font-poppins font-light outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-bold text-neutral-400 font-poppins">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="johndoe@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-neutral-100/60 focus:bg-white border border-transparent focus:border-neutral-200 pl-11 pr-5 py-3 rounded-2xl text-sm font-poppins font-light outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Date & Guests Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Preferred Date */}
                          <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-bold text-neutral-400 font-poppins">Preferred Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                              <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full bg-neutral-100/60 focus:bg-white border border-transparent focus:border-neutral-200 pl-11 pr-5 py-3 rounded-2xl text-sm font-poppins font-light outline-none transition-all duration-300 cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Guests Select */}
                          <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-bold text-neutral-400 font-poppins">Guests</label>
                            <div className="relative">
                              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                              <select
                                name="guests"
                                value={formData.guests}
                                onChange={handleInputChange}
                                className="w-full bg-neutral-100/60 focus:bg-white border border-transparent focus:border-neutral-200 pl-11 pr-5 py-3 rounded-2xl text-sm font-poppins font-light outline-none transition-all duration-300 cursor-pointer appearance-none"
                              >
                                <option value="1">1 Traveler</option>
                                <option value="2">2 Travelers</option>
                                <option value="3">3 Travelers</option>
                                <option value="4">4 Travelers</option>
                                <option value="5+">5+ Travelers</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Special Message */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-bold text-neutral-400 font-poppins">Special Requirements (Optional)</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-3 text-neutral-400 w-4 h-4" />
                            <textarea
                              name="message"
                              rows={3}
                              placeholder="Tell us about special food preferences, accommodation needs..."
                              value={formData.message}
                              onChange={handleInputChange}
                              className="w-full bg-neutral-100/60 focus:bg-white border border-transparent focus:border-neutral-200 pl-11 pr-5 py-3 rounded-2xl text-sm font-poppins font-light outline-none transition-all duration-300 resize-none font-poppins"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-4 bg-[#0E1B15] text-white py-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors font-poppins outline-none shadow-md"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            "Send Custom Inquiry ↗"
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                        <Check size={40} strokeWidth={2.5} />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 font-montserrat tracking-tight mb-3">
                        Inquiry Received!
                      </h3>
                      
                      <p className="text-sm text-neutral-500 font-light font-poppins leading-relaxed max-w-md mb-8 font-poppins">
                        Thank you, <span className="font-semibold text-black">{formData.name}</span>. We've received your request for the <span className="font-semibold text-black">{selectedTour.title}</span>. Our private travel concierge will contact you at <span className="font-semibold text-black">{formData.email}</span> within 24 hours to design your customized itinerary.
                      </p>

                      <button
                        onClick={closeModal}
                        className="py-3 px-8 rounded-full bg-[#0E1B15] text-white text-xs font-semibold hover:bg-neutral-800 transition-colors font-poppins outline-none shadow-sm"
                      >
                        Back to Catalog
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
