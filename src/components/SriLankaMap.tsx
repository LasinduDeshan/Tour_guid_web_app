"use client";

import { motion } from "framer-motion";
import { ItineraryStep } from "@/lib/data";
import { MapPin } from "lucide-react";

interface SriLankaMapProps {
  steps: ItineraryStep[];
  activeStepIndex: number;
  onStepClick?: (index: number) => void;
}

// Custom vector outline of Sri Lanka (precise geographically accurate tear-drop shape with Jaffna and coastline features)
const SRI_LANKA_PATH = "M 160 20 C 150 22, 130 25, 110 32 C 90 40, 80 60, 75 80 C 70 100, 68 130, 72 170 C 75 220, 80 260, 80 300 C 78 340, 82 370, 92 390 C 105 410, 135 415, 160 410 C 195 400, 220 380, 235 350 C 250 310, 255 270, 250 220 C 240 180, 230 140, 215 100 C 200 70, 180 40, 160 20 Z";

export default function SriLankaMap({ steps, activeStepIndex, onStepClick }: SriLankaMapProps) {
  // Generate SVG path for connecting lines between steps
  const getRoutePath = () => {
    if (steps.length < 2) return "";
    return steps.reduce((path, step, index) => {
      const command = index === 0 ? "M" : "L";
      return `${path} ${command} ${step.x} ${step.y}`;
    }, "");
  };

  return (
    <div className="relative w-full h-[360px] md:h-[420px] bg-gradient-to-br from-neutral-50 to-neutral-100/50 rounded-3xl p-6 border border-neutral-100 flex items-center justify-center overflow-hidden group shadow-inner">
      {/* Editorial Title Overlay */}
      <div className="absolute top-5 left-6 z-10 flex items-center gap-2">
        <MapPin className="text-[#9CBFA7] w-4 h-4" />
        <span className="text-[10px] font-bold text-neutral-400 font-poppins">
          Interactive Itinerary Route
        </span>
      </div>

      {/* Main SVG Map Canvas */}
      <svg
        viewBox="0 0 320 440"
        className="w-full h-full max-w-[280px] md:max-w-[320px] transition-transform duration-500 group-hover:scale-[1.02]"
      >
        <defs>
          {/* Subtle Sage Landmass Gradient */}
          <linearGradient id="sriLankaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F9F7" />
            <stop offset="50%" stopColor="#E9F2ED" />
            <stop offset="100%" stopColor="#DCEDE3" />
          </linearGradient>

          {/* Glowing Filter for Visited Nodes */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Active Connect Path Gradient */}
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9CBFA7" />
            <stop offset="100%" stopColor="#0E1B15" />
          </linearGradient>
        </defs>

        {/* Sri Lanka Landmass Outline Shadow */}
        <path
          d={SRI_LANKA_PATH}
          fill="none"
          stroke="rgba(14, 27, 21, 0.03)"
          strokeWidth="6"
          className="transition-all duration-300"
        />

        {/* Sri Lanka Landmass Shape */}
        <path
          d={SRI_LANKA_PATH}
          fill="url(#sriLankaGrad)"
          stroke="rgba(14, 27, 21, 0.08)"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />

        {/* Animated Dashed Connecting Route Paths */}
        {steps.length > 1 && (
          <>
            {/* Background line */}
            <motion.path
              d={getRoutePath()}
              fill="none"
              stroke="rgba(14, 27, 21, 0.08)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated drawing line */}
            <motion.path
              d={getRoutePath()}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6, 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Coordinate City Nodes */}
        {steps.map((step, index) => {
          const isActive = index === activeStepIndex;
          return (
            <g
              key={step.day}
              className="cursor-pointer"
              onClick={() => onStepClick && onStepClick(index)}
            >
              {/* Outer Breathing Pulse (Active Node Only) */}
              {isActive && (
                <motion.circle
                  cx={step.x}
                  cy={step.y}
                  r="14"
                  fill="rgba(156, 191, 167, 0.25)"
                  filter="url(#glow)"
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Node Outer ring */}
              <circle
                cx={step.x}
                cy={step.y}
                r={isActive ? "7.5" : "5.5"}
                fill={isActive ? "#0E1B15" : "white"}
                stroke={isActive ? "#9CBFA7" : "rgba(14, 27, 21, 0.3)"}
                strokeWidth="1.5"
                className="transition-all duration-300 shadow-md"
              />

              {/* Node Inner core */}
              {isActive && (
                <circle
                  cx={step.x}
                  cy={step.y}
                  r="2.5"
                  fill="white"
                />
              )}

              {/* Elegant Text Tooltip Pin Label (placed neatly above or below node) */}
              <g transform={`translate(${step.x}, ${step.y - 12})`}>
                <rect
                  x="-35"
                  y="-14"
                  width="70"
                  height="16"
                  rx="4"
                  fill={isActive ? "#0E1B15" : "white"}
                  className="shadow-sm border border-neutral-200 transition-all duration-300"
                  style={{
                    opacity: isActive ? 1 : 0.7,
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))",
                  }}
                />
                <text
                  x="0"
                  y="-3"
                  textAnchor="middle"
                  fill={isActive ? "white" : "#4A5568"}
                  fontSize="7.5"
                  fontWeight={isActive ? "bold" : "normal"}
                  className="font-poppins select-none transition-all duration-300"
                >
                  {`Day ${step.day}: ${step.location}`}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
