# NevaGate Design DNA — Style Reference

**Source:** https://nevagate.anext.dev/  
**Extracted:** 2026-08-23

## Key Design Tokens

- **Colors:**
  - Background: `#06070A` (surface-bg), `#0A0C11` (soft), `#0D0F16` (card)
  - Text: `#F3F5FA` (ink), `#8B93A7` (muted), `#4D5568` (faint)
  - Brand blue: `#3D7FFF` (primary), `#7FAEFF` (secondary)
- **Typography:** Plus Jakarta Sans (single family, weights 400–800)
- **Shapes:** Angled "notch" corners (`clip-path`) instead of rounded corners
- **Elevation:** Glassmorphism (`backdrop-filter: blur(16px)`) for cards and navigation
- **Effects:** Animated gradient text (sweep), dot-grid background, marquee logos, scroll-triggered reveals

## Visual Language

- **Mood:** Futuristic, professional, tech-forward
- **Genre:** AI SaaS landing page
- **Visual Metaphor:** Precision, API gateway, efficiency
- **Composition:** Asymmetric accents (notch, sweep) balanced with centered content

## Motion & Interaction

- **Transitions:** Smooth easing (`cubic-bezier(0.19, 1, 0.22, 1)`) with 300–700ms durations
- **Entrance:** Fade-up (translateY + opacity) on scroll, staggered by element
- **Micro-interactions:** Caret blink, text sweep, pulse ring on CTAs

## Implementation Notes

- Uses Tailwind CSS (CDN) with custom config
- Inline CSS for key animations and clip-paths
- IntersectionObserver for scroll-triggered reveals
- `prefers-reduced-motion` support included

## How to Use This Reference

- Apply color palette and typography to your project
- Adopt the notch clip-path for cards and panels
- Use glassmorphism for elevated elements
- Replicate scroll-reveal animations with IntersectionObserver
- Add subtle gradient sweeps to headlines

The complete structured JSON (design DNA) is saved alongside this file.