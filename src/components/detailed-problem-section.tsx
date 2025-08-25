'use client';
import { useRef, useEffect, useState } from 'react';
import { Database, MessageSquareX, AlertTriangle } from 'lucide-react';

export default function DetailedProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Title */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-swiss-headline bitter font-light text-gray-900">
            Der Workflow-Zusammenbruch
          </h2>
        </div>

        {/* Problem Visualization Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32 items-center">
          {/* Manual Data Problem */}
          <div className={`flex flex-col items-center text-center lg:justify-self-start transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-200 hover:scale-105 transition-transform duration-300">
                <Database className="w-16 h-16 text-red-600" />
              </div>
            </div>
            <h3 className="geist text-xl font-medium text-gray-900 mb-4">
              Manuelle Dateneingabe
            </h3>
            <p className="text-swiss-body text-gray-600 max-w-xs">
              Zeitaufwändige, fehleranfällige Prozesse belasten Ihre Teams täglich
            </p>
          </div>

          {/* Central Chaos Graphic */}
          <div className={`flex items-center justify-center lg:justify-self-center transform transition-all duration-1000 delay-500 ${isVisible ? 'rotate-0 opacity-100 scale-100' : '-rotate-12 opacity-0 scale-90'}`}>
            <div className="relative">
              {/* Chaotic web of connections */}
              <svg width="280" height="280" viewBox="0 0 280 280" className="text-red-300 animate-pulse">
                <defs>
                  <pattern id="chaosPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                    <path d="M0 20 Q20 0 40 20 Q20 40 0 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
                  </pattern>
                </defs>
                
                {/* Broken connection lines */}
                <path d="M40 140 Q140 60 240 140" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="8,4" />
                <path d="M140 40 Q140 140 140 240" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="8,4" />
                <path d="M240 140 Q140 220 40 140" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="8,4" />
                
                {/* Chaotic nodes */}
                <circle cx="40" cy="140" r="8" fill="currentColor" opacity="0.7" />
                <circle cx="140" cy="40" r="8" fill="currentColor" opacity="0.7" />
                <circle cx="240" cy="140" r="8" fill="currentColor" opacity="0.7" />
                <circle cx="140" cy="240" r="8" fill="currentColor" opacity="0.7" />
                <circle cx="140" cy="140" r="12" fill="currentColor" opacity="0.9" />
                
                {/* Additional chaos elements */}
                <path d="M70 70 L210 210" stroke="currentColor" strokeWidth="2" opacity="0.4" strokeDasharray="4,8" />
                <path d="M210 70 L70 210" stroke="currentColor" strokeWidth="2" opacity="0.4" strokeDasharray="4,8" />
              </svg>
              
              {/* Central warning indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Fragmented Communications */}
          <div className={`flex flex-col items-center text-center lg:justify-self-end transform transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-200 hover:scale-105 transition-transform duration-300">
                <MessageSquareX className="w-16 h-16 text-red-600" />
              </div>
            </div>
            <h3 className="geist text-xl font-medium text-gray-900 mb-4">
              Fragmentierte Kommunikation
            </h3>
            <p className="text-swiss-body text-gray-600 max-w-xs">
              Informationsverlust durch unzusammenhängende Systeme
            </p>
          </div>

          {/* Connection Lines - Hidden on mobile, visible on desktop */}
          <svg className={`absolute inset-0 pointer-events-none hidden lg:block transition-opacity duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} width="100%" height="100%">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="rgb(239 68 68)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="rgb(239 68 68)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Left to center connection */}
            <path 
              d="M 150 50% Q 40% 30% 50% 50%" 
              stroke="url(#connectionGradient)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="6,4"
              className="animate-pulse"
            />
            
            {/* Right to center connection */}
            <path 
              d="M calc(100% - 150px) 50% Q 60% 30% 50% 50%" 
              stroke="url(#connectionGradient)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="6,4"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Data Risk - Bottom Center */}
        <div className={`flex flex-col items-center text-center mt-20 transform transition-all duration-700 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-200 hover:scale-105 transition-transform duration-300">
              <AlertTriangle className="w-16 h-16 text-red-600" />
            </div>
          </div>
          <h3 className="geist text-xl font-medium text-gray-900 mb-4">
            Daten-Sicherheitsrisiken
          </h3>
          <p className="text-swiss-body text-gray-600 max-w-md">
            Ungeschützte Informationsflüsse gefährden die Compliance und das Vertrauen Ihrer Kunden
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className={`flex justify-center mt-20 transform transition-all duration-500 delay-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}