"use client"

import { forwardRef } from "react"
import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'

interface WorkflowToolProps {
  icon: string
  title: string
  subtitle: string
  color: 'red'
  isActive?: boolean
  onClick?: () => void
  className?: string
}

const colorClasses = {
  red: {
    bg: 'bg-red-600/20',
    glow: '', // Removed red shadow glow
    gradient: 'from-red-600/10 to-red-500/5'
  }
}

export const WorkflowTool = forwardRef<HTMLDivElement, WorkflowToolProps>(
  ({ icon, title, subtitle, color, isActive = false, onClick, className }, ref) => {
    const colors = colorClasses[color]
    
    return (
      <div
        ref={ref}
        className={cn(
          "workflow-tool cursor-pointer select-none transition-all duration-300",
          "transform-gpu will-change-transform",
          className
        )}
        onClick={onClick}
      >
        <GlassCard
          intensity="medium"
          hover="lift"
          size="sm"
          className={cn(
            "relative overflow-hidden rounded-2xl border transition-all duration-300",
            "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
            isActive 
              ? "border-white/25" 
              : "border-white/15"
          )}
        >
          {/* Background gradient */}
          <div 
            className={cn(
              "absolute inset-0 opacity-20 rounded-2xl transition-opacity duration-300",
              `bg-gradient-to-br ${colors.gradient}`,
              isActive && "opacity-40"
            )}
          />
          
          
          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full p-2 space-y-1">
            <div className={cn(
              "text-lg sm:text-xl transition-all duration-300",
              isActive ? "scale-105" : ""
            )}>
              {icon}
            </div>
            <div className="text-center">
              <div className={cn(
                "text-xs font-medium text-white/90 leading-tight transition-colors duration-300",
                isActive && "text-white"
              )}>
                {title}
              </div>
              <div className={cn(
                "text-xs text-white/60 font-light leading-tight transition-colors duration-300",
                isActive && "text-white/80"
              )}>
                {subtitle}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    )
  }
)

WorkflowTool.displayName = "WorkflowTool"