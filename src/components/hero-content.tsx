import { GlassCard } from '@/components/ui/glass-card'
import { SwissBadge } from '@/components/ui/swiss-badge'
import { Button } from '@/components/ui/button'

export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-xl">
      <GlassCard className="text-left bg-black/10" size="lg">
        <SwissBadge 
          className="mb-1 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-sm font-light relative z-10 inline-flex items-center gap-1.5 px-2 py-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" className="inline-block">
              <path d="m0 0h32v32h-32z" fill="#f00"/>
              <path d="m13 6h6v7h7v6h-7v7h-6v-7h-7v-6h7z" fill="#fff"/>
            </svg>
            Swiss Made • 🔒 DSG konform • 🎯 Gratis KI-Analyse
          </span>
        </SwissBadge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-1 -mt-1">
          <span className="font-medium italic bitter">KI-Strategien</span> für
          <br />
          <span className="font-light tracking-tight text-white">Schweizer KMU</span>
        </h1>

        {/* Description */}
        <p className="text-base font-light text-white/70 mb-2 -mt-1 leading-relaxed">
        Schweizer Unternehmen verlieren jährlich CHF 6 Milliarden durch ineffiziente 
        Prozesse. Unsere KI-Lösungen reduzieren administrative 
        Belastung um bis zu 54 Stunden pro Monat.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="secondary" className="hover-lift">
            Report herunterladen
          </Button>
          <Button variant="primary" className="hover-lift">
            Kostenlos beraten
          </Button>
        </div>
      </GlassCard>
    </main>
  )
}
