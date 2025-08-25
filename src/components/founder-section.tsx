"use client"

export default function FounderSection() {
  return (
    <section className="min-h-screen founder-gradient text-white flex relative overflow-hidden py-16 lg:py-24">
      {/* Soft neutral background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(148,163,184,0.03),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(156,163,175,0.02),transparent_80%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex">
        {/* Left side - Founder photo */}
        <div className="w-1/2 relative overflow-hidden flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="relative bg-white/5 backdrop-blur-sm p-1 rounded-3xl border border-white/20">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <img
                src="/professional-founder-portrait-in-modern-office-set.png"
                alt="Thomas Müller, Founder & CEO"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle top highlight like hero badge */}
              <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>

        {/* Right side - Content */}
        <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-tight">
              Ihr direkter Draht zum <span className="font-serif italic text-blue-300">Gründer</span>
            </h2>

            <div className="w-16 h-px bg-gradient-to-r from-blue-400 to-transparent" />
          </div>

          <blockquote className="relative">
            <div className="absolute -top-2 -left-4 text-4xl text-blue-400/30 font-serif">"</div>
            <p className="text-xl lg:text-2xl font-light italic text-white/90 leading-relaxed pl-6">
              Wir liefern keine Blackbox. Wir liefern eine Partnerschaft.
            </p>
            <div className="absolute -bottom-2 -right-4 text-4xl text-blue-400/30 font-serif">"</div>
          </blockquote>

          <div className="space-y-3">
            <p className="text-white/80 text-sm font-medium">
              — <strong className="text-white">Thomas Müller</strong>, Gründer & CEO
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200 group"
            >
              LinkedIn
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>

          <button className="px-8 py-3 rounded-full bg-white text-slate-900 font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Book a Founder Consultation
          </button>
        </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8">
        <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <span className="text-white/70 text-lg animate-bounce">↓</span>
        </div>
      </div>
    </section>
  )
}