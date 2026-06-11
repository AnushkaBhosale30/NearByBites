"use client";

import React, { useState, useMemo } from "react";
import { 
  Star, Clock, MapPin, Heart, ChevronRight, X, 
  Map, ThumbsUp, ShieldCheck, Phone, Check, Info, Utensils
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RegionState } from "@/app/page";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviewsCount: number;
  distance: number; // in km
  deliveryTime: number; // in mins
  priceRange: number; // 1 to 3 ($ to $$$)
  costForTwo: number;
  isOpen: boolean;
  image: string;
  description: string;
  tag?: string;
  address: string;
  phoneNumber: string;
  menu: { name: string; price: number; type: "veg" | "non-veg"; rating?: number }[];
}

export const RESTAURANT_DATABASE: Restaurant[] = [
  {
    id: "rest-1",
    name: "Spice Villa",
    cuisine: ["North Indian", "Biryani", "Mughlai"],
    rating: 4.8,
    reviewsCount: 1240,
    distance: 1.4,
    deliveryTime: 25,
    priceRange: 2,
    costForTwo: 400,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    description: "Premium North Indian curry house with rich Mughlai delicacies and authentic coal-fired tandoor options.",
    tag: "Trending",
    address: "B42, Food Street, Sector 18, Noida",
    phoneNumber: "+91 98765 43210",
    menu: [
      { name: "Paneer Tikka Butter Masala", price: 280, type: "veg", rating: 4.9 },
      { name: "Murg Dum Biryani", price: 340, type: "non-veg", rating: 4.8 },
      { name: "Dal Makhani Royal", price: 240, type: "veg", rating: 4.7 },
      { name: "Garlic Butter Naan", price: 60, type: "veg" }
    ]
  },
  {
    id: "rest-2",
    name: "Mumbai Masala",
    cuisine: ["Street Food", "Pav Bhaji", "Fast Food"],
    rating: 4.7,
    reviewsCount: 890,
    distance: 2.1,
    deliveryTime: 20,
    priceRange: 1,
    costForTwo: 200,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80",
    description: "Iconic Mumbai style street food, buttery Pav Bhaji, crispy Vada Pav, and chilled masala sodas.",
    tag: "Best Seller",
    address: "Shop 12, Chowpatty Market, Sector 62",
    phoneNumber: "+91 98765 43211",
    menu: [
      { name: "Special Butter Pav Bhaji", price: 130, type: "veg", rating: 4.9 },
      { name: "Cheese Vada Pav (2 Pcs)", price: 80, type: "veg", rating: 4.6 },
      { name: "Sev Puri Chaat", price: 70, type: "veg" },
      { name: "Bombay Masala Grilled Sandwich", price: 110, type: "veg" }
    ]
  },
  {
    id: "rest-3",
    name: "Pizza Paradise",
    cuisine: ["Italian", "Pizza", "Fast Food"],
    rating: 4.9,
    reviewsCount: 2150,
    distance: 0.8,
    deliveryTime: 15,
    priceRange: 3,
    costForTwo: 500,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    description: "Artisanal hand-tossed sourdough pizzas baked to perfection in a wood-fired brick oven.",
    tag: "Top Rated",
    address: "Block C, Galleria Mall, Sector 28",
    phoneNumber: "+91 98765 43212",
    menu: [
      { name: "Double Cheese Margherita", price: 320, type: "veg", rating: 4.8 },
      { name: "Spicy Peri-Peri Chicken Pizza", price: 420, type: "non-veg", rating: 4.9 },
      { name: "Truffle Mushroom Pizza", price: 380, type: "veg", rating: 4.7 },
      { name: "Stuffed Garlic Bread", price: 160, type: "veg" }
    ]
  },
  {
    id: "rest-4",
    name: "Royal Biryani",
    cuisine: ["Biryani", "Mughlai", "North Indian"],
    rating: 4.8,
    reviewsCount: 1560,
    distance: 3.2,
    deliveryTime: 35,
    priceRange: 2,
    costForTwo: 450,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    description: "Famous Hyderabadi and Lucknowi dum biryanis cooked on slow charcoal fire with aromatic spices.",
    address: "GF-5, Metro Junction, Sector 15",
    phoneNumber: "+91 98765 43213",
    menu: [
      { name: "Special Mutton Dum Biryani", price: 390, type: "non-veg", rating: 4.9 },
      { name: "Double Masala Chicken Biryani", price: 320, type: "non-veg", rating: 4.8 },
      { name: "Veg Hyderabadi Biryani", price: 260, type: "veg", rating: 4.5 },
      { name: "Mirchi ka Salan & Raita", price: 40, type: "veg" }
    ]
  },
  {
    id: "rest-5",
    name: "Punjabi Tadka",
    cuisine: ["North Indian", "Butter Chicken", "Chinese"],
    rating: 4.6,
    reviewsCount: 970,
    distance: 1.8,
    deliveryTime: 30,
    priceRange: 2,
    costForTwo: 350,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    description: "Traditional dhaba-style Punjabi food, heavy cream sauces, clay oven kababs, and spicy curries.",
    tag: "Budget Friendly",
    address: "G-18, Market Complex, Block D, Noida",
    phoneNumber: "+91 98765 43214",
    menu: [
      { name: "Butter Chicken Masala (Boneless)", price: 340, type: "non-veg", rating: 4.8 },
      { name: "Dhaba Style Dal Tadka", price: 180, type: "veg", rating: 4.5 },
      { name: "Kadhai Paneer Special", price: 260, type: "veg" },
      { name: "Lachha Paratha", price: 45, type: "veg" }
    ]
  },
  {
    id: "rest-6",
    name: "South Spice",
    cuisine: ["South Indian", "Dosa", "Healthy"],
    rating: 4.7,
    reviewsCount: 1120,
    distance: 2.5,
    deliveryTime: 22,
    priceRange: 1,
    costForTwo: 250,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
    description: "Traditional South Indian eatery serving steaming hot idlis, crispy butter dosas, and filter coffee.",
    address: "H4, Central Plaza, Sector 50",
    phoneNumber: "+91 98765 43215",
    menu: [
      { name: "Cheese Ghee Podi Dosa", price: 160, type: "veg", rating: 4.9 },
      { name: "Steamed Rava Idli (2 Pcs)", price: 70, type: "veg" },
      { name: "Mysore Masala Dosa", price: 140, type: "veg", rating: 4.7 },
      { name: "Madras Filter Coffee", price: 45, type: "veg" }
    ]
  },
  {
    id: "rest-7",
    name: "Sweet Delights",
    cuisine: ["Desserts", "Ice Cream", "Bakery"],
    rating: 4.8,
    reviewsCount: 640,
    distance: 1.1,
    deliveryTime: 18,
    priceRange: 2,
    costForTwo: 300,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1567206563066-0f657a0fc340?w=600&auto=format&fit=crop&q=80",
    description: "Gourmet desserts, cold stone ice creams, waffle sundaes, and fresh eggless bakery cakes.",
    tag: "Sweet Cravings",
    address: "GF-21, High Street Market, Sector 120",
    phoneNumber: "+91 98765 43216",
    menu: [
      { name: "Belgian Chocolate Waffle", price: 180, type: "veg", rating: 4.9 },
      { name: "Hot Fudge Brownie Sundae", price: 160, type: "veg", rating: 4.8 },
      { name: "Cold Stone Mango Rabri Scoop", price: 90, type: "veg" },
      { name: "Choco Lava Cake", price: 110, type: "veg" }
    ]
  },
  {
    id: "rest-8",
    name: "Kebab Corner",
    cuisine: ["Mughlai", "Shawarma", "Street Food"],
    rating: 4.5,
    reviewsCount: 730,
    distance: 2.9,
    deliveryTime: 28,
    priceRange: 2,
    costForTwo: 350,
    isOpen: false,
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    description: "Smoky charcoal kebabs, rolls, and shawarmas packed with Middle Eastern spices.",
    address: "D-92, Local Shopping Complex, Sector 45",
    phoneNumber: "+91 98765 43217",
    menu: [
      { name: "Special Chicken Shawarma Wrap", price: 150, type: "non-veg", rating: 4.7 },
      { name: "Mutton Seekh Kebab (4 Pcs)", price: 290, type: "non-veg", rating: 4.6 },
      { name: "Paneer Tikka Kebab (4 Pcs)", price: 220, type: "veg" }
    ]
  },
  {
    id: "rest-9",
    name: "healthyBites",
    cuisine: ["Salads", "Healthy", "Juices"],
    rating: 4.6,
    reviewsCount: 410,
    distance: 1.5,
    deliveryTime: 25,
    priceRange: 2,
    costForTwo: 400,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&auto=format&fit=crop&q=80",
    description: "Nutritious salad bowls, protein shakes, freshly squeezed cold pressed juices, and low-carb keto wraps.",
    address: "Block A, commercial hub, Sector 34",
    phoneNumber: "+91 98765 43218",
    menu: [
      { name: "Avocado Quinoa Salad Bowl", price: 290, type: "veg", rating: 4.8 },
      { name: "Grilled Chicken Protein Bowl", price: 340, type: "non-veg", rating: 4.7 },
      { name: "Cold Pressed Green Detox Juice", price: 120, type: "veg" }
    ]
  },
  {
    id: "rest-10",
    name: "Pune Misal House",
    cuisine: ["Street Food", "Misal Pav", "Vada Pav"],
    rating: 4.8,
    reviewsCount: 790,
    distance: 1.2,
    deliveryTime: 18,
    priceRange: 1,
    costForTwo: 150,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80",
    description: "Authentic Puneri Misal Pav, Kolhapuri Kat Misal, and Vada Pav served hot with chilled Solkadhi and Puran Poli.",
    tag: "Marathi Specialty",
    address: "Shop 4, Commercial Ring Rd, Sector 62, Noida",
    phoneNumber: "+91 98765 43219",
    menu: [
      { name: "Kolhapuri Kat Misal Pav", price: 110, type: "veg", rating: 4.9 },
      { name: "Special Garam Vada Pav (2 Pcs)", price: 60, type: "veg", rating: 4.8 },
      { name: "Solkadhi Glass", price: 50, type: "veg" },
      { name: "Puran Poli with Desi Ghee (2 Pcs)", price: 90, type: "veg", rating: 4.7 }
    ]
  },
  {
    id: "rest-11",
    name: "Vada Pav Express",
    cuisine: ["Street Food", "Vada Pav", "Fast Food"],
    rating: 4.7,
    reviewsCount: 1100,
    distance: 0.9,
    deliveryTime: 12,
    priceRange: 1,
    costForTwo: 120,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
    description: "Mumbai style buttery Vada Pavs, Samosa Pavs, and deep fried green chillies. Crispy, hot, and spicy!",
    tag: "Local Favorite",
    address: "Opposite Sector 62 Metro Station, Noida",
    phoneNumber: "+91 98765 43220",
    menu: [
      { name: "Classic Dry Chutney Vada Pav", price: 40, type: "veg", rating: 4.9 },
      { name: "Cheese Burst Vada Pav", price: 70, type: "veg", rating: 4.7 },
      { name: "Samosa Pav Combo", price: 60, type: "veg" }
    ]
  }
];

const FILTER_TAGS = ["All", "Vada Pav", "Misal Pav", "Biryani", "Pizza", "North Indian", "South Indian", "Desserts", "Healthy", "Street Food"];

interface RestaurantGridProps {
  searchQuery: string;
  selectedCuisine: string | null;
  setSelectedCuisine: (cuisine: string | null) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  activeMapRestaurant: string | null;
  setActiveMapRestaurant: (name: string | null) => void;
  activeRegionState: RegionState;
}

export default function RestaurantGrid({
  searchQuery,
  selectedCuisine,
  setSelectedCuisine,
  favorites,
  toggleFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
  activeMapRestaurant,
  setActiveMapRestaurant,
  activeRegionState
}: RestaurantGridProps) {
  const [selectedSort, setSelectedSort] = useState<"rating" | "delivery" | "distance" | "cost-asc" | "cost-desc">("rating");
  const [openOnly, setOpenOnly] = useState(false);
  const [activeModalRest, setActiveModalRest] = useState<Restaurant | null>(null);

  // Filter and Sort Restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANT_DATABASE.filter((rest) => {
      // 1. Search Query Filter (Checks name, cuisine list, description)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(query);
        const matchesCuisine = rest.cuisine.some(c => c.toLowerCase().includes(query));
        const matchesDesc = rest.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCuisine && !matchesDesc) return false;
      }

      // 2. Selected Cuisine Tag Filter
      if (selectedCuisine && selectedCuisine !== "All") {
        const matchesCuisine = rest.cuisine.some(c => c.toLowerCase() === selectedCuisine.toLowerCase() || c.toLowerCase().includes(selectedCuisine.toLowerCase()));
        if (!matchesCuisine) return false;
      }

      // 3. Favorites Filter
      if (showFavoritesOnly && !favorites.includes(rest.id)) {
        return false;
      }

      // 4. Open status filter
      if (openOnly && !rest.isOpen) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // 5. Sorting
      if (selectedSort === "rating") return b.rating - a.rating;
      if (selectedSort === "delivery") return a.deliveryTime - b.deliveryTime;
      if (selectedSort === "distance") return a.distance - b.distance;
      if (selectedSort === "cost-asc") return a.costForTwo - b.costForTwo;
      if (selectedSort === "cost-desc") return b.costForTwo - a.costForTwo;
      return 0;
    });
  }, [searchQuery, selectedCuisine, showFavoritesOnly, favorites, openOnly, selectedSort]);

  const handleCuisineClick = (cuisine: string) => {
    if (selectedCuisine === cuisine) {
      setSelectedCuisine(null); // toggle off
    } else {
      setSelectedCuisine(cuisine);
    }
  };

  // State-specific quote banners and theme colors
  const activeBanner = useMemo(() => {
    switch (activeRegionState) {
      case "maharashtra":
        return {
          emoji: "🚩",
          text: "Kasa Kai Noida! Enjoy these authentic Maharashtrian specialities. Vada Pav is not just food, it is an emotion! 😋",
          bg: "bg-orange-500/5 border-orange-500/20 text-orange-400"
        };
      case "punjab":
        return {
          emoji: "🌾",
          text: "Oye hoye! Treat yourself to some buttery Punjabi curries and hot tandoori garlic naans. Makhan maar ke! 🍗",
          bg: "bg-yellow-500/5 border-yellow-500/20 text-yellow-400"
        };
      case "south-india":
        return {
          emoji: "🌴",
          text: "Vanakkam! Savor crispy ghee dosas, steamed idlis, and aromatic filter coffee. Anna approved! ☕",
          bg: "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
        };
      case "sweet":
        return {
          emoji: "🍰",
          text: "Sweet tooth alert! Indulge in warm chocolate waffles, scoops of ice cream, and sweet traditional treats. 🍬",
          bg: "bg-pink-500/5 border-pink-500/20 text-pink-400"
        };
      default:
        return null;
    }
  }, [activeRegionState]);

  const activeThemeColor = useMemo(() => {
    switch (activeRegionState) {
      case "maharashtra":
        return "bg-orange-500 shadow-orange-500/10 focus-within:border-orange-500/40 text-orange-400";
      case "punjab":
        return "bg-yellow-500 shadow-yellow-500/10 focus-within:border-yellow-500/40 text-yellow-400";
      case "south-india":
        return "bg-emerald-500 shadow-emerald-500/10 focus-within:border-emerald-500/40 text-emerald-400";
      case "sweet":
        return "bg-pink-500 shadow-pink-500/10 focus-within:border-pink-500/40 text-pink-400";
      default:
        return "bg-brand-primary shadow-brand-primary/10 focus-within:border-brand-primary/40 text-brand-primary";
    }
  }, [activeRegionState]);

  return (
    <section id="restaurants" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
          {showFavoritesOnly ? "Your Favorites ❤️" : "Discover Restaurants 🍽️"}
        </h2>
        <p className="text-slate-400 mt-2 text-sm md:text-base">
          {showFavoritesOnly 
            ? "Your handpicked restaurants with top ratings and quick deliveries."
            : "Explore delicious food and top-rated diners around your area."
          }
        </p>
      </div>

      {/* Regional Specialty Banner */}
      <AnimatePresence mode="wait">
        {activeBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 mb-6 shadow ${activeBanner.bg}`}
          >
            <span className="text-lg shrink-0">{activeBanner.emoji}</span>
            <span>{activeBanner.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Sort Bar */}
      <div className="glassmorphism rounded-2xl p-4 mb-10 flex flex-col gap-4 border border-white/5 shadow-xl">
        {/* Cuisine Tags (Scrollable) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTER_TAGS.map((cuisine) => {
            const isActive = selectedCuisine === cuisine || (cuisine === "All" && !selectedCuisine);
            return (
              <button
                key={cuisine}
                onClick={() => handleCuisineClick(cuisine)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? `${activeThemeColor.split(" ")[0]} text-white shadow-md scale-105` 
                    : "bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>

        {/* Sort and Toggle Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Sort By:</span>
            {[
              { id: "rating", label: "Top Rated ⭐" },
              { id: "delivery", label: "Fastest Delivery ⚡" },
              { id: "distance", label: "Closest 📍" },
              { id: "cost-asc", label: "Cost: Low to High" },
              { id: "cost-desc", label: "Cost: High to Low" }
            ].map((sortOption) => (
              <button
                key={sortOption.id}
                onClick={() => setSelectedSort(sortOption.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  selectedSort === sortOption.id 
                    ? "bg-white/15 text-white font-bold" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {sortOption.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Open Only Switch */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={openOnly}
                onChange={(e) => setOpenOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-white/10 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-primary/30 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-primary peer-checked:after:bg-white relative"></div>
              <span className="text-xs font-semibold text-slate-300">Open Only</span>
            </label>

            {/* Toggle show favorites in filter */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                showFavoritesOnly 
                  ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent scale-105" 
                  : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? "fill-brand-accent" : ""}`} />
              Favorites Only
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      <AnimatePresence mode="popLayout">
        {filteredRestaurants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glassmorphism rounded-3xl p-12 text-center border border-white/5"
          >
            <Utensils className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-200 mb-2">No Restaurants Found</h3>
            <p className="text-slate-400 max-w-sm mx-auto text-sm">
              We couldn't find any restaurants matching your filters. Try adjusting your search query, sorting methods, or cuisine tags!
            </p>
            <button
              onClick={() => {
                setSelectedCuisine(null);
                setOpenOnly(false);
                setShowFavoritesOnly(false);
              }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-xs transition-all shadow-lg shadow-brand-primary/20 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRestaurants.map((rest) => {
              const isFav = favorites.includes(rest.id);
              const isFocused = activeMapRestaurant === rest.name;

              return (
                <motion.div
                  key={rest.id}
                  layoutId={rest.id}
                  whileHover={{ y: -6 }}
                  className={`relative rounded-3xl overflow-hidden glassmorphism flex flex-col h-full border transition-all duration-300 group ${
                    isFocused 
                      ? "border-brand-primary/60 shadow-[0_0_35px_rgba(255,107,53,0.3)] scale-[1.01]" 
                      : "border-white/5 hover:border-white/12 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                        rest.isOpen 
                          ? "bg-emerald-500/90 text-white border border-emerald-500/20" 
                          : "bg-red-500/90 text-white border border-red-500/20"
                      }`}>
                        {rest.isOpen ? "Open" : "Closed"}
                      </span>
                      {rest.tag && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-secondary/90 text-brand-dark border border-brand-secondary/20 shadow-sm">
                          {rest.tag}
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(rest.id);
                      }}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-dark/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-accent active:scale-90 hover:bg-brand-dark/60 transition-all cursor-pointer z-10"
                    >
                      <Heart className={`w-4 h-4 transition-transform ${isFav ? "fill-brand-accent text-brand-accent scale-110" : ""}`} />
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Rating */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg text-slate-50 group-hover:text-brand-primary transition-colors line-clamp-1">
                          {rest.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg shrink-0">
                          <Star className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
                          <span className="text-xs font-bold text-slate-200">{rest.rating}</span>
                        </div>
                      </div>

                      {/* Cuisine */}
                      <p className="text-xs text-slate-400 font-medium mb-4 line-clamp-1">
                        {rest.cuisine.join(" • ")}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-500 font-normal mb-5 line-clamp-2">
                        {rest.description}
                      </p>
                    </div>

                    {/* Badges / Details Row */}
                    <div>
                      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/5 text-slate-400 font-semibold mb-4 text-[10px] tracking-wide text-center">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs text-slate-200 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {rest.deliveryTime}m
                          </span>
                          <span className="text-[9px] text-slate-500 mt-0.5">SPEED</span>
                        </div>
                        <div className="flex flex-col items-center justify-center border-x border-white/5">
                          <span className="text-xs text-slate-200 font-bold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {rest.distance}km
                          </span>
                          <span className="text-[9px] text-slate-500 mt-0.5">DISTANCE</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs text-slate-200 font-bold">
                            ₹{rest.costForTwo}
                          </span>
                          <span className="text-[9px] text-slate-500 mt-0.5">FOR TWO</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => {
                          setActiveModalRest(rest);
                          setActiveMapRestaurant(rest.name);
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-brand-primary/10 hover:border-brand-primary/20 hover:text-brand-primary text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        View Menu & Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Popup Modal */}
      <AnimatePresence>
        {activeModalRest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalRest(null)}
              className="absolute inset-0 bg-brand-dark"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl glassmorphism-heavy overflow-hidden shadow-2xl z-10 border border-white/10 max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-48 md:h-56 w-full shrink-0">
                <img
                  src={activeModalRest.image}
                  alt={activeModalRest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalRest(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer hover:rotate-90 duration-300"
                >
                  <X className="w-4.5 h-4.5" />
                </button>

                {/* Restaurant Name Overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-brand-primary text-[9px] font-extrabold text-white uppercase tracking-wider">
                      {activeModalRest.isOpen ? "Open Now" : "Closed"}
                    </span>
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                      <Star className="w-3 h-3 text-brand-secondary fill-brand-secondary" />
                      {activeModalRest.rating}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
                    {activeModalRest.name}
                  </h3>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeModalRest.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-xs font-semibold text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-brand-primary">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-bold">ADDRESS</p>
                        <p className="text-slate-300 line-clamp-1">{activeModalRest.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-brand-secondary">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-bold">CALL RESTAURANT</p>
                        <p className="text-slate-300">{activeModalRest.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-brand-accent">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-bold">HYGIENE RATING</p>
                        <p className="text-slate-300">A+ Certified</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Menu Items */}
                <div>
                  <h4 className="font-extrabold text-slate-200 text-lg border-b border-white/5 pb-2.5 mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-brand-primary" />
                    Popular Menu Items 🍛
                  </h4>
                  <div className="space-y-3">
                    {activeModalRest.menu.map((menuItem, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center mt-1 text-[8px] font-bold ${
                            menuItem.type === "veg" 
                              ? "border-emerald-500 text-emerald-500" 
                              : "border-red-500 text-red-500"
                          }`}>
                            ●
                          </span>
                          <div>
                            <p className="font-semibold text-slate-200 text-sm">{menuItem.name}</p>
                            {menuItem.rating && (
                              <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                <ThumbsUp className="w-3 h-3 text-brand-secondary" />
                                {menuItem.rating * 20}% of orders liked this
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-slate-50 text-sm">₹{menuItem.price}</span>
                          <button 
                            className="px-3.5 py-1.5 rounded-lg bg-brand-primary/20 border border-brand-primary/30 hover:bg-brand-primary text-brand-primary hover:text-white text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                            onClick={() => {
                              alert(`Added ${menuItem.name} to cart! (Simulated)`);
                            }}
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 md:px-8 border-t border-white/5 flex gap-4 shrink-0 bg-slate-950/20 backdrop-blur">
                <button
                  onClick={() => {
                    toggleFavorite(activeModalRest.id);
                  }}
                  className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                    favorites.includes(activeModalRest.id)
                      ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(activeModalRest.id) ? "fill-brand-accent text-brand-accent" : ""}`} />
                  {favorites.includes(activeModalRest.id) ? "Favorited" : "Add to Favorites"}
                </button>
                <button
                  onClick={() => {
                    alert(`Opening online checkout for ${activeModalRest.name}! (Simulated)`);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-95 text-white font-bold text-sm shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Order Online Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
