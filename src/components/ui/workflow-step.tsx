"use client"

import { forwardRef } from "react"
import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'

interface WorkflowStepProps {
  icon: string
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success'
  isActive?: boolean
  isCompleted?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

const sizeClasses = {
  sm: "w-16 h-16 sm:w-18 sm:h-18",
  md: "w-20 h-20 sm:w-24 sm:h-24", 
  lg: "w-28 h-28 sm:w-32 sm:h-32"
}

const variantClasses = {
  primary: {
    bg: 'bg-blue-500/90',
    glow: 'shadow-blue-500/30',
    gradient: 'from-blue-600/30 to-purple-500/20'
  },
  secondary: {
    bg: 'bg-purple-500/90',
    glow: 'shadow-purple-500/30',
    gradient: 'from-purple-600/30 to-blue-500/20'
  },
  success: {
    bg: 'bg-emerald-500/90',
    glow: 'shadow-emerald-500/30',
    gradient: 'from-emerald-600/30 to-cyan-500/20'
  }
}

export const WorkflowStep = forwardRef<HTMLDivElement, WorkflowStepProps>(
  ({ 
    icon, 
    title, 
    subtitle, 
    size = 'md',
    variant = 'primary',
    isActive = false,
    isCompleted = false,
    onClick, 
    className,
    children
  }, ref) => {
    const colors = variantClasses[variant]
    
    return (
      <div
        ref={ref}
        className={cn(
          "workflow-step select-none transition-all duration-300",
          onClick && "cursor-pointer",
          "transform-gpu will-change-transform relative",
          className
        )}
        onClick={onClick}
      >
        {/* Main step circle */}
        <GlassCard
          intensity="medium"
          hover="lift"
          size="sm"
          className={cn(
            "relative overflow-hidden rounded-full border transition-all duration-300 flex items-center justify-center",
            sizeClasses[size],
            isActive 
              ? `border-white/50 ${colors.glow} shadow-xl` 
              : "border-white/25 hover:border-white/35",
            isCompleted && "border-emerald-400/60 shadow-emerald-400/30 shadow-lg"
          )}
        >
          {/* Background gradient */}
          <div 
            className={cn(
              "absolute inset-0 opacity-30 rounded-full transition-opacity duration-300",
              `bg-gradient-to-br ${colors.gradient}`,
              isActive && "opacity-60",
              isCompleted && "bg-gradient-to-br from-emerald-600/40 to-cyan-500/30 opacity-70"
            )}
          />
          
          {/* Active glow effect */}
          {isActive && (
            <div 
              className={cn(
                "absolute inset-0 rounded-full opacity-40 blur-lg transition-opacity duration-300",
                colors.bg
              )}
            />
          )}

          {/* Completion checkmark overlay */}
          {isCompleted && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 rounded-full">
              <div className="text-emerald-300 text-lg font-bold">✓</div>
            </div>
          )}
          
          {/* Icon */}
          <div className={cn(
            "relative text-2xl sm:text-3xl transition-all duration-300 z-10",
            isActive ? "scale-110 filter drop-shadow-lg" : "",
            isCompleted ? "opacity-60" : "opacity-90"
          )}>
            {!isCompleted ? icon : "✓"}
          </div>
        </GlassCard>
        
        {/* Label */}
        {title && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
            <div className={cn(
              "text-xs font-medium text-white/90 leading-tight transition-colors duration-300",
              isActive && "text-white scale-105"
            )}>
              {title}
            </div>
            {subtitle && (
              <div className={cn(
                "text-xs text-white/60 font-light leading-tight transition-colors duration-300",
                isActive && "text-white/80"
              )}>
                {subtitle}
              </div>
            )}
          </div>
        )}

        {/* Children for additional content */}
        {children}
      </div>
    )
  }
)

WorkflowStep.displayName = "WorkflowStep"