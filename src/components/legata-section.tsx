'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, FileText, Zap, ArrowRight, PlayCircle, CheckCircle } from 'lucide-react';
import { gsapManager } from '@/lib/gsap-manager';

export default function LegataSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Voice-first workflow visualization
    tl.fromTo(".workflow-step", 
      { opacity: 0, x: -50, scale: 0.9 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out"
      }
    )
    .from(".workflow-arrow", {
      opacity: 0,
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(".glass-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2")
    .from(".pulse-animation", {
      scale: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Continuous pulse animation for active elements
    gsap.to(".pulse-ring", {
      scale: 1.3,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power2.out"
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Workflow Visualization */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          
          {/* Step 1: Voice Input */}
          <div className="workflow-step absolute top-16 left-4 md:left-16">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Mic className="w-10 h-10 text-blue-600" />
                </div>
                {/* Pulse rings for active recording */}
                <div className="pulse-animation absolute inset-0 flex items-center justify-center">
                  <div className="pulse-ring absolute w-20 h-20 bg-blue-400 rounded-full opacity-30"></div>
                  <div className="pulse-ring absolute w-20 h-20 bg-blue-400 rounded-full opacity-30" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
              <div className="text-center max-w-xs">
                <h3 className="geist font-medium text-gray-900 mb-2">Sprechen</h3>
                <p className="text-swiss-caption text-gray-600">
                  Natürliche Spracheingabe in Schweizerdeutsch oder Hochdeutsch
                </p>
              </div>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="workflow-arrow absolute top-24 left-24 md:left-40">
            <ArrowRight className="w-8 h-8 text-blue-400 transform rotate-45" />
          </div>

          {/* Step 2: AI Processing */}
          <div className="workflow-step absolute top-32 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-12 h-12 text-purple-600" />
              </div>
              <div className="text-center max-w-xs">
                <h3 className="geist font-medium text-gray-900 mb-2">KI-Verarbeitung</h3>
                <p className="text-swiss-caption text-gray-600">
                  Contextual AI analysiert und strukturiert Ihre Eingabe
                </p>
              </div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="workflow-arrow absolute top-24 right-24 md:right-40">
            <ArrowRight className="w-8 h-8 text-purple-400 transform -rotate-45" />
          </div>

          {/* Step 3: Document Output */}
          <div className="workflow-step absolute top-16 right-4 md:right-16">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <FileText className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center max-w-xs">
                <h3 className="geist font-medium text-gray-900 mb-2">Dokument</h3>
                <p className="text-swiss-caption text-gray-600">
                  Professionelle Dokumente, rechtssicher und formatiert
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Integration */}
          <div className="workflow-step absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle className="w-10 h-10 text-orange-600" />
              </div>
              <div className="text-center max-w-xs">
                <h3 className="geist font-medium text-gray-900 mb-2">Integration</h3>
                <p className="text-swiss-caption text-gray-600">
                  Nahtlose Einbindung in bestehende Systeme
                </p>
              </div>
            </div>
          </div>

          {/* Central Connection Visualization */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 600" className="opacity-30">
              <defs>
                <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59 130 246)" />
                  <stop offset="25%" stopColor="rgb(147 51 234)" />
                  <stop offset="50%" stopColor="rgb(236 72 153)" />
                  <stop offset="75%" stopColor="rgb(34 197 94)" />
                  <stop offset="100%" stopColor="rgb(249 115 22)" />
                </linearGradient>
              </defs>
              
              {/* Workflow connections */}
              <path d="M150 100 Q400 200 650 100" stroke="url(#workflowGradient)" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.7" />
              <path d="M650 100 Q500 300 400 500" stroke="url(#workflowGradient)" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.7" />
              <path d="M400 500 Q200 400 150 100" stroke="url(#workflowGradient)" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.7" />
              <path d="M400 200 L400 450" stroke="url(#workflowGradient)" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Glass Morphism Info Card */}
        <div className="flex justify-center mt-8">
          <Card className="glass-card glass-strong border border-gray-200 max-w-2xl shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="bitter text-3xl font-light text-gray-900 mb-4">
                Legata: Die Zukunft entwickeln
              </h2>
              <p className="geist text-lg text-gray-700 mb-6 leading-relaxed">
                Innovation & Rechtskonformität vereint in einer intelligenten Sprachlösung, 
                die Ihre Dokumentation revolutioniert.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white bg-opacity-50 rounded-lg">
                  <PlayCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Spracherkennung</div>
                  <div className="text-xs text-gray-600">99.8% Genauigkeit</div>
                </div>
                
                <div className="text-center p-4 bg-white bg-opacity-50 rounded-lg">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">KI-Verarbeitung</div>
                  <div className="text-xs text-gray-600">Contextual AI</div>
                </div>
                
                <div className="text-center p-4 bg-white bg-opacity-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Compliance</div>
                  <div className="text-xs text-gray-600">DSGVO & Swiss Law</div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="bg-white bg-opacity-80 hover:bg-opacity-100 border-gray-300 text-gray-900 font-medium px-6 py-2 transition-all duration-300 group"
              >
                Mehr erfahren
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}