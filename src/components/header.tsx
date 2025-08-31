import FalxLogo from './FalxLogo';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';
import LanguageSwitcher from './language-switcher';

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6 backdrop-blur-sm bg-black/5">
      {/* Logo */}
      <a href="/" className="flex items-end gap-2.5 group hover:opacity-90 transition-opacity duration-200">
        <FalxLogo size={32} className="group-hover:scale-105 transition-transform duration-200" />
        <span className="text-white font-medium text-base tracking-tight leading-none">Falx</span>
      </a>

      {/* Navigation - Now includes hamburger menu for mobile */}
      <Navigation />

      {/* Language Switcher */}
      <LanguageSwitcher className="hidden sm:block" />

      {/* Login Button Group with Arrow - Desktop only */}
      <a href="https://calendly.com/falx-ch/free-strategy-call" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
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
      </a>
    </header>
  )
}
