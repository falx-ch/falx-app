import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'solution' | 'modal' | 'badge'
  intensity?: 'light' | 'medium' | 'strong'  // Glass effect strength
  hover?: 'none' | 'lift' | 'glow'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({
  variant = 'default',
  intensity = 'light',
  hover = 'none', 
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Base glass effect
        "backdrop-blur-sm border transition-all duration-300",
        
        // Background opacity by intensity
        {
          "bg-white/5": intensity === 'light',
          "bg-white/8": intensity === 'medium', 
          "bg-white/10": intensity === 'strong',
        },
        
        // Border by intensity
        {
          "border-white/10": intensity === 'light',
          "border-white/15": intensity === 'medium',
          "border-white/20": intensity === 'strong',
        },
        
        // Backdrop blur by intensity
        {
          "backdrop-blur-sm": intensity === 'light',
          "backdrop-blur-md": intensity === 'medium',
          "backdrop-blur-xl": intensity === 'strong',
        },
        
        // Size variants
        {
          "rounded-lg p-3": size === 'sm',
          "rounded-2xl p-4 lg:p-6": size === 'md',
          "rounded-2xl p-6 lg:p-8": size === 'lg', 
          "rounded-3xl p-8": size === 'xl',
        },
        
        // Hover effects
        {
          "hover:bg-white/12 hover:border-white/25 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]": hover === 'lift',
          "hover:bg-white/8 hover:border-white/20": hover === 'glow',
        },
        
        // Special variants
        {
          "cursor-pointer opacity-0": variant === 'interactive', // For GSAP animations
          "max-w-sm mx-auto lg:mx-0 lg:max-w-md": variant === 'solution',
          "max-w-lg text-center shadow-2xl pointer-events-auto": variant === 'modal',
          "inline-flex items-center px-3 py-1 rounded-full": variant === 'badge',
        },
        
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

GlassCard.displayName = "GlassCard"

export { GlassCard }