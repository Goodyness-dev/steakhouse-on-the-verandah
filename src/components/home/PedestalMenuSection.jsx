import React, { useState } from 'react';
import { imageManifest } from '../../data/imageManifest';

export default function PedestalMenuSection({ onOpenWizard, onViewAllServices }) {
  const [activeItem, setActiveItem] = useState(0);

  const pedestalPlates = [
    {
      id: 0,
      name: "The Kingston Signature Steak (KSS)",
      course: "Actual Verandah Prime Cut",
      aging: "38-Day Salt Dry Aged",
      description: "Center-cut prime beef aged in our Himalayan salt vault, seared over pimento coals with roasted garlic whipped yam, fresh garden vegetables, and cellar wine.",
      image: "/images/real-verandah-steak.jpg",
      price: "$72 USD / $11,000 JMD",
      notes: "Devon House Verandah Table Signature"
    },
    {
      id: 1,
      name: "Steak Frites & Red Stripe Pairing",
      course: "Guest Favorite",
      aging: "Flame-Grilled Striploin",
      description: "Seared sliced striploin steak over seasoned hand-cut fries with melted savory cream sauce, crispy shredded onions, and an ice-cold Red Stripe lager.",
      image: "/images/real-steak-fries-redstripe.jpg",
      price: "$45 USD / $6,900 JMD",
      notes: "Served with Ice-Cold Jamaican Red Stripe"
    },
    {
      id: 2,
      name: "Grilled Chicken Rigatoni in Golden Sauce",
      course: "Verandah Classic",
      aging: "Scratch Pasta & Spice",
      description: "Tender herb-grilled sliced chicken breast over rigatoni in rich golden scotch-parmesan cream, garnished with fresh beet spirals and micro herbs.",
      image: "/images/real-grilled-chicken-pasta.jpg",
      price: "$28 USD / $4,300 JMD",
      notes: "Pairs with: 2021 Santa Margherita Pinot Grigio"
    },
    {
      id: 3,
      name: "Devon Verandah Dark Chocolate Tart",
      course: "Artisanal Dessert",
      aging: "Single-Origin Dark Cocoa",
      description: "Warm flourless dark chocolate gateau accompanied by authentic house-made Devon Stout ice cream and roasted spiced berries.",
      image: "/images/gallery-dessert.jpg",
      price: "$18 USD / $2,800 JMD",
      notes: "Pairs with: Appleton Estate 21-Year Rare Jamaica Rum"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col text-left">
        <span className="text-xs uppercase tracking-[0.22em] text-gold-700 font-semibold mb-1">
          Actual Verandah Specialties
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-charcoal-900 tracking-tight">
          Our Menu
        </h2>
      </div>

      {/* Narrative Intro block */}
      <p className="text-sm sm:text-base text-charcoal-700 font-light leading-relaxed max-w-md text-left">
        Every plate reflects authentic dining at Devon House. From prime dry-aged steaks carved tableside to island chicken rigatoni and cold Red Stripe pairings.
      </p>

      {/* 3D Floating Plinth Pedestals matching the uploaded template */}
      <div className="pt-2 space-y-8 sm:space-y-10">
        {pedestalPlates.map((plate) => {
          const isSelected = activeItem === plate.id;
          
          return (
            <div 
              key={plate.id}
              onClick={() => setActiveItem(plate.id)}
              className="group cursor-pointer"
            >
              {/* Pedestal Container with 3D Depth & Cast Directional Shadow */}
              <div 
                className={`relative rounded-2xl bg-white border border-[#E8E2D6] p-4 sm:p-5 transition-all duration-500 ${
                  isSelected 
                    ? 'ring-2 ring-gold-500/80 shadow-[24px_34px_55px_-10px_rgba(40,30,18,0.22),8px_12px_22px_-6px_rgba(40,30,18,0.12)] -translate-y-1.5' 
                    : 'shadow-[18px_24px_45px_-12px_rgba(40,30,18,0.14),6px_8px_16px_-6px_rgba(40,30,18,0.08)] hover:-translate-y-1 hover:shadow-[22px_30px_50px_-10px_rgba(40,30,18,0.18)]'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  
                  {/* Plated Dish Photo */}
                  <div className="relative w-full sm:w-40 h-40 sm:h-36 rounded-xl overflow-hidden bg-[#F7F4EE] border border-[#E2DBD0] flex-shrink-0 shadow-inner">
                    <img 
                      src={plate.image} 
                      alt={plate.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-[10px] uppercase tracking-wider text-gold-400 font-semibold">
                      {plate.course}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors">
                        {plate.name}
                      </h3>
                      <span className="text-xs sm:text-sm font-serif font-bold text-gold-800 whitespace-nowrap">
                        {plate.price}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs sm:text-sm text-charcoal-700 line-clamp-2 font-light leading-relaxed">
                      {plate.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-charcoal-600">
                      <span className="italic text-gold-800 font-medium">
                        {plate.aging}
                      </span>
                      <span className="text-gold-700 font-semibold uppercase text-[10px] tracking-wider group-hover:underline">
                        Tap to select
                      </span>
                    </div>
                  </div>

                </div>

                {/* Pedestal Bottom Shelf Strip */}
                <div className="mt-3 pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between text-[10px] tracking-wider text-charcoal-600 uppercase">
                  <span>{plate.notes}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWizard(plate.name);
                    }}
                    className="text-gold-700 font-bold hover:underline"
                  >
                    Reserve this dish →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Full Menu Pill CTA */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={onViewAllServices}
          className="rounded-full border border-charcoal-900 px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-900 hover:bg-charcoal-900 hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW ALL DISHES & LUNCH SPECIALS
        </button>

        <button
          onClick={() => onOpenWizard()}
          className="rounded-full bg-gold-600 hover:bg-gold-700 text-white px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
        >
          BOOK A TABLE
        </button>
      </div>

    </div>
  );
}
