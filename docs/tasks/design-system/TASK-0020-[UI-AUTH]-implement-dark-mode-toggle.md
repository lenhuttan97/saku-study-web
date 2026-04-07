# TASK-0020: Implement Dark Mode Toggle

## ID
TASK-0020

## Title
Implement Dark Mode Toggle

## Description
Add dark/light mode toggle functionality in Settings page. Store user preference in localStorage and apply CSS variables based on selected theme.

## Feature
Design System Implementation - Theme Toggle

## Scope
UI + Auth

## Priority
High

## Estimate
2h

## Status
pending

## Dependencies
- TASK-0015 (Define CSS Color Tokens for Light & Dark Mode)

## Acceptance Criteria

### Theme Toggle Component
- [ ] Add toggle switch in Settings > Appearance section
- [ ] Support Light/Dark mode switching
- [ ] Store preference in localStorage (key: 'theme-preference')
- [ ] Load saved preference on app initialization

### Theme Application
- [ ] Apply data-theme="dark" attribute to root element when dark mode active
- [ ] CSS variables switch automatically based on theme attribute
- [ ] Smooth transition between themes (300ms)

### User Experience
- [ ] Theme preference persists across sessions
- [ ] System prefers dark mode detection if available
- [ ] Loading state shows correct theme on initial render

### Testing
- [ ] Test light to dark transition
- [ ] Test dark to light transition
- [ ] Verify preference persists after page reload
- [ ] Verify all components render correctly in both themes

## Implementation Notes

- Use data-theme attribute on HTML element for CSS variable switching
- Store in localStorage key: 'theme-preference' with values 'light' or 'dark'
- Default to system preference if no stored value exists

## Subtasks

### TASK-0020A: Create Theme Context/Hook (30m)
- Create useTheme hook for theme management
- Add theme state to app

### TASK-0020B: Add Theme Toggle to Settings (30m)
- Add toggle switch in Settings page

### TASK-0020C: Implement Theme Persistence (30m)
- localStorage save/load logic
- System preference detection

### TASK-0020D: Add Theme Transition CSS (30m)
- Smooth CSS transitions between themes
