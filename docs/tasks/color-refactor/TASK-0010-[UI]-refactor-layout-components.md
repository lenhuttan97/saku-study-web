# TASK-0010-[UI] Refactor layout components

## Overview
Replace hardcoded Tailwind color classes (slate-*) in layout components with CSS variables defined in TASK-0009.

## Description
Refactor the layout shell components (Sidebar, TopNav, Layout) to use the new CSS variables instead of hardcoded Tailwind color classes. This includes ~43 instances across three files.

## Acceptance Criteria
- [ ] All slate-* classes in Sidebar.tsx replaced with CSS variables (~13 instances)
- [ ] All slate-* classes in TopNav.tsx replaced with CSS variables (~15 instances)
- [ ] All slate-* classes in Layout.tsx replaced with CSS variables
- [ ] Use Tailwind arbitrary value syntax `bg-[var(--color-bg-surface)]` or extend Tailwind theme
- [ ] Visual verification that components look the same after refactoring

## Dependencies
- TASK-0009: Define color design tokens

## Scope
UI

## Priority
High

## Estimate
1h

## Status
pending

## Files to Modify

### src/components/layout/Sidebar.tsx (~13 instances)
- slate-900, slate-800, slate-700, slate-600, slate-500, slate-400, slate-200, slate-100, slate-50

### src/components/layout/TopNav.tsx (~15 instances)
- slate-900, slate-800, slate-700, slate-600, slate-500, slate-400, slate-300, slate-200, slate-100

### src/components/layout/Layout.tsx
- slate-50, white backgrounds

## Implementation Notes
- Use Tailwind arbitrary value syntax: `className="bg-[var(--color-bg-surface)]"`
- Or configure Tailwind theme in src/index.css to extend colors
- Test in both light and dark mode if applicable
