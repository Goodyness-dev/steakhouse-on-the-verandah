import React from 'react';
import { 
  Armchair, 
  Truck, 
  Banknote, 
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

const FEATURES = [
  {
    num: 1,
    title: "Online Appointments",
    description: "Book your visit online 24/7. Get a custom quote in under 2 minutes.",
    icon: CalendarCheck,
  },
  {
    num: 2,
    title: "Customer Shuttle & Pickup",
    description: "Free local shuttle service and vehicle pickup/delivery available.",
    icon: Truck,
  },
  {
    num: 3,
    title: "Flexible Payments",
    description: "Cash, cards, Zelle, Cash App, and flexible financing options accepted.",
    icon: Banknote,
  },
  {
    num: 4,
    title: "Military & Veteran Discount",
    description: "Proudly supporting active military and veterans with dedicated savings.",
    icon: ShieldCheck,
  },
];

export default function AmenitiesSection({ onOpenWizard }) {
  return (
    <section id="amenities" className="py-20 sm:py-24 bg-white dark:bg-black transition-colors" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Waiting Room Image with lazy loading */}
          <div className="space-y-5">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-neutral-800">
              <img
                src="/images/waiting-room.jpg"
                alt="Air-conditioned customer waiting room lounge at Toby's Auto Mechanic in Casa Grande, AZ"
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <Armchair className="w-6 h-6 text-red-700 dark:text-red-500 shrink-0" aria-hidden="true" />
                <span>Air-Conditioned Waiting Lounge</span>
              </h3>
              <p className="text-gray-600 dark:text-neutral-300 text-sm sm:text-base mt-2 leading-relaxed">
                Clean, climate-controlled waiting room with complimentary high-speed Wi-Fi, cold refreshments, and comfortable seating while we care for your vehicle.
              </p>
            </div>
          </div>

          {/* Right: Numbered Features Grid with bigger fonts */}
          <div>
            <h2 id="amenities-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight mb-3">
              Why Choose Toby's
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 text-base sm:text-lg mb-8">
              Stress-free auto and diesel care with modern amenities and customer-first service.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.num} 
                    className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md transition-all bg-stone-50/60 dark:bg-[#0c0c0c]"
                  >
                    <div className="flex items-center space-x-3.5 mb-3">
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-700 text-white flex items-center justify-center text-sm sm:text-base font-bold shrink-0">
                        {feature.num}
                      </span>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-700 dark:text-red-500 shrink-0" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1.5">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base sm:text-lg transition-all shadow-md active:scale-95"
                aria-label="Book your appointment at Toby's Auto Mechanic"
              >
                Book Your Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
