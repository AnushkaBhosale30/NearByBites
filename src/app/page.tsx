"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoodCarousel from "@/components/FoodCarousel";
import RestaurantGrid from "@/components/RestaurantGrid";
import InteractiveMap from "@/components/InteractiveMap";
import AiAssistant from "@/components/AiAssistant";
import FeaturesSection from "@/components/FeaturesSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export type RegionState = "maharashtra" | "punjab" | "south-india" | "sweet" | "default";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  
  // Set default favorite values so the page looks pre-populated and premium
  const [favorites, setFavorites] = useState<string[]>(["rest-3", "rest-1"]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeMapRestaurant, setActiveMapRestaurant] = useState<string | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeRegionState, setActiveRegionState] = useState<RegionState>("default");

  // Region detection logic based on query strings or active cuisine tags
  const detectRegionFromQuery = (query: string | null): RegionState => {
    if (!query) return "default";
    const lower = query.toLowerCase();
    
    // Maharashtrian specialities
    if (
      lower.includes("vada pav") || 
      lower.includes("misal") || 
      lower.includes("pav bhaji") || 
      lower.includes("maharashtra") || 
      lower.includes("marathi") || 
      lower.includes("puran poli") || 
      lower.includes("puneri") || 
      lower.includes("kolhapuri")
    ) {
      return "maharashtra";
    }
    
    // Punjabi specialities
    if (
      lower.includes("butter chicken") || 
      lower.includes("chole bhature") || 
      lower.includes("punjabi") || 
      lower.includes("tadka") || 
      lower.includes("lassi") || 
      lower.includes("kulcha") || 
      lower.includes("paneer tikka")
    ) {
      return "punjab";
    }
    
    // South Indian specialities
    if (
      lower.includes("dosa") || 
      lower.includes("idli") || 
      lower.includes("sambar") || 
      lower.includes("south indian") || 
      lower.includes("south spice") || 
      lower.includes("uttapam") || 
      lower.includes("kaapi")
    ) {
      return "south-india";
    }

    // Sweets & Desserts
    if (
      lower.includes("ice cream") || 
      lower.includes("waffle") || 
      lower.includes("dessert") || 
      lower.includes("sweet") || 
      lower.includes("cake") || 
      lower.includes("brownie") ||
      lower.includes("rosogolla") ||
      lower.includes("halwa")
    ) {
      return "sweet";
    }

    return "default";
  };

  // Sync region state when inputs change
  useEffect(() => {
    if (selectedCuisine) {
      setActiveRegionState(detectRegionFromQuery(selectedCuisine));
    } else if (searchQuery) {
      setActiveRegionState(detectRegionFromQuery(searchQuery));
    } else {
      setActiveRegionState("default");
    }
  }, [selectedCuisine, searchQuery]);

  // Section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "trending", "restaurants", "nearby", "offers"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      // Offset for sticky navbar
      const yOffset = -70; 
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Triggered when a search is executed via the Hero search bar
  const triggerSearch = () => {
    // Reset cuisine tag when searching to let input query take precedence
    setSelectedCuisine(null);
    setShowFavoritesOnly(false);
    scrollToSection("restaurants");
  };

  // Triggered when "Explore Nearby" is clicked in Hero
  const handleExploreNearby = () => {
    scrollToSection("nearby");
    // Select a default restaurant to show details on map load
    setActiveMapRestaurant("Pizza Paradise");
  };

  // Chat chatbot integration: when user asks chatbot for recommendations
  const handleChatSearchTrigger = (query: string) => {
    setSearchQuery(query);
    setSelectedCuisine(query);
    setShowFavoritesOnly(false);
    scrollToSection("restaurants");
  };

  return (
    <div className="relative min-h-screen bg-brand-dark bg-grid-pattern selection:bg-brand-primary/30 selection:text-white">
      {/* Decorative Radial Lights */}
      <div className="absolute inset-0 bg-radial-gradient-orange pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-radial-gradient-pink pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-radial-gradient-yellow pointer-events-none z-0"></div>

      {/* Navigation */}
      <Navbar
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        scrollToSection={scrollToSection}
        openAiChat={() => setIsAiOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollToSection={scrollToSection}
        triggerSearch={triggerSearch}
        onExploreNearby={handleExploreNearby}
        activeRegionState={activeRegionState}
      />

      {/* Carousel Section */}
      <FoodCarousel 
        onSelectCuisine={(cuisine) => {
          setSelectedCuisine(cuisine);
          setShowFavoritesOnly(false);
          scrollToSection("restaurants");
        }}
      />

      {/* Main content layer */}
      <div className="relative z-10">
        
        {/* Restaurant discovery grid */}
        <RestaurantGrid
          searchQuery={searchQuery}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          favorites={favorites}
          toggleFavorite={handleFavoriteToggle}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          activeMapRestaurant={activeMapRestaurant}
          setActiveMapRestaurant={setActiveMapRestaurant}
          activeRegionState={activeRegionState}
        />

        {/* Interactive radar map */}
        <InteractiveMap
          activeMapRestaurant={activeMapRestaurant}
          setActiveMapRestaurant={setActiveMapRestaurant}
          favorites={favorites}
          toggleFavorite={handleFavoriteToggle}
          scrollToSection={scrollToSection}
        />

        {/* Features section */}
        <FeaturesSection />

        {/* Testimonials */}
        <Testimonials />

      </div>

      {/* AI Floating Chatbot Widget */}
      <AiAssistant
        onSearchTrigger={handleChatSearchTrigger}
        isOpen={isAiOpen}
        setIsOpen={setIsAiOpen}
      />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
