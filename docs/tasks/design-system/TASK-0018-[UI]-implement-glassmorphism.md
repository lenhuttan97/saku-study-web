# TASK-0018: Implement Glassmorphism Components

## ID
TASK-0018

## Title
Implement Glassmorphism Components

## Description
Create glassmorphism utility classes for floating elements. Apply to bottom navigation dock, modals, sidebar, and floating menus with 60-80% opacity and 24px backdrop-blur.

## Feature
Design System Implementation - Glassmorphism

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

### Glassmorphism Utility Classes
- [ ] Create `.glass` utility class (70% opacity, 24px blur)
- [ ] Create `.glass-modal` utility class (60-70% opacity, 24px blur)
- [ ] Create `.glass-dock` utility class (70-80% opacity, 24px blur)

### Bottom Navigation Dock
- [ ] Apply glass-dock style to bottom navigation
- [ ] Ensure 70-80% opacity with backdrop-blur
- [ ] Use round-full corners in dark mode

### Sidebar & TopNav
- [ ] Apply glass effect to Sidebar (floating style)
- [ ] Apply glass effect to TopNav

### Modals & Floating Menus
- [ ] Apply glass-modal to dialog components
- [ ] Apply glass effect to dropdown menus
- [ ] Ensure proper z-index stacking

### Responsive Behavior
- [ ] Glass effect works on all screen sizes
- [ ] Backdrop blur falls back gracefully if not supported

## Implementation Notes

Per the design spec:
- Floating elements use `surface-container-lowest` color at 70% opacity with 24px backdrop-blur
- Bottom dock uses 80% opacity + blur
- Modals use 60-70% opacity + blur
- The "Night Sanctuary" colors should bleed through the glass effect

## Subtasks

### TASK-0018A: Create Glassmorphism CSS Classes (30m)
- Define glass utility classes in CSS

### TASK-0018B: Apply Glass to Navigation Dock (30m)
- Update bottom navigation with glass effect

### TASK-0018C: Apply Glass to Sidebar & TopNav (30m)
- Add glass effect to layout components

### TASK-0018D: Apply Glass to Modals & Menus (30m)
- Update modal and dropdown components
