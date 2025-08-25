'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FooterSection() {
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

    // Final CTA animation sequence
    tl.from(".final-headline", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(".ki-transformation", {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".final-cta", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .from(".contact-form", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")
    .from(".footer-links", {
      y: 15,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.1");

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-t from-gray-100 to-white flex flex-col justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <div className="final-headline mb-6">
            <h2 className="geist text-4xl lg:text-6xl font-light text-gray-900 leading-tight mb-4">
              Starten Sie Ihre
            </h2>
          </div>
          
          <div className="ki-transformation mb-12">
            <h2 className="bitter text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
              KI-Transformation.
            </h2>
          </div>

          <div className="final-cta mb-16">
            <Button 
              size="lg" 
              className="bg-swiss-red-primary hover:bg-swiss-red-secondary text-white font-medium py-6 px-12 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Kostenlose Analyse buchen
            </Button>
            <p className="text-swiss-body text-gray-600 mt-4 max-w-md mx-auto">
              30-minütige Beratung • Individuelle KI-Strategie • Keine Verpflichtungen
            </p>
          </div>
        </div>

        {/* Contact Form & Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Quick Contact Form */}
          <Card className="contact-form glass-light border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h3 className="geist text-2xl font-medium text-gray-900 mb-6">
                Sofort-Kontakt
              </h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Ihr Name" 
                      className="mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-700">Unternehmen</Label>
                    <Input 
                      id="company" 
                      placeholder="Firmenname" 
                      className="mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700">E-Mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="ihre@email.ch" 
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700">Telefon (optional)</Label>
                  <Input 
                    id="phone" 
                    placeholder="+41 XX XXX XX XX" 
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-swiss-red-primary hover:bg-swiss-red-secondary text-white font-medium py-3 rounded-xl mt-6"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Nachricht senden
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="contact-form space-y-8">
            <div>
              <h3 className="geist text-2xl font-medium text-gray-900 mb-6">
                Direkter Kontakt
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <p className="text-gray-600">+41 44 XXX XX XX</p>
                    <p className="text-swiss-caption text-gray-500">Mo-Fr, 08:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-Mail</p>
                    <p className="text-gray-600">hello@falx.ch</p>
                    <p className="text-swiss-caption text-gray-500">Antwort innerhalb 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Büro</p>
                    <p className="text-gray-600">Falx GmbH</p>
                    <p className="text-gray-600">8180 Bülach, Schweiz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-4">Warum Falx?</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Swiss Made AI-Strategien</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>DSGVO-konforme Lösungen</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>100% Erfolgsgarantie</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Persönliche Betreuung</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links & Copyright */}
        <div className="footer-links border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-swiss-body text-gray-600 text-center lg:text-left">
              © 2025 Falx GmbH, Bülach
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8">
              <a 
                href="#" 
                className="footer-links text-swiss-body text-gray-600 hover:text-gray-900 transition-colors"
              >
                Impressum
              </a>
              <a 
                href="#" 
                className="footer-links text-swiss-body text-gray-600 hover:text-gray-900 transition-colors"
              >
                Datenschutz
              </a>
              <a 
                href="#" 
                className="footer-links text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Final tagline */}
          <div className="footer-links text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-swiss-caption text-gray-500 italic">
              Made in Zurich • DSGVO konform • Gratis KI-Analyse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}