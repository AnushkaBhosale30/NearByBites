"use client";

import React, { useState, useEffect } from "react";
import { 
  ChefHat, Heart, MapPin, Sparkles, TrendingUp, Gift, 
  Menu, X, User, ChevronDown, LogOut, Settings, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  favoritesCount: number;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  scrollToSection: (id: string) => void;
  openAiChat: () => void;
  activeSection: string;
}

export default function Navbar({
  favoritesCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
  scrollToSection,
  openAiChat,
  activeSection
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home", icon: ChefHat },
    { label: "Restaurants", id: "restaurants", icon: CompassIcon },
    { label: "Nearby", id: "nearby", icon: MapPin },
    { label: "Trending", id: "trending", icon: TrendingUp },
    { label: "AI Assistant", id: "ai-assistant", icon: Sparkles, action: openAiChat },
    { 
      label: "Favorites", 
      id: "favorites", 
      icon: Heart, 
      badge: favoritesCount > 0 ? favoritesCount : undefined,
      action: () => {
        setShowFavoritesOnly(true);
        scrollToSection("restaurants");
      }
    },
    { label: "Offers", id: "offers", icon: Gift }
  ];

  function CompassIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    );
  }

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    if (item.action) {
      item.action();
    } else {
      if (item.id === "restaurants") {
        setShowFavoritesOnly(false);
      }
      scrollToSection(item.id);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20" 
          : "py-5 bg-transparent border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => scrollToSection("home")} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">
                NearBy<span className="text-brand-primary group-hover:text-brand-secondary transition-colors">Bites</span>
              </span>
              <span className="text-xl group-hover:animate-bounce">🍽️</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id && (!showFavoritesOnly || item.id === "favorites");
                const displayActive = item.id === "favorites" ? showFavoritesOnly : isActive;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-white ${
                      displayActive 
                        ? "text-brand-primary bg-white/5" 
                        : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${displayActive ? "text-brand-primary" : "text-slate-400"}`} />
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white shadow-sm shadow-brand-accent/50 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="hidden sm:flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-brand-dark"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-accent to-brand-primary flex items-center justify-center text-sm font-bold text-white shadow-inner">
                    A
                  </div>
                  <span className="text-sm font-medium text-slate-200">Anushka</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl glassmorphism-heavy p-2 shadow-2xl z-50 border border-white/10"
                    >
                      <div className="px-3 py-2 border-b border-white/5">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-200 truncate">anushka@gmail.com</p>
                      </div>
                      <div className="py-1">
                        <button className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all text-left">
                          <Settings className="w-4 h-4 text-slate-400" />
                          Profile Settings
                        </button>
                        <button 
                          onClick={() => { setShowFavoritesOnly(true); setIsProfileOpen(false); scrollToSection("restaurants"); }}
                          className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all text-left"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          My Favorites
                        </button>
                      </div>
                      <div className="py-1 border-t border-white/5">
                        <button className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all text-left">
                          <LogOut className="w-4 h-4 text-red-400" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-brand-dark/95 backdrop-blur-xl mt-3"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id && (!showFavoritesOnly || item.id === "favorites");
                  const displayActive = item.id === "favorites" ? showFavoritesOnly : isActive;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        displayActive 
                          ? "bg-brand-primary/15 text-brand-primary" 
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                      {item.badge !== undefined && (
                        <span className="ml-auto rounded-full bg-brand-accent px-2 py-0.5 text-xs font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
                <div className="pt-4 mt-4 border-t border-white/5 flex gap-3">
                  <button className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 font-semibold text-sm transition-all">
                    Sign In
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold text-sm shadow-lg shadow-brand-primary/10 transition-all">
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
