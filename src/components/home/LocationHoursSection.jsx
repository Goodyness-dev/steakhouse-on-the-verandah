import React, { useState } from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('directions'); // 'directions' | 'hours' | 'parking' | 'landmarks'
  const shopOpen = isOpenNow();

  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const googleMapsPlaceUrl = "https://www.google.com/maps/place/The+Steak+House+on+The+Verandah/@18.0148763,-76.7898652,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICW4cO57wE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWl5m8g532doLZ8qnGopZgmTi0CMD-IpCq-_6DuuQrc-n19M_eO1SGQoBalZ2xKRx1L6hyxVhu7juKrLGwVK_iUPZD5O_kPbv6pLugorlpy7aBxjAbSu0-in3ga-8IlDb6vDxmgDQQ%3Dw640-h640-n-k-no!7i3024!8i4032!4m7!3m6!1s0x8edb3fad9f9e15b1:0x5f4e81daf34213eb!8m2!3d18.0148763!4d-76.7898652!10e9!16s%2Fg%2F11gcm38grl?authuser=0&hl=en&entry=ttu";

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#EFECE6] border-t border-[#D8D2C5] relative overflow-hidden" aria-labelledby="location-heading">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B38E5D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FCFAF7] border border-[#D8D2C5] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B38E5D]" />
            <span className="font-mono text-xs font-bold text-[#8C6B1B] uppercase tracking-widest">
              ESTATE LOCATION & VISITOR GUIDE
            </span>
          </div>

          <h2 id="location-heading" className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1A1816] tracking-tight">
            Find Us at Devon House
          </h2>

          <p className="text-[#5A5245] text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Situated on the breezy north-facing wraparound verandah of Jamaica's celebrated 1881 Georgian mansion in the heart of Kingston.
          </p>
        </div>

        {/* TOP INTERACTIVE STATUS & QUICK ACTIONS BAR */}
        <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-5 sm:p-6 mb-10 shadow-thick flex flex-wrap items-center justify-between gap-4">
          {/* Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center">
              <span className={`w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={`absolute w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500 animate-ping opacity-75' : 'bg-amber-500'}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-base sm:text-lg text-[#1A1816]">
                  {shopOpen ? 'Open for Verandah Dining' : 'Currently Closed'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#F4EFE6] border border-[#D8D2C5] text-[#7A7265] font-mono">
                  Today is {currentDayName}
                </span>
              </div>
              <p className="text-xs text-[#7A7265] mt-0.5">
                {currentDayName === 'Monday' 
                  ? 'Mondays reserved for private banquets & diplomatic receptions.' 
                  : 'Lunch from 11:30 AM • Candlelight Dinner until 10:00 PM'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyAddress}
              className="px-4 py-2.5 rounded-xl bg-[#F4EFE6] hover:bg-[#EFECE6] border border-[#D8D2C5] text-xs font-bold text-[#1A1816] transition active:scale-95 cursor-pointer"
            >
              {copied ? 'Address Copied!' : 'Copy Full Address'}
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="px-4 py-2.5 rounded-xl bg-[#F4EFE6] hover:bg-[#EFECE6] border border-[#D8D2C5] text-xs font-bold text-[#1A1816] transition active:scale-95"
            >
              Call Host: {BUSINESS_INFO.phone}
            </a>

            <button
              onClick={() => onOpenWizard && onOpenWizard()}
              className="px-5 py-2.5 rounded-xl bg-[#1A1816] hover:bg-[#2A2624] text-[#EFECE6] border border-[#B38E5D] text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        {/* MAIN BIG MAP & LOCATION SHOWCASE */}
        <div className="space-y-10">
          
          {/* GIGANTIC INTERACTIVE GOOGLE MAP CONTAINER */}
          <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl overflow-hidden shadow-2xl transition">
            
            {/* Map Top Bar with Devon House Seal & Direct GPS Links */}
            <div className="px-6 py-4 bg-[#FCFAF7] border-b border-[#D8D2C5] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <img 
                  src="/images/devon-mansion-real.jpg" 
                  alt="Devon House Estate" 
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-[#B38E5D]/50 shadow-xs"
                />
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1A1816] leading-snug">
                    The Steak House on The Verandah
                  </h3>
                  <p className="text-xs text-[#7A7265]">
                    26 Hope Road, Devon House Courtyard, Kingston 10, Jamaica
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#1A1816] hover:bg-[#2A2624] text-[#EFECE6] text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  <span>Open in Google Maps</span>
                  <span>↗</span>
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=The+Steak+House+on+The+Verandah+Devon+House+Kingston+Jamaica`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#F4EFE6] hover:bg-[#EFECE6] border border-[#D8D2C5] text-[#1A1816] text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <span>GPS Directions</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Huge Map Frame */}
            <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[640px] bg-[#E5E0D5]">
              <iframe
                title="The Steak House on The Verandah Google Map Location at Devon House, Kingston, Jamaica"
                src="https://maps.google.com/maps?q=The+Steak+House+on+The+Verandah+26+Hope+Road+Kingston+Jamaica&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Bottom Info Pill inside the Map */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto z-10 bg-[#FCFAF7]/95 backdrop-blur-md border-2 border-[#D8D2C5] rounded-2xl p-4 shadow-xl max-w-md">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EFE6] border border-[#D8D2C5] flex items-center justify-center shrink-0 font-serif font-bold text-xs text-[#8C6B1B]">
                    DH
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm text-[#1A1816] block">
                      Historic Devon House Courtyard
                    </span>
                    <p className="text-xs text-[#5A5245] mt-0.5 leading-relaxed">
                      Coordinates: 18.0148° N, 76.7898° W • Main gate at 26 Hope Road (opposite Trafalgar Road).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

