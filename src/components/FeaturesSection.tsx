"use client";

import React from "react";
import { Sparkles, Search, MapPin, Star, Flame, Heart } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES_DATA = [
  {
    title: "AI Recommendations",
    description: "Highly personalized food suggestions based on your mood, taste profile, and order history.",
    icon: Sparkles,
    color: "text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20",
    glow: "hover:shadow-[0_0_30px_rgba(255,183,3,0.15)] hover:border-brand-secondary/35"
  },
  {
    title: "Smart Search",
    description: "Find food, dishes, ingredients, or restaurants instantly with natural language search queries.",
    icon: Search,
    color: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
    glow: "hover:shadow-[0_0_30px_rgba(255,107,53,0.15)] hover:border-brand-primary/35"
  },
  {
    title: "Nearby Discovery",
    description: "Locate restaurants, cafes, and bakeries right around you on our real-time interactive GPS map.",
    icon: MapPin,
    color: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
    glow: "hover:shadow-[0_0_30px_rgba(247,37,133,0.15)] hover:border-brand-accent/35"
  },
  {
    title: "Real-Time Ratings",
    description: "Community-driven review metrics ensuring you always order from hygienic and popular outlets.",
    icon: Star,
    color: "text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20",
    glow: "hover:shadow-[0_0_30px_rgba(255,183,3,0.15)] hover:border-brand-secondary/35"
  },
  {
    title: "Food Trends",
    description: "Catch what local foodies are ordered in Noida. Real-time updates on dishes and recipes.",
    icon: Flame,
    color: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
    glow: "hover:shadow-[0_0_30px_rgba(255,107,53,0.15)] hover:border-brand-primary/35"
  },
  {
    title: "Saved Favorites",
    description: "Build your personal catalog of top joints and dishes so you never lose your comfort foods.",
    icon: Heart,
    color: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
    glow: "hover:shadow-[0_0_30px_rgba(247,37,133,0.15)] hover:border-brand-accent/35"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">Platform Benefits</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Why Order via <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">NearByBites</span>?
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Discover a state-of-the-art food exploration app designed to make finding dishes fast, simple, and exciting.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`glassmorphism rounded-3xl p-8 border border-white/5 transition-all duration-300 flex flex-col group ${item.glow}`}
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Text Content */}
                <h3 className="font-bold text-lg text-slate-100 mb-3 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
