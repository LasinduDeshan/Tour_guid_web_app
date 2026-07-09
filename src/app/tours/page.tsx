"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mockTours, Tour } from "@/lib/data";
import TourCard from "@/components/TourCard";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslation } from "@/lib/LanguageContext";
import { 
  Search, 
  Calendar, 
  Users, 
  Mail, 
  User, 
  MessageSquare, 
  X, 
  Check, 
  Loader2,
  Hotel,
  Car,
  Compass,
  Ticket,
  Utensils,
  Wifi,
  Sparkles,
  MapPin
} from "lucide-react";
import NextImage from "next/image";
import { Map, MapControls } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

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

function ToursContent() {
  const { formatPrice } = useCurrency();
  const { t, language } = useTranslation();

  const formatFromPrice = (usdPrice: number) => {
    const formatted = formatPrice(usdPrice);
    if (language === "zh") {
      return `${formatted} 起`;
    }
    const fromText = language === "fr" ? "Dès" : language === "de" ? "Ab" : language === "es" ? "Desde" : "From";
    return `${fromText} ${formatted}`;
  };

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [categories, setCategories] = useState<string[]>([
    "All",
    "Colombo Tours",
    "Beach Tours",
    "Cultural Tours",
    "Adventure Tours",
    "Wildlife Tours",
    "Ayurvedic Tours",
    "Hill Country Tours",
    "Honeymoon Tours",
    "Family Tours",
    "Golf Tours",
    "Ramayana Tours"
  ]);

  // Fetch Tours dynamically from PostgreSQL database via Prisma
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoadingTours(true);
        const res = await fetch(`/api/tours?lang=${language}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setTours(data);

          // Dynamically aggregate and merge any custom tour categories in the database
          const dbCategories = Array.from(new Set(data.map((t: any) => t.category)))
            .filter(Boolean) as string[];

          const merged = ["All", ...Array.from(new Set([
            "Colombo Tours",
            "Beach Tours",
            "Cultural Tours",
            "Adventure Tours",
            "Wildlife Tours",
            "Ayurvedic Tours",
            "Hill Country Tours",
            "Honeymoon Tours",
            "Family Tours",
            "Golf Tours",
            "Ramayana Tours",
            ...dbCategories
          ]))];
          setCategories(merged);
        }
      } catch (err) {
        console.error("Failed to load tour packages:", err);
      } finally {
        setIsLoadingTours(false);
      }
    };
    fetchTours();
  }, [language]);
  
  // Sync category parameter on load or change
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
  }, [categoryParam]);

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

  // Filter & Sort logic
  const filteredTours = tours
    .filter((tour) => {
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || t(tour.category) === t(activeCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "duration") return a.duration.localeCompare(b.duration);
      return 0; // default
    });


  return (
    <div className="w-full min-h-screen bg-neutral-50 pb-24 pt-0">
      
      {/* Dynamic Editorial Panoramic Page Hero */}
      <div className="w-full relative bg-white pb-0">
        {/* Panoramic Beach Image Banner with integrated Typography Overlay */}
        <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] overflow-hidden flex items-center justify-center">
          <NextImage 
            src="/bento/sheshan-r-ZDBA3GnBzGQ-unsplash.jpg" 
            alt="Seamless Journeys Across Sri Lanka" 
            fill 
            priority
            className="object-cover object-[center_35%] z-0"
          />
          {/* Elegant Dark Gradient Overlay for Maximum Casing Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55 z-10" />

          {/* Centered Typography Header block inside the Hero Image */}
          <div className="container mx-auto px-8 max-w-[1280px] text-center relative z-20 pb-24 md:pb-28">
            <h1 className="flex flex-col text-center font-montserrat mb-4 drop-shadow-md">
              <span className="text-lg md:text-xl lg:text-2xl font-light text-white/95 tracking-tight mb-1">
                Bespoke Premium Expeditions
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none mt-1">
                The Wonder of Sri Lanka
              </span>
            </h1>
            
            <p className="text-white/85 font-light text-xs sm:text-sm md:text-base max-w-[750px] mx-auto font-poppins leading-relaxed drop-shadow-sm">
              Embark on an extraordinary journey through the island's timeless wonders. From pristine coasts to misty highlands, our custom-tailored itineraries offer seamless private travel, elite local guides, and authentic cultural immersions designed just for you.
            </p>
          </div>

          {/* Subtle bottom shadow gradient line */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-neutral-50 to-transparent z-20" />
        </div>
      </div>

      {/* Catalog Filters and Search Controls (Floating on top of the Hero Image) */}
      <div className="relative z-30 -mt-20 md:-mt-24 container mx-auto px-8 max-w-[1280px] mb-12">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-100/80 flex flex-col gap-6">

          
          {/* Top Control Bar: Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search packages, landmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 bg-neutral-50 border border-neutral-100 hover:border-neutral-200 focus:border-neutral-300 focus:bg-white rounded-full text-sm font-poppins font-light text-neutral-800 outline-none transition-all duration-300"
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="w-full md:w-auto flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-400 font-poppins whitespace-nowrap">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-48 bg-neutral-50 border border-neutral-100 hover:border-neutral-200 focus:border-neutral-300 focus:bg-white py-3.5 px-6 rounded-full text-xs font-semibold text-neutral-700 font-poppins outline-none transition-all duration-300 cursor-pointer appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.25em 1.25em", paddingRight: "2.5rem" }}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2.5 px-6 rounded-full text-xs font-semibold transition-all duration-300 font-poppins ${
                  activeCategory === category
                    ? "bg-[#0E1B15] text-white shadow-md scale-105"
                    : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {t(category)}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Dynamic Tours Grid */}
      <div className="container mx-auto px-8 max-w-[1280px]">
        {isLoadingTours ? (
          <div className="flex flex-col gap-4 items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="text-sm font-poppins text-neutral-400">Loading dynamic tour experiences...</span>
          </div>
        ) : filteredTours.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredTours.map((tour) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedTour(tour)}
                  className="cursor-pointer"
                >
                  <TourCard tour={tour} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="bg-white p-16 text-center border border-neutral-100/80 shadow-sm max-w-xl mx-auto rounded-3xl">
            <p className="text-lg font-semibold text-neutral-800 mb-2 font-montserrat">No tours match your search</p>
            <p className="text-sm text-neutral-400 font-poppins font-light leading-relaxed mb-6">
              We couldn't find any packages matching "{searchQuery}". Try searching for another keyword or change your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="py-3 px-8 rounded-full bg-[#0E1B15] text-white text-xs font-semibold hover:bg-neutral-800 transition-colors font-poppins"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-blue-500 font-poppins">
                      {selectedTour.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                    <span className="text-[0.65rem] font-bold text-neutral-400 font-poppins">
                      {selectedTour.duration}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-semibold leading-tight text-neutral-950 font-montserrat tracking-tight">
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
                        <NextImage
                          src={selectedTour.image}
                          alt={selectedTour.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-1.5 rounded-xl font-bold text-xs shadow-md font-montserrat uppercase">
                          {formatFromPrice(selectedTour.price)}
                        </div>
                      </div>

                      {/* Package Description */}
                      <div>
                        <h5 className="text-xs font-semibold text-blue-500 mb-2 font-poppins">
                          About the Journey
                        </h5>
                        <p className="text-neutral-600 font-light text-xs sm:text-sm leading-relaxed font-poppins">
                          {selectedTour.description}
                        </p>
                      </div>

                      {/* Facilities Checklist */}
                      <div>
                        <h5 className="text-xs font-bold text-neutral-400 mb-3.5 font-poppins">
                          What's Included (Facilities)
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {selectedTour.facilities.map((fac, i) => {
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
                      <div className="lg:col-span-6 relative flex flex-col gap-4 max-h-[360px] md:max-h-[420px] overflow-y-auto pr-2">
                        {/* Timeline Connector Line */}
                        <div className="absolute left-6 top-3 bottom-3 w-0.5 border-l-2 border-dashed border-neutral-100" />
                        
                        {selectedTour.roadmap.map((step, index) => {
                          const isActive = index === activeStepIndex;
                          return (
                            <div
                              key={step.day}
                              onClick={() => setActiveStepIndex(index)}
                              className="relative pl-12 cursor-pointer group select-none"
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
                                className={`p-4 rounded-2xl border transition-all duration-300 ${
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
                                
                                {/* Collapsible description with Framer Motion */}
                                <motion.div
                                  initial={false}
                                  animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                                  transition={{ duration: 0.35, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-[11px] text-neutral-500 font-light font-poppins leading-relaxed mt-2 pt-2 border-t border-neutral-200/50 animate-fadeIn">
                                    {step.description}
                                  </p>
                                </motion.div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: Interactive Real Map of Sri Lanka */}
                      <Card className="lg:col-span-6 h-[360px] md:h-[420px] p-0 overflow-hidden relative border border-neutral-100/80 rounded-3xl">
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
                      <div className="mb-8">
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
                        <div className="space-y-1.5">
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
                        <div className="space-y-1.5">
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
                          <div className="space-y-1.5">
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
                          <div className="space-y-1.5">
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
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-neutral-400 font-poppins">Special Requirements (Optional)</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-3 text-neutral-400 w-4 h-4" />
                            <textarea
                              name="message"
                              rows={3}
                              placeholder="Tell us about special food preferences, accommodation needs..."
                              value={formData.message}
                              onChange={handleInputChange}
                              className="w-full bg-neutral-100/60 focus:bg-white border border-transparent focus:border-neutral-200 pl-11 pr-5 py-3 rounded-2xl text-sm font-poppins font-light outline-none transition-all duration-300 resize-none"
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
                      
                      <p className="text-sm text-neutral-500 font-light font-poppins leading-relaxed max-w-md mb-8">
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

function ToursFallback() {
  return (
    <div className="w-full min-h-screen bg-neutral-50 flex items-center justify-center pt-28">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm font-poppins text-neutral-400">Loading crafted experiences...</p>
      </div>
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<ToursFallback />}>
      <ToursContent />
    </Suspense>
  );
}
