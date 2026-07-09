"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MapPin } from "lucide-react";

// List of all 39 images in public/imgGrid
const allImages = [
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.29 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.29 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.30 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.30 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.31 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.32 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.32 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.32 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.33 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.33 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.34 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.34 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.35 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.35 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.35 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.36 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.36 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.37 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.37 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.37 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.38 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.38 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.39 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.39 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.39 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.40 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.40 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.40 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.41 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.42 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.42 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.43 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.43 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.43 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.44 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.44 PM (2).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.44 PM.jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.45 PM (1).jpeg",
  "/imgGrid/WhatsApp Image 2026-06-26 at 6.04.45 PM.jpeg",
];

// Spans for our 11 active grid slots in a 6x3 layout
const gridLayout = [
  { id: 0, span: "col-span-2 row-span-2" },
  { id: 1, span: "col-span-1 row-span-1" },
  { id: 2, span: "col-span-1 row-span-1" },
  { id: 3, span: "col-span-2 row-span-1" },
  { id: 4, span: "col-span-1 row-span-2" },
  { id: 5, span: "col-span-1 row-span-1" },
  { id: 6, span: "col-span-1 row-span-2" },
  { id: 7, span: "col-span-1 row-span-1" },
  { id: 8, span: "col-span-2 row-span-1" },
  { id: 9, span: "col-span-1 row-span-1" },
  { id: 10, span: "col-span-1 row-span-1" },
];

const BentoSlot = ({ src, span }: { src: string; span: string }) => {
  return (
    <div className={`${span} relative overflow-hidden bg-neutral-100 group border border-neutral-200/40 rounded-xl md:rounded-2xl transition-all duration-300`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <NextImage
            src={src}
            alt="Ceyora Traveler Moment"
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Location tag on hover */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <MapPin size={10} className="text-white" />
        <span className="text-[8px] uppercase tracking-wider font-semibold font-poppins">Sri Lanka</span>
      </div>
    </div>
  );
};

const ImageGridSection = () => {
  // Initialize the first 11 slots with the first 11 images
  const [visibleImages, setVisibleImages] = useState<string[]>(allImages.slice(0, 11));

  // Automatically swap one random slot's image for an unused one every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random slot to swap (0 to 10)
      const slotIndexToSwap = Math.floor(Math.random() * 11);

      setVisibleImages((prev) => {
        // Find which images of the 39 are not currently visible on screen
        const unusedImages = allImages.filter((img) => !prev.includes(img));
        if (unusedImages.length === 0) return prev;

        // Choose a random image from the unused pool
        const randomNewImage = unusedImages[Math.floor(Math.random() * unusedImages.length)];

        // Swap it into the active images list
        const nextList = [...prev];
        nextList[slotIndexToSwap] = randomNewImage;
        return nextList;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white border-t border-neutral-100 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(156,191,167,0.03)_0%,transparent_75%)] pointer-events-none z-0" />

      <div className="container mx-auto px-8 max-w-[1280px] relative z-10 flex flex-col gap-12">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight tracking-tight font-montserrat uppercase">
            Traveler <span className="font-semibold text-black">Moments</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-light font-poppins leading-relaxed">
            A living dynamic wall showing the breathtaking landscapes, wildlife encounters, and authentic hospitality experienced by our guests.
          </p>
        </div>

        {/* Dynamic Bento Grid of exactly 60vh height */}
        <div className="h-[60vh] max-h-[600px] min-h-[380px] w-full">
          <div className="grid grid-cols-6 grid-rows-3 h-full gap-2 md:gap-3">
            {gridLayout.map((layout) => (
              <BentoSlot
                key={layout.id}
                src={visibleImages[layout.id]}
                span={layout.span}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGridSection;
