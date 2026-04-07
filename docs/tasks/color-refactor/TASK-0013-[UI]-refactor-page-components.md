# TASK-0013-[UI] Refactor page components

## Overview
Replace hardcoded Tailwind color classes in all page components with CSS variables.

## Description
Refactor all pages in src/pages/ to use CSS variables instead of hardcoded Tailwind color classes. This includes ~99+ instances across 9 files.

## Acceptance Criteria
- [ ] Settings.tsx refactored (~20 instances)
- [ ] CourseDetail.tsx refactored (~15 instances)
- [ ] Courses.tsx refactored (~5 instances)
- [ ] Dashboard.tsx refactored (~10 instances)
- [ ] Tasks.tsx refactored (~4 instances)
- [ ] Register.tsx refactored (~5 instances)
- [ ] Login.tsx refactored (~2 instances)
- [ ] Schedule.tsx refactored (~18 instances)
- [ ] SetupSemester.tsx refactored (~40 instances)
- [ ] All pages maintain same visual appearance

## Dependencies
- TASK-0009: Define color design tokens

## Scope
UI

## Priority
Medium

## Estimate
4h

## Status
pending

## Files to Modify

### src/pages/Settings.tsx (~20 instances)
- User settings page with forms and toggles
- Replace slate-* background, border, and text colors

### src/pages/CourseDetail.tsx (~15 instances)
- Course detail view with tabs
- Replace slate-* for tabs, cards, and content areas

### src/pages/Courses.tsx (~5 instances)
- Course list page
- Replace slate-* for list items and headers

### src/pages/Dashboard.tsx (~10 instances)
- Main dashboard with widgets
- Replace slate-* for backgrounds and text

### src/pages/Tasks.tsx (~4 instances)
- Kanban board page
- Replace slate-* for column backgrounds

### src/pages/Register.tsx (~5 instances)
- Registration form page
- Replace slate-* for form styling

### src/pages/Login.tsx (~2 instances)
- Login form page
- Replace slate-* for form styling

### src/pages/Schedule.tsx (~18 instances)
- Calendar/schedule view
- Replace slate-* for calendar grid and events

### src/pages/SetupSemester.tsx (~40 instances)
- Semester setup wizard (largest file)
- Replace slate-* for wizard steps, inputs, and preview

## Implementation Notes
- SetupSemester.tsx has the most instances - allocate more time
- Test each page after refactoring
- Verify responsive behavior is maintained
