"use client"

import { Button } from '@/components/ui/button'

export default function StartNowSection() {
  return (
    <section className="min-h-screen cta-gradient text-slate-900 flex flex-col relative py-16 lg:py-24">
      {/* Subtle neutral light background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(156,163,175,0.05),transparent_70%)]" />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="text-center max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight leading-tight text-slate-900">
            Starten Sie Ihre
          </h2>
          <h2 className="text-5xl md:text-7xl font-medium italic font-serif mb-12 tracking-tight text-slate-800">
            KI-Transformation.
          </h2>

          <Button variant="primary-dark" className="animate-on-scroll">
            Kostenlose Analyse buchen
          </Button>
          </div>
        </div>
      </div>

    </section>
  )
}