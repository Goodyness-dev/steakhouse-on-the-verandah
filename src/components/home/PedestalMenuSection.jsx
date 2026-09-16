import React, { useState } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { SERVICES } from '../../data/servicesData';

export default function PedestalMenuSection({ onOpenWizard, onViewAllServices }) {
  const [activeItem, setActiveItem] = useState(1);

  const pedestalPlates = [
    {
      id: 0,
      name: "Scotch Bonnet Roasted Bone Marrow",
      course: "Starter",
      aging: "Heritage Spiced",
      description: "Slow-roasted herb bone marrow with fresh shallot-parsley gremolata, pickled scotch bonnet peppers, and toasted brioche points.",
      image: imageManifest.pedestals[0].image,
      price: "$24 USD",
      notes: "Pairs with: 2020 Louis Jadot Bourgogne Pinot Noir"
    },
    {
      id: 1,
      name: "The Kingston Signature Steak (KSS)",
      course: "Prime Cut",
      aging: "38-Day Salt Dry Aged",
      description: "Center-cut prime beef aged in our Himalayan salt vault, crusted in Jamaican Blue Mountain espresso & roasted pimento, finished with bone marrow glaze.",
      image: imageManifest.pedestals[1].image,
      price: "$72 USD",
      notes: "Pairs with: 2018 Caymus Vineyards Napa Valley Cabernet"
    },
    {
      id: 2,
      name: "Devon Verandah Dark Chocolate Tart",
      course: "Dessert",
      aging: "Artisanal Single-Origin",
      description: "Warm flourless dark cocoa gateau with spiced roasted Blue Mountain berries and authentic house-made Devon Stout ice cream.",
      image: imageManifest.pedestals[2].image,
      price: "$18 USD",
      notes: "Pairs with: Appleton Estate 21-Year Rare Jamaica Rum"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.22em] text-gold-700 font-semibold mb-1">
          Culinary Masterpieces
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-charcoal-900 tracking-tight">
          Our Menu
        </h2>
      </div>

      {/* Narrative Intro block matching mockup */}
      <p className="text-sm sm:text-base text-charcoal-700 font-light leading-relaxed max-w-md">
        Each signature creation is an homage to Georgian Jamaican heritage, fired over aromatic pimento wood and elevated by our proprietary 35 to 41-day dry aging chamber.
      </p>

      {/* 3D Floating Plinth Pedestals matching the uploaded template! */}
      <div className="pt-2 space-y-10 sm:space-y-12">
        {pedestalPlates.map((plate, index) => {
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
                {/* 3D Bottom Shelf Edge to simulate isometric pedestal plinth */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  
                  {/* Plated Dish on Pedestal */}
                  <div className="relative w-full sm:w-36 h-36 sm:h-32 rounded-xl overflow-hidden bg-[#F7F4EE] border border-[#E2DBD0] flex-shrink-0">
                    <img 
                      src={plate.image} 
                      alt={plate.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-cream-100 font-semibold">
                      {plate.course}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors">
                        {plate.name}
                      </h3>
                      <span className="text-sm font-serif font-semibold text-gold-700 whitespace-nowrap">
                        {plate.price}
                      </span>
                    </div>

                    <p className="mt-1 text-xs sm:text-sm text-charcoal-700 line-clamp-2 font-light leading-relaxed">
                      {plate.description}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-charcoal-600">
                      <span className="italic text-gold-800 font-medium">
                        {plate.aging}
                      </span>
                      <span className="text-charcoal-700 text-[10px] uppercase tracking-wider">
                        Tap to preview
                      </span>
                    </div>
                  </div>

                </div>

                {/* Subtle 3D plinth perspective depth strip */}
                <div className="mt-3 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[10px] tracking-wider text-charcoal-600 uppercase">
                  <span>{plate.notes}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWizard();
                    }}
                    className="text-gold-700 font-semibold hover:underline"
                  >
                    Reserve this cut →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Full Menu Pill CTA */}
      <div className="pt-4 flex items-center gap-4">
        <button
          onClick={onViewAllServices}
          className="rounded-full border border-charcoal-900 px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-900 hover:bg-charcoal-900 hover:text-white transition-all duration-300 shadow-sm active:scale-95"
        >
          VIEW FULL MENU & CELLAR
        </button>

        <button
          onClick={() => onOpenWizard()}
          className="rounded-full bg-gold-500 hover:bg-gold-600 text-white px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-md active:scale-95"
        >
          BOOK A TABLE
        </button>
      </div>

    </div>
  );
}
