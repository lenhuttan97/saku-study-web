# TASK-0016: Remove 1px Borders - Implement "No-Line" Rule

## ID
TASK-0016

## Title
Remove 1px Borders - Implement "No-Line" Rule

## Description
Replace all 1px solid borders with background color shifts. This is a core principle of the "Sanctuary" design system - boundaries should be defined through tonal transitions rather than harsh dividers.

## Feature
Design System Implementation - No-Line Rule

## Scope
UI

## Priority
High

## Estimate
3h

## Status
pending

## Dependencies
- TASK-0015 (Define CSS Color Tokens for Light & Dark Mode)

## Acceptance Criteria

### Sidebar
- [ ] Replace sidebar border with `--color-surface-low` background
- [ ] Ensure visual separation from main content via color contrast

### Cards
- [ ] Remove all 1px borders from card components
- [ ] Use background color transitions for hierarchy

### Inputs
- [ ] Replace border-based input styling with tonal surface shifts
- [ ] Implement "ghost border" (15% opacity) only where required for accessibility

### Modals & Dialogs
- [ ] Remove solid borders from modal components
- [ ] Use elevation and background color for separation

### General
- [ ] Audit all components for remaining 1px borders
- [ ] Replace with background color shifts or shadows
- [ ] Ensure no hard dividers remain (replace with whitespace)

## Implementation Notes

Per the design spec:
- Use `surface-container-low` sidebar against `surface` main content for tonal contrast
- The "Ghost Border" (outline-variant at 15% opacity) should only be used for accessibility in input fields
- No section should be separated by a 1px line - use background color change instead

## Subtasks

### TASK-0016A: Update Sidebar Styling (30m)
- Remove border, use background color shift

### TASK-0016B: Update Card Components (1h)
- Remove borders, use tonal surfaces

### TASK-0016C: Update Input Components (30m)
- Replace borders with ghost borders where needed

### TASK-0016D: Update Modal/Dialog Components (30m)
- Remove borders, use elevation

### TASK-0016E: Audit & Fix Remaining Borders (30m)
- Find and fix any remaining 1px borders
