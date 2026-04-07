# TASK-0021: Typography Enhancement

## ID
TASK-0021

## Title
Typography Enhancement

## Description
Verify Plus Jakarta Sans and Be Vietnam Pro fonts are loaded correctly. Update typography tokens with proper sizing, weights, and letter-spacing for editorial hierarchy.

## Feature
Design System Implementation - Typography

## Scope
UI

## Priority
Low

## Estimate
1h

## Status
pending

## Dependencies
- TASK-0015 (Define CSS Color Tokens for Light & Dark Mode)

## Acceptance Criteria

### Font Loading
- [ ] Verify Plus Jakarta Sans is loaded and used for Display/Headline
- [ ] Verify Be Vietnam Pro is loaded and used for Title/Body
- [ ] Ensure fonts are loaded before render (prevent FOUT)

### Typography Scale
- [ ] `--font-display-lg`: 3.5rem (56px), Bold (700)
- [ ] `--font-headline-md`: 1.75rem (28px), Semi-Bold (600)
- [ ] `--font-title-lg`: 1.375rem (22px), Medium (500)
- [ ] `--font-body-lg`: 1rem (16px), Regular (400)
- [ ] `--font-label-md`: 0.75rem (12px), Semi-Bold (600)

### Label Styling
- [ ] Update label-md to use uppercase
- [ ] Add letter-spacing: 0.5px to label-md
- [ ] Apply to category labels (e.g., "ASSIGNMENTS", "UPCOMING")

### Editorial Hierarchy
- [ ] Display-lg used for hero moments (1-3 words)
- [ ] Use asymmetrical layouts with Display-lg
- [ ] Ensure generous line-height for body text (1.5x)

## Implementation Notes

Per the design spec:
- Plus Jakarta Sans provides "modern" engine for Display/Headline
- Be Vietnam Pro provides "humanist, rounded" feel for Title/Body
- Label-md should use all-caps + wide tracking for "boutique" feel
- Display-lg should be used for emphasis but kept to 1-3 words

## Subtasks

### TASK-0021A: Verify Font Loading (15m)
- Check fonts are properly loaded

### TASK-0021B: Define Typography Tokens (20m)
- Add typography scale to CSS

### TASK-0021C: Update Label Styling (15m)
- Apply uppercase + letter-spacing

### TASK-0021D: Apply Typography to Components (10m)
- Ensure components use correct tokens
