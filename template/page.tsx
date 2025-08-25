"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import CostCalculator from "@/components/cost-calculator"
import WorkflowBreakdown from "@/components/workflow-breakdown"
import AiInPractice from "@/components/ai-in-practice"
import LegataFuture from "@/components/legata-future"
import FounderSection from "@/components/founder-section"
import StartNowSection from "@/components/start-now-section"

export default function ShaderShowcase() {
  return (
    <div className="relative">
      <section className="h-screen relative">
        <ShaderBackground>
          <Header />
          <HeroContent />
          <PulsingCircle />
        </ShaderBackground>
      </section>

      <CostCalculator />
      <WorkflowBreakdown />
      <AiInPractice />
      <LegataFuture />
      <FounderSection />
      <StartNowSection />
    </div>
  )
}
