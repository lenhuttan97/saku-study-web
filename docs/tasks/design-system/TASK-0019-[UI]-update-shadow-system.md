# TASK-0019: Update Shadow System

## ID
TASK-0019

## Title
Update Shadow System

## Description
Replace default shadows with "Sanctuary Shadow" - a diffused, tinted shadow that integrates with the design system rather than using default black shadows.

## Feature
Design System Implementation - Shadow System

## Scope
UI

## Priority
Medium

## Estimate
1h

## Status
pending

## Dependencies
- TASK-0015 (Define CSS Color Tokens for Light & Dark Mode)

## Acceptance Criteria

### Light Mode Shadows
- [ ] Create `--shadow-sanctuary`: 0px 10px 40px rgba(121, 84, 101, 0.08)
- [ ] Use tinted primary color for shadow (not black)
- [ ] Apply to elevated cards, FABs, floating menus

### Dark Mode Shadows
- [ ] Create `--shadow-sanctuary-dark`: 0px 40px 60px rgba(0, 0, 0, 0.06)
- [ ] 40px blur, 0 spread, 6% opacity
- [ ] Use on-surface tint (not pure black)

### Component Updates
- [ ] Update elevated card shadows
- [ ] Update FAB shadows
- [ ] Update floating menu/dropdown shadows
- [ ] Update modal shadows

### Implementation Notes
- Per the design spec: "Sanctuary Shadow" uses diffused blur
- Light mode: 40px blur, tinted with primary
- Dark mode: 40px blur, 0 spread, 6% opacity tinted with on-surface
- This should feel like a "soft lift" rather than harsh drop shadow

## Subtasks

### TASK-0019A: Define Sanctuary Shadow CSS Variables (15m)
- Add shadow tokens to CSS

### TASK-0019B: Apply Shadows to Elevated Components (25m)
- Update cards, FABs, menus

### TASK-0019C: Verify Shadow Consistency (20m)
- Check all elevated elements use sanctuary shadow
