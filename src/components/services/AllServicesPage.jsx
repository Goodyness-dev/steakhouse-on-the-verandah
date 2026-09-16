import React, { useState, useEffect } from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    'All',
    'Lunch Specials',
    'Dry-Aged Steaks',
    'Starters',
    'Coastal & Specialties',
    'Desserts',
    'Cellar & Spirits'
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (service.featuredDishes && service.featuredDishes.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Lunch Specials' && service.id.includes('lunch')) return true;
    if (selectedCategory === 'Dry-Aged Steaks' && service.id.includes('dry-aged')) return true;
    if (selectedCategory === 'Starters' && service.id.includes('starter')) return true;
    if (selectedCategory === 'Coastal & Specialties' && service.id.includes('coastal')) return true;
    if (selectedCategory === 'Desserts' && service.id.includes('dessert')) return true;
    if (selectedCategory === 'Cellar & Spirits' && service.id.includes('cellar')) return true;
    return true;
  });

  return (
    <div className="bg-[#EFECE6] text-charcoal-900 min-h-screen pt-4 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between py-6 border-b border-[#D8D2C5]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-charcoal-700 hover:text-gold-700 transition cursor-pointer"
        >
          <span>← Back to Devon House Experience</span>
        </button>

        <span className="text-xs text-gold-700 font-medium tracking-widest uppercase">
          Devon House Mansion • Kingston 10
        </span>
      </div>

      {/* Page Header */}
      <div className="py-10 sm:py-14 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-700 font-semibold">
          Gastronomy on the Verandah
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 tracking-tight">
          The Culinary Menu
        </h1>
        <p className="text-sm sm:text-base text-charcoal-700 font-light leading-relaxed">
          Every cut is dry-aged 35 to 41 days in our Himalayan salt vault and kissed by pimento hardwood flame. Explore midday lunch specials, seafood classics, and cellar pairings.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="mb-12 space-y-5">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search steaks, lobster roll, bone marrow, pasta, wine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#D5CABB] bg-white px-5 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
          />
          <svg className="w-4 h-4 text-charcoal-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'bg-white/85 border border-[#DCD5C8] text-charcoal-800 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Menu Sections with Rich Food Imagery */}
      <div className="space-y-16">
        {filteredServices.map((section) => (
          <div
            key={section.id}
            className="rounded-3xl bg-[#FAF8F5] border-2 border-[#E5DFD4] p-6 sm:p-10 shadow-xl overflow-hidden group hover:border-gold-500/60 transition-all duration-300"
          >
            {/* Section Header with Hero Category Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-[#EAE3D6]">
              
              {/* Category Image Banner */}
              <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#EFECE6] border border-[#DDD5C6] relative shadow-md">
                <img
                  src={section.image}
                  alt={section.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-gold-400 text-[11px] font-semibold uppercase tracking-wider">
                  {section.badge}
                </div>
              </div>

              {/* Category Description & Highlights */}
              <div className="lg:col-span-7 space-y-3 text-left">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold-700 font-semibold">
                  Verandah Culinary Category
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                  {section.name}
                </h2>
                <p className="text-sm text-charcoal-700 font-light leading-relaxed">
                  {section.fullDescription || section.shortDescription}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 text-xs text-charcoal-800">
                  {section.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-gold-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <button
                    onClick={() => onOpenWizard(section.name)}
                    className="rounded-full bg-gold-600 hover:bg-gold-700 text-white px-7 py-2.5 text-xs font-semibold uppercase tracking-widest shadow transition active:scale-95"
                  >
                    Reserve Table for This Menu
                  </button>
                </div>
              </div>

            </div>

            {/* Individual Dishes Grid with Images (Addressing User Request) */}
            {section.featuredDishes && section.featuredDishes.length > 0 && (
              <div className="pt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
                    Featured Plates & Pricing
                  </h3>
                  <span className="text-xs text-gold-700 font-medium tracking-wider uppercase">
                    Chef Curated
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.featuredDishes.map((dish, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-[#E8E2D6] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group/dish"
                    >
                      {/* Dish Photo */}
                      <div className="h-44 w-full overflow-hidden bg-[#F4F0E8] relative">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/dish:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] font-serif font-bold">
                          {dish.price}
                        </div>
                      </div>

                      {/* Dish Details */}
                      <div className="p-4 space-y-2 text-left flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-base text-charcoal-900 group-hover/dish:text-gold-700 transition-colors">
                            {dish.name}
                          </h4>
                          <p className="mt-1 text-xs text-charcoal-600 font-light leading-relaxed">
                            {dish.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#F0EBE2] flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-charcoal-700">
                            Verandah Service
                          </span>
                          <button
                            onClick={() => onOpenWizard(dish.name)}
                            className="text-xs text-gold-700 font-semibold hover:underline"
                          >
                            Order / Inquire →
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sides Included Notice */}
            {section.sidesIncluded && (
              <div className="mt-6 p-4 rounded-2xl bg-[#F2ECE1] border border-[#E2DBD0] text-xs text-charcoal-700 italic text-left">
                <strong>Service Note:</strong> {section.sidesIncluded}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Bottom Callout Banner */}
      <div className="mt-16 rounded-3xl bg-[#1A1816] text-white p-8 sm:p-12 text-center border border-gold-600/30 shadow-2xl space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100">
          Private Dining & Chef's Degustation
        </h2>
        <p className="text-sm text-cream-300 max-w-xl mx-auto font-light leading-relaxed">
          The Steak House on the Verandah offers bespoke 4-course and 6-course tasting journeys curated personally with Executive Chef Julian Sterling.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onOpenWizard('Private VIP Tasting')}
            className="rounded-full bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest shadow-lg transition active:scale-95 cursor-pointer"
          >
            Inquire for Private Dining
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="rounded-full border border-white/30 hover:bg-white/10 text-cream-100 px-8 py-3 text-xs font-semibold uppercase tracking-widest transition"
          >
            Call Maitre d': {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>

    </div>
  );
}
