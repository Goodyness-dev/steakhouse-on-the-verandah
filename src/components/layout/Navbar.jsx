import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'HOME', target: '#' },
    { name: 'MENU', target: 'services' },
    { name: 'ABOUT', target: '#about' },
    { name: 'LOCATION', target: '#location' },
    { name: 'RESERVATION', action: 'wizard' },
    { name: 'GALLERY', target: '#gallery' },
    { name: 'CONTACT', target: '#location' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#EFECE6]/95 backdrop-blur-md shadow-sm border-b border-[#D8D2C5]' 
          : 'bg-[#EFECE6] border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Monogram Brand Mark matching mockup */}
        <a 
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center space-x-3.5 group text-left"
          aria-label="The Steak House on the Verandah Home"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gold-600/70 flex items-center justify-center p-1 relative bg-white/70 group-hover:border-gold-600 transition-colors shadow-sm">
            <div className="w-full h-full rounded-full border border-gold-500/30 flex items-center justify-center">
              {/* Elegant Monogram SVG */}
              <svg className="w-6 h-6 text-gold-600" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6"/>
                <path d="M14 26C14 23.5 17 21.5 20 21.5C23 21.5 26 19.5 26 17C26 14.5 23.5 13 20 13C16.5 13 14.5 15 14 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M16 27L20 13L24 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 22.5H22.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-charcoal-900 leading-tight">
              The Steak House
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold-700 font-medium">
              On the Verandah • Devon House
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation matching mockup */}
        <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isMenu = link.target === 'services' && currentPage === 'services';
            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => {
                  if (link.action === 'wizard') {
                    onOpenWizard();
                  } else {
                    handleNavClick(e, link.target);
                  }
                }}
                className={`text-[13px] font-medium tracking-[0.16em] transition-all duration-200 cursor-pointer touch-manipulation ${
                  isMenu 
                    ? 'text-gold-700 font-semibold border-b border-gold-600 pb-0.5' 
                    : 'text-charcoal-800 hover:text-gold-600'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right Desktop CTA: Pill Button "BOOK A TABLE" matching mockup */}
        <div className="hidden md:flex items-center space-x-5">
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="text-xs font-semibold tracking-wider text-charcoal-700 hover:text-gold-700 transition flex items-center space-x-1.5"
            title="Call Restaurant"
          >
            <svg className="w-3.5 h-3.5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenWizard()}
            className="rounded-full border border-charcoal-900/80 px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-900 hover:bg-charcoal-900 hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Book a Table at Devon House"
          >
            BOOK A TABLE
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            type="button"
            onClick={() => onOpenWizard()}
            className="rounded-full border border-charcoal-900 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal-900 active:scale-95 touch-manipulation"
          >
            Book
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 text-charcoal-800 hover:text-black focus:outline-none touch-manipulation"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#D8D2C5] px-6 py-6 space-y-4 shadow-xl">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={(e) => {
                  if (link.action === 'wizard') {
                    setMobileMenuOpen(false);
                    onOpenWizard();
                  } else {
                    handleNavClick(e, link.target);
                  }
                }}
                className="block w-full text-left py-2 text-sm font-medium tracking-widest text-charcoal-900 border-b border-[#EAE5DB] touch-manipulation"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border border-charcoal-800 text-xs font-semibold tracking-wider text-charcoal-900"
            >
              <span>CALL {BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="w-full py-3 rounded-full bg-charcoal-900 text-white text-xs font-semibold uppercase tracking-widest shadow-md"
            >
              BOOK A TABLE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
