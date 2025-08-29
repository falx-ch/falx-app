"use client"

import { forwardRef } from "react"
import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'

interface WorkflowToolProps {
  icon: string
  title: string
  subtitle: string
  color: 'purple' | 'red' | 'emerald' | 'amber' | 'cyan'
  isActive?: boolean
  onClick?: () => void
  className?: string
}

const colorClasses = {
  purple: {
    bg: 'bg-purple-500/90',
    glow: 'shadow-purple-500/30',
    gradient: 'from-purple-600/20 to-purple-400/10'
  },
  red: {
    bg: 'bg-red-500/90', 
    glow: 'shadow-red-500/30',
    gradient: 'from-red-600/20 to-red-400/10'
  },
  emerald: {
    bg: 'bg-emerald-500/90',
    glow: 'shadow-emerald-500/30', 
    gradient: 'from-emerald-600/20 to-emerald-400/10'
  },
  amber: {
    bg: 'bg-amber-500/90',
    glow: 'shadow-amber-500/30',
    gradient: 'from-amber-600/20 to-amber-400/10'
  },
  cyan: {
    bg: 'bg-cyan-500/90',
    glow: 'shadow-cyan-500/30',
    gradient: 'from-cyan-600/20 to-cyan-400/10'
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
            "w-28 h-16 sm:w-32 sm:h-18 md:w-36 md:h-20",
            isActive 
              ? `border-white/40 ${colors.glow} shadow-lg` 
              : "border-white/20 hover:border-white/30"
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
          
          {/* Glow effect for active state */}
          {isActive && (
            <div 
              className={cn(
                "absolute inset-0 rounded-2xl opacity-60 blur-xl transition-opacity duration-300",
                colors.bg
              )}
            />
          )}
          
          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full p-2 space-y-1">
            <div className={cn(
              "text-lg sm:text-xl transition-all duration-300",
              isActive ? "scale-110 filter drop-shadow-sm" : ""
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