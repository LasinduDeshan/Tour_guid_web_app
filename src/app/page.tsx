import Hero from "@/components/Hero";
import BentoIntro from "@/components/BentoIntro";
import TourCategories from "@/components/TourCategories";
import TourCard from "@/components/TourCard";
import FAQSection from "@/components/FAQSection";
import ImageGridSection from "@/components/ImageGridSection";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Star, Shield, Map } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch first 3 featured tours directly from PostgreSQL database natively on the server
  const featuredTours = await prisma.tour.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      roadmap: {
        orderBy: {
          day: "asc",
        },
      },
    },
  });

  // Fetch bento packages from database
  const bentoPackages = await prisma.bentoPackage.findMany({
    orderBy: {
      order: "asc",
    },
  });

  // Fetch FAQs from database
  const faqs = await prisma.fAQ.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="w-full">
      <Hero />
      
      <BentoIntro />

      <TourCategories initialPackages={JSON.parse(JSON.stringify(bentoPackages))} />

      
      {/* Featured Tours Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-neutral-900 leading-[1.05] tracking-tight mb-6 text-center font-montserrat">Experience the <br /><span className="font-semibold text-black">Extraordinary</span></h2>
          <p className="text-base text-neutral-500 text-center max-w-[700px] mx-auto mb-16 font-light font-poppins">Discover our most popular tour packages, carefully curated to show you the very best of Sri Lanka.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {featuredTours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour as any} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/tours" className="btn btn-outline border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
              View All Tours <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6 font-montserrat tracking-tight leading-tight text-left">Why Choose <span className="font-semibold text-black">Ceyora Tours</span></h2>
              <p className="mb-10 text-neutral-500 font-light font-poppins leading-relaxed">With over 50 years of experience, we are the pioneers of tourism in Sri Lanka. Our commitment to excellence ensures your journey is seamless and unforgettable.</p>
              
              <div className="flex flex-col gap-8">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm flex-shrink-0 border border-neutral-100"><Star size={24} /></div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-neutral-800 mb-1.5 font-montserrat">Premium Quality</h4>
                    <p className="text-neutral-500 font-light text-sm font-poppins">We partner with the best hotels and transport providers.</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm flex-shrink-0 border border-neutral-100"><Shield size={24} /></div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-neutral-800 mb-1.5 font-montserrat">Safety First</h4>
                    <p className="text-neutral-500 font-light text-sm font-poppins">Your safety is our top priority at every step of the journey.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm flex-shrink-0 border border-neutral-100"><Map size={24} /></div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-neutral-800 mb-1.5 font-montserrat">Expert Guides</h4>
                    <p className="text-neutral-500 font-light text-sm font-poppins">Our guides are passionate storytellers with deep local knowledge.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative w-full">
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-neutral-900 to-black rounded-[2rem] relative overflow-hidden shadow-2xl">
                {/* Visual experience badge */}
                <div className="absolute bottom-8 left-8 md:-left-8 bg-black text-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center text-center font-bold leading-tight border border-white/10">
                  <span className="text-4xl block mb-1 font-montserrat">50+</span>
                  <span className="text-[0.65rem] tracking-wider uppercase font-semibold text-neutral-400 font-poppins">Years of Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageGridSection />

      {/* Frequently Asked Questions */}
      <FAQSection initialFAQs={JSON.parse(JSON.stringify(faqs))} />
    </div>
  );
}
