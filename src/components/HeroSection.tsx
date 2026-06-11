"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RegionState } from "@/app/page";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scrollToSection: (id: string) => void;
  triggerSearch: () => void;
  onExploreNearby: () => void;
  activeRegionState: RegionState;
}

const THEME_CONFIGS = {
  maharashtra: {
    gradient: "radial-gradient(circle 900px at 50% -150px, rgba(249, 115, 22, 0.25), rgba(234, 179, 8, 0.12), transparent 85%)",
    badge: "🚩 Maharashtra Specialty (Misal & Vada Pav!)",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    dialogues: [
      "Bhook lagli aahe? Chalo thoda garam Vada Pav khauya! 😋",
      "Misal Pav cha tikhat thaska, ekdum bhari! 🔥",
      "Pehle Potoba, mag Vithoba! 😉",
      "Khaana mhanje sukh, khaana mhanje prem ❤️",
      "Kasa kai boss, aaj vada pav ki misal? 🤔",
      "Garam Sabudana Khichadi ani taak... kadak! 🥛"
    ],
    gradientText: "from-orange-500 via-yellow-500 to-amber-500"
  },
  punjab: {
    gradient: "radial-gradient(circle 900px at 50% -150px, rgba(234, 179, 8, 0.25), rgba(16, 185, 129, 0.1), transparent 85%)",
    badge: "🌾 Punjabi Tadka Special (Butter Chicken!)",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    dialogues: [
      "Oye hoye! Butter chicken te butter naan, rab da shukar! 🍗",
      "Pehle lassi, phir baaki kaam! 🥛",
      "Chole bhature khaaye bina dil nahi mannda! 😋",
      "Tussi jaa rahe ho? Chole bhature te kha ke jao! 😍",
      "Rab di mehar te makhan maar ke! 🧈"
    ],
    gradientText: "from-yellow-400 via-amber-500 to-orange-400"
  },
  "south-india": {
    gradient: "radial-gradient(circle 900px at 50% -150px, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.12), transparent 85%)",
    badge: "🌴 South Spice Special (Crispy Dosa!)",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    dialogues: [
      "Crispy dosa, hot sambar, filter kaapi... pure bliss! ☕",
      "Rava idli and ghee roast... Anna is happy! 🌴",
      "South Indian food is not just food, it is a ritual! 🍛",
      "Smell that fresh curry leaves tadka! 😍",
      "Sambar Vada dip... absolutely divine! 🍲"
    ],
    gradientText: "from-emerald-400 via-teal-500 to-cyan-500"
  },
  sweet: {
    gradient: "radial-gradient(circle 900px at 50% -150px, rgba(236, 72, 153, 0.25), rgba(244, 63, 94, 0.12), transparent 85%)",
    badge: "🍰 Sweet Cravings (Dessert Delights!)",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    dialogues: [
      "Dessert pehle khao, zindagi bahut choti hai! 🍰",
      "Cold stone ice cream and waffles are pure love! 🍦",
      "Khaane ke baad kuch meetha ho jaye? 🍬",
      "Dil bole - chocolate lava cake extra scoop! 🍧",
      "Rosogolla khabe? Sweets make life sweet! 🍭"
    ],
    gradientText: "from-pink-500 via-rose-500 to-red-500"
  },
  default: {
    gradient: "radial-gradient(circle 900px at 50% -150px, rgba(255, 107, 53, 0.22), rgba(247, 37, 133, 0.12), transparent 85%)",
    badge: "🍽️ AI Food Discovery Radar",
    badgeColor: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
    dialogues: [
      "Bhook lagi hai? Chalo kuch tasty dhoondte hain! 😋",
      "Pet pooja ke bina coding nahi hoti! 🍕",
      "Bhook lagli aahe? Chalo thoda garam Vada Pav khauya! 🚩🍔",
      "Khaana sirf zarurat nahi, ek emotion hai ❤️",
      "Pehle Potoba, mag Vithoba! 😉🚩",
      "Aaj kya khayenge boss? 🤔",
      "Dil maange Butter Chicken! 🍗",
      "Misal Pav cha tikhat thaska, ekdum bhari! 🚩🔥",
      "Pehle khaana, phir baaki kaam 😎",
      "Khaana mhanje sukh, khaana mhanje prem ❤️🚩",
      "Zindagi chhoti hai, dessert pehle khao 🍰",
      "Taste ke liye kuch bhi karega! 😍"
    ],
    gradientText: "from-brand-primary via-brand-secondary to-brand-accent"
  }
};

const FLOATING_EMOJIS = [
  { emoji: "🍕", delay: 0, duration: 6, top: "15%", left: "10%", size: "text-3xl" },
  { emoji: "🍔", delay: 2, duration: 7, top: "25%", left: "85%", size: "text-4xl" },
  { emoji: "🍣", delay: 1, duration: 8, top: "70%", left: "8%", size: "text-3xl" },
  { emoji: "🌶️", delay: 3, duration: 5, top: "65%", left: "88%", size: "text-2xl" },
  { emoji: "🍰", delay: 0.5, duration: 9, top: "80%", left: "75%", size: "text-4xl" },
  { emoji: "🍗", delay: 1.5, duration: 6.5, top: "12%", left: "78%", size: "text-3xl" },
  { emoji: "🍜", delay: 2.5, duration: 7.5, top: "45%", left: "92%", size: "text-3xl" },
  { emoji: "🌮", delay: 4, duration: 8.5, top: "50%", left: "5%", size: "text-2xl" }
];

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  scrollToSection,
  triggerSearch,
  onExploreNearby,
  activeRegionState
}: HeroSectionProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const currentTheme = THEME_CONFIGS[activeRegionState];

  // Reset dialogue rotation when theme changes
  useEffect(() => {
    setDialogueIndex(0);
  }, [activeRegionState]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % currentTheme.dialogues.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentTheme.dialogues.length]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-all duration-700 ease-in-out"
      style={{ background: currentTheme.gradient }}
    >
      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40"></div>
      
      {/* Floating Emojis */}
      {FLOATING_EMOJIS.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute hidden md:block select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] ${item.size} pointer-events-none`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Pill Badge - Changes color and icon based on state specialty */}
        <motion.div
          key={activeRegionState}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-6 shadow-sm shadow-black/20 transition-all ${currentTheme.badgeColor}`}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>{currentTheme.badge}</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-tight"
        >
          Discover Your Next <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent transition-all duration-700`}>Favorite Meal</span> 🍽️
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed font-light"
        >
          AI-powered restaurant discovery with personalized food recommendations, nearby restaurants, trending dishes, and smart food suggestions.
        </motion.p>

        {/* Dynamic Tagline (Hindi/Marathi/Punjabi Dialogues) */}
        <div className="h-10 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeRegionState}-${dialogueIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-brand-secondary font-bold text-lg sm:text-xl italic drop-shadow"
            >
              "{currentTheme.dialogues[dialogueIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Premium Large Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl glassmorphism rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2.5 items-stretch shadow-2xl border border-white/10 hover:border-white/15 transition-colors focus-within:border-brand-primary/40 focus-within:shadow-[0_0_30px_-5px_rgba(255,107,53,0.25)]"
        >
          <div className="relative flex-1 flex items-center min-h-[50px] px-3">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search restaurants, cuisines, dishes, or locations..."
              className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-base md:text-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={triggerSearch}
              className="px-6 py-3 md:py-0 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-95 text-white font-semibold text-sm shadow-md shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Find Restaurants
            </button>
            <button
              onClick={onExploreNearby}
              className="px-6 py-3 md:py-0 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-brand-accent animate-pulse" />
              Explore Nearby
            </button>
          </div>
        </motion.div>
        
        {/* Quick Suggestion Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-5 max-w-2xl"
        >
          <span className="text-xs text-slate-500 font-medium mr-1">Specialties:</span>
          {[
            { label: "Misal Pav 🚩", value: "Misal Pav" },
            { label: "Vada Pav 🍔", value: "Vada Pav" },
            { label: "Chole Bhature 🌾", value: "Chole Bhature" },
            { label: "Dosa 🌴", value: "Dosa" },
            { label: "Butter Chicken 🍗", value: "Butter Chicken" }
          ].map((tag) => (
            <button
              key={tag.value}
              onClick={() => {
                setSearchQuery(tag.value);
                setTimeout(() => triggerSearch(), 100);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-300 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all cursor-pointer font-medium"
            >
              {tag.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
