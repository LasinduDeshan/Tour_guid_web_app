"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Menu, X, User, ChevronDown, Compass, Search, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/lib/LanguageContext";
import { Language } from "@/lib/translations";
import { useCurrency, Currency, currencyMeta } from "@/lib/CurrencyContext";
import { mockDestinations } from "@/lib/data";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Colombo Tours": "Explore landmarks, temples, and coastal sunsets in the commercial capital.",
  "Beach Tours": "Unwind on golden coasts, enjoy whale charters, and surf pristine bays.",
  "Cultural Tours": "Ascend royal fortresses and ancient kingdoms in the cultural triangle.",
  "Adventure Tours": "Tackle rapids, canyon waterfalls, and hike Adams Peak under star skies.",
  "Wildlife Tours": "Track leopards and massive wild elephant herds on guided 4x4 safaris.",
  "Ayurvedic Tours": "Restore wellness with steam baths, herbal therapies, and guided yoga.",
  "Hill Country Tours": "Ride the iconic blue train through valleys and mist-shrouded tea gardens.",
  "Honeymoon Tours": "Celebrate love in canopy pool villas with private beach dinners.",
  "Family Tours": "Interactive scavenger hunts, sea turtle releases, and spacious rides.",
  "Golf Tours": "Play 18-hole championship green golf nested along knuckled mountains.",
  "Ramayana Tours": "Trace sacred epic paths, Ravana waterfalls, and ancient historic shrines."
};

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language, setLanguage } = useTranslation();
  const { currency, setCurrency } = useCurrency();

  const [destinations, setDestinations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  useEffect(() => {
    // Set initial local static defaults to avoid layout shift/hydration mismatch
    const initialDests = mockDestinations.map(d => ({
      id: d.id,
      name: d.name,
      region: d.region,
      bestTime: d.bestTime,
      image: d.image,
    }));

    const defaultCategories = [
      { title: "Colombo Tours", desc: "Explore landmarks, temples, and coastal sunsets in the commercial capital." },
      { title: "Beach Tours", desc: "Unwind on golden coasts, enjoy whale charters, and surf pristine bays." },
      { title: "Cultural Tours", desc: "Ascend royal fortresses and ancient kingdoms in the cultural triangle." },
      { title: "Adventure Tours", desc: "Tackle rapids, canyon waterfalls, and hike Adams Peak under star skies." },
      { title: "Wildlife Tours", desc: "Track leopards and massive wild elephant herds on guided 4x4 safaris." },
      { title: "Ayurvedic Tours", desc: "Restore wellness with steam baths, herbal therapies, and guided yoga." },
      { title: "Hill Country Tours", desc: "Ride the iconic blue train through valleys and mist-shrouded tea gardens." },
      { title: "Honeymoon Tours", desc: "Celebrate love in canopy pool villas with private beach dinners." },
      { title: "Family Tours", desc: "Interactive scavenger hunts, sea turtle releases, and spacious rides." },
      { title: "Golf Tours", desc: "Play 18-hole championship green golf nested along knuckled mountains." },
      { title: "Ramayana Tours", desc: "Trace sacred epic paths, Ravana waterfalls, and ancient historic shrines." }
    ];

    setDestinations(initialDests);
    setCategories(defaultCategories);

    // Fetch dynamic database values in the background
    const fetchDropdownData = async () => {
      try {
        const [destRes, toursRes] = await Promise.all([
          fetch(`/api/destinations?lang=${language}`, { cache: "no-store" }),
          fetch(`/api/tours?lang=${language}`, { cache: "no-store" })
        ]);

        if (destRes.ok) {
          const destData = await destRes.json();
          if (Array.isArray(destData) && destData.length > 0) {
            setDestinations(destData.map((d: any) => ({
              id: d.id,
              name: d.name,
              region: d.region,
              bestTime: d.bestTime,
              image: d.image,
            })));
          }
        }

        if (toursRes.ok) {
          const toursData = await toursRes.json();
          if (Array.isArray(toursData)) {
            const dbCategories = Array.from(new Set(toursData.map((t: any) => t.category)))
              .filter(Boolean) as string[];

            const mergedCategoriesList = Array.from(new Set([
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
            ]));

            const mappedCategories = mergedCategoriesList.map(cat => ({
              title: cat,
              desc: CATEGORY_DESCRIPTIONS[cat] || "Discover bespoke experiences and premium guided routes in Sri Lanka."
            }));
            setCategories(mappedCategories);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic navbar dropdown data:", err);
      }
    };

    fetchDropdownData();
  }, [language, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-auto lg:min-w-[920px] lg:max-w-[95%] h-[52px] flex items-center z-[1000] transition-all duration-300 ease-in-out bg-white border border-black/10 rounded-full text-neutral-800 shadow-md ${scrolled ? "bg-white/98 shadow-lg" : ""}`}>
      <div className="flex justify-between items-center w-full px-5 gap-4">
        <Link href="/" className="text-base font-light font-montserrat tracking-tight flex items-center gap-2 text-neutral-900 whitespace-nowrap">
          <div className="text-black">
            <Compass size={20} />
          </div>
          ceyora<span className="font-semibold text-black font-montserrat">tours</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3">
          <Link 
            href="/" 
            className={`text-[0.8rem] px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              pathname === "/" 
                ? "bg-[#0E1B15] text-white font-medium shadow-sm hover:opacity-90" 
                : "font-light text-neutral-600 hover:text-black hover:bg-black/5"
            }`}
          >
            {t("nav.home")}
          </Link>
          <div className="group py-2">
            <Link 
              href="/packages" 
              className={`text-[0.8rem] px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                isActive("/packages") 
                  ? "bg-[#0E1B15] text-white font-medium shadow-sm hover:opacity-90" 
                  : "font-light text-neutral-600 hover:text-black hover:bg-black/5"
              }`}
            >
              {t("nav.tours")}
              <ChevronDown size={11} className="opacity-60 transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            
            {/* Tours Mega Dropdown (Highly Premium Wide Panel Layout aligned with Navbar bounds with a seamless hover bridge) */}
            <div className="absolute top-full left-0 right-0 w-full pt-3.5 hidden group-hover:block z-50">
              <div className="bg-white rounded-[2rem] shadow-2xl border border-black/5 p-6 grid grid-cols-12 gap-6">


                {/* Left Column: Premium Featured Banner Promo Card */}
              <div className="col-span-4 bg-[#0E1B15] text-white p-5 rounded-2xl flex flex-col justify-between h-[285px] relative overflow-hidden group/promo border border-black/5 shadow-inner">
                {/* Background Image of Ella Bridge */}
                <Image 
                  src="/bento/ella-bridge.png"
                  alt="Hill Country Rail Journey"
                  fill
                  className="object-cover object-center z-0 transition-transform duration-700 ease-out group-hover/promo:scale-105"
                  sizes="(max-width: 768px) 100vw, 250px"
                />
                {/* Dark Gradient Overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/70 z-10" />

                
                <Link href="/packages" className="relative z-20 mt-auto bg-white hover:bg-white/80 text-[#0E1B15] text-[10px] font-bold py-2.5 px-4 rounded-xl text-center transition-all duration-300 font-poppins shadow-md">
                  {t("nav.explore_packages")}
                </Link>
              </div>



              {/* Right Column: Dynamic Category Multi-Column Grid with Detailed Descriptions */}
              <div className="col-span-8 flex flex-col gap-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-[0.7rem] text-neutral-400 font-poppins">{t("nav.categories")}</span>
                </div>
                <div className="h-[1px] bg-black/5 mx-2"></div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200">
                  {categories.map(cat => (
                    <Link 
                      key={cat.title} 
                      href={`/tours?category=${encodeURIComponent(cat.title)}`}
                      className="flex flex-col gap-1 p-2 rounded-xl hover:bg-blue-50/40 border border-transparent hover:border-blue-100/55 transition-all duration-200 group/item"
                    >
                      <div className="flex items-center gap-1 text-neutral-800 group-hover/item:text-[#0E1B15] font-semibold text-[0.78rem] font-poppins leading-none">
                        {t(cat.title)} <span className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 ml-0.5 text-xs text-neutral-500 font-normal">&gt;</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-light font-poppins leading-normal">
                        {cat.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* Destinations Dropdown */}
          <div className="group py-2 relative">
            <Link
              href="/destinations"
              className={`text-[0.8rem] px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                isActive("/destinations")
                  ? "bg-[#0E1B15] text-white font-medium shadow-sm hover:opacity-90"
                  : "font-light text-neutral-600 hover:text-black hover:bg-black/5"
              }`}
            >
              {t("nav.destinations")}
              <ChevronDown size={11} className="opacity-60 transition-transform duration-300 group-hover:rotate-180" />
            </Link>

            {/* Destinations Dropdown Panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] pt-3.5 hidden group-hover:block z-50">
              <div className="bg-white rounded-[2rem] shadow-2xl border border-black/5 p-5">
                <div className="flex justify-between items-center px-1 mb-3">
                  <span className="text-[0.7rem] text-neutral-400 font-poppins">All Destinations</span>
                  <Link href="/destinations" className="text-[0.7rem] text-neutral-500 hover:text-black font-poppins transition-colors">View all →</Link>
                </div>
                <div className="h-[1px] bg-black/5 mb-4" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-200">
                  {destinations.map(dest => (
                    <Link
                      key={dest.id}
                      href={`/destinations?id=${dest.id}`}
                      className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all duration-200 group/dest"
                    >
                      <span className="text-[0.78rem] font-semibold font-poppins text-neutral-800 group-hover/dest:text-[#0E1B15] leading-tight">
                        {dest.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-light font-poppins">
                        {dest.region} · {dest.bestTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link 
            href="/about" 
            className={`text-[0.8rem] px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive("/about") 
                ? "bg-[#0E1B15] text-white font-medium shadow-sm hover:opacity-90" 
                : "font-light text-neutral-600 hover:text-black hover:bg-black/5"
            }`}
          >
            {t("nav.about")}
          </Link>
          <Link 
            href="/contact" 
            className={`text-[0.8rem] px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive("/contact") 
                ? "bg-[#0E1B15] text-white font-medium shadow-sm hover:opacity-90" 
                : "font-light text-neutral-600 hover:text-black hover:bg-black/5"
            }`}
          >
            {t("nav.contact")}
          </Link>
          
          <div className="w-[1px] h-6 bg-black/10 mx-0.5"></div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-full text-neutral-500 border border-transparent focus-within:bg-white focus-within:border-black focus-within:ring-2 focus-within:ring-black/5 transition-all duration-200">
            <Search size={14} />
            <input type="text" placeholder={t("nav.search")} className="border-none bg-transparent outline-none text-xs w-[100px] text-neutral-900 font-poppins" />
          </div>

          {/* Premium Glassmorphic Language Selector Dropdown */}
          <div className="relative group/lang">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:bg-black/5 hover:text-black px-3 py-1.5 rounded-full transition-all duration-200">
              <Globe size={14} />
              <span className="uppercase">{language}</span>
            </button>
            <div className="absolute top-[85%] right-0 pt-3 hidden group-hover/lang:block z-50">
              <div className="bg-white min-w-[140px] rounded-2xl shadow-xl flex flex-col p-1.5 border border-black/5 overflow-hidden">
                <button onClick={() => setLanguage("en")} className={`px-3 py-2 text-left text-xs hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins flex items-center justify-between ${language === "en" ? "font-semibold text-black bg-black/5" : "font-light text-neutral-600"}`}>
                  <span>English (EN)</span>
                </button>
                <button onClick={() => setLanguage("fr")} className={`px-3 py-2 text-left text-xs hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins flex items-center justify-between ${language === "fr" ? "font-semibold text-black bg-black/5" : "font-light text-neutral-600"}`}>
                  <span>Français (FR)</span>
                </button>
                <button onClick={() => setLanguage("de")} className={`px-3 py-2 text-left text-xs hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins flex items-center justify-between ${language === "de" ? "font-semibold text-black bg-black/5" : "font-light text-neutral-600"}`}>
                  <span>Deutsch (DE)</span>
                </button>
                <button onClick={() => setLanguage("es")} className={`px-3 py-2 text-left text-xs hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins flex items-center justify-between ${language === "es" ? "font-semibold text-black bg-black/5" : "font-light text-neutral-600"}`}>
                  <span>Español (ES)</span>
                </button>
                <button onClick={() => setLanguage("zh")} className={`px-3 py-2 text-left text-xs hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins flex items-center justify-between ${language === "zh" ? "font-semibold text-black bg-black/5" : "font-light text-neutral-600"}`}>
                  <span>中文 (ZH)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Glassmorphic Currency Selector Dropdown */}
          <div className="relative group/cur">
            <button className="flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:bg-black/5 hover:text-black px-3 py-1.5 rounded-full transition-all duration-200 uppercase">
              <span className="opacity-75">{currencyMeta[currency].symbol}</span>
              <span>{currency}</span>
            </button>
            <div className="absolute top-[85%] right-0 pt-3 hidden group-hover/cur:block z-50">
              <div className="bg-white min-w-[120px] rounded-2xl shadow-xl flex flex-col p-1.5 border border-black/5 overflow-hidden">
                {(["USD", "EUR", "GBP", "LKR", "CNY"] as Currency[]).map(cur => (
                  <button 
                    key={cur}
                    onClick={() => setCurrency(cur)} 
                    className={`px-3 py-2 text-left text-xs hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins flex items-center justify-between ${currency === cur ? "font-semibold text-black bg-black/5" : "font-light text-neutral-600"}`}
                  >
                    <span>{currencyMeta[cur].symbol} {cur}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[1px] h-6 bg-black/10 mx-0.5"></div>

          {session ? (
            <div className="relative group">
              <div className="flex items-center gap-1.5 cursor-pointer bg-black/5 hover:bg-black/10 px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs text-neutral-800">
                <User size={14} />
                <span className="font-medium font-poppins">{session.user?.name}</span>
                <ChevronDown size={10} />
              </div>
              <div className="absolute top-[85%] right-0 pt-3 hidden group-hover:block z-50">
                <div className="bg-white min-w-[180px] rounded-2xl shadow-xl flex flex-col p-1.5 border border-black/5 overflow-hidden">
                  {session.user && (session.user as any).role === "ADMIN" && (
                    <Link href="/admin" className="block px-3.5 py-2.5 text-left text-xs text-neutral-600 hover:text-black hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins font-medium">{t("nav.admin")}</Link>
                  )}
                  <button onClick={() => signOut()} className="px-3.5 py-2.5 text-left text-xs text-neutral-600 hover:text-black hover:bg-black/5 w-full transition-all duration-150 rounded-lg font-poppins font-medium">{t("nav.logout")}</button>
                </div>
              </div>

            </div>
          ) : (
            <Link href="/login" className="bg-black text-white hover:bg-neutral-800 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:-translate-y-0.5">{t("nav.login")}</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden block text-neutral-900 hover:opacity-80" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-screen bg-white z-[1001] flex flex-col p-20 gap-6 transition-all duration-300 shadow-2xl text-neutral-800 ${isOpen ? "w-[80%] max-w-[300px]" : "w-0 pointer-events-none opacity-0"}`}>
        <button className="absolute top-5 right-5 text-neutral-900" onClick={toggleMenu} title="Close menu">
          <X size={28} />
        </button>
        <div className="flex flex-col gap-2">
          <Link 
            href="/" 
            onClick={toggleMenu} 
            className={`text-lg font-poppins transition-colors duration-200 ${
              pathname === "/" ? "font-semibold text-[#0E1B15]" : "font-light text-neutral-500 hover:text-black"
            }`}
          >
            {t("nav.home")}
          </Link>
          <Link 
            href="/packages" 
            onClick={toggleMenu} 
            className={`text-lg font-poppins transition-colors duration-200 ${
              isActive("/packages") ? "font-semibold text-[#0E1B15]" : "font-light text-neutral-500 hover:text-black"
            }`}
          >
            {t("nav.tours")}
          </Link>
          {/* Mobile Categories list (indented, small, high fidelity) */}
          <div className="flex flex-col gap-1.5 pl-4 border-l border-black/5 max-h-[140px] overflow-y-auto pr-1">
            <Link 
              href="/packages" 
              onClick={toggleMenu}
              className="text-[0.75rem] font-medium text-neutral-400 hover:text-black font-poppins"
            >
              {t("nav.explore_packages")}
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat.title}
                href={`/tours?category=${encodeURIComponent(cat.title)}`} 
                onClick={toggleMenu}
                className="text-[0.75rem] text-neutral-400 hover:text-black font-poppins"
              >
                {t(cat.title)}
              </Link>
            ))}
          </div>
        </div>
        <Link 
          href="/destinations" 
          onClick={toggleMenu} 
          className={`text-lg font-poppins transition-colors duration-200 ${
            isActive("/destinations") ? "font-semibold text-[#0E1B15]" : "font-light text-neutral-500 hover:text-black"
          }`}
        >
          {t("nav.destinations")}
        </Link>
        <Link 
          href="/about" 
          onClick={toggleMenu} 
          className={`text-lg font-poppins transition-colors duration-200 ${
            isActive("/about") ? "font-semibold text-[#0E1B15]" : "font-light text-neutral-500 hover:text-black"
          }`}
        >
          {t("nav.about")}
        </Link>
        <Link 
          href="/contact" 
          onClick={toggleMenu} 
          className={`text-lg font-poppins transition-colors duration-200 ${
            isActive("/contact") ? "font-semibold text-[#0E1B15]" : "font-light text-neutral-500 hover:text-black"
          }`}
        >
          {t("nav.contact")}
        </Link>
        
        {/* Mobile Language Selector Toggle */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5">
          {(["en", "fr", "de", "es", "zh"] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); toggleMenu(); }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 uppercase ${
                language === lang 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Mobile Currency Selector Toggle */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5">
          {(["USD", "EUR", "GBP", "LKR", "CNY"] as Currency[]).map(cur => (
            <button
              key={cur}
              onClick={() => { setCurrency(cur); toggleMenu(); }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 uppercase ${
                currency === cur 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {currencyMeta[cur].symbol} {cur}
            </button>
          ))}
        </div>

        {session ? (
          <>
            {session.user && (session.user as any).role === "ADMIN" && (
              <Link href="/admin" onClick={toggleMenu} className="text-lg font-light hover:text-black font-poppins">{t("nav.admin")}</Link>
            )}
            <button onClick={() => { signOut(); toggleMenu(); }} className="text-lg font-medium text-left hover:text-black font-poppins mt-4 border-t border-black/10 pt-4">{t("nav.logout")}</button>
          </>
        ) : (
          <Link href="/login" onClick={toggleMenu} className="bg-black text-white hover:bg-neutral-800 text-center px-5 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 mt-4 shadow-md font-poppins">{t("nav.login")}</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
