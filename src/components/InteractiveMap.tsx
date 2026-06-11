"use client";

import React, { useState } from "react";
import { MapPin, Star, Clock, Compass, Plus, Minus, Info, Heart, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT_DATABASE, Restaurant } from "./RestaurantGrid";

interface InteractiveMapProps {
  activeMapRestaurant: string | null;
  setActiveMapRestaurant: (name: string | null) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  scrollToSection: (id: string) => void;
}

// Coordinate mappings for restaurants on a 600x400 map coordinate system
interface MapPinItem {
  id: string;
  name: string;
  x: number;
  y: number;
  restaurant: Restaurant;
}

const MAP_PINS: MapPinItem[] = [
  { id: "rest-1", name: "Spice Villa", x: 380, y: 110, restaurant: RESTAURANT_DATABASE[0] },
  { id: "rest-2", name: "Mumbai Masala", x: 170, y: 130, restaurant: RESTAURANT_DATABASE[1] },
  { id: "rest-3", name: "Pizza Paradise", x: 260, y: 150, restaurant: RESTAURANT_DATABASE[2] },
  { id: "rest-4", name: "Royal Biryani", x: 490, y: 270, restaurant: RESTAURANT_DATABASE[3] },
  { id: "rest-5", name: "Punjabi Tadka", x: 370, y: 280, restaurant: RESTAURANT_DATABASE[4] },
  { id: "rest-6", name: "South Spice", x: 150, y: 290, restaurant: RESTAURANT_DATABASE[5] },
  { id: "rest-7", name: "Sweet Delights", x: 210, y: 200, restaurant: RESTAURANT_DATABASE[6] },
  { id: "rest-8", name: "Kebab Corner", x: 440, y: 210, restaurant: RESTAURANT_DATABASE[7] },
  { id: "rest-9", name: "healthyBites", x: 360, y: 190, restaurant: RESTAURANT_DATABASE[8] }
];

export default function InteractiveMap({
  activeMapRestaurant,
  setActiveMapRestaurant,
  favorites,
  toggleFavorite,
  scrollToSection
}: InteractiveMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPin, setHoveredPin] = useState<MapPinItem | null>(null);

  // User location center coordinates
  const userX = 300;
  const userY = 220;

  const handleZoom = (type: "in" | "out") => {
    if (type === "in") {
      setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
    }
  };

  const handlePinClick = (pin: MapPinItem) => {
    setActiveMapRestaurant(pin.name);
    // Find restaurant section and scroll to it
    scrollToSection("restaurants");
  };

  const selectedRestaurant = MAP_PINS.find(p => p.name === activeMapRestaurant)?.restaurant;

  return (
    <section id="nearby" className="py-20 bg-gradient-to-b from-brand-dark to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-semibold text-brand-primary mb-3">
            <Compass className="w-3.5 h-3.5 text-brand-primary animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive Food Radar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Nearby <span className="text-brand-accent">Radar Map</span> 📍
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Live discovery of restaurants around your coordinates. Hover over pins to sneak peek, and click to browse details.
          </p>
        </div>

        {/* Map and Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* SVG Map Section */}
          <div className="lg:col-span-2 relative aspect-[3/2] w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
            {/* Range rings & layout SVG */}
            <div className="absolute inset-0 select-none pointer-events-none">
              <svg className="w-full h-full opacity-35" viewBox="0 0 600 400" fill="none">
                {/* Radial distance lines */}
                <circle cx={userX} cy={userY} r="70" stroke="#FFB703" strokeWidth="1" strokeDasharray="3 3" />
                <text x={userX} y={userY - 75} fill="#FFB703" fontSize="8" textAnchor="middle" fontWeight="bold">500m</text>
                
                <circle cx={userX} cy={userY} r="140" stroke="#FF6B35" strokeWidth="1" strokeDasharray="4 4" />
                <text x={userX} y={userY - 145} fill="#FF6B35" fontSize="8" textAnchor="middle" fontWeight="bold">1.5km</text>

                <circle cx={userX} cy={userY} r="220" stroke="#F72585" strokeWidth="1" strokeDasharray="5 5" />
                <text x={userX} y={userY - 225} fill="#F72585" fontSize="8" textAnchor="middle" fontWeight="bold">3km</text>

                {/* Grid Lines */}
                <path d="M 0 50 L 600 50 M 0 100 L 600 100 M 0 150 L 600 150 M 0 200 L 600 200 M 0 250 L 600 250 M 0 300 L 600 300 M 0 350 L 600 350" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <path d="M 50 0 L 50 400 M 100 0 L 100 400 M 150 0 L 150 400 M 200 0 L 200 400 M 250 0 L 250 400 M 300 0 L 300 400 M 350 0 L 350 400 M 400 0 L 400 400 M 450 0 L 450 400 M 500 0 L 500 400 M 550 0 L 550 400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Stylized Sector Roads */}
                <path d="M 50 0 L 120 400" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <path d="M 280 0 L 320 400" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <path d="M 500 0 L 480 400" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <path d="M 0 160 L 600 240" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <path d="M 0 320 L 600 300" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                
                {/* Sector names labels */}
                <text x="70" y="30" fill="rgba(255,255,255,0.15)" fontSize="9" fontWeight="bold">SECTOR 62</text>
                <text x="520" y="50" fill="rgba(255,255,255,0.15)" fontSize="9" fontWeight="bold">SECTOR 18</text>
                <text x="80" y="380" fill="rgba(255,255,255,0.15)" fontSize="9" fontWeight="bold">SECTOR 50</text>
                <text x="490" y="380" fill="rgba(255,255,255,0.15)" fontSize="9" fontWeight="bold">SECTOR 15</text>
              </svg>
            </div>

            {/* Render Pins under current Zoom level scaling */}
            <div 
              className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* User Center GPS Indicator */}
              <div 
                className="absolute z-20"
                style={{ left: `${userX}px`, top: `${userY}px`, transform: 'translate(-50%, -50%)' }}
              >
                <span className="relative flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-brand-primary border-4 border-slate-950 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                </span>
                <span className="absolute left-7 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-brand-dark/95 border border-brand-primary/30 text-[9px] font-extrabold text-white uppercase whitespace-nowrap tracking-wide">
                  Your Location
                </span>
              </div>

              {/* Restaurant Pins */}
              {MAP_PINS.map((pin) => {
                const isActive = activeMapRestaurant === pin.name;
                return (
                  <div
                    key={pin.id}
                    className="absolute z-10 cursor-pointer"
                    style={{ left: `${pin.x}px`, top: `${pin.y}px`, transform: 'translate(-50%, -100%)' }}
                    onClick={() => handlePinClick(pin)}
                    onMouseEnter={() => setHoveredPin(pin)}
                    onMouseLeave={() => setHoveredPin(null)}
                  >
                    <motion.div
                      animate={isActive ? { scale: [1, 1.25, 1], y: [0, -5, 0] } : {}}
                      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                      className={`relative flex items-center justify-center p-2 rounded-full border transition-all duration-200 ${
                        isActive 
                          ? "bg-brand-primary text-white border-brand-primary scale-110 shadow-lg glow-primary z-30" 
                          : "bg-brand-dark/90 hover:bg-brand-accent hover:text-white border-white/10 hover:border-brand-accent scale-100 hover:scale-105 shadow shadow-black"
                      }`}
                    >
                      <MapPin className="w-4.5 h-4.5 shrink-0" />
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
              <button
                onClick={() => handleZoom("in")}
                className="w-10 h-10 rounded-xl glassmorphism-heavy flex items-center justify-center text-slate-300 hover:text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleZoom("out")}
                className="w-10 h-10 rounded-xl glassmorphism-heavy flex items-center justify-center text-slate-300 hover:text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>

            {/* Floating Peek Card (on hover pin) */}
            <AnimatePresence>
              {hoveredPin && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-4 left-4 z-20 w-64 rounded-2xl glassmorphism-heavy p-3 shadow-2xl border border-white/10 pointer-events-none flex gap-3"
                >
                  <img
                    src={hoveredPin.restaurant.image}
                    alt={hoveredPin.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-50 truncate">{hoveredPin.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate mb-1.5">{hoveredPin.restaurant.cuisine.join(", ")}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-300 font-semibold">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-brand-secondary fill-brand-secondary" />
                        {hoveredPin.restaurant.rating}
                      </span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {hoveredPin.restaurant.deliveryTime} mins
                      </span>
                      <span className="text-brand-accent font-extrabold">{hoveredPin.restaurant.distance} km</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active Marker Preview Section */}
          <div className="h-full flex flex-col justify-between">
            {selectedRestaurant ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={selectedRestaurant.id}
                className="glassmorphism rounded-3xl p-6 border border-white/10 flex flex-col h-full shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 shrink-0">
                  <img
                    src={selectedRestaurant.image}
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-brand-primary text-white shadow-md">
                    SELECTED PIN
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-100">{selectedRestaurant.name}</h3>
                    <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg shrink-0">
                      <Star className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
                      <span className="text-xs font-bold text-slate-200">{selectedRestaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold mb-3">{selectedRestaurant.cuisine.join(" • ")}</p>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed mb-5 line-clamp-3">
                    {selectedRestaurant.description}
                  </p>

                  <div className="space-y-2.5 border-t border-white/5 pt-4 text-xs text-slate-400 mb-6 font-semibold">
                    <div className="flex justify-between items-center">
                      <span>Distance from you:</span>
                      <span className="text-brand-accent font-bold">{selectedRestaurant.distance} km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delivery Time:</span>
                      <span className="text-slate-300 font-bold">{selectedRestaurant.deliveryTime} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Cost:</span>
                      <span className="text-slate-300 font-bold">₹{selectedRestaurant.costForTwo} for two</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <span className={`font-extrabold ${selectedRestaurant.isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                        {selectedRestaurant.isOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto shrink-0">
                  <button
                    onClick={() => toggleFavorite(selectedRestaurant.id)}
                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-brand-accent transition-all cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedRestaurant.id) ? "fill-brand-accent text-brand-accent" : "text-slate-400"}`} />
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("restaurants");
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer text-center"
                  >
                    View Menu & Order
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="glassmorphism rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <Map className="w-10 h-10 text-slate-600 mb-3 animate-pulse" />
                <h3 className="font-bold text-slate-200 mb-1">Radar Scan Active</h3>
                <p className="text-xs text-slate-500 max-w-[220px] leading-relaxed">
                  Click on any orange map pin to load restaurant coordinates, routing distance, and quick order options.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
