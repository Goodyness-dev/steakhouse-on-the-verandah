import React, { useState } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenWizard }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const heroSlides = [
    {
      image: imageManifest.hero.banner,
      headlineTop: "Experience",
      headlineBottom: "Fine Dining",
      subtitle: "On the Historic Devon House Verandah • Kingston, Jamaica",
      tagline: "35 to 41-Day In-House Dry-Aged Steaks & Rare Cellar Vintages",
      alt: "Fine dining dry aged steak plated presentation"
    },
    {
      image: imageManifest.features.verandah,
      headlineTop: "Heritage &",
      headlineBottom: "Grandeur",
      subtitle: "The Breeze-Kissed 1881 Neo-Classical Estate",
      tagline: "Candlelit Garden Tables, Colonial Balustrades & Butler Service",
      alt: "Devon House historic dining terrace"
    },
    {
      image: imageManifest.features.spread,
      headlineTop: "Crafted by",
      headlineBottom: "Fire & Spice",
      subtitle: "Scotch Bonnet Bone Marrow, Caribbean Lobster & Prime Beef",
      tagline: "Pimento Wood Ember Grilling With Jamaican Agricultural Heritage",
      alt: "Luxurious fine dining table spread"
    }
  ];

  const currentSlide = heroSlides[slideIndex];

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative pt-2 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Outer Banner Wrapper with Flanking Arrows */}
      <div className="relative flex items-center justify-center">
        
        {/* Left Carousel Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-3 lg:-left-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-charcoal-900 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105"
          aria-label="Previous Showcase Slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* The Large Rounded Hero Frame matching the template */}
        <div className="w-full relative h-[420px] sm:h-[520px] md:h-[600px] lg:h-[640px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-charcoal-950 border border-[#D5CABB]/60 group">
          
          {/* Background Image with Warm Dramatic Vignette */}
          <img
            src={currentSlide.image}
            alt={currentSlide.alt}
            fetchPriority="high"
            className="w-full h-full object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
          />

          {/* Luxury Warm Gradients & Ambient Dark Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(20,15,10,0.65)_100%)] pointer-events-none" />

          {/* Centered Editorial Typography Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 z-10">
            
            {/* Elegant Subtitle Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-cream-100 text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium mb-4 sm:mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span>{currentSlide.subtitle}</span>
            </div>

            {/* High-Contrast Editorial Serif Headline matching mockup */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] drop-shadow-lg max-w-4xl">
              <span className="italic font-normal opacity-95 block sm:inline font-serif">
                {currentSlide.headlineTop}{' '}
              </span>
              <span className="font-semibold text-cream-50 font-serif">
                {currentSlide.headlineBottom}
              </span>
            </h1>

            {/* Tagline / Secondary Detail */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-cream-200 font-light max-w-2xl tracking-wide leading-relaxed drop-shadow">
              {currentSlide.tagline}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenWizard()}
                className="rounded-full bg-white text-charcoal-900 hover:bg-gold-500 hover:text-white px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl active:scale-95 cursor-pointer"
              >
                RESERVE YOUR TABLE
              </button>

              <a
                href="#menu-showcase"
                className="rounded-full bg-black/40 hover:bg-black/60 text-cream-100 border border-white/30 backdrop-blur-md px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
              >
                EXPLORE MENU
              </a>
            </div>

          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  slideIndex === idx ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Right Carousel Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-3 lg:-right-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-charcoal-900 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105"
          aria-label="Next Showcase Slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

    </section>
  );
}
