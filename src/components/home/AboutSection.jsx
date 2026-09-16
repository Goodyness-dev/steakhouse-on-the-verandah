import React from 'react';
import { Quote } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenWizard }) {
  return (
    <section id="about" className="py-20 sm:py-24 bg-stone-50 dark:bg-black transition-colors" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image with lazy loading & optimized lightweight JPG */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-neutral-800">
              <img
                src="/images/storefront.jpg"
                alt="Toby's Auto Mechanic repair facility storefront on Jimmie Kerr Blvd in Casa Grande, Arizona"
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
                className="w-full h-72 sm:h-96 lg:h-[420px] object-cover"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-5 right-4 sm:right-8 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 px-6 py-3.5 transition-colors">
              <div className="text-2xl sm:text-4xl font-black font-heading text-red-700 dark:text-red-500">15+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-neutral-300 font-semibold">Years Serving Arizona</div>
            </div>
          </div>

          {/* Right: Text with bigger fonts */}
          <div className="space-y-6">
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight leading-tight">
              From Mobile Mechanic to Casa Grande's Trusted Shop
            </h2>

            {/* Owner Quote */}
            <div className="border-l-4 border-red-700 dark:border-red-600 pl-5 sm:pl-6 py-2">
              <Quote className="w-6 h-6 text-red-400 dark:text-red-500 mb-2" aria-hidden="true" />
              <p className="text-gray-700 dark:text-neutral-300 text-sm sm:text-lg italic leading-relaxed">
                "{BUSINESS_INFO.owner.quote}"
              </p>
              <div className="mt-3 text-sm sm:text-base font-bold text-red-700 dark:text-red-500">
                — {BUSINESS_INFO.owner.name}, {BUSINESS_INFO.owner.role}
              </div>
            </div>

            <p className="text-gray-700 dark:text-neutral-300 text-sm sm:text-lg leading-relaxed">
              Who you trust to maintain your vehicle determines how much it costs over its lifetime. At Toby's, you get straight answers, honest quotes, and seasoned craftsmanship without upselling or hidden dealership markups.
            </p>

            {/* Key milestones */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-2.5 px-4 py-2.5 bg-white dark:bg-[#0c0c0c] rounded-xl border border-gray-200 dark:border-neutral-800 text-xs sm:text-sm font-medium transition-colors">
                <span className="font-bold text-red-700 dark:text-red-500 text-sm sm:text-base">2009</span>
                <span className="text-gray-700 dark:text-neutral-300">Started as mobile roadside mechanic</span>
              </div>
              <div className="flex items-center space-x-2.5 px-4 py-2.5 bg-white dark:bg-[#0c0c0c] rounded-xl border border-gray-200 dark:border-neutral-800 text-xs sm:text-sm font-medium transition-colors">
                <span className="font-bold text-red-700 dark:text-red-500 text-sm sm:text-base">2022</span>
                <span className="text-gray-700 dark:text-neutral-300">Opened permanent Casa Grande facility</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base sm:text-lg transition-all shadow-md active:scale-95"
                aria-label="Request a quote from Toby's team"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
