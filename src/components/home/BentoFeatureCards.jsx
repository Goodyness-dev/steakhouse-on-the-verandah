import React from 'react';
import { imageManifest } from '../../data/imageManifest';

export default function BentoFeatureCards({ onOpenWizard, onViewAllServices }) {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto" id="gallery">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        
        {/* Left Bento Card: Prime Cuts & Dry Aging (Dark Luxe Aesthetic matching mockup) */}
        <div className="rounded-3xl bg-[#151413] border-2 border-[#2D2A25] p-7 sm:p-9 shadow-2xl text-cream-100 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* Sizzling Dish Image Vignette */}
            <div className="w-full sm:w-48 h-48 sm:h-44 rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex-shrink-0 relative">
              <img
                src={imageManifest.features.primeCuts}
                alt="Prime dry aged steak searing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gold-600/90 text-[10px] uppercase tracking-wider text-white font-semibold">
                35-41 Day Vault
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-400 font-semibold">
                Cattle Craftsmanship
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
                Prime Cuts & Dry Aging
              </h3>
              <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed">
                Carved by our master butchers and aged in Jamaican Himalayan salt rooms to concentrate tenderness, flavor, and marbling before hitting glowing pimento coals.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-cream-400 tracking-wider">
              Kingston Signature Steak • Tomahawk • Ribeye
            </span>
            <button
              onClick={onViewAllServices}
              className="rounded-full bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 text-xs font-semibold uppercase tracking-wider transition shadow-md active:scale-95"
            >
              Discover Cuts
            </button>
          </div>
        </div>

        {/* Right Bento Card: Verandah Gallery Spread matching mockup! */}
        <div className="rounded-3xl bg-[#FAF8F5] border-2 border-[#E5DFD4] p-7 sm:p-9 shadow-xl text-charcoal-900 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* Gallery Multi-Plate Presentation Vignette */}
            <div className="w-full sm:w-48 h-48 sm:h-44 rounded-2xl overflow-hidden bg-[#EAE4D8] border border-[#DDD5C6] flex-shrink-0 relative">
              <img
                src={imageManifest.features.spread}
                alt="Verandah degustation table and banquet spread"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[10px] uppercase tracking-wider text-white font-semibold">
                Devon Estate
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-700 font-semibold">
                Ambiance & Atmosphere
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-bold tracking-tight">
                Verandah Gallery
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
                Step inside the candlelit wraparound verandah of George Stiebel's 1881 estate. Savor artisanal rum libations and table-side flambé service beneath lush tropical trees.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-[#EAE3D6] flex items-center justify-between">
            <span className="text-xs text-charcoal-600 tracking-wider">
              Verandah • Wine Vault • Garden Terraces
            </span>
            <button
              onClick={() => onOpenWizard()}
              className="rounded-full border border-charcoal-900 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal-900 hover:bg-charcoal-900 hover:text-white transition shadow-sm active:scale-95"
            >
              Book Experience
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
