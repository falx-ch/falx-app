import FalxLogo from './FalxLogo';
import { Button } from '@/components/ui/button';

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <header className="relative z-20 flex items-center justify-between p-6 backdrop-blur-sm bg-black/5">
      {/* Logo */}
      <div className="flex items-end gap-2.5 group">
        <FalxLogo size={32} className="group-hover:scale-105 transition-transform duration-200" />
        <span className="text-white font-medium text-base tracking-tight leading-none">Falx</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-2">
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

      {/* Login Button Group with Arrow */}
      <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <Button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-28 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Button>
        <Button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 h-8 flex items-center z-10">
          Ausbrechen
        </Button>
      </div>
    </header>
  )
}
