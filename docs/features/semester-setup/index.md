# Semester Setup

## Status
ui-done

## Description
First-time setup wizard with 4 steps: Identity, Schedule, Courses, and Finish. Firebase persistence pending.

## Pages
- `src/pages/SetupSemester.tsx` - Setup wizard with step navigation

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| Native HTML elements | - | Steps, forms, grid |
| Icons | lucide-react | Step icons |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/setup` | SetupSemester.tsx | Public (first-time) |

## Features
- [x] Step navigation (1-4)
- [x] Step 1: Identity (semester selection, study place input)
- [x] Step 2: Schedule preference selection (By Subject, Weekly Schedule, Free Form, Import)
- [x] Step 3: Weekly schedule grid (design your week)
- [x] Step 4: Summary and completion
- [x] Back and Continue buttons
- [x] Progress indicator
- [x] Animation between steps
- [ ] Firebase data persistence
- [ ] Form validation
- [ ] Data save on completion

## Next Steps
1. Save setup data to Firestore
2. Add form validation for each step
3. Implement user profile creation
4. Connect to auth user data
5. Add redirect to dashboard on completion

## Dependencies
- Firebase Firestore (pending)
- React Router v7
- MUI components
- lucide-react icons
- framer-motion
