# TASK-0017: Update Border Radius System

## ID
TASK-0017

## Title
Update Border Radius System

## Description
Replace sharp corners with appropriate radius tokens. Follow the design system's "softness" principle - light mode uses xl for containers, dark mode uses full (9999px) for all interactive elements.

## Feature
Design System Implementation - Border Radius

## Scope
UI

## Priority
Medium

## Estimate
2h

## Status
pending

## Dependencies
- TASK-0015 (Define CSS Color Tokens for Light & Dark Mode)

## Acceptance Criteria

### Light Mode
- [ ] `--radius-xl`: 3rem (24px) - for main containers, large cards
- [ ] `--radius-lg`: 2rem (16px) - for study session cards
- [ ] `--radius-md`: 1.5rem (12px) - for text inputs
- [ ] `--radius-sm`: 0.5rem (8px) - for buttons, small elements

### Dark Mode
- [ ] `--radius-full`: 9999px - for all interactive elements (buttons, inputs, cards)
- [ ] Use full rounding for primary buttons, secondary buttons, inputs

### Component Updates
- [ ] Update button border-radius (primary: xl/full, secondary: full)
- [ ] Update card border-radius (lg for study cards)
- [ ] Update input border-radius (md for text fields, full for dark mode)
- [ ] Update dialog/modal border-radius (xl)

### Verification
- [ ] No 90-degree sharp corners anywhere
- [ ] All interactive elements have at least sm radius

## Implementation Notes

Per the design spec:
- Light mode: Use xl (3rem) for main containers to emphasize "softness"
- Dark mode: Use full (9999px) for all interactive elements
- Never use sharp corners - minimum sm (0.5rem) for any element

## Subtasks

### TASK-0017A: Define Radius CSS Variables (30m)
- Add radius tokens to CSS

### TASK-0017B: Update Button Components (30m)
- Apply appropriate radius to buttons

### TASK-0017C: Update Card & Container Components (30m)
- Apply lg/xl radius to cards

### TASK-0017D: Update Input & Form Components (30m)
- Apply md/full radius to inputs
