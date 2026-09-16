"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  Landmark,
  Mountain,
  Palmtree,
  Camera,
  CheckCircle2,
  Eye,
  Layers,
  RotateCcw,
  Loader2,
  Navigation
} from "lucide-react";

export type DestinationCategory = "all" | "heritage" | "highlands" | "wildlife" | "beaches";

export interface TravelDestination {
  id: string;
  name: string;
  sinhalaName?: string;
  tagline: string;
  category: "heritage" | "highlands" | "wildlife" | "beaches";
  categoryLabel: string;
  categoryColor: string;
  pinColor: string;
  region: string;
  bestTime: string;
  description: string;
  image: string;
  highlights: string[];
  lat: number;
  lng: number;
  popularRank: number;
}

export const POPULAR_DESTINATIONS: TravelDestination[] = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock Fortress",
    sinhalaName: "සීගිරිය",
    tagline: "The 5th-century ancient palace in the sky",
    category: "heritage",
    categoryLabel: "Ancient & Heritage",
    categoryColor: "bg-[#F6D352] text-amber-900 border-[#F6D352]",
    pinColor: "#F6D352",
    region: "Central Cultural Triangle",
    bestTime: "Year-Round (Best: Dec – Apr)",
    description:
      "A soaring 200-meter monolith crowned with King Kashyapa's royal citadel, mirror walls, and world-renowned ancient frescoes.",
    image: "/bento/sigiriya.png",
    highlights: ["UNESCO World Heritage", "Lion's Paw Staircase", "Symmetric Water Gardens"],
    lat: 7.9570,
    lng: 80.7603,
    popularRank: 1,
  },
  {
    id: "ella",
    name: "Ella & Nine Arch Bridge",
    sinhalaName: "ඇල්ල",
    tagline: "Misty mountain peaks & iconic colonial railway",
    category: "highlands",
    categoryLabel: "Hill Country & Tea",
    categoryColor: "bg-[#C5DF6C] text-emerald-900 border-[#C5DF6C]",
    pinColor: "#C5DF6C",
    region: "Central Highlands (Badulla)",
    bestTime: "Jan – May & Aug – Sep",
    description:
      "A scenic mountain village encircled by tea terraces, dramatic hiking trails like Little Adam's Peak, and the famous stone Nine Arch Viaduct.",
    image: "/bento/ella-bridge.png",
    highlights: ["Nine Arch Viaduct Bridge", "Little Adam's Peak Hike", "Ravana Falls & Tea Trails"],
    lat: 6.8667,
    lng: 81.0466,
    popularRank: 2,
  },
  {
    id: "yala",
    name: "Yala National Park",
    sinhalaName: "යාල",
    tagline: "World's highest density of wild leopards",
    category: "wildlife",
    categoryLabel: "Wildlife & Safari",
    categoryColor: "bg-[#2B528A] text-white border-[#2B528A]",
    pinColor: "#2B528A",
    region: "Southern & Uva Provinces",
    bestTime: "Feb – Jul (Dry Season)",
    description:
      "Sri Lanka's premier wildlife sanctuary boasting diverse ecosystems from coastal scrub to lagoons, home to leopards, elephants, and sloth bears.",
    image: "/bento/leopard.png",
    highlights: ["Ceylon Leopard Safaris", "Asian Elephant Herds", "Over 215 Bird Species"],
    lat: 6.3725,
    lng: 81.5167,
    popularRank: 3,
  },
  {
    id: "mirissa",
    name: "Mirissa & Weligama",
    sinhalaName: "මිරිස්ස",
    tagline: "Blue whale encounters & palm-lined surf bays",
    category: "beaches",
    categoryLabel: "Tropical Beaches",
    categoryColor: "bg-[#71C2BA] text-teal-950 border-[#71C2BA]",
    pinColor: "#71C2BA",
    region: "Southern Coast",
    bestTime: "Nov – Apr (Calm Waters)",
    description:
      "A tropical seaside haven famed for early morning blue whale expeditions, sunset beach shacks, surf breaks, and Coconut Tree Hill.",
    image: "/bento/mirissa-beach.png",
    highlights: ["Blue Whale Watching", "Coconut Tree Hill", "Beginner & Pro Surfing"],
    lat: 5.9483,
    lng: 80.4578,
    popularRank: 4,
  },
  {
    id: "galle",
    name: "Galle Dutch Fort",
    sinhalaName: "ගාල්ල",
    tagline: "Living 17th-century European fortified city",
    category: "heritage",
    categoryLabel: "Ancient & Heritage",
    categoryColor: "bg-[#F6D352] text-amber-900 border-[#F6D352]",
    pinColor: "#F6D352",
    region: "Southern Coast",
    bestTime: "Nov – Apr",
    description:
      "A UNESCO World Heritage fortress where cobblestone lanes meet boutique cafes, jewelers, colonial ramparts, and an oceanfront lighthouse.",
    image: "/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg",
    highlights: ["17th-Century Ramparts", "Ocean Lighthouse Walk", "Boutique Artisan Cafes"],
    lat: 6.0535,
    lng: 80.2210,
    popularRank: 5,
  },
  {
    id: "kandy",
    name: "Kandy Sacred City",
    sinhalaName: "මහනුවර",
    tagline: "Spiritual heartland & Temple of the Tooth",
    category: "heritage",
    categoryLabel: "Ancient & Heritage",
    categoryColor: "bg-[#F6D352] text-amber-900 border-[#F6D352]",
    pinColor: "#F6D352",
    region: "Central Province",
    bestTime: "Dec – Apr & Aug (Esala Perahera)",
    description:
      "The last royal capital of Sri Lanka, nestled around a tranquil lake and home to the sacred golden-roofed Temple of the Tooth Relic.",
    image: "/tours/kandy.jpg",
    highlights: ["Temple of the Sacred Tooth", "Royal Botanical Gardens", "Kandy Lake Promenade"],
    lat: 7.2906,
    lng: 80.6337,
    popularRank: 6,
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    sinhalaName: "නුවරඑළිය",
    tagline: "Ceylon tea estates & cool mountain climate",
    category: "highlands",
    categoryLabel: "Hill Country & Tea",
    categoryColor: "bg-[#C5DF6C] text-emerald-900 border-[#C5DF6C]",
    pinColor: "#C5DF6C",
    region: "Central Highlands",
    bestTime: "Feb – May",
    description:
      "Known as 'Little England', famed for emerald tea plantations, Tudor-style bungalows, Gregory Lake, and gateway to Horton Plains World's End.",
    image: "/bento/highland-wanderlust.jpg",
    highlights: ["World-Class Tea Factories", "Gregory Lake & Golf Course", "Horton Plains World's End"],
    lat: 6.9497,
    lng: 80.7891,
    popularRank: 7,
  },
  {
    id: "trincomalee",
    name: "Trincomalee & Nilaveli",
    sinhalaName: "ත්‍රිකුණාමලය",
    tagline: "Pristine white sands & marine national park",
    category: "beaches",
    categoryLabel: "Tropical Beaches",
    categoryColor: "bg-[#71C2BA] text-teal-950 border-[#71C2BA]",
    pinColor: "#71C2BA",
    region: "Eastern Province",
    bestTime: "May – Oct (East Coast Sunshine)",
    description:
      "Natural deep-water harbor with crystal turquoise waters, sacred clifftop Koneswaram Temple, and vibrant coral snorkeling at Pigeon Island.",
    image: "/bento/mirissa-beach.png",
    highlights: ["Pigeon Island Snorkeling", "Koneswaram Cliff Temple", "Powder-Soft Nilaveli Beach"],
    lat: 8.5874,
    lng: 81.2152,
    popularRank: 8,
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura Ancient City",
    sinhalaName: "අනුරාධපුරය",
    tagline: "Sacred 2,500-year-old Buddhist monasteries & stupas",
    category: "heritage",
    categoryLabel: "Ancient & Heritage",
    categoryColor: "bg-[#F6D352] text-amber-900 border-[#F6D352]",
    pinColor: "#F6D352",
    region: "North Central Province",
    bestTime: "Jun – Sep & Dec – Feb",
    description:
      "A sprawling UNESCO ancient metropolis featuring colossal white stupas, massive irrigation reservoirs, and the sacred Sri Maha Bodhi tree.",
    image: "/bento/sheshan-r-ZDBA3GnBzGQ-unsplash.jpg",
    highlights: ["Sri Maha Bodhi (Oldest Tree)", "Ruwanwelisaya Giant Stupa", "Intricate Moonstones"],
    lat: 8.3114,
    lng: 80.4037,
    popularRank: 9,
  },
  {
    id: "udawalawe",
    name: "Udawalawe National Park",
    sinhalaName: "උඩවලව",
    tagline: "Guaranteed wild elephant herds in open plains",
    category: "wildlife",
    categoryLabel: "Wildlife & Safari",
    categoryColor: "bg-[#2B528A] text-white border-[#2B528A]",
    pinColor: "#2B528A",
    region: "Sabaragamuwa / Southern Border",
    bestTime: "Year-Round (Best: Oct – Jan)",
    description:
      "An African-style savannah park surrounding a vast reservoir, famous for sightings of wild elephant families and the Elephant Transit Home.",
    image: "/tours/yala.jpg",
    highlights: ["Over 500 Wild Elephants", "Elephant Transit Home", "Scenic Reservoir Views"],
    lat: 6.4746,
    lng: 80.8987,
    popularRank: 10,
  },
  {
    id: "colombo",
    name: "Colombo Ocean City",
    sinhalaName: "කොළඹ",
    tagline: "Vibrant oceanfront capital & culinary scene",
    category: "heritage",
    categoryLabel: "Urban & Cultural",
    categoryColor: "bg-[#F6D352] text-amber-900 border-[#F6D352]",
    pinColor: "#F6D352",
    region: "Western Province",
    bestTime: "Nov – Apr",
    description:
      "A cosmopolitan mix of colonial Dutch architecture, tranquil Gangaramaya Temple on the lake, ocean promenades at Galle Face, and gourmet dining.",
    image: "/bento/tobias-tullius-IiE50WMRa7I-unsplash.jpg",
    highlights: ["Galle Face Green Sunset", "Gangaramaya Seema Malaka", "Historic Dutch Hospital"],
    lat: 6.9271,
    lng: 79.8612,
    popularRank: 11,
  },
  {
    id: "jaffna",
    name: "Jaffna Peninsula",
    sinhalaName: "යාපනය",
    tagline: "Rich Tamil heritage, Hindu temples & islands",
    category: "heritage",
    categoryLabel: "Ancient & Heritage",
    categoryColor: "bg-[#F6D352] text-amber-900 border-[#F6D352]",
    pinColor: "#F6D352",
    region: "Northern Province",
    bestTime: "Jan – Sep",
    description:
      "The cultural epicenter of the north, famous for the magnificent gold Nallur Kandaswamy Kovil, historic coastal fort, and remote causeway islands.",
    image: "/anthony-lim-H-qDQSXBBBc-unsplash.jpg",
    highlights: ["Nallur Kandaswamy Kovil", "Jaffna Dutch Fort", "Delft Island Wild Horses"],
    lat: 9.6615,
    lng: 80.0255,
    popularRank: 12,
  },
  {
    id: "arugam-bay",
    name: "Arugam Bay Surf Point",
    sinhalaName: "ආරුගම්බේ",
    tagline: "World-class right hand surf point & laid-back vibes",
    category: "beaches",
    categoryLabel: "Tropical Beaches",
    categoryColor: "bg-[#71C2BA] text-teal-950 border-[#71C2BA]",
    pinColor: "#71C2BA",
    region: "Eastern Province (Pottuvil)",
    bestTime: "May – Oct (Peak Surf Season)",
    description:
      "Ranked among the top surf destinations in Asia, renowned for warm Indian Ocean point breaks, beach cafes, and neighboring Kumana National Park.",
    image: "/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg",
    highlights: ["Main Point Surf Break", "Elephant Rock Sunset", "Kumana Bird Sanctuary"],
    lat: 6.8425,
    lng: 81.8290,
    popularRank: 13,
  },
  {
    id: "bentota",
    name: "Bentota Golden Sands",
    sinhalaName: "බෙන්තොට",
    tagline: "Watersports paradise & tranquil coastal lagoon",
    category: "beaches",
    categoryLabel: "Tropical Beaches",
    categoryColor: "bg-[#71C2BA] text-teal-950 border-[#71C2BA]",
    pinColor: "#71C2BA",
    region: "Southern Coast",
    bestTime: "Nov – Apr",
    description:
      "A scenic ribbon of golden sand flanked by the Indian Ocean and Bentota River, offering jet-skiing, Madu River boat safaris, and luxury beach resorts.",
    image: "/bento/mirissa-beach.png",
    highlights: ["Madu Ganga Boat Safari", "Jet Ski & Water Skiing", "Geoffrey Bawa's Lunuganga"],
    lat: 6.4250,
    lng: 79.9990,
    popularRank: 14,
  }
];

const CATEGORIES: { key: DestinationCategory; label: string; icon: any; colorClass: string; dotColor: string }[] = [
  { key: "all", label: "All Destinations", icon: Compass, colorClass: "text-neutral-800", dotColor: "#0E1B15" },
  { key: "heritage", label: "Ancient & Cultural", icon: Landmark, colorClass: "text-[#B8860B]", dotColor: "#F6D352" },
  { key: "highlands", label: "Hill Country & Tea", icon: Mountain, colorClass: "text-emerald-700", dotColor: "#C5DF6C" },
  { key: "wildlife", label: "Wildlife & Safaris", icon: Camera, colorClass: "text-[#2B528A]", dotColor: "#2B528A" },
  { key: "beaches", label: "Tropical Beaches", icon: Palmtree, colorClass: "text-[#008B8B]", dotColor: "#71C2BA" },
];

const SRI_LANKA_DEFAULT_CENTER: [number, number] = [7.8731, 80.7718];
const SRI_LANKA_DEFAULT_ZOOM = 7.7;

interface SriLankaExplorerSectionProps {
  initialDestinations?: any[];
}

const mapDbCategory = (catFilter: string): "heritage" | "highlands" | "wildlife" | "beaches" => {
  const lower = (catFilter || "").toLowerCase();
  if (lower.includes("beach") || lower.includes("coast") || lower.includes("ocean") || lower.includes("sea")) return "beaches";
  if (lower.includes("hill") || lower.includes("mountain") || lower.includes("tea") || lower.includes("highland")) return "highlands";
  if (lower.includes("wild") || lower.includes("safari") || lower.includes("nature") || lower.includes("adventure") || lower.includes("elephant") || lower.includes("leopard")) return "wildlife";
  return "heritage";
};

const getCategoryLabel = (category: "heritage" | "highlands" | "wildlife" | "beaches") => {
  switch (category) {
    case "heritage": return "Ancient & Cultural";
    case "highlands": return "Hill Country & Tea";
    case "wildlife": return "Wildlife & Safari";
    case "beaches": return "Tropical Beaches";
  }
};

const getCategoryBadgeClass = (category: "heritage" | "highlands" | "wildlife" | "beaches") => {
  switch (category) {
    case "heritage": return "bg-[#F6D352] text-amber-900 border-[#F6D352]";
    case "highlands": return "bg-[#C5DF6C] text-emerald-900 border-[#C5DF6C]";
    case "wildlife": return "bg-[#2B528A] text-white border-[#2B528A]";
    case "beaches": return "bg-[#71C2BA] text-teal-950 border-[#71C2BA]";
  }
};

const getPinColor = (category: "heritage" | "highlands" | "wildlife" | "beaches") => {
  switch (category) {
    case "heritage": return "#F6D352";
    case "highlands": return "#C5DF6C";
    case "wildlife": return "#2B528A";
    case "beaches": return "#71C2BA";
  }
};

export default function SriLankaExplorerSection({ initialDestinations }: SriLankaExplorerSectionProps) {
  const [destinationsList, setDestinationsList] = useState<TravelDestination[]>(() => {
    if (initialDestinations && initialDestinations.length > 0) {
      return initialDestinations.map((d: any, index: number) => {
        const cat = mapDbCategory(d.categoryFilter);
        return {
          id: d.id || `dest-${index}`,
          name: d.name,
          sinhalaName: d.sinhalaName,
          tagline: d.description && d.description.length > 80 ? d.description.slice(0, 77) + "..." : (d.description || d.name),
          category: cat,
          categoryLabel: getCategoryLabel(cat),
          categoryColor: getCategoryBadgeClass(cat),
          pinColor: getPinColor(cat),
          region: d.region || "Sri Lanka",
          bestTime: d.bestTime || "Year-Round",
          description: d.description || "",
          image: d.image || "/bento/sigiriya.png",
          highlights: Array.isArray(d.attractions) && d.attractions.length > 0 
            ? d.attractions 
            : (Array.isArray(d.features) && d.features.length > 0 ? d.features : ["Scenic Highlights", "Must-Visit Location"]),
          lat: typeof d.lat === "number" && d.lat !== 0 ? d.lat : 7.8731,
          lng: typeof d.lng === "number" && d.lng !== 0 ? d.lng : 80.7718,
          popularRank: index + 1,
        };
      });
    }
    return POPULAR_DESTINATIONS;
  });

  const [activeCategory, setActiveCategory] = useState<DestinationCategory>("all");
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(() => destinationsList[0]?.id || "sigiriya");
  const [mapType, setMapType] = useState<"voyager" | "satellite">("voyager");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const tileLayerRef = useRef<any>(null);

  const filteredDestinations =
    activeCategory === "all"
      ? destinationsList
      : destinationsList.filter((d) => d.category === activeCategory);

  const activeDestination =
    destinationsList.find((d) => d.id === selectedDestinationId) || destinationsList[0] || POPULAR_DESTINATIONS[0];

  // 1. Dynamically load Leaflet in Browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setIsMapLoaded(true);
      return;
    }

    // Leaflet CSS
    const cssId = "leaflet-cdn-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }

    // Leaflet JS
    const scriptId = "leaflet-cdn-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = () => setIsMapLoaded(true);
      script.onerror = () => setMapError("Failed to load map scripting engine.");
      document.head.appendChild(script);
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).L) {
          setIsMapLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, []);

  // 2. Initialize Map Instance
  useEffect(() => {
    if (!isMapLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
      minZoom: 6.5,
      maxZoom: 16,
    }).setView(SRI_LANKA_DEFAULT_CENTER, SRI_LANKA_DEFAULT_ZOOM);

    mapRef.current = map;

    // Standard Zoom Buttons
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Initial Tile Layer
    const tileUrl =
      mapType === "satellite"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";

    const attribution =
      mapType === "satellite"
        ? '&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics'
        : '&copy; <a href="https://www.esri.com/">Esri</a>, DeLorme, NAVTEQ, USGS';

    const tileLayer = L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isMapLoaded]);

  // 3. Update Tile Layer on mapType switch
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;
    const L = (window as any).L;
    if (!L) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl =
      mapType === "satellite"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";

    const attribution =
      mapType === "satellite"
        ? '&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics'
        : '&copy; <a href="https://www.esri.com/">Esri</a>, DeLorme, NAVTEQ, USGS';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map);
  }, [mapType, isMapLoaded]);

  // 4. Update Markers on Category or Selection Change (Bubble Circular Indicators + Name Labels)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;
    const L = (window as any).L;
    if (!L) return;

    // Clean old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const newMarkers = filteredDestinations.map((dest) => {
      const isSelected = dest.id === selectedDestinationId;
      const bubbleSize = isSelected ? 26 : 20;

      const customIcon = L.divIcon({
        className: "custom-bubble-map-pin",
        html: `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: translate(-50%, -50%);
            position: absolute;
            cursor: pointer;
            user-select: none;
          ">
            ${
              isSelected
                ? `<div style="
                    position: absolute;
                    width: ${bubbleSize + 24}px;
                    height: ${bubbleSize + 24}px;
                    background-color: ${dest.pinColor};
                    opacity: 0.35;
                    border-radius: 9999px;
                    animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
                    pointer-events: none;
                  "></div>`
                : ""
            }
            
            <!-- Circular Bubble Indicator -->
            <div style="
              width: ${bubbleSize}px;
              height: ${bubbleSize}px;
              border-radius: 9999px;
              background-color: ${dest.pinColor};
              opacity: ${isSelected ? "1" : "0.92"};
              border: ${isSelected ? "3px solid #0E1B15" : "2.5px solid #FFFFFF"};
              box-shadow: ${
                isSelected
                  ? "0 4px 14px rgba(0,0,0,0.3), 0 0 0 3px " + dest.pinColor + "55"
                  : "0 2px 8px rgba(0,0,0,0.18)"
              };
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            ">
              <div style="
                width: ${isSelected ? "8px" : "6px"};
                height: ${isSelected ? "8px" : "6px"};
                border-radius: 9999px;
                background-color: ${isSelected ? "#FFFFFF" : "rgba(255,255,255,0.9)"};
              "></div>
            </div>

            <!-- Sleek Floating Name Label -->
            <div style="
              margin-top: 3px;
              background: ${isSelected ? "#0E1B15" : "rgba(255, 255, 255, 0.94)"};
              color: ${isSelected ? "#FFFFFF" : "#1E293B"};
              border: 1px solid ${isSelected ? "#0E1B15" : "rgba(0,0,0,0.08)"};
              backdrop-filter: blur(4px);
              font-family: 'Poppins', sans-serif;
              font-size: ${isSelected ? "11px" : "10px"};
              font-weight: 700;
              padding: 2px 8px;
              border-radius: 9999px;
              white-space: nowrap;
              box-shadow: 0 2px 6px rgba(0,0,0,0.12);
              transition: all 0.25s ease;
              display: flex;
              align-items: center;
              gap: 3px;
            ">
              <span>${dest.name.split(" ")[0]}</span>
            </div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);

      marker.on("click", () => {
        setSelectedDestinationId(dest.id);
        map.flyTo([dest.lat, dest.lng], 9.5, { duration: 1.0 });
      });

      return marker;
    });

    markersRef.current = newMarkers;
  }, [filteredDestinations, selectedDestinationId, isMapLoaded]);

  // 5. Center/fly map when selected destination changes from external card
  const handleSelectDestination = (dest: TravelDestination) => {
    setSelectedDestinationId(dest.id);
    const map = mapRef.current;
    if (map) {
      map.flyTo([dest.lat, dest.lng], 9.5, { duration: 1.0 });
    }
  };

  // Reset to full Sri Lanka view
  const handleResetView = () => {
    const map = mapRef.current;
    if (map) {
      map.flyTo(SRI_LANKA_DEFAULT_CENTER, SRI_LANKA_DEFAULT_ZOOM, { duration: 1.2 });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FBFBFA] border-t border-b border-neutral-200/70 relative overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E1B15_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1300px] relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-neutral-900 tracking-tight leading-[1.1] font-montserrat">
            Explore Sri Lanka’s <br />
            <span className="font-bold text-[#0E1B15]">Iconic Travel Destinations</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base font-poppins max-w-2xl mx-auto leading-relaxed font-light">
            Navigate the real geographic map of the island. Pan, zoom, and click any popular destination to explore ancient citadels, tea-covered highlands, wild leopard sanctuaries, and golden surf beaches.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 md:mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  const firstOfCat =
                    cat.key === "all"
                      ? POPULAR_DESTINATIONS[0]
                      : POPULAR_DESTINATIONS.find((d) => d.category === cat.key);
                  if (firstOfCat) {
                    handleSelectDestination(firstOfCat);
                  }
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm outline-none cursor-pointer font-poppins ${
                  isActive
                    ? "bg-[#0E1B15] text-white shadow-md scale-105"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black border border-neutral-200"
                }`}
              >
                <Icon size={15} className={isActive ? "text-amber-300" : cat.colorClass} />
                <span>{cat.label}</span>
                {cat.key !== "all" && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: !isActive ? cat.dotColor : "#FFFFFF" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Content: Real Geographic Leaflet Map (Left) + Destination Detail Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: Real Leaflet Map of Sri Lanka */}
          <div className="lg:col-span-7  rounded-3xl p-3 sm:p-4  flex flex-col justify-between relative min-h-[480px] sm:min-h-[560px]">
            
            {/* Real Map DOM Mount Container */}
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
              
              {/* Loader Overlay */}
              {!isMapLoaded && !mapError && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
                  <span className="text-xs font-poppins text-neutral-500 font-medium">
                    Loading real Sri Lanka satellite & terrain map...
                  </span>
                </div>
              )}

              {/* Map Controls Header Overlay */}
              <div className="absolute top-3 left-3 right-3 z-[400] flex items-center justify-between gap-2 pointer-events-none">
                
                {/* Reset Full Island View Button */}
                <button
                  onClick={handleResetView}
                  className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200 text-[#0E1B15] text-xs font-semibold font-poppins shadow-md hover:bg-neutral-50 transition-colors"
                >
                  <RotateCcw size={13} className="text-emerald-700" />
                  <span>Whole Island View</span>
                </button>

                {/* Map Style Switcher (Street / Satellite) */}
                <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md p-1 rounded-xl border border-neutral-200 shadow-md">
                  <button
                    onClick={() => setMapType("voyager")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-poppins transition-all ${
                      mapType === "voyager"
                        ? "bg-[#0E1B15] text-white shadow-sm"
                        : "text-neutral-600 hover:text-black"
                    }`}
                  >
                     Terrain
                  </button>
                  <button
                    onClick={() => setMapType("satellite")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-poppins transition-all ${
                      mapType === "satellite"
                        ? "bg-[#0E1B15] text-white shadow-sm"
                        : "text-neutral-600 hover:text-black"
                    }`}
                  >
                     Satellite
                  </button>
                </div>
              </div>

              {/* Map DOM */}
              <div ref={mapContainerRef} className="w-full h-full z-0" />
            </div>

            {/* Map Legend Footer */}
            <div className="pt-3 px-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-poppins text-neutral-600">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Heritage
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Hill Country
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  Wildlife
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Beaches
                </span>
              </div>
              <span className="text-neutral-400 text-[10px]">
                Tip: Click any pin to zoom & view details
              </span>
            </div>
          </div>

          {/* RIGHT: Selected Destination Detail Showcase Card */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDestination.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white rounded-3xl p-6 sm:p-7  flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-5 group">
                    <Image
                      src={activeDestination.image}
                      alt={activeDestination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Category & Rank Tags */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium font-poppins shadow-sm">
                        
                        {activeDestination.categoryLabel}
                      </span>
                     
                    </div>

                    {/* Image Footer Title */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <p className="text-xs text-amber-300 font-medium font-poppins flex items-center gap-1 mb-0.5">
                        <MapPin size={12} /> {activeDestination.region}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold font-montserrat tracking-tight text-white leading-tight">
                        {activeDestination.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tagline & Best Visiting Time */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-neutral-800 font-poppins">
                      {activeDestination.tagline}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500 font-poppins">
                      <Calendar size={13} className="text-emerald-600 flex-shrink-0" />
                      <span>Best time:</span>
                      <strong className="text-neutral-700">{activeDestination.bestTime}</strong>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 font-poppins leading-relaxed font-light mb-5">
                    {activeDestination.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="mb-5">
                    <p className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider font-poppins mb-2">
                      Key Highlights:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDestination.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-poppins"
                        >
                          <CheckCircle2 size={12} className="text-emerald-600 flex-shrink-0" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-2.5">
                  <Link
                    href="/tours"
                    className="w-full sm:flex-1 bg-[#0E1B15] hover:bg-[#1a2e22] text-white py-3 px-5 rounded-2xl font-semibold text-xs sm:text-sm font-poppins transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-center"
                  >
                    <span>View Tours With {activeDestination.name.split(" ")[0]}</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/destinations"
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-neutral-200 hover:border-neutral-900 text-neutral-800 hover:text-black font-semibold text-xs sm:text-sm font-poppins transition-all duration-200 flex items-center justify-center gap-1.5 text-center"
                  >
                    <Eye size={14} />
                    <span>All Places</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Horizontal Quick Selector Cards */}
        <div className="mt-10 md:mt-12">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-neutral-900 font-montserrat">
              Popular Spots in {CATEGORIES.find((c) => c.key === activeCategory)?.label}
            </h4>
            <span className="text-xs text-neutral-500 font-poppins">Click to fly to place on map</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {filteredDestinations.map((dest) => {
              const isSelected = dest.id === selectedDestinationId;
              return (
                <button
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest)}
                  className={`relative rounded-2xl p-3 text-left transition-all duration-300 flex flex-col justify-between overflow-hidden border cursor-pointer outline-none ${
                    isSelected
                      ? "bg-[#0E1B15] text-white border-[#0E1B15] shadow-lg shadow-black/15 scale-[1.03]"
                      : "bg-white text-neutral-800 hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: dest.pinColor }}
                    />
                    
                  </div>

                  <div>
                    <p
                      className={`text-xs font-bold font-montserrat truncate ${
                        isSelected ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {dest.name}
                    </p>
                    <p
                      className={`text-[10px] font-poppins truncate mt-0.5 ${
                        isSelected ? "text-white/70" : "text-neutral-500"
                      }`}
                    >
                      {dest.region.split("(")[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
