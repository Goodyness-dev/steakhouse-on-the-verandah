import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#EAE5DB] text-charcoal-800 text-sm border-t border-[#DCD5C8] pt-14 pb-12" role="contentinfo" id="contact">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Main 4-Column Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#DDD6C8]">
          
          {/* Column 1 (4 cols): Brand & Social Icons */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-gold-600/60 bg-white/70 flex items-center justify-center">
                <span className="font-serif font-bold text-gold-700 text-sm">SV</span>
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-charcoal-900 leading-tight">
                  The Steak House
                </h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-700 font-medium">
                  On the Verandah • Devon House
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed max-w-sm">
              Kingston's crown jewel of gastronomy. Experience in-house 35–41 day dry-aged prime beef, exquisite seafood, and rare cellar vintages nestled on the historic 1881 Devon House verandah.
            </p>

            {/* Social Icons matching mockup bottom-left */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/steakhouseontheverandah/"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-charcoal-400/80 hover:border-charcoal-900 bg-white/60 hover:bg-white flex items-center justify-center text-charcoal-800 transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/steakhouseja/"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-charcoal-400/80 hover:border-charcoal-900 bg-white/60 hover:bg-white flex items-center justify-center text-charcoal-800 transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* Phone Dial */}
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="w-8 h-8 rounded-full border border-charcoal-400/80 hover:border-charcoal-900 bg-white/60 hover:bg-white flex items-center justify-center text-charcoal-800 transition"
                aria-label="Phone"
              >
                <svg className="w-3.5 h-3.5 text-charcoal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 (2 cols): Offerings & Dining */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-charcoal-900">
              Gastronomy
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-gold-700 transition">
                  Dry-Aged Steaks
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-gold-700 transition">
                  Verandah Starters
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-gold-700 transition">
                  Caribbean Seafood
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-gold-700 transition">
                  Sommelier Cellar
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-gold-700 transition">
                  Executive Chef
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (3 cols): Dining Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-charcoal-900">
              Hours & Service
            </h5>
            <div className="space-y-1.5 text-xs text-charcoal-700">
              <div className="flex justify-between py-1 border-b border-[#DDD6C8]">
                <span className="font-medium">Tue – Thu:</span>
                <span>11:00 AM – 9:30 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DDD6C8]">
                <span className="font-medium">Fri – Sat:</span>
                <span>11:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DDD6C8]">
                <span className="font-medium">Sunday:</span>
                <span>11:30 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-gold-800">Monday:</span>
                <span className="italic">Private Events Only</span>
              </div>
            </div>
            <p className="text-[11px] text-charcoal-700 pt-1">
              Reservations recommended. Smart casual or evening attire requested.
            </p>
          </div>

          {/* Column 4 (3 cols): Stylized Map Card matching mockup */}
          <div className="lg:col-span-3 space-y-2.5">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-charcoal-900">
              Estate Location
            </h5>

            {/* Map Preview Card matching the thumbnail in mockup bottom right */}
            <div className="rounded-2xl overflow-hidden border border-[#D5CABB] bg-white p-2 shadow-md group">
              <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#E2DBD0]">
                {/* Embed Map snippet */}
                <iframe
                  title="Devon House Location Map"
                  src="https://maps.google.com/maps?q=The+Steak+House+on+the+Verandah+Devon+House+Kingston&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale-[40%] contrast-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-transparent hover:bg-black/10 transition pointer-events-none" />
              </div>

              <div className="pt-2 px-1 flex items-center justify-between text-[11px]">
                <span className="font-serif font-bold text-charcoal-900 truncate">
                  26 Hope Rd, Devon House
                </span>
                <a
                  href={BUSINESS_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-700 font-semibold hover:underline flex-shrink-0 ml-1"
                >
                  Directions →
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-700">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName} • Devon House Jamaica. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-gold-700 transition underline underline-offset-4 cursor-pointer"
            >
              Staff & Concierge Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
