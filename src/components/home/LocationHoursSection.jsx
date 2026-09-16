import React from 'react';
import { MapPin, Clock, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const shopOpen = isOpenNow();
  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  return (
    <section id="location" className="py-20 sm:py-24 bg-white dark:bg-black transition-colors" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Bigger typography) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 id="location-heading" className="text-3xl sm:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight">
            Location & Hours
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 mt-3 sm:mt-4 text-base sm:text-xl leading-relaxed">
            Conveniently located in Casa Grande, AZ. Drop by, call ahead, or schedule a quote online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Hours & Contact Card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between transition-colors">
            <div>
              {/* Open/Closed Status */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 mb-6">
                <div className="flex items-center space-x-3.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} aria-hidden="true" />
                  <div>
                    <span className={`font-bold text-base sm:text-lg block ${shopOpen ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                      {shopOpen ? 'Open Now' : 'Currently Closed'}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">Today is {currentDayName}</span>
                  </div>
                </div>
                <Clock className="w-6 h-6 text-gray-400" aria-hidden="true" />
              </div>

              {/* Hours Table */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  Weekly Business Hours
                </h3>
                <div className="divide-y divide-gray-100 dark:divide-gray-800 text-sm sm:text-base">
                  {BUSINESS_INFO.hours.map((h) => {
                    const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
                    return (
                      <div
                        key={h.day}
                        className={`py-2.5 px-3 flex justify-between items-center rounded-xl ${
                          isToday 
                            ? 'bg-red-50 dark:bg-red-950/40 font-semibold' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className={isToday ? 'text-red-700 dark:text-red-400 font-bold' : ''}>
                          {h.day}
                          {isToday && (
                            <span className="ml-2 text-[10px] uppercase px-2 py-0.5 rounded-md bg-red-700 text-white font-bold">
                              Today
                            </span>
                          )}
                        </span>
                        <div className="text-right">
                          <span className={h.open === 'Closed' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-900 dark:text-white'}>
                            {h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}
                          </span>
                          {h.note && (
                            <span className="text-xs text-amber-600 dark:text-amber-400 block font-normal">({h.note})</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Address & Contact (Semantic Address for Local SEO) */}
            <address className="not-italic pt-5 border-t border-gray-100 dark:border-gray-800 space-y-3.5 text-sm sm:text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-700 dark:text-red-500 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block text-base">{BUSINESS_INFO.legalName}</span>
                  <span className="text-gray-600 dark:text-gray-400">{BUSINESS_INFO.address.formatted}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-700 dark:text-red-500 shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a 
                    href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} 
                    className="font-bold text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-400 transition text-base"
                    aria-label={`Call main phone: ${BUSINESS_INFO.phone}`}
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <a 
                    href={`tel:${BUSINESS_INFO.secondaryPhone.replace(/[^0-9]/g, '')}`} 
                    className="text-gray-500 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 transition text-sm"
                    aria-label={`Call secondary line: ${BUSINESS_INFO.secondaryPhone}`}
                  >
                    Alt: {BUSINESS_INFO.secondaryPhone}
                  </a>
                </div>
              </div>
            </address>

            {/* Get Directions Button */}
            <a
              href={BUSINESS_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-gray-900 dark:bg-[#141414] hover:bg-gray-800 dark:hover:bg-[#1f1f1f] text-white font-bold text-base transition flex items-center justify-center space-x-2.5 active:scale-95 shadow-md border border-transparent dark:border-neutral-700"
              aria-label="Get Google Maps GPS driving directions to Toby's Auto Mechanic in Casa Grande"
            >
              <Navigation className="w-5 h-5" />
              <span>Get Driving Directions</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm flex flex-col transition-colors">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-stone-50/50 dark:bg-[#141414]">
              <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">📍 15276 W Jimmie Kerr Blvd, Casa Grande, AZ</span>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 dark:text-red-400 hover:text-red-800 font-bold text-xs sm:text-sm flex items-center space-x-1"
                aria-label="Open location in Google Maps"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full flex-1 min-h-[320px] sm:min-h-[400px] lg:min-h-[460px]">
              <iframe
                title="Toby's Auto Mechanic Shop Location Map in Casa Grande, AZ"
                src={BUSINESS_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px] sm:min-h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
