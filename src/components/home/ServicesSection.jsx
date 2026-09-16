import React from 'react';
import { SERVICES } from '../../data/servicesData';
import { ArrowRight, LayoutGrid } from 'lucide-react';

const CARD_IMAGES = [
  '/images/card-1.jpg',
  '/images/card-2.jpg',
  '/images/card-3.jpg',
  '/images/card-4.jpg',
];

export default function ServicesSection({ onOpenWizard, onViewAllServices }) {
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <section id="services" className="py-20 sm:py-24 bg-white dark:bg-black transition-colors" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Bigger typography) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 id="services-heading" className="text-3xl sm:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight">
            Our Featured Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 sm:mt-4 text-base sm:text-xl leading-relaxed">
            From computerized diagnostics to heavy engine overhauls — choose a service to start your free quote.
          </p>
        </div>

        {/* Frosted Glass Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredServices.map((service, index) => (
            <article
              key={service.id}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent dark:border-neutral-800"
              onClick={() => onOpenWizard(service.category, service.subType)}
            >
              {/* Card Image */}
              <div className="relative h-80 sm:h-96 lg:h-[420px] w-full">
                <img
                  src={CARD_IMAGES[index]}
                  alt={`${service.title} - Toby's Auto Mechanic Casa Grande`}
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="420"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                {/* Decorative dots */}
                <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1.5 pointer-events-none" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                </div>
              </div>

              {/* Card Content (Bigger text) */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                {/* Title */}
                <h3 className="text-white font-bold text-lg sm:text-2xl leading-snug mb-2">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                  {service.description.split('.')[0]}.
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold">
                    {service.category}
                  </span>
                  {service.popular && (
                    <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-xs sm:text-sm font-semibold">
                      Popular
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className="w-full py-3 rounded-xl bg-white/25 backdrop-blur-md hover:bg-red-700 text-white font-bold text-sm sm:text-base transition-all border border-white/25 hover:border-red-700 flex items-center justify-center space-x-2"
                  aria-label={`Book ${service.title} quote`}
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Services (Bigger button) */}
        <div className="text-center">
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-gray-900 dark:bg-[#0c0c0c] hover:bg-gray-800 dark:hover:bg-[#161616] text-white font-bold text-base sm:text-lg transition-all shadow-md active:scale-95 border border-transparent dark:border-neutral-800"
            aria-label="View complete catalog of 19 auto and diesel services"
          >
            <LayoutGrid className="w-5 h-5" />
            <span>View All 19 Services</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
