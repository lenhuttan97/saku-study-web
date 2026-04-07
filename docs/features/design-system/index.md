# FT-010: Design System & UI Refactoring

## Overview

Implement the **"Serene Sakura"** design system across the entire application. This feature focuses on creating a premium, sanctuary-like experience with soft colors, glassmorphism effects, and editorial typography.

## Design Specifications

### Light Mode: "Editorial Serenity"
- **Background**: `#fef8fa` (soft pink)
- **Surface Container Low**: `#f8f2f4` (light pink)
- **Surface Container Lowest**: `#ffffff` (white)
- **Secondary Container**: `#bee1ff` (soft blue)
- **Primary**: `#795465` (dusty rose)
- **Primary Container**: `#f8c8dc` (soft pink)
- **Signature Gradient**: `#795465` → `#f8c8dc` (135deg)

### Dark Mode: "The Ethereal Sanctuary"
- **Background**: `#081425` (deep navy)
- **Surface**: Navy/Slate foundation
- **Primary**: `#ffedf2` → `#f8c8dc` gradient
- **Shadow**: Tinted with on-surface color

## Key Design Principles

### 1. No-Line Rule
Boundaries between sections must be defined exclusively through **background shifts**, not 1px borders.

### 2. Tonal Surface Hierarchy
| Level | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Background | `#fef8fa` | `#081425` | Base canvas |
| Surface Low | `#f8f2f4` | (dark variant) | Sidebars, secondary areas |
| Surface Lowest | `#ffffff` | (dark variant) | Cards, elevated elements |

### 3. Glassmorphism
- **Light Mode**: `surface-container-lowest` at 70% opacity + 24px backdrop-blur
- **Dark Mode**: `surface-variant` at 60% opacity + 24px backdrop-blur

### 4. Sanctuary Shadow
- **Light**: `0px 10px 40px rgba(121, 84, 101, 0.08)` (primary-tinted)
- **Dark**: 40px blur, 0 spread, 6% opacity (on-surface-tinted)

### 5. Border Radius
- **Light Mode**: `xl` (3rem) for containers
- **Dark Mode**: `full` (9999px) for all interactive elements

## Tasks

### Phase 1: Color Refactoring (TASK-0009 → TASK-0014)
Replace all hardcoded Tailwind color classes with CSS variables.

| Task | Description | Estimate | Status |
|------|-------------|----------|--------|
| TASK-0009 | Define color design tokens | 1h | pending |
| TASK-0010 | Refactor layout components | 1h | pending |
| TASK-0011 | Refactor MUI wrapper components | 1h | pending |
| TASK-0012 | Refactor reusable UI components | 3h | pending |
| TASK-0013 | Refactor page components | 4h | pending |
| TASK-0014 | Verify and test color consistency | 1h | pending |

### Phase 2: Design System Implementation (TASK-0015 → TASK-0022)
Implement the full design system based on serene_sakura specs.

| Task | Description | Estimate | Status |
|------|-------------|----------|--------|
| TASK-0015 | Define CSS Color Tokens for Light & Dark Mode | 2h | pending |
| TASK-0016 | Remove 1px Borders - Implement No-Line Rule | 3h | pending |
| TASK-0017 | Update Border Radius System | 2h | pending |
| TASK-0018 | Implement Glassmorphism Components | 2h | pending |
| TASK-0019 | Update Shadow System | 1h | pending |
| TASK-0020 | Implement Dark Mode Toggle | 2h | pending |
| TASK-0021 | Typography Enhancement | 1h | pending |
| TASK-0022 | Verify Design System Implementation | 2h | pending |

## Files to Modify

### Layout Components
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/TopNav.tsx`
- `src/components/layout/Layout.tsx`

### MUI Components
- `src/components/ui/mui/Card.tsx`
- `src/components/ui/mui/Button.tsx`
- `src/components/ui/mui/Input.tsx`
- `src/components/ui/mui/Tabs.tsx`
- `src/components/ui/mui/Dialog.tsx`

### Reusable Components
- `src/components/ui/reusable/*.tsx` (18 files)

### Pages
- `src/pages/*.tsx` (9 files)

### Core Files
- `src/index.css` (main styles)
- `src/theme/muiTheme.ts` (MUI theme)

## Design Reference

- [Light Mode Spec](../design-mockup/serene_sakura/DESIGN.md)
- [Dark Mode Spec](../design-mockup/serene_sakura_night/DESIGN.md)

## GitHub Milestone

[Design System & UI Refactoring](https://github.com/lenhuttan97/saku-study-web/milestone/15)

## Total Estimate

**26 hours** (14 tasks)
