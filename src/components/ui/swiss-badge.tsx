import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface SwissBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SwissBadge = forwardRef<HTMLDivElement, SwissBadgeProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Minimal glass effect that hugs content
        "inline-block rounded-full backdrop-blur-sm bg-white/5 border border-white/10 w-fit",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

SwissBadge.displayName = "SwissBadge"

export { SwissBadge }