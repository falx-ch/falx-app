"use client"

import { useState } from "react"

export default function AiInPractice() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="min-h-screen ai-practice-gradient text-white flex items-center justify-center relative overflow-hidden py-20">
      {/* Neutral slate background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(71,85,105,0.06),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,116,139,0.04),transparent_65%)]" />

      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M100,300 Q400,100 700,300 Q400,500 100,300"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            className="animate-pulse"
          />
          <path
            d="M150,250 Q450,150 650,350"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M150,350 Q450,450 650,250"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left column - Header content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-tight">
                <span className="font-serif italic text-emerald-300">KI</span> in der <br />
                Praxis
              </h2>
              <p className="text-emerald-300/80 text-lg font-medium mb-4">
                100% Erfolgsgarantie & Schweizer Datensicherheit
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Transformieren Sie Ihre Geschäftsprozesse mit bewährten KI-Lösungen, die sofort messbare Ergebnisse
                liefern.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-white/70 text-sm">DSGVO-konforme Implementierung</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-white/70 text-sm">Schweizer Hosting & Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                <span className="text-white/70 text-sm">ROI-Garantie innerhalb 90 Tagen</span>
              </div>
            </div>

            <button className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
              Kostenloses Beratungsgespräch
            </button>
          </div>

          {/* Right column - Solution cards */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {[
                {
                  title: "Administration automatisieren",
                  description: "Rechnungen, Verträge und Berichte in Sekunden statt Stunden",
                  icon: "📋",
                  color: "emerald",
                  stats: "↗ 78% Zeitersparnis",
                },
                {
                  title: "Marketing optimieren",
                  description: "Personalisierte Kampagnen und automatische Kundenansprache",
                  icon: "🎯",
                  color: "blue",
                  stats: "↗ 156% mehr Leads",
                },
                {
                  title: "Verkauf beschleunigen",
                  description: "Intelligente Lead-Qualifizierung und automatische Follow-ups",
                  icon: "⚡",
                  color: "violet",
                  stats: "↗ 43% höhere Conversion",
                },
              ].map((solution, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    index === 1 ? "ml-8" : index === 2 ? "ml-16" : ""
                  } ${
                    hoveredCard === index
                      ? `border-${solution.color}-500/50 shadow-lg shadow-${solution.color}-500/20`
                      : "border-white/10 hover:border-white/20"
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${solution.color}-500/20 flex items-center justify-center`}
                    >
                      <span className="text-xl">{solution.icon}</span>
                    </div>
                    <div
                      className={`text-xs font-medium px-3 py-1 rounded-full bg-${solution.color}-500/20 text-${solution.color}-300`}
                    >
                      {solution.stats}
                    </div>
                  </div>

                  <h3 className="text-xl font-medium mb-3 text-white">{solution.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{solution.description}</p>

                  <div className="mt-4 flex items-center text-white/50 text-xs">
                    <span>Mehr erfahren</span>
                    <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}