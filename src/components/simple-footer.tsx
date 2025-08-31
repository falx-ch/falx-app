"use client"

export default function SimpleFooter() {
  return (
    <footer 
      className="py-8 relative z-10"
      style={{
        background: 'linear-gradient(to top, #111827 0%, #1f2937 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <div className="text-center sm:text-left">
            <div>© 2025 Falx GmbH</div>
            <div className="text-xs text-gray-400 mt-1">Bülach</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <a href="/legal#impressum" className="hover:text-white transition-colors duration-200 py-1">
              Impressum
            </a>
            <a href="/legal#datenschutz" className="hover:text-white transition-colors duration-200 py-1">
              Datenschutz
            </a>
            <a href="https://www.linkedin.com/company/falx-ch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 py-1 whitespace-nowrap">
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}