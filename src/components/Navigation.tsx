export default function Navigation() {
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
  );
}