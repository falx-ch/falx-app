# S-Tier Landing Page Design Checklist (Falx.ch)

## I. Core Design Philosophy & Strategy

* [ ] **Visitor First:** Prioritize the visitor's understanding, journey, and path to the call-to-action in every design decision.
* [ ] **Meticulous Craft:** Aim for precision, polish, and a premium feel in every UI element and interaction to build immediate authority.
* [ ] **Speed & Performance:** Design for fast load times (**Lighthouse 90+**) and snappy, responsive interactions.
* [ ] **Simplicity & Clarity:** Strive for a clean, uncluttered interface. Ensure the copy is direct, unambiguous, and free of corporate jargon.
* [ ] **Focus & Efficiency:** Help visitors understand the value proposition quickly and guide them to the CTA with minimal friction.
* [ ] **Consistency:** Maintain a uniform design language (colors, typography, spacing, patterns) across the entire page.
* [ ] **Accessibility (WCAG AA+):** Design for inclusivity. Ensure sufficient color contrast (especially white on red), keyboard navigability, and screen reader compatibility.
* [ ] **Opinionated Narrative & Design:** Establish a strong, clear point of view ("breaking patterns") reflected in both the copy and the bold, minimalist aesthetic.

## II. Design System Foundation (Tokens & Core Components)

* [ ] **Locked Color Palette:**
    * [ ] **Primary:** `red-600` (#DC2626) - Used for main CTA, key accents, hover states.
    * [ ] **Neutrals:** Tailwind CSS `gray` scale.
    * [ ] **Backgrounds:** `gray-50` (#f9fafb) for light sections, `white` (#ffffff) for cards, `gray-900` (#111827) for footer/dark sections.
    * [ ] **Text:** `gray-900` (#111827) for primary, `gray-600` (#4b5563) for secondary, `white` (#ffffff) for hero/dark sections.
    * [ ] **Accessibility Check:** All color combinations are verified to meet WCAG AA contrast ratios.
* [ ] **Locked Typographic Scale:**
    * [ ] **Font Families:** **Sans:** Geist, **Serif:** Georgia (accents only), **Mono:** Geist Mono.
    * [ ] **Base Font Size:** `16px` for body text.
    * [ ] **Modular Scale:**
        * [ ] **Hero Headline:** `48px` / `1.2` line-height
        * [ ] **Section Headline (H2):** `36px` / `1.3` line-height
        * [ ] **Sub-headline (H3):** `24px` / `1.4` line-height
        * [ ] **Body (Default):** `16px` / `1.6` line-height
        * [ ] **Caption/Small:** `14px` / `1.5` line-height
* [ ] **Locked Spacing Units:**
    * [ ] **Base Unit:** `1rem` = `16px`.
    * [ ] **Spacing Scale (rem/px):** `0.25/4`, `0.5/8`, `0.75/12`, `1/16`, `1.5/24`, `2/32`, `3/48`, `4/64`. All layout spacing uses this scale.
* [ ] **Locked Border Radii:**
    * [ ] **Small (Buttons, Inputs):** `6px`
    * [ ] **Medium (Cards):** `12px`
* [ ] **Core UI Components (with consistent states: default, hover, active, focus):**
    * [ ] Buttons: Primary (`red-600`), Secondary (white with effects).
    * [ ] Cards: For Philosophy and Focus sections.
    * [ ] Navigation Elements: Glassmorphism sticky header.
    * [ ] Badges: For "Currently Building" and "Open for Business" tags.
    * [ ] Icons: A single, modern, clean icon set (SVG preferred).

## III. Layout, Visual Hierarchy & Structure

* [ ] **Responsive Grid System:** Based on a standard **12-column grid** for predictable responsive behavior.
* [ ] **Strategic White Space:** Ample negative space is used to improve clarity, reduce cognitive load, and create a premium, uncluttered feel.
* [ ] **Clear Visual Hierarchy:** The visitor's eye is guided by the locked-in typographic scale, spacing, and the deliberate flow of sections.
* [ ] **Consistent Alignment:** All elements are consistently aligned to the grid.
* [ ] **Defined Page Structure:**
    * [ ] **Navigation Header:** Sticky, glassmorphism effect. Logo, "About," "Contact," and CTA.
    * [ ] **Hero Section:** Full viewport height, bold red with halftone mesh pattern, clear headline/subheadline, single CTA.
    * [ ] **The Blueprint Section:** Two-column layout showcasing the architectural vision for Legata and core methodology.
    * [ ] **Break the Pattern Section:** Center-aligned, narrative-driven content.
    * [ ] **CTA Section:** High-contrast final call to action.
    * [ ] **Footer:** Three columns with Brand, Connect, Legal info.
* [ ] **Mobile-First Implementation:** The design adapts gracefully to smaller screens, with elements stacking vertically as needed.

## IV. Interaction Design & Animations

* [ ] **Purposeful Micro-interactions:** All animations are subtle and provide clear feedback.
    * [ ] **Standard Duration:** All fast UI animations (hovers, fades) use a consistent `200ms` duration with an `ease-in-out` curve.
    * [ ] **Hover States:** Hover float effect is a `translateY(-8px)` transform.
    * [ ] **Button Effects:** Glow and/or sliding highlight effects are implemented on CTA buttons.
    * [ ] **Card Effects:** A diagonal light sweep "shine" effect is implemented on cards.
* [ ] **Loading States:** A subtle page loader or skeleton for the hero ensures a smooth initial experience.
* [ ] **Transitions:** Smooth fade-up and slide-in animations are used on scroll to reveal sections gracefully, with staggered delays (`200ms`, `400ms`).
* [ ] **Avoid Distraction:** Animations enhance the premium feel and guide the user, not overwhelm or slow down the experience.
* [ ] **Keyboard Navigation:** All interactive elements (nav links, buttons) are keyboard accessible with clear focus states.

## V. Page Section-Specific Design

### A. Navigation & Hero Section

* [ ] Glassmorphism Header: Achieves the desired visual effect while remaining legible and unobtrusive.
* [ ] Bold Hero Impression: The `red-600` background with the white halftone mesh pattern is the key visual hook.
* [ ] Mesh Pattern: Pattern is sophisticated, suggests data/connectivity, and is implemented performantly (SVG or CSS).
* [ ] High-Contrast Typography: Hero text ("Smart systems that scale.") is white, bold, and highly legible against the red background.
* [ ] Interactive Element: A designated, spacious area is reserved for the Unicorn.studio animation, which should respond to mouse movement.
* [ ] Interactive Element States: Define loading, fallback (for disabled JS), and interactive states for the hero animation.

### B. The Blueprint & Narrative Sections

* [ ] **"The Blueprint" Section:** Follows the hero, establishing intellectual authority.
    * [ ] **Two-Column Layout:** A visually balanced layout for the vision and methodology.
    * [ ] **Left Column (The Vision):** Features a stylized, animated architectural diagram of the Legata concept.
    * [ ] **Future-Facing Copy:** Text is confident and forward-looking (e.g., "Next Up: Architecting Legata...").
    * [ ] **Right Column (The Methodology):** Lists core principles (e.g., "Data Over Guesswork").
    * [ ] **Key Positioning Statement:** Includes the line "We don't 'vibe code'—we context engineer."
* [ ] **"Break the Pattern" Section:** Follows "The Blueprint," providing the personal story and motivation.

### C. CTA & Footer Section

* [ ] High-Contrast CTA: The final CTA section uses a `gray-900` gradient or the `red-600` mesh pattern to stand out and drive action.
* [ ] Clear Action: The button text ("Schedule Discovery Call") is unambiguous, with consideration for a higher-value frame like "Book a Strategy Session."
* [ ] Organized Footer: The dark footer is clean, well-organized, and contains all necessary legal and contact information and copyright: `© 2025 Falx GmbH · Zürich, Switzerland`.
* [ ] Functional Legal Links: Verify that the `Impressum` and `Privacy Policy` links point to the correct, legally compliant content.

## VI. CSS & Styling Architecture

* [ ] **Utility-First CSS:** **Tailwind CSS** is the exclusive styling framework.
* [ ] **Centralized Design Tokens:** All defined colors, fonts, spacing, and radii are configured in `tailwind.config.js` to ensure system-wide consistency.
* [ ] **Maintainability & Readability:** Custom CSS is minimal. `@apply` is used sparingly for reusable component classes if needed.
* [ ] **Performance:** CSS is purged of unused styles in the production build. The hero animation is loaded asynchronously.

## VII. General Best Practices

* [ ] Iterative Design: Review the design on real devices and be open to tweaking spacing, typography, and animations for the best feel.
* [ ] Clear Information Architecture: The single-page layout flows logically from awareness (Hero) to consideration (Blueprint) to action (CTA).
* [ ] Responsive Design: Verify the landing page is fully functional and looks premium on all target device sizes.
* [ ] Documentation: Briefly document key decisions, especially regarding animation timings or complex CSS, for future reference.
* [ ] SEO & Metadata: Implement page title, meta description, and other relevant tags to ensure search engine visibility.
* [ ] Favicon & Social Images: Create and link a high-resolution favicon and Open Graph (OG) images for professional branding when sharing links.