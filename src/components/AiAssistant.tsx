"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, MessageSquare, Utensils, Flame, Leaf, Pizza, IndianRupee, Moon, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  suggestions?: { label: string; actionValue: string }[];
}

interface AiAssistantProps {
  onSearchTrigger: (query: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const QUICK_SUGGESTIONS = [
  { label: "Misal Pav 🚩", value: "misal", icon: Flame, color: "hover:bg-orange-500/10 hover:text-orange-400" },
  { label: "Vada Pav 🍔", value: "vada pav", icon: Utensils, color: "hover:bg-amber-500/10 hover:text-amber-400" },
  { label: "Spicy Food 🌶️", value: "spicy", icon: Flame, color: "hover:bg-red-500/10 hover:text-red-400" },
  { label: "Healthy Food 🥗", value: "healthy", icon: Leaf, color: "hover:bg-emerald-500/10 hover:text-emerald-400" },
  { label: "Pizza 🍕", value: "pizza", icon: Pizza, color: "hover:bg-yellow-500/10 hover:text-yellow-400" },
  { label: "Budget Meals 💰", value: "budget", icon: IndianRupee, color: "hover:bg-amber-500/10 hover:text-amber-400" },
  { label: "Late Night Cravings 🌙", value: "late night", icon: Moon, color: "hover:bg-purple-500/10 hover:text-purple-400" },
  { label: "Street Food 😍", value: "street food", icon: Heart, color: "hover:bg-pink-500/10 hover:text-pink-400" }
];

export default function AiAssistant({
  onSearchTrigger,
  isOpen,
  setIsOpen
}: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "Namaste Foodie! 👋 Main NearByBites AI hoon. Aaj kya khane ka mood hai?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Simulated AI Logic
  const getBotResponse = (input: string): { text: string; searchTag?: string } => {
    const text = input.toLowerCase();
    
    // Maharashtrian - Misal Pav
    if (text.includes("misal")) {
      return {
        text: "Arre vah! Garma garam ani zhatka Kolhapuri Misal cha mood aahe? Chalo, Pune Misal House che items try kara! Ekdum bhari! 🚩😋🔥",
        searchTag: "Misal Pav"
      };
    }

    // Maharashtrian - Vada Pav
    if (text.includes("vada pav") || text.includes("vadapav")) {
      return {
        text: "Garam Vada Pav ani dry garlic chutney mhanje swarg! 🍔 Mumbai Masala cha special Vada Pav, ya Vada Pav Express ani Pune Misal House che items try kara, ekdum zakkas! 🚩😋",
        searchTag: "Vada Pav"
      };
    }

    // Punjabi - Butter Chicken / Chole Bhature
    if (text.includes("butter chicken") || text.includes("chole bhature") || text.includes("punjabi")) {
      return {
        text: "Oye hoye veerji! Punjabi khane da mood hai? Punjabi Tadka restaurant da Butter Chicken te Chole Bhature try karo! Ekdum swad aa jayega, makhan maar ke! 🌾🍗",
        searchTag: "North Indian"
      };
    }

    // South Indian - Dosa / Idli
    if (text.includes("dosa") || text.includes("idli") || text.includes("south indian")) {
      return {
        text: "Vanakkam! Savor crispy butter paper dosas and soft steamed rava idlis from South Spice. Filter Kaapi with it is mandatory! 🌴☕",
        searchTag: "South Indian"
      };
    }

    if (text.includes("spicy") || text.includes("mirch") || text.includes("kolhapuri")) {
      return {
        text: "Wah! Agar spicy mood hai toh Spice Villa ki Hyderabadi Dum Biryani, Punjabi Tadka ka Paneer Tikka Masala, ya Pune Misal House chi tikhat Kolhapuri Misal try karo! Ekdum chatpata aur mazedaar 🔥🌶️",
        searchTag: "Biryani"
      };
    }
    if (text.includes("healthy") || text.includes("diet") || text.includes("salad") || text.includes("juice")) {
      return {
        text: "Health is wealth! 💪 Try out healthyBites. Unka Avocado Quinoa Salad Bowl aur Grilled Chicken Protein Bowl are highly rated by fitness lovers. No cheat meal today! 🥗",
        searchTag: "Healthy"
      };
    }
    if (text.includes("pizza") || text.includes("cheese") || text.includes("italian") || text.includes("pasta")) {
      return {
        text: "Cheesy pizza solves everything! 🍕 Pizza Paradise has the absolute best Double Cheese Margherita and Wood-Fired Peri-Peri Chicken Pizza in Noida. Highly recommended! ⭐ 4.9",
        searchTag: "Pizza"
      };
    }
    if (text.includes("budget") || text.includes("sasta") || text.includes("cheap") || text.includes("street")) {
      return {
        text: "Pocket friendly and delicious? 💰 Mumbai Masala is your best bet! Go for their Special Butter Pav Bhaji or Cheese Vada Pav. Great taste, light on the wallet!",
        searchTag: "Street Food"
      };
    }
    if (text.includes("late") || text.includes("night") || text.includes("midnight") || text.includes("craving")) {
      return {
        text: "Midnight hunger pangs? 🌙 Pizza Paradise handles rapid deliveries within 15 mins. Or you can grab a quick roll from Kebab Corner. Dinner under the stars! 🍕🌯",
        searchTag: "Pizza"
      };
    }
    if (text.includes("family") || text.includes("dinner") || text.includes("lunch")) {
      return {
        text: "Family time is foodie time! 🍽️ Spice Villa offers an elegant family dining box of Mughlai specialties. Punjabi Tadka is also great for large portions of Butter Chicken and Dal Makhani.",
        searchTag: "North Indian"
      };
    }
    if (text.includes("sweet") || text.includes("dessert") || text.includes("ice cream") || text.includes("waffle")) {
      return {
        text: "Dessert first! 🍰 Sweet Delights has a mouthwatering Belgian Chocolate Waffle and Hot Fudge Brownie Sundae. Pure bliss in every bite! 🍨",
        searchTag: "Desserts"
      };
    }
    if (text.includes("biryani")) {
      return {
        text: "Aha! Biryani is not just food, it is an emotion! 🍗 Royal Biryani has Lucknowi Dum Biryani, and Spice Villa has authentic Hyderabadi Dum Biryani. Both are awesome!",
        searchTag: "Biryani"
      };
    }
    
    // Default reply
    return {
      text: "Aha, mast choice! 😋 I've highlighted the best food joints serving that around Noida. Check out the filtered restaurants on your screen!",
      searchTag: input
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (textToSend.trim() === "") return;

    // 1. Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    // 2. Trigger bot typing
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotResponse(textToSend);
      
      const botMsg: Message = {
        id: `msg-${Date.now()}-bot`,
        sender: "bot",
        text: reply.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

      // 3. Trigger parent search filter if applicable
      if (reply.searchTag) {
        onSearchTrigger(reply.searchTag);
      }
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent text-white flex items-center justify-center shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/30 z-40 transition-shadow cursor-pointer animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-secondary text-[10px] font-bold text-brand-dark border border-slate-900 animate-pulse">
            AI
          </span>
        </motion.button>
      )}

      {/* Chatbox Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            className="fixed bottom-6 right-6 w-[360px] sm:w-[400px] h-[550px] rounded-3xl glassmorphism-heavy overflow-hidden shadow-2xl z-40 border border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-primary/25 via-brand-accent/10 to-brand-dark/40 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
                    NearByBites AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Online Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${!isBot ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white ${
                      isBot 
                        ? "bg-brand-primary/20 border border-brand-primary/30" 
                        : "bg-brand-accent"
                    }`}>
                      {isBot ? <Bot className="w-4 h-4 text-brand-primary" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed font-medium ${
                      isBot 
                        ? "bg-white/5 border border-white/5 text-slate-200" 
                        : "bg-gradient-to-tr from-brand-primary to-brand-secondary text-white shadow-md shadow-brand-primary/10"
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-brand-primary animate-pulse" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-slate-400 max-w-[75%] flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Recommendation Prompts */}
            <div className="px-4 py-2 border-t border-white/5 shrink-0 bg-slate-950/20">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">💡 Quick Food Requests</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
                {QUICK_SUGGESTIONS.map((tag, idx) => {
                  const Icon = tag.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(tag.value)}
                      className={`px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-semibold text-slate-300 transition-all flex items-center gap-1 cursor-pointer ${tag.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-white/10 shrink-0 bg-slate-950/50 flex gap-2 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                placeholder="Vada Pav khana hai..."
                className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary/30 transition-all"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="w-9 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center transition-all cursor-pointer hover:shadow-md active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
