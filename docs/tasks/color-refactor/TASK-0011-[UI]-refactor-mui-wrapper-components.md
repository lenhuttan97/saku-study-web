# TASK-0011-[UI] Refactor MUI wrapper components

## Overview
Replace hardcoded Tailwind color classes in MUI wrapper components with CSS variables.

## Description
Refactor all MUI wrapper components in src/components/ui/mui/ to use CSS variables instead of hardcoded Tailwind color classes.

## Acceptance Criteria
- [ ] Card.tsx refactored to use CSS variables
- [ ] Progress.tsx refactored to use CSS variables
- [ ] ToggleButton.tsx refactored to use CSS variables
- [ ] Tabs.tsx refactored to use CSS variables
- [ ] Input.tsx refactored to use CSS variables
- [ ] All emerald-*, red-*, orange-*, slate-* classes replaced

## Dependencies
- TASK-0009: Define color design tokens

## Scope
UI

## Priority
Medium

## Estimate
1h

## Status
pending

## Files to Modify

### src/components/ui/mui/Card.tsx
- Replace slate/white backgrounds with CSS variables
- Replace border colors with CSS variables

### src/components/ui/mui/Progress.tsx
- Replace color indicators with CSS variables
- Replace emerald-*, red-*, orange-* status colors

### src/components/ui/mui/ToggleButton.tsx
- Replace hover and active state colors
- Replace slate-* background classes

### src/components/ui/mui/Tabs.tsx
- Replace indicator colors
- Replace text colors

### src/components/ui/mui/Input.tsx
- Replace border colors
- Replace placeholder colors
- Replace focus ring colors
