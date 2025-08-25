"use client"

import { useState } from "react"

export default function CostCalculator() {
  const [employees, setEmployees] = useState(50)
  const savings = Math.round(employees * 1476) // CHF 1,476 per employee annually

  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900 to-orange-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.05),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Content with potential savings moved here */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 lg:mb-6 tracking-tight leading-tight">
                Was kostet Sie <br />
                <span className="font-serif italic text-red-300">Ineffizienz</span> wirklich?
              </h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                Schweizer Unternehmen verlieren täglich Millionen durch manuelle Prozesse. Berechnen Sie Ihr
                Einsparpotenzial.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-red-500/30 transition-all duration-300">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-baseline space-x-2 mb-3">
                  <span className="text-sm text-white/60 font-medium">CHF</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
                    {savings.toLocaleString("de-CH")}
                  </span>
                </div>
                <p className="text-red-300 text-lg font-medium">Potenzielle Ersparnis pro Jahr</p>
                <p className="text-white/50 text-sm mt-1">Basierend auf durchschnittlichen KI-Effizienzgewinnen</p>
              </div>
            </div>

            {/* Interactive slider with better responsive spacing */}
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-white/70 font-medium">Anzahl Mitarbeiter</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((employees - 10) / 490) * 100}%, rgba(255,255,255,0.1) ${((employees - 10) / 490) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/50">
                  <span>10</span>
                  <span className="font-medium text-white/80">{employees}</span>
                  <span>500+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Problem indicators */}
          <div className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl lg:text-2xl font-light text-white mb-1">54.5h</div>
                    <div className="text-white/60 text-sm">Admin-Zeit pro Woche</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xs">⏱</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl lg:text-2xl font-light text-white mb-1">56%</div>
                    <div className="text-white/60 text-sm">Verschwendete Arbeitszeit</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-xs">⚠</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl lg:text-2xl font-light text-white mb-1">CHF 9 Mia.</div>
                    <div className="text-white/60 text-sm">Jährlicher Verlust Schweiz</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xs">📉</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
      `}</style>
    </section>
  )
}
