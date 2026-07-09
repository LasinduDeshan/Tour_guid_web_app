"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  PlusCircle, 
  Compass, 
  MapPin, 
  Sparkles, 
  Loader2,
  Megaphone,
  Type,
  MessageSquare,
  Mail,
  FileText
} from "lucide-react";

interface RoadmapStepInput {
  day: number;
  location: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
}

interface TourInput {
  id?: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  category: string;
  facilities: string[];
  roadmap: RoadmapStepInput[];
}

interface DestinationInput {
  id?: string;
  name: string;
  region: string;
  description: string;
  image: string;
  bestTime: string;
  temp: string;
  attractions: string[];
  activities: string[];
  features: string[];
  gallery: string[];
  lat: number;
  lng: number;
  categoryFilter: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  guests: string;
  message: string | null;
  tourId: string;
  tourTitle: string;
  status: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  source: string;
  status: string;
  createdAt: string;
}

interface Advertisement {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
  isActive: boolean;
}

interface BentoPackageInclusionInput {
  icon: string;
  title: string;
  desc: string;
}

interface BentoPackageInput {
  id?: string;
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
  card3Inclusions: BentoPackageInclusionInput[];
  
  card4Title: string;
  card4Desc: string;
  card4Image: string;
  card4Link: string;
  card4Button: string;
  order: number;
}

interface PageDetailConfig {
  home_hero_title_light: string;
  home_hero_title_bold: string;
  home_hero_description: string;
  bento_intro_title: string;
  bento_intro_description: string;
}

interface FAQInput {
  id?: string;
  question: string;
  answer: string;
  order: number;
}


export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Core Data States
  const [tours, setTours] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [pageDetails, setPageDetails] = useState<PageDetailConfig>({
    home_hero_title_light: "Bespoke Premium Expeditions",
    home_hero_title_bold: "The Wonder of Sri Lanka",
    home_hero_description: "Embark on an extraordinary journey through the island's timeless wonders...",
    bento_intro_title: "Seamless Cultural Journeys Across Sri Lanka",
    bento_intro_description: "Discover Sri Lanka with expertly curated journeys by Ceyora Tours...",
  });

  // Bento Packages States
  const [bentoPackages, setBentoPackages] = useState<any[]>([]);

  // FAQs States
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQInput | null>(null);
  const [faqForm, setFaqForm] = useState<FAQInput>({
    question: "",
    answer: "",
    order: 0
  });

  const [isBentoModalOpen, setIsBentoModalOpen] = useState(false);
  const [editingBento, setEditingBento] = useState<BentoPackageInput | null>(null);
  const [bentoForm, setBentoForm] = useState<BentoPackageInput>({
    title: "",
    highlight: "",
    headerDesc: "",
    tabName: "",
    sectionBg: "bg-[#9CBFA7]",
    
    card1Title: "",
    card1Desc: "",
    card1FooterTitle: "",
    card1FooterSub: "",
    card1Bg: "bg-[#0E1B15]",
    card1Text: "text-white",
    
    card2Title: "",
    card2Desc: "",
    card2Image: "",
    card2Link: "",
    card2Button: "",
    
    card3Bg: "bg-[#C5B4F3]",
    card3Text: "text-[#002244]",
    card3Title: "",
    card3Footer: "",
    card3Inclusions: [],
    
    card4Title: "",
    card4Desc: "",
    card4Image: "",
    card4Link: "",
    card4Button: "",
    order: 0
  });
  const [incIcon, setIncIcon] = useState("Hotel");
  const [incTitle, setIncTitle] = useState("");
  const [incDesc, setIncDesc] = useState("");


  // Tours Modal / Form States
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<TourInput | null>(null);
  const [tourForm, setTourForm] = useState<TourInput>({
    title: "",
    description: "",
    image: "",
    price: 0,
    duration: "3 Days",
    category: "Beach Tours",
    facilities: [],
    roadmap: []
  });
  const [facilityText, setFacilityText] = useState("");

  // Destinations Modal / Form States
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<DestinationInput | null>(null);
  const [destForm, setDestForm] = useState<DestinationInput>({
    name: "",
    region: "",
    description: "",
    image: "",
    bestTime: "May - Sept",
    temp: "31°C",
    attractions: [],
    activities: [],
    features: [],
    gallery: [],
    lat: 7.9570,
    lng: 80.7603,
    categoryFilter: "Cultural Tours"
  });
  const [attractionText, setAttractionText] = useState("");
  const [activityText, setActivityText] = useState("");
  const [featureText, setFeatureText] = useState("");

  const handleAddFeature = () => {
    if (featureText.trim()) {
      setDestForm(prev => ({
        ...prev,
        features: [...prev.features, featureText.trim()]
      }));
      setFeatureText("");
    }
  };

  // Ads Form States
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [adForm, setAdForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    isActive: true
  });

  // Loading States
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Authentication Checks
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user && (session.user as any).role !== "ADMIN") {
      router.push("/");
    }
  }, [session, status, router]);

  // Load Database Data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch Tours
      const toursRes = await fetch("/api/tours");
      const toursData = await toursRes.json();
      setTours(toursData);

      // Fetch Destinations
      const destsRes = await fetch("/api/destinations");
      const destsData = await destsRes.json();
      setDestinations(destsData);

      // Fetch Bookings
      const bookingsRes = await fetch("/api/bookings");
      const bookingsData = await bookingsRes.json();
      setBookings(bookingsData);

      // Fetch Advertisements
      const adsRes = await fetch("/api/advertisements");
      const adsData = await adsRes.json();
      setAdvertisements(adsData);

      // Fetch Inquiries
      const inqRes = await fetch("/api/inquiries");
      const inqData = await inqRes.json();
      setInquiries(Array.isArray(inqData) ? inqData : []);

      // Fetch Page Configurations
      const configRes = await fetch("/api/page-details");
      const configData = await configRes.json();
      if (Object.keys(configData).length > 0) {
        setPageDetails({
          home_hero_title_light: configData.home_hero_title_light || "",
          home_hero_title_bold: configData.home_hero_title_bold || "",
          home_hero_description: configData.home_hero_description || "",
          bento_intro_title: configData.bento_intro_title || "",
          bento_intro_description: configData.bento_intro_description || "",
        });
      }

      // Fetch Bento Packages
      const bentoRes = await fetch("/api/bento-packages");
      const bentoData = await bentoRes.json();
      setBentoPackages(bentoData);

      // Fetch FAQs
      const faqsRes = await fetch("/api/faqs");
      const faqsData = await faqsRes.json();
      setFaqs(faqsData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && (session.user as any).role === "ADMIN") {
      fetchData();
    }
  }, [status, session]);

  if (status === "loading" || isLoading) {
    return (
      <div className="h-screen flex flex-col gap-3 items-center justify-center bg-neutral-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <span className="text-sm font-normal font-poppins text-neutral-400">Loading console control panel...</span>
      </div>
    );
  }

  if (!session || (session.user as any).role !== "ADMIN") {
    return null;
  }

  // --- CRUD HANDLERS FOR TOURS ---
  const handleOpenAddTour = () => {
    setEditingTour(null);
    setTourForm({
      title: "",
      description: "",
      image: "",
      price: 0,
      duration: "3 Days",
      category: "Beach Tours",
      facilities: [],
      roadmap: [
        { day: 1, location: "Colombo", title: "Day Arrival", description: "Arrive and transfer to hotel.", lat: 6.9271, lng: 79.8612 }
      ]
    });
    setFacilityText("");
    setIsTourModalOpen(true);
  };

  const handleOpenEditTour = (tour: any) => {
    setEditingTour(tour);
    setTourForm({
      title: tour.title,
      description: tour.description,
      image: tour.image,
      price: tour.price,
      duration: tour.duration,
      category: tour.category,
      facilities: tour.facilities || [],
      roadmap: tour.roadmap || []
    });
    setFacilityText("");
    setIsTourModalOpen(true);
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const url = editingTour ? `/api/tours/${editingTour.id}` : "/api/tours";
      const method = editingTour ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourForm),
      });

      if (res.ok) {
        setIsTourModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save tour package.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour package? This will permanently erase its roadmap coordinates too.")) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete tour.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- ROADMAP & FACILITIES FORM HELPERS ---
  const handleAddFacility = () => {
    if (facilityText.trim()) {
      setTourForm(prev => ({
        ...prev,
        facilities: [...prev.facilities, facilityText.trim()]
      }));
      setFacilityText("");
    }
  };

  const handleRemoveFacility = (index: number) => {
    setTourForm(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const handleAddRoadmapStep = () => {
    const nextDay = tourForm.roadmap.length + 1;
    const newStep: RoadmapStepInput = {
      day: nextDay,
      location: "",
      title: "",
      description: "",
      lat: 6.9271,
      lng: 79.8612
    };
    setTourForm(prev => ({
      ...prev,
      roadmap: [...prev.roadmap, newStep]
    }));
  };

  const handleRemoveRoadmapStep = (index: number) => {
    setTourForm(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter((_, i) => i !== index).map((step, idx) => ({
        ...step,
        day: idx + 1 // Re-index days chronologically
      }))
    }));
  };

  const handleRoadmapStepChange = (index: number, field: keyof RoadmapStepInput, value: any) => {
    setTourForm(prev => {
      const updatedSteps = [...prev.roadmap];
      updatedSteps[index] = {
        ...updatedSteps[index],
        [field]: field === "lat" || field === "lng" ? parseFloat(value) || 0 : value
      };
      return { ...prev, roadmap: updatedSteps };
    });
  };

  // --- CRUD HANDLERS FOR DESTINATIONS ---
  const handleOpenAddDest = () => {
    setEditingDest(null);
    setDestForm({
      name: "",
      region: "",
      description: "",
      image: "",
      bestTime: "May - September",
      temp: "31°C",
      attractions: [],
      activities: [],
      features: [],
      gallery: [],
      lat: 7.9570,
      lng: 80.7603,
      categoryFilter: "Cultural Tours"
    });
    setAttractionText("");
    setActivityText("");
    setFeatureText("");
    setIsDestModalOpen(true);
  };

  const handleOpenEditDest = (dest: any) => {
    setEditingDest(dest);
    setDestForm({
      name: dest.name,
      region: dest.region,
      description: dest.description,
      image: dest.image,
      bestTime: dest.bestTime,
      temp: dest.temp,
      attractions: dest.attractions || [],
      activities: dest.activities || [],
      features: dest.features || [],
      gallery: dest.gallery || [],
      lat: dest.lat,
      lng: dest.lng,
      categoryFilter: dest.categoryFilter
    });
    setAttractionText("");
    setActivityText("");
    setFeatureText("");
    setIsDestModalOpen(true);
  };

  const handleSaveDest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const url = editingDest ? `/api/destinations/${editingDest.id}` : "/api/destinations";
      const method = editingDest ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destForm),
      });

      if (res.ok) {
        setIsDestModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save landmark destination.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteDest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this landmark destination?")) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete landmark.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAddAttraction = () => {
    if (attractionText.trim()) {
      setDestForm(prev => ({
        ...prev,
        attractions: [...prev.attractions, attractionText.trim()]
      }));
      setAttractionText("");
    }
  };

  const handleRemoveAttraction = (index: number) => {
    setDestForm(prev => ({
      ...prev,
      attractions: prev.attractions.filter((_, i) => i !== index)
    }));
  };

  const handleAddActivity = () => {
    if (activityText.trim()) {
      setDestForm(prev => ({
        ...prev,
        activities: [...prev.activities, activityText.trim()]
      }));
      setActivityText("");
    }
  };

  const handleRemoveActivity = (index: number) => {
    setDestForm(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  // --- CRUD HANDLERS FOR BOOKINGS ---
  const handleUpdateBookingStatus = async (id: string, status: string) => {
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to update booking status.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- CRUD HANDLERS FOR ADS ---
  const handleOpenAddAd = () => {
    setEditingAd(null);
    setAdForm({ title: "", subtitle: "", image: "", link: "", isActive: true });
    setIsAdModalOpen(true);
  };

  const handleOpenEditAd = (ad: Advertisement) => {
    setEditingAd(ad);
    setAdForm({
      title: ad.title,
      subtitle: ad.subtitle || "",
      image: ad.image,
      link: ad.link || "",
      isActive: ad.isActive
    });
    setIsAdModalOpen(true);
  };

  const handleSaveAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const url = editingAd ? `/api/advertisements/${editingAd.id}` : "/api/advertisements";
      const method = editingAd ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adForm),
      });

      if (res.ok) {
        setIsAdModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save advertisement.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteAd = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promotion banner?")) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/advertisements/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete promotion.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- CRUD HANDLERS FOR BENTO PACKAGES ---
  const handleOpenAddBento = () => {
    setEditingBento(null);
    setBentoForm({
      title: "",
      highlight: "",
      headerDesc: "",
      tabName: "",
      sectionBg: "bg-[#9CBFA7]",
      
      card1Title: "",
      card1Desc: "",
      card1FooterTitle: "",
      card1FooterSub: "",
      card1Bg: "bg-[#0E1B15]",
      card1Text: "text-white",
      
      card2Title: "",
      card2Desc: "",
      card2Image: "",
      card2Link: "",
      card2Button: "",
      
      card3Bg: "bg-[#C5B4F3]",
      card3Text: "text-[#002244]",
      card3Title: "",
      card3Footer: "",
      card3Inclusions: [],
      
      card4Title: "",
      card4Desc: "",
      card4Image: "",
      card4Link: "",
      card4Button: "",
      order: bentoPackages.length
    });
    setIncIcon("Hotel");
    setIncTitle("");
    setIncDesc("");
    setIsBentoModalOpen(true);
  };

  const handleOpenEditBento = (pkg: any) => {
    setEditingBento(pkg);
    setBentoForm({
      title: pkg.title,
      highlight: pkg.highlight,
      headerDesc: pkg.headerDesc,
      tabName: pkg.tabName,
      sectionBg: pkg.sectionBg || "bg-[#9CBFA7]",
      
      card1Title: pkg.card1Title,
      card1Desc: pkg.card1Desc,
      card1FooterTitle: pkg.card1FooterTitle,
      card1FooterSub: pkg.card1FooterSub,
      card1Bg: pkg.card1Bg || "bg-[#0E1B15]",
      card1Text: pkg.card1Text || "text-white",
      
      card2Title: pkg.card2Title,
      card2Desc: pkg.card2Desc,
      card2Image: pkg.card2Image,
      card2Link: pkg.card2Link,
      card2Button: pkg.card2Button,
      
      card3Bg: pkg.card3Bg || "bg-[#C5B4F3]",
      card3Text: pkg.card3Text || "text-[#002244]",
      card3Title: pkg.card3Title,
      card3Footer: pkg.card3Footer,
      card3Inclusions: Array.isArray(pkg.card3Inclusions) ? pkg.card3Inclusions : [],
      
      card4Title: pkg.card4Title,
      card4Desc: pkg.card4Desc,
      card4Image: pkg.card4Image,
      card4Link: pkg.card4Link,
      card4Button: pkg.card4Button,
      order: typeof pkg.order === "number" ? pkg.order : 0
    });
    setIncIcon("Hotel");
    setIncTitle("");
    setIncDesc("");
    setIsBentoModalOpen(true);
  };

  const handleSaveBento = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const url = editingBento ? `/api/bento-packages/${editingBento.id}` : "/api/bento-packages";
      const method = editingBento ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bentoForm),
      });

      if (res.ok) {
        setIsBentoModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save bento package.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteBento = async (id: string) => {
    if (!confirm("Are you sure you want to delete this homepage category package? It will be permanently removed from the bento grid.")) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/bento-packages/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete package.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAddBentoInclusion = () => {
    if (incTitle.trim()) {
      setBentoForm(prev => ({
        ...prev,
        card3Inclusions: [...prev.card3Inclusions, { icon: incIcon, title: incTitle.trim(), desc: incDesc.trim() }]
      }));
      setIncTitle("");
      setIncDesc("");
    }
  };

  const handleRemoveBentoInclusion = (index: number) => {
    setBentoForm(prev => ({
      ...prev,
      card3Inclusions: prev.card3Inclusions.filter((_, i) => i !== index)
    }));
  };

  // --- CRUD HANDLERS FOR FAQS ---
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({
      question: "",
      answer: "",
      order: faqs.length
    });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: any) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      order: typeof faq.order === "number" ? faq.order : 0
    });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const url = editingFaq ? `/api/faqs/${editingFaq.id}` : "/api/faqs";
      const method = editingFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqForm),
      });

      if (res.ok) {
        setIsFaqModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save FAQ.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete FAQ.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- BULK PAGE CONFIG HANDLERS ---
  const handleSavePageDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/page-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageDetails),
      });
      if (res.ok) {
        alert("Website configurations updated successfully!");
        fetchData();
      } else {
        alert("Failed to save configurations.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#f3f4fd] via-[#f7f8fe] to-[#fff5f5] flex text-slate-800 antialiased font-poppins selection:bg-black selection:text-white relative overflow-hidden">
      
      {/* Visual background blurred gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e3e6fc]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ffeaea]/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar Controls Panel */}
      <aside className="w-[280px] bg-white/70 backdrop-blur-xl border-r border-indigo-100/50 p-6 flex flex-col justify-between flex-shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-8">
          
          {/* Platform Branding Logo */}
          <div className="px-3 py-2 flex items-center gap-3">
            <div className="flex flex-col gap-0.5 flex-shrink-0">
              <div className="flex gap-0.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-neutral-900" />
                <div className="w-2.5 h-2.5 rounded-sm bg-neutral-400" />
              </div>
              <div className="flex gap-0.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-neutral-900" />
                <div className="w-2.5 h-2.5 rounded-sm bg-neutral-900" />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-md font-medium tracking-tight font-montserrat text-neutral-900 leading-none">Platform</h3>
              <span className="text-[9px] font-normal text-indigo-500 uppercase tracking-widest mt-1">Ceyora CMS</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1">
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "overview" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "overview" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Dashboard Overview</span>
            </button>
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "tours" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("tours")}
            >
              <Package size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "tours" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Manage Tours</span>
            </button>
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "destinations" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("destinations")}
            >
              <Compass size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "destinations" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Manage Destinations</span>
            </button>
            <button 
              className={`group flex items-center justify-between px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "bookings" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("bookings")}
            >
              <div className="flex items-center gap-3.5">
                <BarChart3 size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "bookings" ? "text-white" : "text-neutral-400"}`} /> 
                <span>Bookings</span>
              </div>
              <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full ${activeTab === "bookings" ? "bg-white text-black" : "bg-neutral-100 text-neutral-600"}`}>
                {bookings.filter(b => b.status === "PENDING").length}
              </span>
            </button>
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "advertisements" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("advertisements")}
            >
              <Megaphone size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "advertisements" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Campaigns & Ads</span>
            </button>
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "bento" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("bento")}
            >
              <Sparkles size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "bento" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Bento Grid Sections</span>
            </button>
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "configs" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("configs")}
            >
              <Type size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "configs" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Typography Settings</span>
            </button>
            <button 
              className={`group flex items-center justify-between px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "inquiries" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("inquiries")}
            >
              <div className="flex items-center gap-3.5">
                <MessageSquare size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "inquiries" ? "text-white" : "text-neutral-400"}`} /> 
                <span>Client Inquiries</span>
              </div>
              {inquiries.filter(i => i.status === "NEW").length > 0 && (
                <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full ${activeTab === "inquiries" ? "bg-white text-black" : "bg-emerald-500 text-white"}`}>
                  {inquiries.filter(i => i.status === "NEW").length}
                </span>
              )}
            </button>
            <button 
              className={`group flex items-center gap-3.5 px-4.5 py-3 text-xs font-normal rounded-2xl text-left transition-all duration-300 ${activeTab === "faqs" ? "bg-black text-white shadow-md shadow-neutral-900/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"}`} 
              onClick={() => setActiveTab("faqs")}
            >
              <FileText size={15} className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === "faqs" ? "text-white" : "text-neutral-400"}`} /> 
              <span>Frequently Asked Qs</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile Information Block */}
        <div className="border-t border-slate-100 pt-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-normal text-sm flex-shrink-0 shadow-inner">
            {session?.user?.name ? session.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "OP"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-slate-800 leading-tight truncate">{session?.user?.name || "Admin Operator"}</span>
            <span className="text-[9px] font-normal text-neutral-400 truncate">{session?.user?.email || "admin@ceyoratours.com"}</span>
          </div>
        </div>
      </aside>

      {/* Main Panel Content Box */}
      <main className="flex-1 p-8 md:p-10 overflow-y-auto max-h-screen z-10 flex flex-col gap-6">
        
        {/* Dynamic Top Header with Clean Actions Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-indigo-100/50">
          <div className="flex flex-col gap-2">
            {/* Simple Dynamic Title */}
            <h2 className="text-2xl font-normal font-montserrat text-black tracking-tight flex items-center gap-2 text-left">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "tours" && "Manage Tours"}
              {activeTab === "destinations" && "Manage Destinations"}
              {activeTab === "bookings" && "Bookings Management"}
              {activeTab === "advertisements" && "Campaigns & Promotions"}
              {activeTab === "bento" && "Homepage Bento Sections"}
              {activeTab === "configs" && "Page Typography Settings"}
              {activeTab === "inquiries" && "Client Inquiries"}
              {activeTab === "faqs" && "FAQs Management"}
            </h2>
          </div>

          {/* Primary Action Button (Add new packages) */}
          <div className="flex items-center gap-3">
            {activeTab === "faqs" && (
              <button 
                onClick={handleOpenAddFaq}
                className="bg-black hover:bg-neutral-800 text-white rounded-2xl px-5 py-3 text-xs font-normal uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 font-poppins outline-none animate-pulse"
              >
                <Plus size={15} /> Add FAQ
              </button>
            )}
            {activeTab === "tours" && (
              <button 
                onClick={handleOpenAddTour}
                className="bg-black hover:bg-neutral-800 text-white rounded-2xl px-5 py-3 text-xs font-normal uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 font-poppins outline-none"
              >
                <Plus size={15} /> Add Tour
              </button>
            )}
            {activeTab === "destinations" && (
              <button 
                onClick={handleOpenAddDest}
                className="bg-black hover:bg-neutral-800 text-white rounded-2xl px-5 py-3 text-xs font-normal uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 font-poppins outline-none"
              >
                <Plus size={15} /> Add Landmark
              </button>
            )}
            {activeTab === "advertisements" && (
              <button 
                onClick={handleOpenAddAd}
                className="bg-black hover:bg-neutral-800 text-white rounded-2xl px-5 py-3 text-xs font-normal uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 font-poppins outline-none"
              >
                <Plus size={15} /> Add Promo
              </button>
            )}
            {activeTab === "bento" && (
              <button 
                onClick={handleOpenAddBento}
                className="bg-black hover:bg-neutral-800 text-white rounded-2xl px-5 py-3 text-xs font-normal uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 font-poppins outline-none"
              >
                <Plus size={15} /> Add Bento Section
              </button>
            )}
          </div>
        </header>

        {/* 1. OVERVIEW VIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Real Stats Section (Beautiful Cupertino Card Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Active Packages Card */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm flex flex-col gap-1.5">
                <span className="text-[10px] font-normal text-neutral-400 uppercase tracking-widest font-poppins text-left">Active Tours</span>
                <div className="text-xl font-medium text-neutral-900 font-poppins leading-none text-left">{tours.length} Packages</div>
                <div className="text-[10px] text-neutral-400 font-normal font-poppins mt-3 text-left">Live travel cards configured</div>
              </div>

              {/* Landmark Locations Card */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm flex flex-col gap-1.5">
                <span className="text-[10px] font-normal text-neutral-400 uppercase tracking-widest font-poppins text-left">Destinations</span>
                <div className="text-xl font-medium text-neutral-900 font-poppins leading-none text-left">{destinations.length} Landmarks</div>
                <div className="text-[10px] text-neutral-400 font-normal font-poppins mt-3 text-left">Geographical sights registered</div>
              </div>

              {/* Total Bookings Card */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm flex flex-col gap-1.5">
                <span className="text-[10px] font-normal text-neutral-400 uppercase tracking-widest font-poppins text-left">Bookings Status</span>
                <div className="text-xl font-medium text-neutral-900 font-poppins leading-none text-left">{bookings.length} Bookings</div>
                <div className="text-[10px] text-amber-600 font-normal font-poppins mt-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" /> {bookings.filter(b => b.status === "PENDING").length} pending inquiries
                </div>
              </div>

              {/* Total Inquiries Card */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm flex flex-col gap-1.5">
                <span className="text-[10px] font-normal text-neutral-400 uppercase tracking-widest font-poppins text-left">Client Feedback</span>
                <div className="text-xl font-medium text-neutral-900 font-poppins leading-none text-left">{inquiries.length} Inquiries</div>
                <div className="text-[10px] text-emerald-600 font-normal font-poppins mt-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {inquiries.filter(i => i.status === "NEW").length} new inbound inquiries
                </div>
              </div>
            </div>

            {/* List preview of Pending Bookings */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm flex flex-col gap-5">
              <h4 className="text-xs font-normal text-slate-800 uppercase tracking-wider text-left">Recent Pending Booking Requests</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-poppins">
                  <thead>
                    <tr className="border-b border-indigo-100/50">
                      <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Traveler Details</th>
                      <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Chosen Tour Package</th>
                      <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Preferred Date</th>
                      <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Status Badge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => b.status === "PENDING").slice(0, 4).map((booking) => (
                      <tr key={booking.id} className="hover:bg-white/50 transition-colors border-b border-slate-50/50">
                        <td className="px-6 py-4 font-normal text-slate-800">
                          <div>{booking.name}</div>
                          <div className="text-[10px] text-neutral-400 font-light font-poppins">{booking.email}</div>
                        </td>
                        <td className="px-6 py-4 text-neutral-600 font-normal">{booking.tourTitle}</td>
                        <td className="px-6 py-4 text-neutral-500 font-light">{booking.date}</td>
                        <td className="px-6 py-4">
                          <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-normal border border-amber-200/30 tracking-wider">PENDING</span>
                        </td>
                      </tr>
                    ))}
                    {bookings.filter(b => b.status === "PENDING").length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-xs font-light text-neutral-400 font-poppins">
                          All caught up! No pending bookings currently.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 2. MANAGE TOURS VIEW */}
        {activeTab === "tours" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-poppins">
                <thead>
                  <tr className="border-b border-indigo-100/50">
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Tour Package Title</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Price Rate</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 text-right uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour.id} className="hover:bg-white/50 border-b border-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-normal text-slate-800">
                        <div className="flex items-center gap-3">
                          <img src={tour.image} alt={tour.title} className="w-10 h-8 rounded-lg object-cover flex-shrink-0 bg-neutral-100" />
                          <span>{tour.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-normal">{tour.duration}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-normal border border-indigo-100/30 uppercase tracking-wider">
                          {tour.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-medium">${tour.price} USD</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEditTour(tour)}
                            className="p-2 bg-white text-slate-700 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-200/50"
                          >
                            <Edit size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteTour(tour.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm border border-rose-100"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {tours.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-xs font-light text-neutral-400 font-poppins">
                        No tour packages recorded. Create one using the 'Add Tour' button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 3. MANAGE LANDMARK DESTINATIONS VIEW */}
        {activeTab === "destinations" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-poppins">
                <thead>
                  <tr className="border-b border-indigo-100/50">
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Landmark Location</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Geographical Region</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Best Visit Period</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Average Temp</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 text-right uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((dest) => (
                    <tr key={dest.id} className="hover:bg-white/50 border-b border-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-normal text-slate-800">
                        <div className="flex items-center gap-3">
                          <img src={dest.image} alt={dest.name} className="w-10 h-8 rounded-lg object-cover flex-shrink-0 bg-neutral-100" />
                          <span>{dest.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-normal">{dest.region}</td>
                      <td className="px-6 py-4 text-neutral-500 font-light">{dest.bestTime}</td>
                      <td className="px-6 py-4 font-normal text-slate-800">{dest.temp}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEditDest(dest)}
                            className="p-2 bg-white text-slate-700 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-200/50"
                          >
                            <Edit size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteDest(dest.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm border border-rose-100"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {destinations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-xs font-light text-neutral-400 font-poppins">
                        No geographical landmarks recorded yet. Create one with the 'Add Landmark' button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4. BOOKINGS CMS LIST */}
        {activeTab === "bookings" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-poppins">
                <thead>
                  <tr className="border-b border-indigo-100/50">
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Traveler Details</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Target Experience Tour</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Travel Date</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Guests</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Message Notes</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 text-right uppercase tracking-wider">Status Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white/50 border-b border-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-normal text-slate-800">
                        <div>{booking.name}</div>
                        <div className="text-[10px] text-neutral-400 font-light font-poppins">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-normal">{booking.tourTitle}</td>
                      <td className="px-6 py-4 text-neutral-500 font-light">{booking.date}</td>
                      <td className="px-6 py-4 font-normal text-slate-800">{booking.guests} Pax</td>
                      <td className="px-6 py-4 text-neutral-400 font-light truncate max-w-xs">{booking.message || "—"}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-normal uppercase tracking-wider border ${
                            booking.status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-200/30" :
                            booking.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600 border-emerald-200/30" :
                            "bg-rose-50 text-rose-600 border-rose-200/30"
                          }`}>
                            {booking.status}
                          </span>
                          <button
                            onClick={() => handleUpdateBookingStatus(
                              booking.id, 
                              booking.status === "PENDING" ? "CONFIRMED" : booking.status === "CONFIRMED" ? "CANCELLED" : "PENDING"
                            )}
                            className="text-[10px] bg-slate-900 hover:bg-neutral-800 text-white px-3 py-1.5 rounded-xl font-normal uppercase tracking-wider transition-all"
                          >
                            Cycle State
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-xs font-light text-neutral-400 font-poppins">
                        No client bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. PROMOTION BANNERS VIEW */}
        {activeTab === "advertisements" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-poppins">
                <thead>
                  <tr className="border-b border-indigo-100/50">
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Promotion Banner Title</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Subtitle Copy</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Target Pathway URL</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Visibility Status</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 text-right uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {advertisements.map((ad) => (
                    <tr key={ad.id} className="hover:bg-white/50 border-b border-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-normal text-slate-800">
                        <div className="flex items-center gap-3">
                          <img src={ad.image} alt={ad.title} className="w-10 h-8 rounded-lg object-cover flex-shrink-0 bg-neutral-100" />
                          <span>{ad.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-light">{ad.subtitle || "—"}</td>
                      <td className="px-6 py-4 text-neutral-500 font-mono text-[10px]">{ad.link || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-normal uppercase tracking-wider border ${
                          ad.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-200/30" : "bg-neutral-100 text-neutral-400 border-slate-200"
                        }`}>
                          {ad.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEditAd(ad)}
                            className="p-2 bg-white text-slate-700 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-200/50"
                          >
                            <Edit size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteAd(ad.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm border border-rose-100"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {advertisements.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-xs font-light text-neutral-400 font-poppins">
                        No active advertisements or promo campaigns recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5.5 HOMEPAGE BENTO SECTIONS VIEW */}
        {activeTab === "bento" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-poppins">
                <thead>
                  <tr className="border-b border-indigo-100/50">
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Tab / Title</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Section Heading</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Card 2 (Leg 1)</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Card 4 (Leg 2)</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Display Sort</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 text-right uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bentoPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-white/50 border-b border-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-normal text-slate-800">
                        <span className="font-semibold block">{pkg.tabName}</span>
                        <span className="text-[10px] text-neutral-400">{pkg.title} {pkg.highlight}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-light max-w-xs truncate">{pkg.headerDesc || "—"}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img src={pkg.card2Image} alt={pkg.card2Title} className="w-8 h-8 rounded-lg object-cover bg-neutral-100" />
                          <span className="truncate max-w-[100px]">{pkg.card2Title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img src={pkg.card4Image} alt={pkg.card4Title} className="w-8 h-8 rounded-lg object-cover bg-neutral-100" />
                          <span className="truncate max-w-[100px]">{pkg.card4Title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">Index: {pkg.order}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEditBento(pkg)}
                            className="p-2 bg-white text-slate-700 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-200/50"
                          >
                            <Edit size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteBento(pkg.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm border border-rose-100"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bentoPackages.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-xs font-light text-neutral-400 font-poppins">
                        No homepage bento sections recorded. Add one using the 'Add Bento Section' button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 6. PAGE CONFIGS / COPY EDITOR */}
        {activeTab === "configs" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm">
            <h4 className="text-xs font-normal text-slate-800 uppercase tracking-wider mb-6 pb-4 border-b border-indigo-50 text-left">Adjust Dynamic Page Text Copy</h4>
            <form onSubmit={handleSavePageDetails} className="space-y-6 text-xs font-normal text-neutral-700 font-poppins">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Home Hero Title (Light Accent)</label>
                  <input 
                    type="text" required placeholder="Bespoke Premium Expeditions"
                    value={pageDetails.home_hero_title_light} onChange={(e) => setPageDetails(p => ({ ...p, home_hero_title_light: e.target.value }))}
                    className="px-4 py-3 bg-white/80 border border-slate-200/60 rounded-xl outline-none focus:border-indigo-400 text-slate-800 text-xs font-normal text-left"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Home Hero Title (Bold Accent)</label>
                  <input 
                    type="text" required placeholder="The Wonder of Sri Lanka"
                    value={pageDetails.home_hero_title_bold} onChange={(e) => setPageDetails(p => ({ ...p, home_hero_title_bold: e.target.value }))}
                    className="px-4 py-3 bg-white/80 border border-slate-200/60 rounded-xl outline-none focus:border-indigo-400 text-slate-800 text-xs font-normal text-left"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Home Hero Description Subtext</label>
                <textarea 
                  required rows={4} placeholder="Embark on an extraordinary journey through the island's timeless wonders..."
                  value={pageDetails.home_hero_description} onChange={(e) => setPageDetails(p => ({ ...p, home_hero_description: e.target.value }))}
                  className="px-4 py-3 bg-white/80 border border-slate-200/60 rounded-xl outline-none resize-none focus:border-indigo-400 text-slate-800 text-xs font-normal leading-relaxed text-left"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Bento Welcome Title</label>
                  <input 
                    type="text" required placeholder="Seamless Cultural Journeys Across Sri Lanka"
                    value={pageDetails.bento_intro_title} onChange={(e) => setPageDetails(p => ({ ...p, bento_intro_title: e.target.value }))}
                    className="px-4 py-3 bg-white/80 border border-slate-200/60 rounded-xl outline-none focus:border-indigo-400 text-slate-800 text-xs font-normal text-left"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Bento Welcome Description</label>
                  <textarea 
                    required rows={3} placeholder="Discover Sri Lanka with expertly curated journeys by Ceyora Tours..."
                    value={pageDetails.bento_intro_description} onChange={(e) => setPageDetails(p => ({ ...p, bento_intro_description: e.target.value }))}
                    className="px-4 py-3 bg-white/80 border border-slate-200/60 rounded-xl outline-none resize-none focus:border-indigo-400 text-slate-800 text-xs font-normal leading-relaxed text-left"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isActionLoading}
                className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-4 rounded-2xl text-xs font-normal uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-poppins outline-none shadow-md"
              >
                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Copy Changes ↗"}
              </button>

            </form>
          </section>
        )}

        {/* 7. CLIENT INQUIRIES VIEW */}
        {activeTab === "inquiries" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center pb-2 border-b border-indigo-100/50">
              <span className="text-[10px] font-normal text-neutral-400 uppercase tracking-widest text-left">Inbound client contacts</span>
              <span className="bg-indigo-50 text-indigo-600 border border-indigo-100/30 px-3.5 py-1.5 rounded-xl text-xs font-normal">
                {inquiries.filter(i => i.status === "NEW").length} NEW · {inquiries.length} TOTAL
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 p-16 text-center shadow-sm">
                <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 font-poppins text-xs font-light">No inbound user contact inquiries recorded.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {inquiries.map(inq => (
                  <div key={inq.id} className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 p-6 flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm hover:shadow-md transition-all">
                    {/* Status dot */}
                    <div className="flex-shrink-0 mt-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        inq.status === "NEW" ? "bg-emerald-500 animate-pulse" :
                        inq.status === "READ" ? "bg-blue-400" : "bg-neutral-300"
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <span className="font-normal text-slate-800 text-sm font-poppins text-left">{inq.name}</span>
                        <span className={`text-[9px] font-normal uppercase px-2.5 py-0.5 rounded-full tracking-wider border ${
                          inq.source === "WIDGET" ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-indigo-100"
                        }`}>{inq.source === "WIDGET" ? "Floating Widget" : "Contact Page"}</span>
                        
                        <span className={`text-[9px] font-normal uppercase px-2.5 py-0.5 rounded-full tracking-wider border ${
                          inq.status === "NEW" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                          inq.status === "READ" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                          "bg-neutral-50 text-neutral-500 border-slate-200"
                        }`}>{inq.status}</span>
                      </div>
                      
                      <p className="text-xs text-neutral-500 font-poppins mb-2 flex items-center gap-2 text-left">
                        <a href={`mailto:${inq.email}`} className="hover:underline font-normal text-slate-600">{inq.email}</a>
                        {inq.phone && <span>· <span className="font-light">{inq.phone}</span></span>}
                        {inq.subject && <span>· <em className="text-slate-700 font-normal">"{inq.subject}"</em></span>}
                      </p>
                      
                      <p className="text-xs text-slate-700 font-poppins leading-relaxed font-light bg-white/40 p-4 rounded-xl border border-slate-100/50 mt-2 text-left">
                        {inq.message}
                      </p>
                      
                      <p className="text-[9px] text-neutral-400 font-normal uppercase mt-3 tracking-wider text-left">
                        Received on {new Date(inq.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 sm:flex-col sm:justify-start flex-shrink-0">
                      <button
                        onClick={async () => {
                          const next = inq.status === "NEW" ? "READ" : inq.status === "READ" ? "REPLIED" : "NEW";
                          await fetch(`/api/inquiries/${inq.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: next }),
                          });
                          fetchData();
                        }}
                        className="text-[10px] bg-white border border-slate-200 hover:bg-neutral-50 text-slate-700 px-3.5 py-2 rounded-xl font-normal uppercase tracking-wider transition-all text-center"
                      >
                        Mark {inq.status === "NEW" ? "Read" : inq.status === "READ" ? "Replied" : "New"}
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm("Delete this user contact inquiry permanently?")) return;
                          await fetch(`/api/inquiries/${inq.id}`, { method: "DELETE" });
                          fetchData();
                        }}
                        className="text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-600 px-3.5 py-2 rounded-xl font-normal uppercase tracking-wider transition-all border border-rose-100 text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 8. FAQ MANAGEMENT CMS LIST */}
        {activeTab === "faqs" && (
          <section className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-poppins">
                <thead>
                  <tr className="border-b border-indigo-100/50">
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider w-1/4">Question</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider w-1/2">Answer</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 uppercase tracking-wider">Display Sort</th>
                    <th className="px-6 py-4 font-normal text-neutral-400 text-right uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr key={faq.id} className="hover:bg-white/50 border-b border-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800 align-top">
                        {faq.question}
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-light whitespace-pre-line leading-relaxed align-top">
                        {faq.answer}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800 align-top">
                        Order Index: {faq.order}
                      </td>
                      <td className="px-6 py-4 text-right align-top">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            type="button"
                            onClick={() => handleOpenEditFaq(faq)}
                            className="p-2 bg-white text-slate-700 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-200/50"
                          >
                            <Edit size={13} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm border border-rose-100"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {faqs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-xs font-light text-neutral-400 font-poppins">
                        No FAQs registered yet. Create one with the 'Add FAQ' button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      {/* --- ADD / EDIT TOUR SLIDING DRAWER MODAL --- */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setIsTourModalOpen(false)} />
          <div className="relative w-full max-w-3xl h-full bg-white shadow-2xl p-8 overflow-y-auto flex flex-col gap-6 animate-slideIn">
            <header className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <h4 className="text-lg font-normal font-montserrat text-black uppercase">{editingTour ? "Edit Tour Package" : "Create Tour Package"}</h4>
              <button onClick={() => setIsTourModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-all">
                <X size={18} />
              </button>
            </header>

            <form onSubmit={handleSaveTour} className="space-y-5 font-poppins text-xs font-normal text-neutral-700 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Package Title Name</label>
                <input 
                  type="text" required placeholder="Classic Sri Lanka Expedition"
                  value={tourForm.title} onChange={(e) => setTourForm(p => ({ ...p, title: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-xs text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Overview Description</label>
                <textarea 
                  required rows={3} placeholder="Describe the wonderful travel experience..."
                  value={tourForm.description} onChange={(e) => setTourForm(p => ({ ...p, description: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none resize-none text-neutral-900 font-light text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <ImageUpload 
                  label="Image Cover (Drag & Drop)" 
                  value={tourForm.image} 
                  onChange={(url) => setTourForm(p => ({ ...p, image: url }))} 
                  placeholder="Or paste a custom image URL path..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Package Category</label>
                  <select 
                    value={tourForm.category} onChange={(e) => setTourForm(p => ({ ...p, category: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  >
                    <option value="Colombo Tours">Colombo Tours</option>
                    <option value="Beach Tours">Beach Tours</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Wildlife Tours">Wildlife Tours</option>
                    <option value="Ayurvedic Tours">Ayurvedic Tours</option>
                    <option value="Hill Country Tours">Hill Country Tours</option>
                    <option value="Honeymoon Tours">Honeymoon Tours</option>
                    <option value="Family Tours">Family Tours</option>
                    <option value="Golf Tours">Golf Tours</option>
                    <option value="Ramayana Tours">Ramayana Tours</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Duration (e.g. 5 Days / 4 Nights)</label>
                  <input 
                    type="text" required placeholder="5 Days"
                    value={tourForm.duration} onChange={(e) => setTourForm(p => ({ ...p, duration: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Price Rate Per Pax ($ USD)</label>
                  <input 
                    type="number" required placeholder="550"
                    value={tourForm.price} onChange={(e) => setTourForm(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
              </div>

              {/* FACILITIES CHIP LIST BUILDER */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-4">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Included Amenities & Perks</label>
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="Luxury Hotel stays"
                    value={facilityText} onChange={(e) => setFacilityText(e.target.value)}
                    className="flex-1 px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                  <button 
                    type="button" onClick={handleAddFacility}
                    className="bg-[#0E1B15] text-white px-5 rounded-xl text-[10px] font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Add Facility
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tourForm.facilities.map((fac, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-normal">
                      {fac}
                      <X size={12} className="cursor-pointer text-indigo-400 hover:text-indigo-600" onClick={() => handleRemoveFacility(idx)} />
                    </span>
                  ))}
                  {tourForm.facilities.length === 0 && <span className="text-[11px] font-light text-neutral-400 font-poppins text-left">No tour amenities added yet.</span>}
                </div>
              </div>

              {/* ROADMAP TIMELINE BUILDER */}
              <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Tour Timeline & Geographical Roadmap Path</label>
                  <button 
                    type="button" onClick={handleAddRoadmapStep}
                    className="text-[10px] font-normal uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors"
                  >
                    + Add Day Coordinates
                  </button>
                </div>

                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                  {tourForm.roadmap.map((step, idx) => (
                    <div key={idx} className="bg-neutral-50 border border-neutral-100 rounded-xl p-4 flex flex-col gap-3 relative shadow-inner text-left">
                      <button 
                        type="button" onClick={() => handleRemoveRoadmapStep(idx)}
                        className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={13} />
                      </button>

                      <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-2">
                          <span className="text-xs font-normal text-slate-800 text-left">Day {step.day}</span>
                        </div>
                        <div className="col-span-4">
                          <input 
                            type="text" required placeholder="Location (Sigiriya)"
                            value={step.location} onChange={(e) => handleRoadmapStepChange(idx, "location", e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-neutral-200 focus:border-neutral-300 rounded-lg outline-none text-xs font-normal text-left"
                          />
                        </div>
                        <div className="col-span-3">
                          <input 
                            type="number" step="any" required placeholder="Lat"
                            value={step.lat} onChange={(e) => handleRoadmapStepChange(idx, "lat", e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-neutral-200 focus:border-neutral-300 rounded-lg outline-none text-xs font-normal text-left"
                          />
                        </div>
                        <div className="col-span-3 pr-8">
                          <input 
                            type="number" step="any" required placeholder="Lng"
                            value={step.lng} onChange={(e) => handleRoadmapStepChange(idx, "lng", e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-neutral-200 focus:border-neutral-300 rounded-lg outline-none text-xs font-normal text-left"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <input 
                          type="text" required placeholder="Day activity title (e.g. Cave Climb)"
                          value={step.title} onChange={(e) => handleRoadmapStepChange(idx, "title", e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-neutral-200 focus:border-neutral-300 rounded-lg outline-none text-xs font-normal text-left"
                        />
                        <textarea 
                          rows={2} required placeholder="Detailed activity description..."
                          value={step.description} onChange={(e) => handleRoadmapStepChange(idx, "description", e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-neutral-200 focus:border-neutral-300 rounded-lg outline-none text-xs resize-none font-light leading-relaxed text-left"
                        />
                      </div>
                    </div>
                  ))}
                  {tourForm.roadmap.length === 0 && (
                    <span className="text-[11px] font-light text-neutral-400 font-poppins block text-center py-6 text-left">
                      Add at least one timeline day coordinate step.
                    </span>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isActionLoading || tourForm.roadmap.length === 0}
                className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-4 rounded-2xl text-xs font-normal uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-poppins outline-none shadow-md text-center"
              >
                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Tour Package ↗"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT DESTINATION SLIDING DRAWER MODAL --- */}
      {isDestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setIsDestModalOpen(false)} />
          <div className="relative w-full max-w-3xl h-full bg-white shadow-2xl p-8 overflow-y-auto flex flex-col gap-6 animate-slideIn">
            <header className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <h4 className="text-lg font-normal font-montserrat text-black uppercase">{editingDest ? "Edit Landmark Destination" : "Add Landmark Destination"}</h4>
              <button onClick={() => setIsDestModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-all">
                <X size={18} />
              </button>
            </header>

            <form onSubmit={handleSaveDest} className="space-y-5 font-poppins text-xs font-normal text-neutral-700 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Landmark Name</label>
                  <input 
                    type="text" required placeholder="Sigiriya Rock Fortress"
                    value={destForm.name} onChange={(e) => setDestForm(p => ({ ...p, name: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Region</label>
                  <input 
                    type="text" required placeholder="Cultural Triangle"
                    value={destForm.region} onChange={(e) => setDestForm(p => ({ ...p, region: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Description Copy</label>
                <textarea 
                  required rows={3} placeholder="Provide an extensive description..."
                  value={destForm.description} onChange={(e) => setDestForm(p => ({ ...p, description: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none resize-none text-neutral-900 font-light text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <ImageUpload 
                  label="Landmark Cover Image (Drag & Drop)" 
                  value={destForm.image} 
                  onChange={(url) => setDestForm(p => ({ ...p, image: url }))} 
                  placeholder="Or paste a custom landmark image URL path..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Best Visit Period (e.g. May - Sept)</label>
                  <input 
                    type="text" required placeholder="May - September"
                    value={destForm.bestTime} onChange={(e) => setDestForm(p => ({ ...p, bestTime: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Average Temp (e.g. 31°C)</label>
                  <input 
                    type="text" required placeholder="31°C"
                    value={destForm.temp} onChange={(e) => setDestForm(p => ({ ...p, temp: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Latitude Coordinate</label>
                  <input 
                    type="number" step="any" required placeholder="7.9570"
                    value={destForm.lat} onChange={(e) => setDestForm(p => ({ ...p, lat: parseFloat(e.target.value) || 0 }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Longitude Coordinate</label>
                  <input 
                    type="number" step="any" required placeholder="80.6511"
                    value={destForm.lng} onChange={(e) => setDestForm(p => ({ ...p, lng: parseFloat(e.target.value) || 0 }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Category Filter Link</label>
                  <select 
                    value={destForm.categoryFilter} onChange={(e) => setDestForm(p => ({ ...p, categoryFilter: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  >
                    <option value="Colombo Tours">Colombo Tours</option>
                    <option value="Beach Tours">Beach Tours</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Wildlife Tours">Wildlife Tours</option>
                    <option value="Ayurvedic Tours">Ayurvedic Tours</option>
                    <option value="Hill Country Tours">Hill Country Tours</option>
                    <option value="Honeymoon Tours">Honeymoon Tours</option>
                    <option value="Family Tours">Family Tours</option>
                    <option value="Golf Tours">Golf Tours</option>
                    <option value="Ramayana Tours">Ramayana Tours</option>
                  </select>
                </div>
              </div>

              {/* ATTRACTIONS CHIP LIST BUILDER */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-4 text-left">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Must-Visit Attractions</label>
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="Mirror Wall"
                    value={attractionText} onChange={(e) => setAttractionText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddAttraction();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                  <button 
                    type="button" onClick={handleAddAttraction}
                    className="bg-[#0E1B15] text-white px-5 rounded-xl text-[10px] font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Add Attraction
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {destForm.attractions.map((attr, idx) => (
                    <span key={idx} className="bg-emerald-50 text-[#0F9F68] border border-emerald-100/50 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-normal">
                      {attr}
                      <X size={12} className="cursor-pointer text-emerald-400 hover:text-[#0F9F68]" onClick={() => handleRemoveAttraction(idx)} />
                    </span>
                  ))}
                  {destForm.attractions.length === 0 && <span className="text-[11px] font-light text-neutral-400 font-poppins text-left">No regional attractions added yet.</span>}
                </div>
              </div>

              {/* ACTIVITIES CHIP LIST BUILDER */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-4 text-left">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Recommended Activities (No Emojis)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="Climbing fortress stairs"
                    value={activityText} onChange={(e) => setActivityText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddActivity();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                  />
                  <button 
                    type="button" onClick={handleAddActivity}
                    className="bg-[#0E1B15] text-white px-5 rounded-xl text-[10px] font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Add Activity
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {destForm.activities.map((act, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 border border-blue-100/50 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-normal">
                      {act}
                      <X size={12} className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleRemoveActivity(idx)} />
                    </span>
                  ))}
                  {destForm.activities.length === 0 && <span className="text-[11px] font-light text-neutral-400 font-poppins text-left">No activities added yet.</span>}
                </div>
              </div>

              {/* REGIONAL CHARACTERISTICS TOGGLE BUILDER */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-4 text-left">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Regional Characteristics</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    "Scenic Viewpoints",
                    "Ancient Heritage Site",
                    "Hiking & Walking Trails",
                    "Traditional Dining",
                    "Strong 4G Connectivity",
                    "Direct Road Access"
                  ].map((feat) => {
                    const isSelected = destForm.features.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setDestForm(prev => ({
                              ...prev,
                              features: prev.features.filter(f => f !== feat)
                            }));
                          } else {
                            setDestForm(prev => ({
                              ...prev,
                              features: [...prev.features, feat]
                            }));
                          }
                        }}
                        className={`px-3.5 py-2 rounded-xl border text-[11px] font-normal transition-all ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : "bg-white border-neutral-200 text-neutral-500 hover:text-slate-800 hover:border-neutral-300"
                        }`}
                      >
                        {feat}
                      </button>
                    );
                  })}
                </div>
                {/* Custom feature text addition */}
                <div className="flex gap-2 mt-3">
                  <input 
                    type="text" placeholder="Or add a custom characteristic..."
                    value={featureText} onChange={(e) => setFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-4 py-2.5 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-xs text-left"
                  />
                  <button 
                    type="button" onClick={handleAddFeature}
                    className="bg-black text-white px-5 rounded-xl text-[10px] font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {/* Show custom ones */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {destForm.features.filter(f => ![
                    "Scenic Viewpoints",
                    "Ancient Heritage Site",
                    "Hiking & Walking Trails",
                    "Traditional Dining",
                    "Strong 4G Connectivity",
                    "Direct Road Access"
                  ].includes(f)).map((feat, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 border border-slate-200 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-normal">
                      {feat}
                      <X size={12} className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => {
                        setDestForm(prev => ({
                          ...prev,
                          features: prev.features.filter(f => f !== feat)
                        }));
                      }} />
                    </span>
                  ))}
                </div>
              </div>

              {/* GALLERY IMAGES BUILDER */}
              <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4 text-left">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Gallery Showcase Images (Drag & Drop up to 3)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((idx) => (
                    <ImageUpload
                      key={idx}
                      label={`Gallery Image ${idx + 1}`}
                      value={destForm.gallery[idx] || ""}
                      onChange={(url) => {
                        setDestForm(prev => {
                          const updatedGallery = [...prev.gallery];
                          if (url) {
                            updatedGallery[idx] = url;
                          } else {
                            updatedGallery.splice(idx, 1);
                          }
                          return { ...prev, gallery: updatedGallery.filter(Boolean) };
                        });
                      }}
                      placeholder="Or paste image URL..."
                    />
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isActionLoading}
                className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-4 rounded-2xl text-xs font-normal uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-poppins outline-none shadow-md text-center"
              >
                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Landmark Destination ↗"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT AD BANNER MODAL --- */}
      {isAdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setIsAdModalOpen(false)} />
          <div className="relative w-full max-w-xl h-full bg-white shadow-2xl p-8 overflow-y-auto flex flex-col gap-6 animate-slideIn">
            <header className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <h4 className="text-lg font-normal font-montserrat text-black uppercase">{editingAd ? "Edit Promo Banner" : "Add Promo Banner"}</h4>
              <button onClick={() => setIsAdModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-all">
                <X size={18} />
              </button>
            </header>

            <form onSubmit={handleSaveAd} className="space-y-5 font-poppins text-xs font-normal text-neutral-700 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Campaign Main Title</label>
                <input 
                  type="text" required placeholder="Summer Flash Sale 30% Off"
                  value={adForm.title} onChange={(e) => setAdForm(p => ({ ...p, title: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Campaign Subtitle</label>
                <input 
                  type="text" placeholder="Applicable on all beach and colombo packages"
                  value={adForm.subtitle} onChange={(e) => setAdForm(p => ({ ...p, subtitle: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <ImageUpload 
                  label="Promo Banner Image (Drag & Drop)" 
                  value={adForm.image} 
                  onChange={(url) => setAdForm(p => ({ ...p, image: url }))} 
                  placeholder="Or paste a custom promo image URL path..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Click-through Destination Path</label>
                <input 
                  type="text" placeholder="/tours?category=Beach Tours"
                  value={adForm.link} onChange={(e) => setAdForm(p => ({ ...p, link: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-left"
                />
              </div>

              <div className="flex items-center gap-3 py-2 text-left">
                <input 
                  type="checkbox" id="isActive"
                  checked={adForm.isActive} onChange={(e) => setAdForm(p => ({ ...p, isActive: e.target.checked }))}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-xs font-normal text-neutral-800 cursor-pointer text-left">
                  Activate this campaign immediately
                </label>
              </div>

              <button 
                type="submit"
                disabled={isActionLoading}
                className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-4 rounded-2xl text-xs font-normal uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-poppins outline-none shadow-md text-center"
              >
                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Campaign ↗"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT BENTO PACKAGE MODAL --- */}
      {isBentoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setIsBentoModalOpen(false)} />
          <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl p-8 overflow-y-auto flex flex-col gap-6 animate-slideIn">
            <header className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <h4 className="text-lg font-normal font-montserrat text-black uppercase">
                {editingBento ? "Edit Bento Section" : "Add Bento Section"}
              </h4>
              <button onClick={() => setIsBentoModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-all">
                <X size={18} />
              </button>
            </header>

            <form onSubmit={handleSaveBento} className="space-y-6 font-poppins text-xs font-normal text-neutral-700 text-left pb-10">
              
              {/* SECTION A: General Settings */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] pb-2 border-b border-slate-50">General Tab Settings</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Navigation Tab Label</label>
                    <input 
                      type="text" required placeholder="Wild Safari"
                      value={bentoForm.tabName} onChange={(e) => setBentoForm(p => ({ ...p, tabName: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Section Background CSS/Color Class</label>
                    <input 
                      type="text" required placeholder="bg-[#A3937C]"
                      value={bentoForm.sectionBg} onChange={(e) => setBentoForm(p => ({ ...p, sectionBg: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Section Header Title (Light Accent)</label>
                    <input 
                      type="text" required placeholder="Untamed"
                      value={bentoForm.title} onChange={(e) => setBentoForm(p => ({ ...p, title: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Section Header Highlight (Bold Accent)</label>
                    <input 
                      type="text" required placeholder="Wilderness."
                      value={bentoForm.highlight} onChange={(e) => setBentoForm(p => ({ ...p, highlight: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Section Header Description Copy</label>
                    <textarea 
                      required rows={2} placeholder="A deep dive into Sri Lanka's spectacular biodiverse ecosystems..."
                      value={bentoForm.headerDesc} onChange={(e) => setBentoForm(p => ({ ...p, headerDesc: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Sort Display Order Index</label>
                    <input 
                      type="number" required placeholder="0"
                      value={bentoForm.order} onChange={(e) => setBentoForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 1: Description Card */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h5 className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] pb-2 border-b border-slate-50">Card 1: Narrative Info Block</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Title</label>
                    <input 
                      type="text" required placeholder="Bespoke Wildlife Safari."
                      value={bentoForm.card1Title} onChange={(e) => setBentoForm(p => ({ ...p, card1Title: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Background CSS Color</label>
                    <input 
                      type="text" required placeholder="bg-[#1E1915]"
                      value={bentoForm.card1Bg} onChange={(e) => setBentoForm(p => ({ ...p, card1Bg: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400">Card Description Paragraph</label>
                  <textarea 
                    required rows={3} placeholder="Step into deep sanctuaries where nature reigns supreme..."
                    value={bentoForm.card1Desc} onChange={(e) => setBentoForm(p => ({ ...p, card1Desc: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Footer Title</label>
                    <input 
                      type="text" required placeholder="Wilderness Expedition"
                      value={bentoForm.card1FooterTitle} onChange={(e) => setBentoForm(p => ({ ...p, card1FooterTitle: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Footer Subtitle</label>
                    <input 
                      type="text" required placeholder="7-Day Premium Safari"
                      value={bentoForm.card1FooterSub} onChange={(e) => setBentoForm(p => ({ ...p, card1FooterSub: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Text Color CSS</label>
                    <input 
                      type="text" required placeholder="text-white"
                      value={bentoForm.card1Text} onChange={(e) => setBentoForm(p => ({ ...p, card1Text: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: Background Image Card 1 */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h5 className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] pb-2 border-b border-slate-50">Card 2: Landmark Leg 1</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Header Title</label>
                    <input 
                      type="text" required placeholder="Leopard Kingdom."
                      value={bentoForm.card2Title} onChange={(e) => setBentoForm(p => ({ ...p, card2Title: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Call-to-Action Link</label>
                    <input 
                      type="text" required placeholder="/tours/3"
                      value={bentoForm.card2Link} onChange={(e) => setBentoForm(p => ({ ...p, card2Link: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Description subtext</label>
                    <textarea 
                      required rows={2} placeholder="Track the world's highest density of leopards..."
                      value={bentoForm.card2Desc} onChange={(e) => setBentoForm(p => ({ ...p, card2Desc: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">CTA Button Label</label>
                    <input 
                      type="text" required placeholder="Explore Yala ↗"
                      value={bentoForm.card2Button} onChange={(e) => setBentoForm(p => ({ ...p, card2Button: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <ImageUpload 
                    label="Background Image (Drag & Drop)" 
                    value={bentoForm.card2Image} 
                    onChange={(url) => setBentoForm(p => ({ ...p, card2Image: url || "" }))} 
                    placeholder="Or paste custom background image URL..."
                  />
                </div>
              </div>

              {/* CARD 3: Facilities / Inclusions Card */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h5 className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] pb-2 border-b border-slate-50">Card 3: Inclusions / Benefits List</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Title Header</label>
                    <input 
                      type="text" required placeholder="Expedition Benefits"
                      value={bentoForm.card3Title} onChange={(e) => setBentoForm(p => ({ ...p, card3Title: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Background Color</label>
                    <input 
                      type="text" required placeholder="bg-[#F3DEC5]"
                      value={bentoForm.card3Bg} onChange={(e) => setBentoForm(p => ({ ...p, card3Bg: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Text Color CSS</label>
                    <input 
                      type="text" required placeholder="text-[#4A2E05]"
                      value={bentoForm.card3Text} onChange={(e) => setBentoForm(p => ({ ...p, card3Text: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-normal text-neutral-400">Card Footer Note</label>
                  <input 
                    type="text" required placeholder="*Custom 4x4 vehicles & trackers included"
                    value={bentoForm.card3Footer} onChange={(e) => setBentoForm(p => ({ ...p, card3Footer: e.target.value }))}
                    className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                  />
                </div>

                {/* Inclusion List Builder */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex flex-col gap-3">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Inclusions Builder (Add up to 4)</label>
                  
                  {/* Current inclusions list */}
                  <div className="flex flex-col gap-2">
                    {bentoForm.card3Inclusions.map((inc, i) => (
                      <div key={i} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono text-[9px]">{inc.icon}</span>
                          <span className="font-medium text-slate-800">{inc.title}</span>
                          <span className="text-neutral-400 font-light truncate max-w-[150px]">({inc.desc})</span>
                        </div>
                        <button type="button" onClick={() => handleRemoveBentoInclusion(i)} className="text-rose-500 hover:text-rose-700 p-1">
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    {bentoForm.card3Inclusions.length === 0 && (
                      <p className="text-[10px] text-neutral-400 font-light text-center py-2">No inclusions added yet. Add one below.</p>
                    )}
                  </div>

                  {/* Add inclusion form */}
                  {bentoForm.card3Inclusions.length < 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 border-t border-dashed border-neutral-200">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase font-normal text-neutral-400">Inclusion Icon</label>
                        <select 
                          value={incIcon} onChange={(e) => setIncIcon(e.target.value)}
                          className="px-2 py-2 bg-white border rounded-xl outline-none text-slate-700 text-xs"
                        >
                          <option value="Hotel">Hotel / Stay</option>
                          <option value="Car">Car / Transport</option>
                          <option value="Compass">Compass / Safari</option>
                          <option value="Ticket">Ticket / Entry</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-[9px] uppercase font-normal text-neutral-400">Benefit Title & Description</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" placeholder="Title" value={incTitle} onChange={(e) => setIncTitle(e.target.value)}
                            className="w-1/2 px-2.5 py-2 bg-white border rounded-xl outline-none text-slate-800 text-xs"
                          />
                          <input 
                            type="text" placeholder="Description subtext" value={incDesc} onChange={(e) => setIncDesc(e.target.value)}
                            className="w-1/2 px-2.5 py-2 bg-white border rounded-xl outline-none text-slate-800 text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex items-end">
                        <button 
                          type="button" onClick={handleAddBentoInclusion}
                          className="w-full bg-slate-900 hover:bg-black text-white py-2 rounded-xl text-[10px] font-normal uppercase tracking-wider transition-colors text-center"
                        >
                          Add Inclusion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CARD 4: Background Image Card 2 */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h5 className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] pb-2 border-b border-slate-50">Card 4: Landmark Leg 2</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Header Title</label>
                    <input 
                      type="text" required placeholder="Majestic Herds."
                      value={bentoForm.card4Title} onChange={(e) => setBentoForm(p => ({ ...p, card4Title: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Call-to-Action Link</label>
                    <input 
                      type="text" required placeholder="/tours/3"
                      value={bentoForm.card4Link} onChange={(e) => setBentoForm(p => ({ ...p, card4Link: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">Card Description subtext</label>
                    <textarea 
                      required rows={2} placeholder="Witness the magnificent gathering of hundreds of Asian elephants..."
                      value={bentoForm.card4Desc} onChange={(e) => setBentoForm(p => ({ ...p, card4Desc: e.target.value }))}
                      className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-normal text-neutral-400">CTA Button Label</label>
                    <input 
                      type="text" required placeholder="View Safari ↗"
                      value={bentoForm.card4Button} onChange={(e) => setBentoForm(p => ({ ...p, card4Button: e.target.value }))}
                      className="px-4 py-3 bg-[#A3937C] bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <ImageUpload 
                    label="Background Image (Drag & Drop)" 
                    value={bentoForm.card4Image} 
                    onChange={(url) => setBentoForm(p => ({ ...p, card4Image: url || "" }))} 
                    placeholder="Or paste custom background image URL..."
                  />
                </div>
              </div>

              {/* Form submit button */}
              <button 
                type="submit"
                disabled={isActionLoading}
                className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-4 rounded-2xl text-xs font-normal uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-poppins outline-none shadow-md text-center"
              >
                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Bento Section Details ↗"}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT FAQ SLIDING DRAWER MODAL --- */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setIsFaqModalOpen(false)} />
          <div className="relative w-full max-w-xl h-full bg-white shadow-2xl p-8 overflow-y-auto flex flex-col gap-6 animate-slideIn">
            <header className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <h4 className="text-lg font-normal font-montserrat text-black uppercase">{editingFaq ? "Edit FAQ Item" : "Create FAQ Item"}</h4>
              <button onClick={() => setIsFaqModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-all">
                <X size={18} />
              </button>
            </header>

            <form onSubmit={handleSaveFaq} className="space-y-5 font-poppins text-xs font-normal text-neutral-700 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Question Text</label>
                <input 
                  type="text" required placeholder="Best time to visit Sri Lanka?"
                  value={faqForm.question} onChange={(e) => setFaqForm(p => ({ ...p, question: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-xs text-left"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Answer Copy</label>
                <textarea 
                  required rows={8} placeholder="Provide a detailed, helpful answer..."
                  value={faqForm.answer} onChange={(e) => setFaqForm(p => ({ ...p, answer: e.target.value }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none resize-none text-neutral-900 font-light text-left leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-normal text-neutral-400 text-left">Sort Display Order Index</label>
                <input 
                  type="number" required placeholder="0"
                  value={faqForm.order} onChange={(e) => setFaqForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                  className="px-4 py-3 bg-neutral-50 focus:bg-white border focus:border-neutral-200 rounded-xl outline-none text-neutral-900 text-left"
                />
              </div>

              <button 
                type="submit"
                disabled={isActionLoading}
                className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-4 rounded-2xl text-xs font-normal uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-poppins outline-none shadow-md text-center"
              >
                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save FAQ Item ↗"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

