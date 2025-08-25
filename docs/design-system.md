# Design System Documentation

This document outlines the component usage standards for the Falx application to ensure consistency and proper shadcn/ui integration.

## Component Standards

### Buttons
**✅ ALWAYS use shadcn Button component**

```tsx
import { Button } from '@/components/ui/button'

// Good - Using shadcn Button
<Button className="custom-styles">Click me</Button>
<Button variant="outline">Outline button</Button>

// Bad - Custom button element
<button className="custom-styles">Click me</button>
```

**Available variants:**
- `default` - Primary button style
- `destructive` - For dangerous actions
- `outline` - Outlined button
- `secondary` - Secondary actions
- `ghost` - Minimal button style
- `link` - Link-styled button

**Global Animation System:**
- All scroll animations are handled globally via `@/lib/animations.ts`
- Simply add `className="animate-on-scroll"` to any element for scroll animations
- No need to import or setup GSAP in individual components
- Additional animation classes: `fade-in-up` for headers and content

### Cards
**✅ Use GlassCard for glass morphism effects, shadcn Card for standard cards**

The `GlassCard` component now extends shadcn's `Card` component:

```tsx
import { GlassCard } from '@/components/ui/glass-card'
import { Card } from '@/components/ui/card'

// Good - Glass morphism effects
<GlassCard variant="default" intensity="medium" hover="lift">
  Glass content
</GlassCard>

// Good - Standard card usage
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**GlassCard variants:**
- `default` - Standard glass card
- `interactive` - For GSAP animations (opacity-0 initially)
- `solution` - Solution cards with max-width constraints
- `modal` - Modal-style cards
- `badge` - Badge-style glass elements

### Badges
**✅ Use shadcn Badge for simple badges, GlassCard variant="badge" for glass badges**

```tsx
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'

// Good - Simple badges
<Badge variant="outline">Status</Badge>

// Good - Glass morphism badges (like Swiss flag badge)
<GlassCard variant="badge">
  <span>Made in Zurich</span>
</GlassCard>
```

### Form Elements
**✅ Use shadcn Input and Label components when forms are needed**

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Good - Consistent form styling
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
</div>
```

*Note: Currently no forms exist in this landing page application.*

## Component Architecture

### Glass Morphism System
The `GlassCard` component provides a consistent glass morphism effect system:

**Intensity levels:**
- `light` - Subtle glass effect (bg-white/5, backdrop-blur-sm)
- `medium` - Moderate glass effect (bg-white/8, backdrop-blur-md) 
- `strong` - Prominent glass effect (bg-white/10, backdrop-blur-xl)

**Hover effects:**
- `none` - No hover effects
- `lift` - Lifts with scale and shadow
- `glow` - Subtle glow effect

### Consistent Styling Patterns

1. **Animation Preservation**: When refactoring components, always preserve:
   - GSAP animation classes
   - CSS transitions
   - Transform effects
   - Custom timing functions

2. **Class Composition**: Use `cn()` utility for class merging:
   ```tsx
   className={cn("base-classes", conditionalClasses, className)}
   ```

3. **Responsive Design**: Maintain responsive utilities:
   ```tsx
   className="px-4 lg:px-8 py-2 lg:py-4"
   ```

## Migration Checklist

When adding new components, ensure:

- [ ] Buttons use shadcn `Button` component
- [ ] Cards use appropriate card component (`Card` or `GlassCard`)
- [ ] Forms use shadcn `Input` and `Label` components
- [ ] Badges use appropriate badge component (`Badge` or `GlassCard` variant)
- [ ] All animations and transitions are preserved
- [ ] Responsive classes are maintained
- [ ] Accessibility attributes are included

## Testing

After component updates:

1. **Visual Testing**: Verify all components render correctly
2. **Animation Testing**: Ensure GSAP animations still work
3. **Responsive Testing**: Test across different screen sizes
4. **Accessibility Testing**: Check keyboard navigation and screen readers

## Future Considerations

- Monitor for new shadcn/ui components that could replace custom implementations
- Regularly audit for consistent component usage
- Update this documentation when new patterns emerge