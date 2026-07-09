"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface MarkerData {
  lat: number;
  lng: number;
  label: string;
  day?: number;
}

interface MapProps {
  center?: [number, number]; // [lat, lng]
  zoom?: number;
  markers?: MarkerData[];
  activeMarkerIndex?: number;
  children?: React.ReactNode;
}

export function Map({ 
  center = [7.8731, 80.7718], // Default to Sri Lanka center
  zoom = 8, 
  markers = [],
  activeMarkerIndex = 0,
  children 
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Keep track of Leaflet instances
  const mapRef = useRef<any>(null);
  const leafletMarkersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);

  // Dynamically load Leaflet assets in the browser to prevent Next.js SSR build errors
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if Leaflet is already loaded globally
    if ((window as any).L) {
      setIsLoaded(true);
      return;
    }

    // 1. Inject Leaflet CSS stylesheet
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

    // 2. Inject Leaflet JS script
    const scriptId = "leaflet-cdn-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = () => {
        setIsLoaded(true);
      };
      script.onerror = () => {
        setError("Failed to load map scripting engine.");
      };
      document.head.appendChild(script);
    } else {
      // Script is present but maybe loading, set interval check
      const checkInterval = setInterval(() => {
        if ((window as any).L) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, []);

  // Initialize and update Map instance
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Clean up previous map if it exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // NY coordinate fix (if coordinates are flipped [-74, 40] -> [40, -74])
    let parsedCenter = center;
    if (center[0] < -45 || center[0] > 45) {
      if (center[1] >= -45 && center[1] <= 45) {
        parsedCenter = [center[1], center[0]]; // flip to [lat, lng]
      }
    }

    // Create Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false, // Custom placed zoom control
      scrollWheelZoom: true
    }).setView(parsedCenter, zoom);

    mapRef.current = map;

    // Add clean openstreetmap tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20
    }).addTo(map);

    // Standardize zoom buttons on bottom-right
    L.control.zoom({
      position: "bottomright"
    }).addTo(map);

    setIsLoaded(true);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isLoaded, center, zoom]);

  // Handle markers & routes update
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;
    const L = (window as any).L;
    if (!L) return;

    // 1. Clean old markers
    leafletMarkersRef.current.forEach((marker) => marker.remove());
    leafletMarkersRef.current = [];

    // 2. Clean old polyline
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (markers.length === 0) return;

    // Custom Icon Generator matching premium color palette
    const createCustomIcon = (isActive: boolean, label: string) => {
      return L.divIcon({
        className: "custom-leaflet-pin",
        html: `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: translate(-50%, -100%);
            position: absolute;
          ">
            <div style="
              background-color: ${isActive ? "#0E1B15" : "#FFFFFF"};
              color: ${isActive ? "#FFFFFF" : "#0E1B15"};
              border: 2px solid ${isActive ? "#3B82F6" : "#0E1B15"};
              font-family: 'Poppins', sans-serif;
              font-size: 10px;
              font-weight: 700;
              padding: 4px 8px;
              border-radius: 9999px;
              white-space: nowrap;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
              transition: all 0.3s ease;
            ">
              ${label}
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid ${isActive ? "#3B82F6" : "#0E1B15"};
              margin-top: -1px;
            "></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
    };

    // 3. Plot Markers
    const coordinatesList: [number, number][] = [];
    const markerInstances = markers.map((m, idx) => {
      const isActive = idx === activeMarkerIndex;
      const marker = L.marker([m.lat, m.lng], {
        icon: createCustomIcon(isActive, m.day ? `Day ${m.day}: ${m.label}` : m.label)
      }).addTo(map);

      // Tooltip binding
      marker.bindPopup(`
        <div style="font-family: 'Poppins', sans-serif; padding: 4px 8px;">
          <h6 style="font-weight: 700; margin: 0 0 4px 0; color: #0E1B15;">${m.label}</h6>
          ${m.day ? `<p style="margin: 0; font-size: 11px; color: #718096;">Planned stop for Day ${m.day}</p>` : ""}
        </div>
      `);

      coordinatesList.push([m.lat, m.lng]);
      return marker;
    });

    leafletMarkersRef.current = markerInstances;

    // 4. Draw Polyline route between markers
    if (coordinatesList.length > 1) {
      const polyline = L.polyline(coordinatesList, {
        color: "#0E1B15",
        weight: 3,
        opacity: 0.8,
        dashArray: "6, 6",
        lineJoin: "round"
      }).addTo(map);

      polylineRef.current = polyline;

      // Fit map view to show all markers beautifully
      map.fitBounds(polyline.getBounds(), {
        padding: [40, 40],
        animate: true,
        duration: 1.2
      });
    } else if (coordinatesList.length === 1) {
      map.setView(coordinatesList[0], 12, { animate: true });
    }

    // 5. Center/pan map view when active step index changes
    if (markers[activeMarkerIndex]) {
      const activeMarker = markers[activeMarkerIndex];
      map.panTo([activeMarker.lat, activeMarker.lng], {
        animate: true,
        duration: 1.0
      });
    }
  }, [isLoaded, markers, activeMarkerIndex]);

  return (
    <div className="relative w-full h-full min-h-[320px] bg-neutral-100 flex items-center justify-center overflow-hidden rounded-3xl border border-neutral-100">
      {/* Dynamic Loader Skeleton Overlay */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="text-xs font-poppins text-neutral-400">Loading satellite terrain...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-red-50/50 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-sm font-semibold text-red-700 font-montserrat mb-1">Map Loading Failed</span>
          <span className="text-xs text-red-500 font-poppins">{error}</span>
        </div>
      )}

      {/* Map DOM mount container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Render children/MapControls if any */}
      {children}
    </div>
  );
}

// Premium MapControls overlay component
export function MapControls() {
  return null;
}
