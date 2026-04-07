# TASK-0015: Define CSS Color Tokens for Light & Dark Mode

## ID
TASK-0015

## Title
Define CSS Color Tokens for Light & Dark Mode

## Description
Create comprehensive CSS variables for both light and dark mode. This task implements the color system from the "Sanctuary" design system spec, establishing the foundation for all other design system tasks.

## Feature
Design System Implementation - CSS Token Architecture

## Scope
UI

## Priority
High

## Estimate
2h

## Status
pending

## Dependencies
- TASK-0014 (Verify and test color consistency) - must be completed first

## Acceptance Criteria

### Light Mode Tokens
- [ ] `--color-bg`: #fef8fa (base canvas)
- [ ] `--color-surface-low`: #f8f2f4 (sidebar, secondary areas)
- [ ] `--color-surface-lowest`: #ffffff (hero cards, active items)
- [ ] `--color-surface`: #fef8fa (main surface)
- [ ] `--color-surface-high`: #f5eef2
- [ ] `--color-surface-highest`: #ffffff
- [ ] `--color-secondary-container`: #bee1ff (accent callouts)
- [ ] `--color-primary`: #795465 (primary brand)
- [ ] `--color-primary-container`: #f8c8dc
- [ ] `--color-on-primary`: #ffffff
- [ ] `--color-on-primary-container`: #2d1520
- [ ] `--color-on-surface`: #1d1b1d
- [ ] `--color-on-surface-variant`: #49454f

### Dark Mode Tokens
- [ ] `--color-bg-dark`: Night Sanctuary base (#081425)
- [ ] `--color-surface-dark`: #0d1e36
- [ ] `--color-surface-low-dark`: #131e35
- [ ] `--color-surface-lowest-dark`: #1a2a47
- [ ] `--color-surface-high-dark`: #1e3350
- [ ] `--color-surface-highest-dark`: #243d5e
- [ ] `--color-primary-dark`: #ffedf2 (light pink for dark mode)
- [ ] `--color-primary-container-dark`: #795465
- [ ] `--color-on-primary-dark`: #2d1520
- [ ] `--color-on-surface-dark`: #e6e1e5
- [ ] `--color-secondary-container-dark`: #4a6fa5

### Gradient Definitions
- [ ] `--color-gradient-primary`: linear-gradient(135deg, #795465, #f8c8dc)
- [ ] `--color-gradient-secondary`: linear-gradient(135deg, #ffedf2, #f8c8dc)

### Semantic Tokens
- [ ] `--color-ghost-border`: rgba(121, 84, 101, 0.15) (for accessibility borders)
- [ ] `--color-glass-bg`: rgba(255, 255, 255, 0.7) (glassmorphism base)
- [ ] `--color-glass-bg-dark`: rgba(13, 30, 54, 0.7)

### Implementation Notes
1. Add all tokens to `src/index.css` under `:root` (light mode) and `[data-theme="dark"]` (dark mode)
2. Use the existing MUI theme as reference for token values
3. Ensure tokens are CSS custom properties for runtime theme switching

## Subtasks

### TASK-0015A: Define Light Mode Base Colors (30m)
- Add background, surface, and primary tokens to :root

### TASK-0015B: Define Dark Mode Colors (30m)
- Add all dark mode equivalents under [data-theme="dark"]

### TASK-0015C: Define Gradient & Semantic Tokens (30m)
- Add gradient definitions and semantic tokens

### TASK-0015D: Create Theme Toggle Helper (30m)
- Ensure CSS variables can be switched via data attribute
