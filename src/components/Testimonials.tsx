"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    quote: "NearByBites helped me find hidden gems near my area. The mapping feature is super intuitive!",
    author: "Rohan Sharma",
    role: "Local Guide & Food Blogger",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    quote: "The AI suggestions are surprisingly accurate. I asked for spicy comfort food and got the best Biryani suggestion of my life!",
    author: "Priya Patel",
    role: "Software Engineer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    quote: "Best restaurant discovery experience I've used. No ads clutters the UI, it's just pure premium aesthetics and speed.",
    author: "Kabir Mehta",
    role: "College Student",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-t from-brand-dark to-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">Foodie Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Loved by <span className="text-brand-accent">Food Lovers</span> ❤️
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Read stories and feedback from our active community of foodie discoverers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="glassmorphism rounded-3xl p-8 border border-white/5 relative flex flex-col justify-between"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

              <div>
                {/* Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-brand-secondary fill-brand-secondary" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-100">{review.author}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
