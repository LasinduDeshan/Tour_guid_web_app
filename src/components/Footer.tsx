"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "@/lib/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white pt-20 mt-20">
      <div className="container mx-auto px-8 max-w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 mb-16">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-light font-montserrat tracking-tight mb-6 block text-white">
            ceyora<span className="font-semibold text-white font-montserrat">tours</span>
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-[300px] font-light font-poppins">
            {t("footer.desc")}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-0.5"><FaFacebook size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-0.5"><FaTwitter size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-0.5"><FaInstagram size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-0.5"><FaLinkedin size={18} /></a>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-6 pb-3 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-white font-montserrat">{t("footer.quick_links")}</h3>
          <ul className="list-none flex flex-col gap-3 font-poppins text-sm font-light">
            <li><Link href="/tours" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("footer.all_tours")}</Link></li>
            <li><Link href="/destinations" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("footer.destinations")}</Link></li>
            <li><Link href="/about" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("footer.about")}</Link></li>
            <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("footer.contact")}</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-6 pb-3 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-white font-montserrat">{t("footer.tour_types")}</h3>
          <ul className="list-none flex flex-col gap-3 font-poppins text-sm font-light">
            <li><Link href="/tours?cat=day" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("Day Tours")}</Link></li>
            <li><Link href="/tours?cat=round" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("Round Tours")}</Link></li>
            <li><Link href="/tours?cat=wellness" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("Wellness & Yoga")}</Link></li>
            <li><Link href="/tours?cat=wildlife" className="text-neutral-400 hover:text-white transition-all duration-200 block">{t("Wildlife Safaris")}</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-2 pb-3 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-white font-montserrat">{t("footer.contact_us")}</h3>
          <div className="flex items-start gap-4 text-neutral-300 text-sm font-light font-poppins mt-2">
            <MapPin size={16} className="mt-1 flex-shrink-0 text-white" />
            <span>123 Galle Road, Colombo 03, Sri Lanka</span>
          </div>
          <div className="flex items-start gap-4 text-neutral-300 text-sm font-light font-poppins">
            <Phone size={16} className="mt-1 flex-shrink-0 text-white" />
            <span>+94 11 234 5678</span>
          </div>
          <div className="flex items-start gap-4 text-neutral-300 text-sm font-light font-poppins">
            <Mail size={16} className="mt-1 flex-shrink-0 text-white" />
            <span>info@ceyoratours.com</span>
          </div>
        </div>
      </div>
      <div className="py-8 border-t border-white/10 text-center text-xs text-neutral-500 font-light font-poppins">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <p>&copy; {new Date().getFullYear()} {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
