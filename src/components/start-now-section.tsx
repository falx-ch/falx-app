"use client"

export default function StartNowSection() {
  return (
    <section className="h-screen bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200 text-slate-900 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-300/40 via-transparent to-white/20" />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto px-8">
          <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight leading-tight text-slate-900">
            Starten Sie Ihre
          </h2>
          <h2 className="text-5xl md:text-7xl font-medium italic font-serif mb-12 tracking-tight text-slate-800">
            KI-Transformation.
          </h2>

          <button className="px-12 py-4 rounded-full bg-slate-900 text-white font-normal text-lg transition-all duration-200 hover:bg-slate-800 cursor-pointer transform hover:scale-105 shadow-lg">
            Kostenlose Analyse buchen
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-400/30 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center text-sm text-slate-600">
          <div>© 2025 Falx GmbH, Bülach</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors duration-200">
              Impressum
            </a>
            <a href="#" className="hover:text-slate-800 transition-colors duration-200">
              Datenschutz
            </a>
            <a href="#" className="hover:text-slate-800 transition-colors duration-200">
              LinkedIn →
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}