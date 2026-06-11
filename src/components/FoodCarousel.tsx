"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FoodItem {
  name: string;
  image: string;
  tag: string;
  bgColor: string;
  isHot?: boolean;
}

const TRENDING_FOODS: FoodItem[] = [
  { 
    name: "Biryani", 
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80", 
    tag: "Most Ordered",
    bgColor: "from-amber-600/20 to-orange-600/10",
    isHot: true
  },
  { 
    name: "Butter Chicken", 
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80", 
    tag: "Creamy & Rich",
    bgColor: "from-red-600/20 to-orange-500/10"
  },
  { 
    name: "Pav Bhaji", 
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=80", 
    tag: "Street Style",
    bgColor: "from-orange-500/20 to-yellow-600/10",
    isHot: true
  },
  { 
    name: "Pizza", 
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80", 
    tag: "Cheesy Goodness",
    bgColor: "from-yellow-600/20 to-red-500/10"
  },
  { 
    name: "Momos", 
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80", 
    tag: "Steamy Delights",
    bgColor: "from-blue-600/20 to-indigo-500/10"
  },
  { 
    name: "Chole Bhature", 
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=80", 
    tag: "Desi Classic",
    bgColor: "from-emerald-600/20 to-teal-500/10",
    isHot: true
  },
  { 
    name: "Dosa", 
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80", 
    tag: "Crispy & Light",
    bgColor: "from-yellow-500/20 to-amber-600/10"
  },
  { 
    name: "Samosa", 
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80", 
    tag: "Perfect Snack",
    bgColor: "from-amber-700/20 to-yellow-600/10"
  },
  { 
    name: "Shawarma", 
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80", 
    tag: "Spiced Wraps",
    bgColor: "from-purple-600/20 to-pink-500/10",
    isHot: true
  },
  { 
    name: "Ice Cream", 
    image: "https://images.unsplash.com/photo-1567206563066-0f657a0fc340?w=500&auto=format&fit=crop&q=80", 
    tag: "Sweet Treat",
    bgColor: "from-pink-600/20 to-rose-500/10"
  }
];

interface FoodCarouselProps {
  onSelectCuisine: (cuisine: string) => void;
}

export default function FoodCarousel({ onSelectCuisine }: FoodCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const newScrollLeft = direction === "left" 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="trending" className="py-20 bg-brand-dark/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Controls */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-brand-secondary animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">What's Hot</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Trending <span className="text-brand-primary">Dishes</span> 🔥
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll("left")}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-90 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-90 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {TRENDING_FOODS.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="flex-none w-56 sm:w-64 snap-start cursor-pointer group"
              onClick={() => onSelectCuisine(item.name)}
            >
              {/* Card Body */}
              <div className="relative rounded-2xl overflow-hidden glassmorphism border border-white/5 aspect-[4/5] flex flex-col justify-end p-5">
                {/* Background Food Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.bgColor} via-brand-dark/50 to-brand-dark/10 opacity-70 group-hover:opacity-60 transition-opacity`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>

                {/* Hot badge */}
                {item.isHot && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-primary/90 backdrop-blur-md text-[10px] font-bold text-white shadow-sm glow-primary">
                    <Flame className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
                    TRENDING
                  </div>
                )}

                {/* Text Content */}
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold text-brand-secondary uppercase tracking-wider mb-1 block">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-50 group-hover:text-brand-primary transition-colors mb-2">
                    {item.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium group-hover:text-slate-300 transition-colors flex items-center gap-1.5">
                    Explore restaurants
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
