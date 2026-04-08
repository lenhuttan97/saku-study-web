# TASK-0023: Apply Serene Sakura Theme from Design Mockup

**Feature**: Design System  
**Status**: pending  
**Estimate**: 4h  
**Priority**: High  
**Milestone**: Design System (Milestone 15) - [GitHub Milestone](https://github.com/lenhuttan97/saku-study-web/milestone/15)

## Description

Apply the complete "Serene Sakura" design system from `/design-mockup/` to replace the current color palette. Currently, the codebase uses brand colors (`#7C3AED`, `#EC4899`, `#3B82F6`) while the design mockup specifies a completely different palette centered around dusty pink/mauve.

## Problem

- **Current Colors**: `#7C3AED` (purple), `#EC4899` (pink), `#3B82F6` (blue)
- **Design Mockup Colors**: `#795465` (dusty rose), `#f8c8dc` (pink), `#bee1ff` (light blue), `#5e5f56` (olive)
- **Mismatch**: Full theme implementation needed

## Requirements

### 1. Update Tailwind CSS Colors (src/index.css)

Replace current brand colors with Serene Sakura palette:

```css
/* Current (to be removed) */
--color-brand-purple: #7C3AED;
--color-brand-pink: #EC4899;
--color-brand-blue: #3B82F6;
--color-bg-main: #FDF8FF;

/* New Serene Sakura */
--color-primary: #795465;
--color-primary-container: #f8c8dc;
--color-secondary: #40627b;
--color-secondary-container: #bee1ff;
--color-tertiary: #5e5f56;
--color-tertiary-container: #d6d6ca;
--color-surface: #fef8fa;
--color-surface-low: #f8f2f4;
--color-surface-lowest: #ffffff;
--color-on-surface: #1d1b1d;
--color-on-surface-variant: #4f4448;
--color-outline: #817478;
--color-outline-variant: #d2c3c7;
```

### 2. Update MUI Theme (src/theme/muiTheme.ts)

Update MUI palette to match:

```typescript
// Current (to be replaced)
const BRAND_PURPLE = '#7C3AED';
const BRAND_PINK = '#EC4899';
const BRAND_BLUE = '#3B82F6';

// New
const PRIMARY = '#795465';
const PRIMARY_CONTAINER = '#f8c8dc';
const SECONDARY = '#40627b';
const SECONDARY_CONTAINER = '#bee1ff';
const TERTIARY = '#5e5f56';
const TERTIARY_CONTAINER = '#d6d6ca';
const SURFACE = '#fef8fa';
const SURFACE_LOW = '#f8f2f4';
const SURFACE_LOWEST = '#ffffff';
```

### 3. Add Signature Gradient

Add to Tailwind CSS:

```css
.signature-gradient {
  background: linear-gradient(135deg, #795465 0%, #f8c8dc 100%);
}
```

### 4. Update All Components

Find and replace all hardcoded colors across:

- `src/components/layout/` (Sidebar, TopNav, Layout)
- `src/components/ui/` (all 16 components)
- `src/pages/` (all 9 pages)

### 5. Reference Files

- Design System Spec: `/design-mockup/serene_sakura/DESIGN.md`
- Dark Mode Spec: `/design-mockup/serene_sakura_night/DESIGN.md`
- Mockup Analysis: `/docs/reports/design-mockup-analysis.md`

## Dependencies

- This task should run BEFORE TASK-0015 (Define CSS Color Tokens)
- This task ensures the codebase is ready for full design system implementation

## Acceptance Criteria

- [ ] src/index.css uses Serene Sakura color tokens
- [ ] src/theme/muiTheme.ts uses Serene Sakura palette
- [ ] signature-gradient class is available
- [ ] All components use new colors (verify no #7C3AED, #EC4899 remaining)
- [ ] Dev server shows correct new color scheme