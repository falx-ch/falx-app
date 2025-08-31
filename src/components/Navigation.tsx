import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './language-switcher';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    // Close menu first
    setIsOpen(false);
    
    // Then scroll after a small delay to ensure menu is closed
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = 0; // No offset - scroll to exact section start
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 350); // Wait for sheet close animation
  };

  const navigationItems = [
    { id: 'report', label: 'KI 2025' },
    { id: 'solution', label: 'Lösung' },
    { id: 'legata', label: 'Legata' },
  ];

  return (
    <>
      {/* Desktop Navigation - hidden on mobile */}
      <nav className="hidden sm:flex items-center space-x-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation with Sheet */}
      <div className="sm:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 group"
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1.5 relative">
                <span 
                  className={`block h-0.5 w-full bg-white transition-all duration-300 transform origin-center ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`} 
                />
                <span 
                  className={`block h-0.5 w-full bg-white transition-all duration-200 ${
                    isOpen ? 'opacity-0 scale-x-0' : ''
                  }`} 
                />
                <span 
                  className={`block h-0.5 w-full bg-white transition-all duration-300 transform origin-center ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`} 
                />
              </div>
            </button>
          </SheetTrigger>
          
          <SheetContent 
            side="right" 
            className="w-[85vw] sm:w-[400px] bg-gradient-to-br from-black/98 via-gray-900/98 to-black/98 backdrop-blur-2xl border-l border-white/20 flex flex-col"
            hideCloseButton={false}
          >
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
            
            {/* Content Container - flex grow to push footer down */}
            <div className="relative z-10 flex flex-col flex-1">
              <SheetHeader className="mb-10 border-b border-white/10 pb-6 flex-shrink-0">
                <SheetTitle className="text-white font-light text-xl tracking-tight">Menu</SheetTitle>
              </SheetHeader>
              
              {/* Main Content - flex grow */}
              <div className="flex-1 flex flex-col">
                {/* Mobile Menu Items */}
                <nav className="flex flex-col space-y-1 px-2 flex-shrink-0">
                  {navigationItems.map((item, index) => (
                    <SheetClose key={item.id} asChild>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="group relative text-white text-xl font-light px-4 py-4 rounded-xl hover:bg-white/5 transition-all duration-300 text-left flex items-center justify-between"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: 'slideInRight 0.5s ease-out forwards',
                          opacity: 0
                        }}
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {item.label}
                        </span>
                        <svg 
                          className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </SheetClose>
                  ))}
                </nav>
                
                {/* Language Switcher in mobile menu */}
                <div className="px-6 mt-8 flex-shrink-0">
                  <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                </div>
                
                {/* Spacer - pushes footer to bottom */}
                <div className="flex-1 min-h-[2rem]" />
                
                {/* Footer Content - now properly positioned at bottom */}
                <div className="px-6 pb-8 pt-4 flex-shrink-0">
                  {/* Divider with gradient */}
                  <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <p className="text-white/30 text-xs text-center">
                    © 2025 Falx GmbH. Swiss Made 🇨🇭
                  </p>
                </div>
              </div>
            </div>
            
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}