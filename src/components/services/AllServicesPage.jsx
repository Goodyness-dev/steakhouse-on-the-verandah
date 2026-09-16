import React, { useState, useEffect } from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = ['All', 'Dry-Aged Steaks', 'Starters', 'Coastal & Specialties', 'Desserts', 'Cellar & Spirits'];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
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
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-charcoal-700 hover:text-gold-700 transition"
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
          Culinary Catalog & Cellar
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 tracking-tight">
          The Verandah Menu
        </h1>
        <p className="text-sm sm:text-base text-charcoal-700 font-light leading-relaxed">
          Explore our complete selection of in-house 35–41 day dry-aged prime beef, local Jamaican appetizers, Caribbean seafood, artisanal confections, and Sommelier reserves.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="mb-10 space-y-4">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search cuts, lobster, bone marrow, wine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#D5CABB] bg-white px-5 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
          />
          <svg className="w-4 h-4 text-charcoal-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'bg-white/80 border border-[#DCD5C8] text-charcoal-800 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-[#FAF8F5] border-2 border-[#E5DFD4] p-8 shadow-xl flex flex-col justify-between group hover:border-gold-500/60 transition-all duration-300"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-[10px] font-semibold uppercase tracking-wider">
                  {service.badge}
                </span>
                <span className="text-xs text-charcoal-700 italic">
                  Historic Verandah Service
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2 group-hover:text-gold-700 transition-colors">
                {service.name}
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed mb-5">
                {service.fullDescription}
              </p>

              {/* Items List */}
              <div className="space-y-2.5 pt-4 border-t border-[#EAE3D6]">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-800 block">
                  Course Highlights:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-charcoal-800">
                  {service.features.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-gold-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.sidesIncluded && (
                <p className="mt-4 text-xs text-charcoal-700 italic bg-[#F2ECE1] p-3 rounded-xl border border-[#E2DBD0]">
                  {service.sidesIncluded}
                </p>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-[#EAE3D6] flex items-center justify-between">
              <span className="text-xs text-gold-700 font-medium">
                {service.recommendedFor}
              </span>
              <button
                onClick={() => onOpenWizard(service.name)}
                className="rounded-full bg-charcoal-900 hover:bg-black text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition shadow active:scale-95 cursor-pointer"
              >
                Reserve Table
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-16 rounded-3xl bg-[#1A1816] text-white p-8 sm:p-12 text-center border border-gold-600/30 shadow-2xl space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100">
          Planning a Private Dinner or Celebration?
        </h2>
        <p className="text-sm text-cream-300 max-w-xl mx-auto font-light leading-relaxed">
          The Steak House on the Verandah provides exclusive buyout options and custom chef tasting menus for weddings, milestone anniversaries, and diplomatic receptions.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onOpenWizard('Private VIP Verandah Alcove')}
            className="rounded-full bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest shadow-lg transition active:scale-95"
          >
            Inquire for Private Events
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="rounded-full border border-white/30 hover:bg-white/10 text-cream-100 px-8 py-3 text-xs font-semibold uppercase tracking-widest transition"
          >
            Call Concierge: {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>

    </div>
  );
}
