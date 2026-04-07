# Schedule View

## Status
ui-done

## Description
Weekly schedule view with time grid and event display. Toggle between Day/Week/Month views. Print and export functionality. Mock data, backend pending.

## Pages
- `src/pages/Schedule.tsx` - Weekly schedule grid

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| Card | `src/components/ui/Card.tsx` | Container |
| Button | `src/components/ui/Button.tsx` | Action buttons |
| ToggleButtonGroup | `src/components/ui/ToggleButton.tsx` | View mode toggle |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/schedule` | Schedule.tsx | Protected |

## Features
- [x] Week view with 7-day grid
- [x] Time slots from 8:00 to 18:00
- [x] Schedule items with color coding
- [x] Room and time display for each item
- [x] Current time indicator (mock)
- [x] Week navigation (prev/next)
- [x] Today button
- [x] View mode toggle (Day/Week/Month)
- [x] Print button
- [x] Download/export button
- [x] Add Class button
- [ ] Real schedule data from Firestore
- [ ] Month view implementation
- [ ] Day view implementation

## Next Steps
1. Connect to Firestore schedule data
2. Implement Day view
3. Implement Month view
4. Add real-time current time indicator
5. Add calendar export (iCal/Google Calendar)

## Dependencies
- Firebase Firestore (pending)
- React Router v7
- MUI components
- lucide-react icons
