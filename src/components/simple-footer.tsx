"use client"

export default function SimpleFooter() {
  return (
    <footer 
      className="border-t border-gray-600 py-8 relative z-10"
      style={{
        background: 'linear-gradient(to top, #111827 0%, #1f2937 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-8 flex justify-between items-center text-sm text-gray-300">
        <div>© 2025 Falx GmbH, Bülach</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors duration-200">
            Impressum
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            Datenschutz
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            LinkedIn →
          </a>
        </div>
      </div>
    </footer>
  )
}