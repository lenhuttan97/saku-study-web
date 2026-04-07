# Dashboard

## Status
ui-done

## Description
Home page with schedule overview, to-do list with checkboxes, focus mode widget, quote card, and study streak counter. All mock data.

## Pages
- `src/pages/Dashboard.tsx` - Main dashboard with widgets

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| Card | `src/components/ui/Card.tsx` | Widget containers |
| Button | `src/components/ui/Button.tsx` | Action buttons |
| ProgressBar | `src/components/ui/Progress.tsx` | Daily progress bar |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/` | Dashboard.tsx | Protected |

## Features
- [x] Greeting with user name and date
- [x] Schedule overview widget (today's classes)
- [x] To-do list with checkboxes
- [x] Daily progress bar
- [x] Focus Mode widget
- [x] Quote card with random quotes
- [x] Study streak counter (12 days)
- [ ] Real-time schedule data
- [ ] Dynamic quotes from API
- [ ] Focus mode timer functionality

## Next Steps
1. Connect schedule to real data
2. Add focus mode timer with Pomodoro
3. Implement quote API integration
4. User settings for streak tracking

## Dependencies
- Firebase Firestore (pending)
- React Router v7
- MUI components
- lucide-react icons
