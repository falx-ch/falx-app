export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left backdrop-blur-sm bg-black/10 rounded-2xl p-6 border border-white/10">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" className="inline-block">
              <path d="m0 0h32v32h-32z" fill="#f00"/>
              <path d="m13 6h6v7h7v6h-7v7h-6v-7h-7v-6h7z" fill="#fff"/>
            </svg>
            Made in Zurich • 🔒 DSG konform • 🎯 Gratis KI-Analyse
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic bitter">KI-Strategien</span> für
          <br />
          <span className="font-light tracking-tight text-white">Schweizer KMU</span>
        </h1>

        {/* Description */}
        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
        Schweizer Unternehmen verlieren jährlich CHF 6 Milliarden durch ineffiziente 
        Prozesse. Unsere KI-Lösungen reduzieren administrative 
        Belastung um bis zu 54 Stunden pro Monat.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            Report herunterladen
          </button>
          <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Kostenlos beraten
          </button>
        </div>
      </div>
    </main>
  )
}
