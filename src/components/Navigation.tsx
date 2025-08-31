import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu after navigation
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation - hidden on mobile */}
      <nav className="hidden sm:flex items-center space-x-2">
        <button
          onClick={() => scrollToSection('report')}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          KI 2025
        </button>
        <button
          onClick={() => scrollToSection('solution')}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          Lösung
        </button>
        <button
          onClick={() => scrollToSection('legata')}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          Legata
        </button>
      </nav>

      {/* Mobile Hamburger Menu - visible on mobile */}
      <div className="sm:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Menu Items */}
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              onClick={() => scrollToSection('report')}
              className="text-white text-2xl font-light px-8 py-4 min-h-[44px] rounded-full hover:bg-white/10 transition-all duration-200"
            >
              KI 2025
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-white text-2xl font-light px-8 py-4 min-h-[44px] rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Lösung
            </button>
            <button
              onClick={() => scrollToSection('legata')}
              className="text-white text-2xl font-light px-8 py-4 min-h-[44px] rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Legata
            </button>
            <div className="mt-8">
              <a href="https://calendly.com/falx-ch/free-strategy-call" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 min-h-[44px] rounded-full bg-white text-black font-normal text-lg hover:bg-white/90 transition-all duration-200">
                  Kostenlos beraten
                </button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}