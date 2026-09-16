import React from 'react';
import PedestalMenuSection from './PedestalMenuSection';
import ChefAndReviewsSection from './ChefAndReviewsSection';

export default function MainShowcaseSection({ onOpenWizard, onViewAllServices }) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto" id="menu-showcase">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column (7 cols): Our Menu + 3D Floating Plinth Pedestals */}
        <div className="lg:col-span-7">
          <PedestalMenuSection 
            onOpenWizard={onOpenWizard} 
            onViewAllServices={onViewAllServices} 
          />
        </div>

        {/* Right Column (5 cols): Executive Chef Bento Card + Customer Reviews */}
        <div className="lg:col-span-5" id="about">
          <ChefAndReviewsSection 
            onOpenWizard={onOpenWizard} 
          />
        </div>

      </div>
    </section>
  );
}
