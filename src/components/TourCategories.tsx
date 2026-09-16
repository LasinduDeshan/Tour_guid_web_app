"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { Hotel, Car, Compass, Ticket } from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

// Custom inline SVG mimicking the abstract node Brand Icon from the mockup
const BrandIcon = ({ className = "w-7 h-7" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2.2" fill="currentColor" />
    <circle cx="6" cy="12" r="2.2" fill="currentColor" />
    <circle cx="18" cy="12" r="2.2" fill="currentColor" />
    <circle cx="12" cy="19" r="2.2" fill="currentColor" />
    <line x1="12" y1="7.2" x2="12" y2="16.8" />
    <line x1="8.2" y1="12" x2="15.8" y2="12" />
  </svg>
);

const getIcon = (name: string, color: string) => {
  const props = { className: `w-5 h-5 mt-0.5 ${color} flex-shrink-0` };
  switch (name) {
    case "Hotel": return <Hotel {...props} />;
    case "Car": return <Car {...props} />;
    case "Compass": return <Compass {...props} />;
    case "Ticket": return <Ticket {...props} />;
    default: return <Compass {...props} />;
  }
};

interface Inclusion {
  icon: string;
  title: string;
  desc: string;
}

interface Package {
  id: string;
  title: string;
  highlight: string;
  headerDesc: string;
  tabName: string;
  sectionBg: string;
  
  card1Title: string;
  card1Desc: string;
  card1FooterTitle: string;
  card1FooterSub: string;
  card1Bg: string;
  card1Text: string;
  
  card2Title: string;
  card2Desc: string;
  card2Image: string;
  card2Link: string;
  card2Button: string;
  
  card3Bg: string;
  card3Text: string;
  card3Title: string;
  card3Footer: string;
  card3Inclusions: Array<{ icon: string; title: string; desc: string }>;
  
  card4Title: string;
  card4Desc: string;
  card4Image: string;
  card4Link: string;
  card4Button: string;
}

const packages: Package[] = [
  {
    id: "grand-odyssey",
    title: "Signature",
    highlight: "Discovery.",
    headerDesc: "Our flagship handcrafted itinerary, designed to give you the perfect balance of ancient heritage, misty tea hills, wildlife, and scenic southern coastlines.",
    tabName: "Signature Tour",
    sectionBg: "bg-[#9CBFA7]",
    
    card1Title: "Windmark Signature Discovery.",
    card1Desc: "Designed for travelers who want a complete, unhurried Sri Lankan journey. This carefully paced route seamlessly connects ancient kingdoms, cool tea country valleys, thrilling safaris, and golden sandy beaches.",
    card1FooterTitle: "Signature Discovery",
    card1FooterSub: "10-Day Complete Island Journey",
    card1Bg: "bg-[#0E1B15]",
    card1Text: "text-white",
    
    card2Title: "Ancient Heritage.",
    card2Desc: "Scale the majestic Sigiriya Rock Fortress, wander the sacred ruins of Polonnaruwa, and step back in time.",
    card2Image: "/bento/sigiriya.png",
    card2Link: "/tours/1",
    card2Button: "Explore Heritage ↗",

    card3Bg: "bg-[#C5B4F3]",
    card3Text: "text-[#002244]",
    card3Title: "Trip Inclusions",
    card3Footer: "*Customizable pacing, optional extensions & daily breakfast included",
    card3Inclusions: [
      { icon: "Hotel", title: "Handpicked Boutique Stays", desc: "Comfortable scenic hotels, tea country lodges & seaside villas" },
      { icon: "Car", title: "Private AC Transport", desc: "Dedicated local chauffeur-guide throughout your journey" },
      { icon: "Compass", title: "Guided 4x4 Wildlife Safari", desc: "Jeep safari in Yala or Minneriya with experienced trackers" },
      { icon: "Ticket", title: "Pre-arranged Admissions", desc: "Hassle-free admissions to Sigiriya, tea estates & key sites" }
    ],

    card4Title: "Highland Soul.",
    card4Desc: "Ride through misty Ella highlands, rolling green tea gardens, and marvel at the iconic Nine Arch Bridge.",
    card4Image: "/bento/ella-bridge.png",
    card4Link: "/tours/2",
    card4Button: "Book Journey ↗"
  },
  {
    id: "wild-safari",
    title: "Untamed",
    highlight: "Wilderness.",
    headerDesc: "A deep dive into Sri Lanka's rich wildlife sanctuaries. Spot leopards, wild elephant gatherings, and colorful birdlife in comfort.",
    tabName: "Wild Safari",
    sectionBg: "bg-[#A3937C]",

    card1Title: "Bespoke Wildlife Safari.",
    card1Desc: "Step into deep sanctuaries where nature thrives. Designed for wildlife lovers and nature photographers, this journey brings you close to wild elephants, leopards, and diverse flora with experienced local naturalists.",
    card1FooterTitle: "Wilderness Expedition",
    card1FooterSub: "7-Day Wildlife & Nature Tour",
    card1Bg: "bg-[#1E1915]",
    card1Text: "text-white",

    card2Title: "Leopard Kingdom.",
    card2Desc: "Track leopards and native wildlife through the dry-zone forests of Yala National Park in a private 4x4 jeep.",
    card2Image: "/bento/leopard.png",
    card2Link: "/tours/3",
    card2Button: "Explore Yala ↗",

    card3Bg: "bg-[#F3DEC5]",
    card3Text: "text-[#4A2E05]",
    card3Title: "Safari Inclusions",
    card3Footer: "*Custom 4x4 vehicles & local park trackers included",
    card3Inclusions: [
      { icon: "Hotel", title: "Quality Nature Lodges", desc: "Comfortable nature lodges & safari hotels near national parks" },
      { icon: "Compass", title: "Experienced Trackers", desc: "Knowledgeable local guides with deep wildlife spotting skills" },
      { icon: "Car", title: "Dedicated Safari Jeeps", desc: "Private 4x4 game drives timed for best animal sightings" },
      { icon: "Ticket", title: "Park Entry & Permits", desc: "All sanctuary permits and park entrance fees covered" }
    ],

    card4Title: "Majestic Herds.",
    card4Desc: "Witness the magnificent gathering of Asian elephants drinking and grazing at the scenic Minneriya reservoir.",
    card4Image: "/tours/yala.jpg",
    card4Link: "/tours/3",
    card4Button: "View Safari ↗"
  },
  {
    id: "beach-escape",
    title: "Oceanic",
    highlight: "Sanctuaries.",
    headerDesc: "Unwind along Sri Lanka's sun-drenched southern coastlines. Enjoy fresh seafood, coastal walks, and calm turquoise waters.",
    tabName: "Beach Escape",
    sectionBg: "bg-[#7CA3A8]",

    card1Title: "Southern Coasts & Galle.",
    card1Desc: "Breathe in the golden horizons of Mirissa and the historical charm of Galle Fort. Enjoy beachfront relaxation, boat trips to spot blue whales, and cobblestone heritage walks at an easy, enjoyable pace.",
    card1FooterTitle: "Coastal Escape",
    card1FooterSub: "8-Day Southern Island Tour",
    card1Bg: "bg-[#091C2C]",
    card1Text: "text-white",

    card2Title: "Golden Mirissa.",
    card2Desc: "Unwind on soft sandy beaches, sip fresh king coconuts, and take in the relaxing ocean breeze.",
    card2Image: "/bento/mirissa-beach.png",
    card2Link: "/tours?category=Beach%20Tours",
    card2Button: "Explore Beaches ↗",

    card3Bg: "bg-[#C4E1F3]",
    card3Text: "text-[#002B49]",
    card3Title: "Coastal Highlights",
    card3Footer: "*Custom extensions & beachfront recommendations included",
    card3Inclusions: [
      { icon: "Hotel", title: "Seaside Boutique Hotels", desc: "Handpicked beach resorts and comfortable ocean-view stays" },
      { icon: "Ticket", title: "Whale Watching Excursion", desc: "Morning boat trip off Mirissa coast to spot whales & dolphins" },
      { icon: "Compass", title: "Galle Fort Walking Tour", desc: "Guided stroll along Dutch ramparts, lighthouse, and artisan lanes" },
      { icon: "Car", title: "Private Coastal Transit", desc: "Comfortable air-conditioned private rides along the southern expressway" }
    ],

    card4Title: "Highland & Shore Flow.",
    card4Desc: "Combine the cool misty rails of Ella with relaxed sunny afternoons on golden southern shores.",
    card4Image: "/bento/ella-bridge.png",
    card4Link: "/tours?category=Beach%20Tours",
    card4Button: "View Retreat ↗"
  },
  {
    id: "royal-heritage",
    title: "Cultural",
    highlight: "Resplendence.",
    headerDesc: "Journey through the ancient kingdoms of the Cultural Triangle. Walk among sacred stupas, royal palaces, and timeless temple ruins.",
    tabName: "Cultural Route",
    sectionBg: "bg-[#A57C8A]",

    card1Title: "Ancient Kingdoms Tour.",
    card1Desc: "Explore the rich spiritual and architectural legacy of Sri Lanka. From the last royal kingdom in Kandy to the rock fortress of Sigiriya, this route is crafted for travelers who love history and culture.",
    card1FooterTitle: "Cultural Journey",
    card1FooterSub: "6-Day Heritage & Hills Tour",
    card1Bg: "bg-[#2A0B1A]",
    card1Text: "text-white",

    card2Title: "Sacred Kandy.",
    card2Desc: "Visit the revered Temple of the Tooth Relic, stroll the royal botanical gardens, and admire sunset over Kandy lake.",
    card2Image: "/tours/kandy.jpg",
    card2Link: "/tours/2",
    card2Button: "Explore Kandy ↗",

    card3Bg: "bg-[#F3C5DC]",
    card3Text: "text-[#4A0025]",
    card3Title: "Heritage Inclusions",
    card3Footer: "*All temple visits & cultural admissions included",
    card3Inclusions: [
      { icon: "Hotel", title: "Comfortable Heritage Stays", desc: "Charming historic bungalows and peaceful hillside hotels" },
      { icon: "Compass", title: "Knowledgeable Guide", desc: "Insightful commentary on Sri Lankan history, flora, and customs" },
      { icon: "Ticket", title: "Cultural Dance Tickets", desc: "Traditional Kandyan drumming & dance performance entry" },
      { icon: "Car", title: "Scenic Mountain Transfers", desc: "Smooth driving through lush mountain passes and spice gardens" }
    ],

    card4Title: "Sigiriya Golden Hours.",
    card4Desc: "Witness the majestic rock fortress lit up by the warm glow of the afternoon sun.",
    card4Image: "/bento/sigiriya.png",
    card4Link: "/tours/1",
    card4Button: "View Cultural ↗"
  }
];

interface TourCategoriesProps {
  initialPackages?: any[];
}

const TourCategories = ({ initialPackages }: TourCategoriesProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t, language } = useTranslation();
  
  // Use initialPackages if provided, otherwise fallback to the hardcoded static packages
  const [pkgs, setPkgs] = useState<any[]>(
    initialPackages && initialPackages.length > 0 ? initialPackages : packages
  );

  // Fetch packages from API whenever language changes to get fresh translated database entries!
  useEffect(() => {
    let active = true;
    fetch(`/api/bento-packages?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setPkgs(data);
        }
      })
      .catch((err) => console.error("Error fetching packages in client:", err));
      
    return () => {
      active = false;
    };
  }, [language]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % pkgs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, pkgs.length]);

  const activePkg = pkgs[activeIdx] || pkgs[0] || packages[0];


  // Stagger container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Card slide-up
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as const 
      } 
    }
  };

  return (
    <section className={`py-14 sm:py-20 md:py-24 ${activePkg.sectionBg} relative overflow-hidden transition-colors duration-1000`}>
      {/* Subtle organic background glowing circle */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10 max-w-[1280px]">
        
        {/* Editorial Section Header */}
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 text-white text-left">
          <div className="max-w-[600px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight font-montserrat">
              {t(activePkg.title)} <br />
              <span className="font-semibold">{t(activePkg.highlight)}</span>
            </h2>
          </div>
          <p className="text-white/80 text-sm md:text-base font-light font-poppins max-w-[420px] leading-relaxed">
             {t(activePkg.headerDesc)}
          </p>
        </div>

        {/* Sleek Pagination Indicators */}
        <div className="mb-10 flex gap-2 justify-start relative z-20">
          {pkgs.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                activeIdx === idx ? "bg-white w-10 shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "bg-white/20 w-2.5"
              }`}
            />
          ))}
        </div>

        {/* Categories 4-Card Grid with Asymmetric Editorial Staggering */}
        <motion.div 
          key={activeIdx} // Re-triggers stagger animations perfectly on transition!
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* CARD 1: Package Description Card */}
          <motion.div 
            variants={cardVariants}
            className={`h-[600px] ${activePkg.card1Bg} ${activePkg.card1Text} p-8 rounded-[1.8rem] flex flex-col justify-between relative overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] group`}
          >
            <div>
              <div className="mb-12">
                <BrandIcon className="text-white w-7 h-7" />
              </div>
              
              <div className="space-y-6 text-left">
                <p className="text-2xl md:text-3xl font-light font-serif leading-snug tracking-tight text-white/95">
                  {t(activePkg.card1Title)}
                </p>
                <p className="text-sm md:text-base font-light font-serif leading-relaxed text-neutral-300/90">
                  {t(activePkg.card1Desc)}
                </p>
              </div>
            </div>

            <div className="text-left mt-auto">
              <p className="text-sm font-semibold text-white font-serif">{t(activePkg.card1FooterTitle)}</p>
              <p className="text-xs text-neutral-400 font-poppins font-light">{t(activePkg.card1FooterSub)}</p>
            </div>
          </motion.div>

          {/* CARD 2: Shorter Full-Card Background Image - Leg 1 */}
          <motion.div 
            variants={cardVariants}
            className="h-[520px] lg:mt-16 rounded-[1.8rem] relative overflow-hidden border border-white/10 shadow-md hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-4 flex flex-col justify-between group"
          >
            <div className="absolute inset-0 z-0">
              <NextImage 
                src={activePkg.card2Image} 
                alt={activePkg.card2Title} 
                fill 
                className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30 z-10" />

            <div className="relative p-8 z-20 flex flex-col h-full justify-between">
              <div className="mb-6 text-left">
                <BrandIcon className="text-white w-7 h-7" />
              </div>
              
              <div className="mt-auto space-y-4">
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-light font-serif leading-tight tracking-tight text-white mb-2">
                    {t(activePkg.card2Title)}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-300 font-light font-poppins leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-auto overflow-hidden">
                    {t(activePkg.card2Desc)}
                  </p>
                </div>

                <Link 
                  href={activePkg.card2Link}
                  className="w-full bg-white text-black py-3.5 px-6 rounded-full text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors font-poppins"
                >
                  {t(activePkg.card2Button)}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Facilities / Inclusions Card */}
          <motion.div 
            variants={cardVariants}
            className={`h-[570px] lg:-mt-4 ${activePkg.card3Bg} ${activePkg.card3Text} p-8 rounded-[1.8rem] flex flex-col justify-between relative overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] group`}
          >
            <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full border border-white/25 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-1/4 -right-16 w-80 h-80 rounded-full border border-white/25 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <BrandIcon className={`${activePkg.card3Text} w-7 h-7`} />
              </div>
              
              <div className="text-left space-y-4">
                <h4 className="text-xs font-semibold font-poppins opacity-80 mb-4">
                  {t(activePkg.card3Title)}
                </h4>
                <ul className="space-y-4 text-xs font-medium font-poppins opacity-95">
                  {((activePkg.card3Inclusions as any[]) || []).map((inclusion: Inclusion, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      {getIcon(inclusion.icon, activePkg.card3Text)}
                      <div>
                        <p className="font-semibold text-sm leading-tight mb-0.5">{t(inclusion.title)}</p>
                        <p className="text-[10px] opacity-75 leading-tight">{t(inclusion.desc)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-left mt-auto pt-4">
              <p className="text-[10px] md:text-[11px] font-poppins font-medium opacity-80">
                {t(activePkg.card3Footer)}
              </p>
            </div>
          </motion.div>

          {/* CARD 4: Leg 2 */}
          <motion.div 
            variants={cardVariants}
            className="h-[540px] lg:mt-8 rounded-[1.8rem] relative overflow-hidden border border-white/10 shadow-md hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-4 flex flex-col justify-between group"
          >
            <div className="absolute inset-0 z-0">
              <NextImage 
                src={activePkg.card4Image} 
                alt={activePkg.card4Title} 
                fill 
                className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30 z-10" />

            <div className="relative p-8 z-20 flex flex-col h-full justify-between">
              <div className="mb-6 text-left">
                <BrandIcon className="text-white w-7 h-7" />
              </div>

              <div className="mt-auto space-y-4">
                <div className="text-left">
                  <h3 className="text-2xl font-light font-serif leading-tight text-white tracking-tight mb-2">
                    {t(activePkg.card4Title)}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-300 font-light font-poppins leading-relaxed">
                    {t(activePkg.card4Desc)}
                  </p>
                </div>

                <Link 
                  href={activePkg.card4Link}
                  className="w-full bg-white text-black py-3.5 px-6 rounded-full text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors font-poppins"
                >
                  {t(activePkg.card4Button)}
                </Link>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default TourCategories;
