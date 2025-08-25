'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, TrendingUp, Users, CheckCircle2, Shield, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsSection() {
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

    // 3D card perspective + ROI metrics building + CTA transformation
    tl.from(".solution-card", { 
      rotationY: -45, 
      z: -200, 
      opacity: 0,
      stagger: 0.15, 
      duration: 1.2,
      ease: "power3.out" 
    })
    .from(".roi-bar", { 
      scaleY: 0, 
      stagger: 0.1, 
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      transformOrigin: "bottom"
    }, "-=0.5")
    .from(".success-guarantee", { 
      y: 30, 
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .from(".cta-button", { 
      scale: 0.8, 
      opacity: 0, 
      duration: 0.8,
      ease: "elastic.out(1, 0.3)" 
    }, "-=0.2")
    .from(".flow-graphic", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.out"
    }, "-=1");
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Flow Graphic */}
      <div className="flow-graphic absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 800">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59 130 246)" />
              <stop offset="50%" stopColor="rgb(99 102 241)" />
              <stop offset="100%" stopColor="rgb(139 92 246)" />
            </linearGradient>
          </defs>
          
          {/* Clean linear flow lines */}
          <path d="M0 200 Q250 100 500 200 Q750 300 1000 200" stroke="url(#flowGradient)" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M0 400 Q250 300 500 400 Q750 500 1000 400" stroke="url(#flowGradient)" strokeWidth="3" fill="none" opacity="0.4" />
          <path d="M0 600 Q250 500 500 600 Q750 700 1000 600" stroke="url(#flowGradient)" strokeWidth="3" fill="none" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-swiss-headline bitter font-light text-gray-900 mb-4">
            KI in der Praxis
          </h2>
          <div className="success-guarantee">
            <Badge variant="outline" className="text-lg px-6 py-2 bg-green-50 text-green-700 border-green-200">
              <Award className="w-5 h-5 mr-2" />
              100% Erfolgsgarantie & Schweizer Datensicherheit
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Solution Cards Stack */}
          <div className="space-y-8">
            {/* Administration Card */}
            <Card className="solution-card glass-light border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="geist text-xl text-gray-900">Administration</CardTitle>
                    <CardDescription className="text-swiss-body text-gray-600">
                      Automatisierte Dokumentenerstellung
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Zeitersparnis</span>
                    <span className="font-semibold text-green-600">78%</span>
                  </div>
                  <Progress value={78} className="h-2 roi-bar" />
                  <p className="text-swiss-caption text-gray-500">
                    Von manueller Eingabe zu intelligenter Automatisierung
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Card */}
            <Card className="solution-card glass-light border-gray-200 hover:shadow-xl transition-shadow duration-300 ml-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="geist text-xl text-gray-900">Marketing</CardTitle>
                    <CardDescription className="text-swiss-body text-gray-600">
                      KI-gestützte Kampagnenoptimierung
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">ROI Steigerung</span>
                    <span className="font-semibold text-green-600">145%</span>
                  </div>
                  <Progress value={95} className="h-2 roi-bar" />
                  <p className="text-swiss-caption text-gray-500">
                    Präzise Zielgruppenerreichung durch Machine Learning
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sales Card */}
            <Card className="solution-card glass-light border-gray-200 hover:shadow-xl transition-shadow duration-300 ml-16">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="geist text-xl text-gray-900">Verkauf</CardTitle>
                    <CardDescription className="text-swiss-body text-gray-600">
                      Intelligente Lead-Qualifizierung
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-green-600">+89%</span>
                  </div>
                  <Progress value={89} className="h-2 roi-bar" />
                  <p className="text-swiss-caption text-gray-500">
                    Verkaufszyklen verkürzen, Abschlussraten erhöhen
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Guarantees & CTA */}
          <div className="space-y-8">
            {/* Success Metrics */}
            <div className="success-guarantee space-y-6">
              <h3 className="geist text-2xl font-medium text-gray-900 mb-6">
                Ihre Erfolgsgarantie
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-swiss-body text-green-700">Erfolgsgarantie</div>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">DSGVO</div>
                  <div className="text-swiss-body text-blue-700">Konformität</div>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-swiss-body text-purple-700">Support</div>
                </div>
                
                <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">CH</div>
                  <div className="text-swiss-body text-red-700">Server</div>
                </div>
              </div>
            </div>

            {/* Trust Elements */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-swiss-body">Swiss Made AI-Strategien</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-swiss-body">ISO 27001 zertifiziert</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-swiss-body">Ausgezeichnet von Swiss ICT</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="cta-button pt-4">
              <Button 
                size="lg" 
                className="w-full bg-swiss-red-primary hover:bg-swiss-red-secondary text-white font-medium py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Gespräch buchen
              </Button>
              <p className="text-swiss-caption text-gray-500 text-center mt-3">
                Kostenlose 30-minütige Beratung • Keine Verpflichtungen
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-20">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}