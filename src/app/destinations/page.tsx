"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockDestinations, Destination } from "@/lib/data";
import { MapPin, Calendar, Sun, Clock, Compass, ChevronLeft, ChevronRight, Star, User, Share2, Wifi, Map as MapIcon, Landmark, Eye, Footprints, Heart, Utensils, Loader2, Wind, Droplets, Leaf } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/LanguageContext";
import { Map } from "@/components/ui/map";

// Local guide storytellers list matching the guide details in the screenshot
const destinationGuides = [
  "Nuwan Perera (Heritage Specialist)",
  "James Rodrigo (Wildlife Biologist)",
  "Anura de Silva (Mountain Naturalist)",
  "Priyantha Bandara (Surf Pro Chauffeur)",
  "Manoj Fernando (Kandyan Historian)",
  "Dilshan Jayasekara (Coastal Specialist)",
  "Tharindu Rajapaksha (Highlands Storyteller)",
  "Kanishka Herath (Archaeologist Guide)",
  "Roshan Cooray (Cultural Explorer)",
  "Suresh de Mel (Eastern Wildlife Tracker)"
];

// Local destination gallery mapper for scenery showcase section
const destinationGallery: Record<string, string[]> = {
  d1: ["/bento/sigiriya.png", "/bento/ella-bridge.png", "/tours/kandy.jpg"],
  d2: ["/bento/ella-bridge.png", "/anthony-lim-H-qDQSXBBBc-unsplash.jpg", "/bento/sigiriya.png"],
  d3: ["/bento/leopard.png", "/tours/yala.jpg", "/bento/mirissa-beach.png"],
  d4: ["/bento/mirissa-beach.png", "/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg", "/tours/yala.jpg"],
  d5: ["/tours/kandy.jpg", "/bento/sigiriya.png", "/anthony-lim-H-qDQSXBBBc-unsplash.jpg"],
  d6: ["/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg", "/bento/mirissa-beach.png", "/tours/kandy.jpg"],
  d7: ["/anthony-lim-H-qDQSXBBBc-unsplash.jpg", "/bento/ella-bridge.png", "/tours/kandy.jpg"],
  d8: ["/bento/sigiriya.png", "/tours/kandy.jpg", "/bento/ella-bridge.png"],
  d9: ["/bento/ella-bridge.png", "/bento/sigiriya.png", "/tours/kandy.jpg"],
  d10: ["/bento/mirissa-beach.png", "/tours/yala.jpg", "/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg"]
};

// Local facility icon mapper
const getFeatureIcon = (featureName: string) => {
  const lowercase = featureName.toLowerCase();
  if (lowercase.includes("viewpoint") || lowercase.includes("scenic") || lowercase.includes("sunset") || lowercase.includes("lookout")) {
    return Eye;
  }
  if (lowercase.includes("heritage") || lowercase.includes("temple") || lowercase.includes("sacred") || lowercase.includes("ruin") || lowercase.includes("fortress") || lowercase.includes("palace")) {
    return Landmark;
  }
  if (lowercase.includes("hiking") || lowercase.includes("trek") || lowercase.includes("trail") || lowercase.includes("walk")) {
    return Footprints;
  }
  if (lowercase.includes("wifi") || lowercase.includes("connectivity") || lowercase.includes("cellular")) {
    return Wifi;
  }
  if (lowercase.includes("access") || lowercase.includes("road") || lowercase.includes("transit") || lowercase.includes("railway")) {
    return MapIcon;
  }
  return Heart;
};

// Authentic Sri Lankan monsoons and 12-month climate details dictionary keyed to destinations
const getClimateDetails = (destName: string) => {
  const name = destName.toLowerCase();
  
  if (name.includes("sigiriya") || name.includes("anuradhapura") || name.includes("polonnaruwa") || name.includes("yala") || name.includes("arugam")) {
    const isArugam = name.includes("arugam");
    const isYala = name.includes("yala");
    return {
      monsoons: [
        { name: "Peak Dry Season", period: isArugam ? "May - Sep" : "Feb - Aug", status: isYala ? "Superb Wildlife Viewing" : "Ideal & Sun-drenched", progress: 95, rating: "Perfect" },
        { name: "Northeast Monsoon", period: "Nov - Jan", status: "Frequent Rainfall", progress: 35, rating: "Rainy" },
        { name: "Inter-Monsoon Phase", period: "Feb - Apr / Oct", status: "Warm & Tropical Showers", progress: 75, rating: "Good" }
      ],
      months: [
        { month: "Jan", temp: 28, icon: "⛅", suitability: "Good", tip: "Mornings are pleasantly cool and misty. Ideal for climbing ruins." },
        { month: "Feb", temp: 30, icon: "☀️", suitability: "Perfect", tip: "Fabulous clear skies. Ideal for landscape photography and safaris." },
        { month: "Mar", temp: 32, icon: "☀️", suitability: "Perfect", tip: "Dry and bright. Excellent afternoon climbing and clear horizons." },
        { month: "Apr", temp: 33, icon: "☀️", suitability: "Perfect", tip: "Warmest month of the season. Dress light and stay hydrated." },
        { month: "May", temp: 34, icon: "☀️", suitability: "Perfect", tip: "Dry and sunny. Excellent weather with low tourist crowds." },
        { month: "Jun", temp: 33, icon: "☀️", suitability: "Perfect", tip: "Cool breezes are active. Makes climbing ruins highly pleasant." },
        { month: "Jul", temp: 33, icon: "☀️", suitability: "Perfect", tip: "Brilliant sunshine. Perfect for wildlife gathering at lakes." },
        { month: "Aug", temp: 33, icon: "☀️", suitability: "Perfect", tip: "Peak holiday conditions. Dry, warm, and highly recommended." },
        { month: "Sep", temp: 32, icon: "⛅", suitability: "Good", tip: "Mild dry winds. Excellent visibility for elephant migrations." },
        { month: "Oct", temp: 30, icon: "🌧️", suitability: "Fair", tip: "Afternoon showers. Schedule climbs and safaris early morning." },
        { month: "Nov", temp: 29, icon: "🌧️", suitability: "Rainy", tip: "Active monsoon rains. Carry strong waterproof gear and umbrellas." },
        { month: "Dec", temp: 28, icon: "🌧️", suitability: "Rainy", tip: "Regular rainfall. Misty forests and highly atmospheric ruins." }
      ]
    };
  }
  
  if (name.includes("mirissa") || name.includes("galle")) {
    return {
      monsoons: [
        { name: "Peak Dry Season", period: "Dec - Apr", status: "Ideal Beach Conditions", progress: 95, rating: "Perfect" },
        { name: "Southwest Monsoon", period: "May - Sep", status: "Heavy Sea & Strong Swell", progress: 40, rating: "Rainy" },
        { name: "Inter-Monsoon Phase", period: "Oct - Nov", status: "Warm Evening Showers", progress: 65, rating: "Fair" }
      ],
      months: [
        { month: "Jan", temp: 30, icon: "☀️", suitability: "Perfect", tip: "Outstanding ocean clarity. Excellent for whale watching and swimming." },
        { month: "Feb", temp: 31, icon: "☀️", suitability: "Perfect", tip: "Zero rainfall. Calm turquoise oceans ideal for snorkeling." },
        { month: "Mar", temp: 31, icon: "☀️", suitability: "Perfect", tip: "Brilliant beach sunsets. Perfectly warm and sun-drenched." },
        { month: "Apr", temp: 32, icon: "⛅", suitability: "Good", tip: "Warmest beach month. Calm seas but expect higher humidity." },
        { month: "May", temp: 30, icon: "🌧️", suitability: "Fair", tip: "Monsoon starts. Expect heavy afternoon squalls and tall ocean swells." },
        { month: "Jun", temp: 29, icon: "🌧️", suitability: "Rainy", tip: "Frequent rains and wind. Great for indoor wellness and spa visits." },
        { month: "Jul", temp: 29, icon: "🌧️", suitability: "Rainy", tip: "Rough waters. Sea swimming is restricted but surfers enjoy high swells." },
        { month: "Aug", temp: 29, icon: "⛅", suitability: "Good", tip: "Lull in rainfall. Great for evening beach walks and Galle Fort walks." },
        { month: "Sep", temp: 29, icon: "🌧️", suitability: "Fair", tip: "Tropical showers. Beautiful green coastal forests and cheap prices." },
        { month: "Oct", temp: 30, icon: "🌧️", suitability: "Fair", tip: "Inter-monsoon clouds produce gorgeous, fiery beach sunsets." },
        { month: "Nov", temp: 30, icon: "⛅", suitability: "Good", tip: "Transition to dry season. Calm waters are slowly returning." },
        { month: "Dec", temp: 30, icon: "☀️", suitability: "Perfect", tip: "Stunning beach days. Calmest sea swell, great for water sports." }
      ]
    };
  }

  const isNuwaraEliya = name.includes("nuwara") || name.includes("eliya");
  return {
    monsoons: [
      { name: "Peak Dry Season", period: "Jan - Mar", status: "Chilly & Clear Hiking", progress: 95, rating: "Perfect" },
      { name: "Monsoon Season", period: "May - Sep / Oct - Dec", status: "Atmospheric Mist & Fog", progress: 50, rating: "Fair" },
      { name: "Spring Lull Phase", period: "Jul - Aug", status: "Cool Highlands Breezes", progress: 85, rating: "Good" }
    ],
    months: [
      { month: "Jan", temp: isNuwaraEliya ? 17 : 24, icon: "☀️", suitability: "Perfect", tip: isNuwaraEliya ? "Crisp chilly mountain air. Ideal for tea country walking." : "Brilliant sunny hiking days and cool, refreshing nights." },
      { month: "Feb", temp: isNuwaraEliya ? 18 : 25, icon: "☀️", suitability: "Perfect", tip: "Dry and bright. Excellent for Nine Arch Bridge photo walks." },
      { month: "Mar", temp: isNuwaraEliya ? 19 : 26, icon: "☀️", suitability: "Perfect", tip: "Clear blue skies. Outstanding mountain views from viewpoints." },
      { month: "Apr", temp: isNuwaraEliya ? 20 : 27, icon: "⛅", suitability: "Good", tip: "Floral blooms in parks. Clear mornings and busy festive vibes." },
      { month: "May", temp: isNuwaraEliya ? 19 : 25, icon: "🌧️", suitability: "Fair", tip: "Misty highlands. Mountain waterfalls are incredibly full and thundering." },
      { month: "Jun", temp: isNuwaraEliya ? 16 : 23, icon: "🌧️", suitability: "Fair", tip: "Dense mist and cold winds. Carry warm thermal layers and rainwear." },
      { month: "Jul", temp: isNuwaraEliya ? 15 : 23, icon: "⛅", suitability: "Good", tip: "Atmospheric clouds. Cozy up indoors with Ceylon single-origin tea." },
      { month: "Aug", temp: isNuwaraEliya ? 16 : 23, icon: "⛅", suitability: "Good", tip: "Cool highlands breezes. Outstanding for trekking and tea estate tours." },
      { month: "Sep", temp: isNuwaraEliya ? 17 : 24, icon: "🌧️", suitability: "Fair", tip: "High rainfall. Lush green mountains and misty valleys." },
      { month: "Oct", temp: isNuwaraEliya ? 17 : 24, icon: "🌧️", suitability: "Rainy", tip: "Heaviest rainfall month. Waterfalls look gorgeous, but paths are damp." },
      { month: "Nov", temp: isNuwaraEliya ? 16 : 23, icon: "🌧️", suitability: "Rainy", tip: "Misty afternoons. Warm fire fireplaces and hot tea are highly recommended." },
      { month: "Dec", temp: isNuwaraEliya ? 15 : 23, icon: "🌧️", suitability: "Fair", tip: "Chilly climate. Misty peaks and quiet atmospheric scenic roads." }
    ]
  };
};

function DestinationsContent() {
  const { t, language } = useTranslation();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "attractions" | "activities" | "practical">("overview");

  // Real-time weather states
  const [liveWeather, setLiveWeather] = useState<{ temp: number; condition: string; wind: number; humidity: number; visibility: number } | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // Climate Planner dynamic navigation
  const [climateSubTab, setClimateSubTab] = useState<"seasons" | "monthly">("seasons");
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(new Date().getMonth());

  const searchParams = useSearchParams();
  const destId = searchParams.get("id");

  // Auto-select deep-linked destination if ID is specified in URL search parameters
  useEffect(() => {
    if (destId && destinations.length > 0) {
      const idx = destinations.findIndex(d => d.id === destId);
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    }
  }, [destId, destinations]);

  useEffect(() => {
    async function loadDestinations() {
      console.log("[DestinationsPage] loadDestinations starting. language:", language);
      try {
        const res = await fetch(`/api/destinations?lang=${language}`, { cache: "no-store" });
        console.log("[DestinationsPage] fetch response status:", res.status, "ok:", res.ok);
        if (res.ok) {
          const data = await res.json();
          console.log("[DestinationsPage] fetched data length:", data ? data.length : 0);
          if (data && data.length > 0) {
            console.log("[DestinationsPage] setDestinations with fetched data. First name:", data[0].name);
            setDestinations(data);
            return;
          }
        } else {
          console.error("[DestinationsPage] API response not ok. Status:", res.status);
        }
      } catch (err) {
        console.error("[DestinationsPage] Failed to load dynamic destinations:", err);
      }
      console.warn("[DestinationsPage] Falling back to mockDestinations");
      setDestinations(mockDestinations);
    }
    loadDestinations().finally(() => {
      console.log("[DestinationsPage] loadDestinations finished.");
      setIsLoading(false);
    });
  }, [language]);

  // Fetch live weather based on active coordinates
  useEffect(() => {
    if (destinations.length === 0 || !destinations[activeIndex]) return;
    const activeDest = destinations[activeIndex];
    
    setIsWeatherLoading(true);
    setLiveWeather(null); // Clear previous destination's weather first
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${activeDest.lat}&longitude=${activeDest.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,visibility,weather_code`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.current) {
          const temp = data.current.temperature_2m;
          const code = data.current.weather_code;
          const wind = Math.round(data.current.wind_speed_10m);
          const humidity = Math.round(data.current.relative_humidity_2m);
          const visibility = Math.round(data.current.visibility / 1000); // convert meters to km
          
          // Map WMO code to friendly descriptions
          let condition = "Sunny";
          if (code >= 1 && code <= 3) condition = "Partly Cloudy";
          else if (code >= 45 && code <= 48) condition = "Foggy";
          else if (code >= 51 && code <= 67) condition = "Drizzle";
          else if (code >= 80 && code <= 82) condition = "Showers";
          else if (code >= 95) condition = "Thunderstorm";
          
          setLiveWeather({ temp, condition, wind, humidity, visibility });
        }
      })
      .catch((err) => {
        console.error("Weather load failure:", err);
        setLiveWeather({ temp: 30, condition: "Sunny", wind: 12, humidity: 60, visibility: 10 });
      })
      .finally(() => setIsWeatherLoading(false));
  }, [activeIndex, destinations]);

  // Auto-switching timer for destinations carousel (5 seconds cycle)
  useEffect(() => {
    if (destinations.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [destinations.length]);

  const getLocalTime = () => {
    // Current UTC time + 5.5 hours for Sri Lanka
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const lkTime = new Date(utc + 3600000 * 5.5);
    return lkTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading || destinations.length === 0) {
    return (
      <div className="h-screen flex flex-col gap-3 items-center justify-center bg-neutral-900 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F9F68]" />
        <span className="text-sm font-poppins text-neutral-400">Loading curations catalog...</span>
      </div>
    );
  }

  const currentDest = destinations[activeIndex];
  const guideName = destinationGuides[activeIndex % destinationGuides.length];

  // Graceful fallback for empty/undefined attractions or activities
  const mockFallback = mockDestinations.find(m => m.name.toLowerCase() === currentDest.name.toLowerCase()) 
    || mockDestinations.find(m => currentDest.name.toLowerCase().includes(m.name.toLowerCase()))
    || mockDestinations.find(m => m.id === currentDest.id)
    || mockDestinations[0];

  const displayAttractions = (currentDest.attractions && currentDest.attractions.length > 0) 
    ? currentDest.attractions 
    : (mockFallback?.attractions || []);

  const displayActivities = (currentDest.activities && currentDest.activities.length > 0) 
    ? currentDest.activities 
    : (mockFallback?.activities || []);

  // Dynamic reviews count & ratings for high fidelity layout
  const reviewCount = 1000 + (activeIndex * 85);
  const beautyRating = 4.8 + (activeIndex % 3) * 0.1;
  const historyRating = 4.9 - (activeIndex % 4) * 0.1;
  const safetyRating = 4.7 + (activeIndex % 2) * 0.1;

  // Carousel controllers
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  // Convert coordinate to Map format
  const mapMarkers = [{
    lat: currentDest.lat,
    lng: currentDest.lng,
    label: currentDest.name
  }];

  // Format dynamic dreaming title
  const getDreamingTitle = (name: string) => {
    if (language === "fr") {
      return `Vous rêvez d'un incroyable voyage à ${name} ?`;
    }
    if (language === "de") {
      return `Träumen Sie von einer bemerkenswerten Reise nach ${name}?`;
    }
    if (language === "es") {
      return `¿Sueña con un viaje extraordinario a ${name}?`;
    }
    if (language === "zh") {
      return `梦想着一次非凡的 ${name} 之旅吗？`;
    }
    return `Dreaming of a Remarkable ${name} Journey?`;
  };

  // Dynamic AQI calculation
  const aqiValue = liveWeather ? Math.max(15, Math.round(40 + (liveWeather.humidity * 0.8) - (liveWeather.wind * 0.4))) : 45;
  const getAQIDesc = (aqi: number) => {
    if (aqi <= 55) return "Good";
    if (aqi <= 100) return "Moderate";
    return "Sensitive groups warning";
  };

  // Dynamic weather widget themes (Premium Minimalist White Glassy Cards)
  const getWidgetTheme = (condition: string) => {
    const cond = condition.toLowerCase();
    let beacon = "from-amber-400 to-rose-400 shadow-amber-500/25";
    if (cond.includes("cloud") || cond.includes("fog")) {
      beacon = "from-blue-200 to-gray-400 shadow-neutral-400/20";
    } else if (cond.includes("rain") || cond.includes("shower") || cond.includes("drizzle") || cond.includes("thunderstorm")) {
      beacon = "from-blue-400 to-indigo-500 shadow-blue-500/25";
    }
    return {
      bg: "bg-white border border-neutral-200/50 shadow-md rounded-[2.5rem] text-neutral-800 transition-all duration-700",
      glow: "bg-[radial-gradient(circle,rgba(0,0,0,0.01)_0%,transparent_70%)]",
      beacon: beacon,
      textColor: "text-neutral-900",
      subTextColor: "text-neutral-500",
      labelColor: "text-neutral-400",
      valueColor: "text-neutral-800"
    };
  };

  const widgetTheme = getWidgetTheme(liveWeather?.condition || "Sunny");
  const destinationClimate = getClimateDetails(currentDest.name);

  return (
    <div className="w-full min-h-screen bg-neutral-50 pb-24 pt-0">
      
      {/* 1. Curated Featured Hero Header Banner (Full-Bleed Magazine Style) */}
      <section className="relative w-full h-[650px] md:h-[600px] overflow-hidden select-none bg-neutral-900">
        
        {/* Background image panel */}
        <NextImage 
          src={currentDest.image} 
          alt={currentDest.name}
          fill
          priority
          className="object-cover transition-transform duration-[3000ms] ease-out scale-101"
          sizes="100vw"
        />
        {/* Deeper premium gradients overlay - Left-to-Right Black Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-10 pointer-events-none" />

        {/* Center/Left Aligned Card Container */}
        <div className="absolute inset-0 z-20 flex items-center pt-16">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex justify-start items-center">
            
            {/* Direct text overlay with safe padding and zero border/card layout */}
            <div className="w-full md:w-[460px] flex flex-col justify-between gap-6 text-left text-white">
              
              {/* Header: Title & Share */}
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-3xl md:text-5xl font-semibold font-montserrat text-white tracking-tight leading-tight drop-shadow-sm">
                  {t(currentDest.name)}
                </h1>
                <button className="p-2.5 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all">
                  <Share2 size={15} />
                </button>
              </div>

              {/* Landmark Full Description */}
              <p className="text-white/90 text-sm md:text-base font-light font-poppins leading-relaxed">
                {t(currentDest.description)}
              </p>

              {/* Action buttons (Same Line & Solid White Secondary Button) */}
              <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center w-full">
                <Link 
                  href={`/tours?category=${encodeURIComponent(currentDest.categoryFilter)}`}
                  className="bg-[#0F9F68] hover:bg-[#0b8052] text-white py-3 px-6 rounded-full text-xs font-bold  flex items-center justify-center gap-2 transition-colors font-poppins shadow-md shadow-emerald-500/10 whitespace-nowrap text-center"
                >
                  <span>{t("destinations.explore_tours", "Explore Tours")}</span>
                  <ChevronRight size={14} strokeWidth={2.5} />
                </Link>
                <Link 
                  href="/contact"
                  className="bg-white hover:bg-neutral-100 text-neutral-900 py-3 px-6 rounded-full text-xs font-bold  flex items-center justify-center gap-1.5 transition-all font-poppins shadow-md whitespace-nowrap text-center"
                >
                  <span>{t("destinations.contact_guide", "Contact Chauffeur")}</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Dots Indicator Overlay */}
        <div className="absolute bottom-8 right-8 md:right-12 hidden md:flex gap-2 z-20">
          {destinations.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

      </section>

      {/* 2. Interactive Details, Ratings & Full-Width Map (Screenshot 2 Concept) */}
      <section className="w-full py-10 px-6 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-left">
          
          {/* Main Details: Segmented tabs and dynamic destination characteristics */}
          <div className="lg:col-span-12 space-y-8">
            
            {/* Segmented controls (Overview, Attractions, Activities, Practical info) */}
            <div className="flex flex-wrap gap-2.5 border-b border-neutral-100 pb-4">
              {(["overview", "attractions", "activities", "practical"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold  transition-all duration-300 font-poppins border ${
                    activeTab === tab
                      ? "bg-black text-white border-black shadow-sm shadow-black/5"
                      : "bg-white text-neutral-500 border-neutral-200 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  {t(`destinations.tab_${tab}`, tab)}
                </button>
              ))}
            </div>

            {/* Tab Body contents - FULLY DESCRIBING DESTINATION DETAILS */}
            <div className="space-y-6">
              <h2 className="font-montserrat font-semibold text-neutral-900 text-2xl tracking-tight leading-snug">
                {activeTab === "overview" && t("destinations.about_destination", "About the region of {name}").replace("{name}", t(currentDest.name))}
                {activeTab === "attractions" && t("destinations.landmarks_title", "Must-visit regional landmarks")}
                {activeTab === "activities" && t("destinations.activities_title", "Unmissable outdoor experiences")}
                {activeTab === "practical" && t("destinations.practical_title", "Practical travel guide & insights")}
              </h2>
              
              <div className="text-neutral-500 text-xs md:text-sm font-light leading-relaxed font-poppins text-justify space-y-4">
                {activeTab === "overview" && (
                  <p>{t(currentDest.description)}</p>
                )}
                {activeTab === "attractions" && (
                  <div className="space-y-3">
                    <p>{t("destinations.attractions_desc", `The region of ${currentDest.name} hosts several world-renowned landmarks that represent the rich natural and historical heritage of the island:`)}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {displayAttractions.map((attr, idx) => (
                        <li key={idx} className="font-semibold text-neutral-800">
                          {t(attr)}: <span className="font-light text-neutral-500">{t("destinations.landmark_explore_desc", "A primary tourist asset offering exceptional photo opportunities and architectural value.")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "activities" && (
                  <div className="space-y-3">
                    <p>{t("destinations.activities_desc", "Experience the destination fully with these top highly-recommended outdoor activities tailored for active explorers:")}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {displayActivities.map((act, idx) => (
                        <li key={idx} className="font-semibold text-neutral-800">
                          {t(act)}: <span className="font-light text-neutral-500">{t("destinations.activity_experience_desc", "Highly immersive experience that lets you connect directly with local nature and communities.")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {activeTab === "practical" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 items-stretch">
                  
                  {/* A. Premium Apple Weather-Style Glassy Widget */}
                  <div className={`lg:col-span-6 p-8 min-h-[300px] flex flex-col justify-between relative overflow-hidden select-none transition-all duration-700 ${widgetTheme.bg}`}>
                    
                    {/* Floating Glow effects */}
                    <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-40 pointer-events-none animate-pulse ${widgetTheme.glow}`} />
                    
                    {/* Glowing Sun/State Orb */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-neutral-100/80 rounded-full border border-neutral-200/40 flex items-center justify-center backdrop-blur-md shadow-md group">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr shadow-md animate-pulse ${widgetTheme.beacon}`} />
                    </div>

                    {/* Top details */}
                    <div className="space-y-0.5 text-left">
                      <h4 className={`text-2xl font-semibold font-poppins tracking-wide drop-shadow-sm ${widgetTheme.textColor}`}>{currentDest.name}</h4>
                      <p className={`text-[0.8rem] font-poppins font-light tracking-wide flex items-center gap-1.5 ${widgetTheme.subTextColor}`}>
                        <span>{isWeatherLoading ? "Synchronizing..." : (liveWeather?.condition || "Sunny")}</span>
                        <span className="opacity-40">•</span>
                        <span>{getLocalTime()}</span>
                      </p>
                    </div>

                    {/* 2-Column Weather Indicators Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-8 text-left border-t border-neutral-100 pt-5">
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[10px] font-bold tracking-wider font-poppins ${widgetTheme.labelColor}`}>Wind</span>
                        <span className={`text-sm font-medium flex items-center gap-1.5 font-poppins ${widgetTheme.valueColor}`}>
                          <Wind size={14} className="opacity-60 flex-shrink-0" />
                          <span>{isWeatherLoading ? "—" : `${liveWeather?.wind || "12"} km/h`}</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[10px] font-bold tracking-wider font-poppins ${widgetTheme.labelColor}`}>Visibility</span>
                        <span className={`text-sm font-medium flex items-center gap-1.5 font-poppins ${widgetTheme.valueColor}`}>
                          <Eye size={14} className="opacity-60 flex-shrink-0" />
                          <span>{isWeatherLoading ? "—" : `${liveWeather?.visibility || "10"} km`}</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[10px] font-bold tracking-wider font-poppins ${widgetTheme.labelColor}`}>Air quality</span>
                        <span className={`text-sm font-medium flex items-center gap-1.5 font-poppins ${widgetTheme.valueColor}`}>
                          <Leaf size={14} className="opacity-60 flex-shrink-0" />
                          <span>{isWeatherLoading ? "—" : `${aqiValue} (${getAQIDesc(aqiValue)})`}</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[10px] font-bold tracking-wider font-poppins ${widgetTheme.labelColor}`}>Humidity</span>
                        <span className={`text-sm font-medium flex items-center gap-1.5 font-poppins ${widgetTheme.valueColor}`}>
                          <Droplets size={14} className="opacity-60 flex-shrink-0" />
                          <span>{isWeatherLoading ? "—" : `${liveWeather?.humidity || "65"}%`}</span>
                        </span>
                      </div>
                    </div>

                    {/* Bottom Temperature Value Block */}
                    <div className="absolute bottom-6 right-8 text-right flex items-baseline">
                      <span className={`text-6xl font-light font-montserrat tracking-tighter leading-none ${widgetTheme.textColor}`}>
                        {isWeatherLoading ? "—" : liveWeather ? Math.round(liveWeather.temp) : "30"}
                      </span>
                      <span className={`text-2xl font-normal font-montserrat leading-none select-none ml-0.5 ${widgetTheme.subTextColor}`}>°C</span>
                    </div>

                  </div>

                  {/* B. Premium Monthly / Period Weather Guide */}
                  <div className="lg:col-span-6 bg-white p-8 rounded-[2.5rem] border border-neutral-200/50 shadow-sm flex flex-col justify-between text-left min-h-[300px]">
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                        <h4 className="font-bold text-neutral-800 font-montserrat text-xs tracking-wider">
                          {t("practical.climate_title", "Climate & Seasonal Planner")}
                        </h4>
                        
                        {/* iOS-Style Pill Switcher */}
                        <div className="flex p-0.5 bg-neutral-100 rounded-full border border-neutral-200/40">
                          <button
                            onClick={() => setClimateSubTab("seasons")}
                            className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all duration-300 ${
                              climateSubTab === "seasons"
                                ? "bg-white text-neutral-900 shadow-sm"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            Seasons
                          </button>
                          <button
                            onClick={() => setClimateSubTab("monthly")}
                            className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all duration-300 ${
                              climateSubTab === "monthly"
                                ? "bg-white text-neutral-900 shadow-sm"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            12-Month Grid
                          </button>
                        </div>
                      </div>

                      {/* Display content dynamically based on selected sub-tab */}
                      {climateSubTab === "seasons" ? (
                        <div className="space-y-4 pt-1">
                          <p className="text-neutral-500 font-light text-xs leading-relaxed font-poppins">
                            Average local temperature is <strong>{currentDest.temp}</strong>. The region experiences distinct seasonal variations determined by Sri Lanka's tropical monsoonal cycles:
                          </p>

                          <div className="space-y-3 pt-2">
                            {destinationClimate.monsoons.map((mon, idx) => (
                              <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between text-[9px] font-bold font-poppins tracking-wider">
                                  <span className="text-neutral-700">{mon.name} ({mon.period})</span>
                                  <span className={
                                    mon.rating === "Perfect" ? "text-emerald-600" :
                                    mon.rating === "Good" ? "text-blue-500" : "text-amber-500"
                                  }>{mon.status}</span>
                                </div>
                                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full transition-all duration-500 ${
                                    mon.rating === "Perfect" ? "bg-emerald-500" :
                                    mon.rating === "Good" ? "bg-blue-400" : "bg-amber-400"
                                  }`} style={{ width: `${mon.progress}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 pt-1">
                          
                          {/* 12-Month Calendar Grid */}
                          <div className="grid grid-cols-6 gap-1.5">
                            {destinationClimate.months.map((m, idx) => {
                              const isSelected = selectedMonthIdx === idx;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedMonthIdx(idx)}
                                  className={`py-2 rounded-xl text-center flex flex-col items-center justify-between border transition-all duration-300 ${
                                    isSelected
                                      ? "bg-neutral-900 border-neutral-900 text-white shadow-md shadow-neutral-900/10 scale-105"
                                      : "bg-white border-neutral-200/60 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                                  }`}
                                >
                                  <span className="text-[9px] font-bold tracking-wider font-poppins">{m.month}</span>
                                  <span className="text-xs my-0.5">{m.icon}</span>
                                  <span className="text-[10px] font-semibold">{m.temp}°</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Interactive advice card below grid */}
                          <div className="bg-neutral-50 border border-neutral-200/40 p-4 rounded-2xl flex gap-4 items-start transition-all duration-500">
                            <div className="text-3xl mt-0.5 select-none">
                              {destinationClimate.months[selectedMonthIdx].icon}
                            </div>
                            <div className="space-y-1">
                              <div className="flex gap-2 items-center flex-wrap">
                                <h5 className="font-bold text-neutral-800 text-xs font-montserrat tracking-wider">
                                  {destinationClimate.months[selectedMonthIdx].month} Climate Suitability
                                </h5>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider ${
                                  destinationClimate.months[selectedMonthIdx].suitability === "Perfect"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : destinationClimate.months[selectedMonthIdx].suitability === "Good"
                                    ? "bg-blue-100 text-blue-800"
                                    : destinationClimate.months[selectedMonthIdx].suitability === "Fair"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {destinationClimate.months[selectedMonthIdx].suitability}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-500 leading-relaxed font-poppins font-light">
                                {destinationClimate.months[selectedMonthIdx].tip}
                              </p>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>

                    <p className="text-[10px] text-neutral-400 font-poppins font-light border-t border-neutral-100 pt-3 mt-4">
                      * Seasonal periods are estimated according to long-term meteorological datasets in Sri Lanka.
                    </p>

                  </div>

                </div>
              )}
            </div>


            {/* Destination features grid ("Regional Characteristics") - NO PACKAGE INCLUSIONS */}
            <div className="space-y-4 pt-6 border-t border-neutral-100">
              <h3 className="font-montserrat font-semibold text-neutral-900 text-lg tracking-tight">
                {t("destinations.features_title", "Regional Characteristics")}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {currentDest.features && currentDest.features.length > 0 ? (
                  currentDest.features.map((feat, idx) => {
                    const IconComp = getFeatureIcon(feat);
                    return (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                          <IconComp size={16} />
                        </div>
                        <span className="text-xs text-neutral-700 font-poppins">{t(feat)}</span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                        <Eye size={16} />
                      </div>
                      <span className="text-xs text-neutral-700 font-poppins">{t("features.scenic", "Scenic Viewpoints")}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                        <Landmark size={16} />
                      </div>
                      <span className="text-xs text-neutral-700 font-poppins">{t("features.heritage", "Ancient Heritage Site")}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                        <Footprints size={16} />
                      </div>
                      <span className="text-xs text-neutral-700 font-poppins">{t("features.hiking", "Hiking & Walking Trails")}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                        <Utensils size={16} />
                      </div>
                      <span className="text-xs text-neutral-700 font-poppins">{t("features.dining", "Traditional Dining")}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                        <Wifi size={16} />
                      </div>
                      <span className="text-xs text-neutral-700 font-poppins">{t("features.connectivity", "Strong 4G Connectivity")}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                        <MapIcon size={16} />
                      </div>
                      <span className="text-xs text-neutral-700 font-poppins">{t("features.accessibility", "Direct Road Access")}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* C. Full-Width Map (Concept 2 bottom) */}
        <div className="mt-14 space-y-4 text-left">
          <h3 className="font-montserrat font-semibold text-neutral-900 text-xl tracking-tight">
            {t("destinations.location_title", "The location you are going to")}
          </h3>
          <div className="w-full h-[400px]  overflow-hidden border border-neutral-200/50">
            <Map 
              center={[currentDest.lat, currentDest.lng]}
              zoom={10}
              markers={mapMarkers}
              activeMarkerIndex={0}
            />
          </div>
        </div>

        {/* D. Premium Gallery Showcase */}
        <div className="mt-16 space-y-6 text-left">
          <div className="space-y-3">
            
            <h3 className="font-montserrat font-bold text-neutral-900 text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none">
              {t(currentDest.name)}
            </h3>
            <p className="text-neutral-500 text-sm md:text-base font-light font-poppins leading-relaxed max-w-3xl">
              {t(currentDest.description)}
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              if (currentDest.gallery && currentDest.gallery.length > 0) {
                return currentDest.gallery.map((imgUrl, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="aspect-[4/3] relative rounded-none overflow-hidden border border-neutral-200/50 shadow-md group bg-neutral-100"
                  >
                    <NextImage 
                      src={imgUrl} 
                      alt={`${currentDest.name} Gallery ${imgIdx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ));
              }

              const galleryKey = currentDest.id.startsWith("d") 
                ? currentDest.id 
                : mockDestinations.find(m => m.name.toLowerCase() === currentDest.name.toLowerCase())?.id || "d1";
              const galleryImages = destinationGallery[galleryKey] || [currentDest.image, "/bento/sigiriya.png", "/bento/ella-bridge.png"];
              return galleryImages.map((imgUrl, imgIdx) => (
                <div 
                  key={imgIdx} 
                  className="aspect-[4/3] relative rounded-none overflow-hidden border border-neutral-200/50 shadow-md group bg-neutral-100"
                >
                  <NextImage 
                    src={imgUrl} 
                    alt={`${currentDest.name} Gallery ${imgIdx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ));
            })()}
          </div>
        </div>

      </section>

      {/* 3. Modern Alternating Curved Carousel Section (Screenshot 3 Concept) */}
      <section className="w-full py-16 bg-[#0E1B15] text-white select-none relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-8 max-w-[1280px] relative z-10 text-left">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              
              
              <h2 className="text-3xl md:text-4xl font-light font-montserrat tracking-tight leading-tight max-w-[650px]">
                {t("destinations.carousel_headline", "Although a picture describes a thousand words, some story and experiences are better described in detail.")}
              </h2>
            </div>
            
            {/* Round chevrons navigation */}
            <div className="flex gap-2.5">
              <button 
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-white/20 text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-white/20 text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards carousel grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.slice(0, 4).map((dest, idx) => {
              // Map display index dynamically based on pagination offset if desired, or show first 4 for high fidelity
              const absoluteIdx = idx; 
              const isSelected = absoluteIdx === activeIndex;

              return (
                <div 
                  key={dest.id}
                  onClick={() => {
                    setActiveIndex(absoluteIdx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative aspect-[3/4] overflow-hidden cursor-pointer shadow-lg transition-all duration-500 group select-none rounded-none`}
                >
                  {/* Card Background image */}
                  <NextImage 
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 250px"
                  />
                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent z-10" />

                  {/* Overlapping text box at the bottom (Screenshot 3 Concept) */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white text-neutral-900 p-5 rounded-2xl z-20 shadow-md text-left flex flex-col justify-between">
                    <div>
                      <h4 className="font-montserrat font-semibold text-[0.82rem] tracking-tight mb-1 text-neutral-900">
                        {t(dest.name)}
                      </h4>
                      <p className="text-[9px] text-neutral-400 font-poppins font-light leading-normal line-clamp-2">
                        {t(dest.description)}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-neutral-50 flex items-center justify-center pt-28">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-poppins text-neutral-400">Loading custom destinations...</p>
        </div>
      </div>
    }>
      <DestinationsContent />
    </Suspense>
  );
}
