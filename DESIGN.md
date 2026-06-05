# Polynovea Design System

## Color Palette (OKLCH)

### Neutrals
- **bg-primary**: #0A0A0A (deep black with violet tint)
- **bg-card**: #18181B (soft graphite for card surfaces)
- **border-muted**: #27272A (subtle slate borders)
- **text-primary**: #F5F5F5 (soft white)
- **text-secondary**: #A1A1AA (muted gray)
- **text-disabled**: #71717A (disabled state)

### Accents
- **accent-intelligence**: #7C3AED (deep violet, primary action)
- **accent-authority**: #E6D3A3 (champagne gold, secondary highlight)
- **accent-intelligence-glow**: rgba(124, 58, 237, 0.3) (violet with transparency for glow effects)

## Typography

### Fonts
- **Display**: Clash Display (600 weight for headings, premium feel)
- **Body**: Inter (400 weight, readable, modern)

### Scale
- **Display Large**: clamp(2.5rem, 8vw, 4rem) — Hero headlines
- **Display Medium**: clamp(1.875rem, 5vw, 2.5rem) — Section headings
- **Heading**: clamp(1.25rem, 3vw, 1.5rem) — Subheadings
- **Body**: 1rem (16px) — Primary copy
- **Body Small**: 0.875rem (14px) — Secondary copy
- **Label**: 0.75rem (12px) — UI labels, all-caps

### Line Height
- Headings: 1.1
- Body: 1.5-1.65

## Spacing
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Motion
- **duration-fast**: 0.2s
- **duration-default**: 0.35s
- **ease-out-expo**: cubic-bezier(0.16, 1, 0.3, 1)

## Components

### Cards
- Background: rgba(24, 24, 27, 0.2)
- Backdrop-filter: blur(32px)
- Border: 1px solid rgba(124, 58, 237, 0.3)
- Inset highlight: 0 1px 1px rgba(255, 255, 255, 0.08)
- On hover: border brightens, glow appears

### Badges
- **Status badges**: Colored dots + label (active: green, in-progress: violet, planned: gold)
- **Tag badges**: Outlined, muted text

## Elevation
- Section backgrounds: rgba(18, 18, 18, 0.5) with semi-transparency for gradient mesh visibility
- Cards: Layered above sections with glassmorphism
- Overlays: No shadow stacks; use opacity and blur instead

## Responsive Breakpoints
- **Mobile**: < 640px (single column, reduced animations)
- **Tablet**: 640px - 1024px (2 columns, optimized spacing)
- **Desktop**: > 1024px (full layout, all animations)
