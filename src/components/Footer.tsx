"use client";

import React from "react";
import { ChefHat, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

// Custom Premium Social SVGs
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

export default function Footer({ scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="offers" className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Brand Info */}
          <div className="space-y-4">
            <div 
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                NearBy<span className="text-brand-primary">Bites</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              AI-powered restaurant discovery platform providing personalized food recommendations, local route maps, and conversational food assistance.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: TwitterIcon, href: "#" },
                { icon: InstagramIcon, href: "#" },
                { icon: FacebookIcon, href: "#" },
                { icon: YoutubeIcon, href: "#" }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-primary/15 hover:text-brand-primary text-slate-400 border border-white/5 hover:border-brand-primary/20 transition-all flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Discover Links */}
          <div>
            <h4 className="font-bold text-xs text-slate-100 uppercase tracking-widest mb-5">Discover</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => scrollToSection("restaurants")} className="hover:text-brand-primary transition-colors cursor-pointer">
                  Top Restaurants
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("trending")} className="hover:text-brand-primary transition-colors cursor-pointer">
                  Trending Dishes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("nearby")} className="hover:text-brand-primary transition-colors cursor-pointer">
                  Nearby Maps
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-brand-primary transition-colors">Special Offers</a>
              </li>
            </ul>
          </div>

          {/* Support / Company Links */}
          <div>
            <h4 className="font-bold text-xs text-slate-100 uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-xs text-slate-100 uppercase tracking-widest mb-5">Get in Touch</h4>
            <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>Sector 62, Noida, Uttar Pradesh, India - 201301</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>+91 (120) 456-7890</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <span>support@nearbybites.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500 font-semibold text-center sm:text-left">
            &copy; {currentYear} NearByBites. All rights reserved. Built for project demonstration.
          </p>
          <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 justify-center sm:justify-end">
            Made with <span className="text-brand-accent animate-pulse">❤️</span> for Food Lovers
          </div>
        </div>

      </div>
    </footer>
  );
}
