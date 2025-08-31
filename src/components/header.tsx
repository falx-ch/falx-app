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

      {/* Language Switcher - Now in top right */}
      <LanguageSwitcher className="hidden sm:block" />
    </header>
  )
}
