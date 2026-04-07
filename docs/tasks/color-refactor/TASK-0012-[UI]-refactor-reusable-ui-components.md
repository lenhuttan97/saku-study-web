# TASK-0012-[UI] Refactor reusable UI components

## Overview
Replace hardcoded Tailwind color classes in all reusable UI components with CSS variables.

## Description
Refactor all components in src/components/ui/reusable/ to use CSS variables instead of hardcoded Tailwind color classes. This is the largest task with ~18 files.

## Acceptance Criteria
- [ ] All reusable UI components use CSS variables
- [ ] No hardcoded slate-*, emerald-*, red-*, orange-* classes remain
- [ ] Components maintain same visual appearance after refactoring

## Dependencies
- TASK-0009: Define color design tokens

## Scope
UI

## Priority
Medium

## Estimate
3h

## Status
pending

## Files to Modify

### Course-related components
- CourseTasksList.tsx
- CourseScheduleGrid.tsx
- MaterialItem.tsx
- CourseHeader.tsx
- CourseCard.tsx

### Task-related components
- TaskCard.tsx
- KanbanColumn.tsx
- TodoItem.tsx

### Schedule-related components
- ScheduleItem.tsx
- ScheduleGrid.tsx
- ScheduleEvent.tsx

### Dashboard widgets
- StreakWidget.tsx
- FocusWidget.tsx
- QuoteCard.tsx

### Settings-related
- SettingsSidebar.tsx

### Auth components
- SocialLoginButtons.tsx
- AuthFormHeader.tsx

### Common components
- SearchInput.tsx

## Implementation Notes
- Prioritize based on frequency of use
- Test each component group after refactoring
- Track which components have been updated
