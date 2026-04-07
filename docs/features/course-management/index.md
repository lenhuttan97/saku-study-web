# FT-002: Course Management

## Status
ui-done

## Description
Course list with card UI, progress tracking, create course modal, and course detail with 4 tabs. Backend CRUD pending.

## Pages
- `src/pages/Courses.tsx` - Course list with cards and create modal
- `src/pages/CourseDetail.tsx` - Course detail with Info, Schedule, Materials, Tasks tabs

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| CourseCard | `src/pages/Courses.tsx` | Individual course card with progress |
| Dialog | `src/components/ui/Dialog.tsx` | Create course modal |
| Input | `src/components/ui/Input.tsx` | Form fields for course creation |
| Button | `src/components/ui/Button.tsx` | Action buttons |
| Card | `src/components/ui/Card.tsx` | Content containers |
| Tabs | `src/components/ui/Tabs.tsx` | Course detail tab navigation |
| Badge | `src/components/ui/Badge.tsx` | Task priority indicators |
| SearchInput | `src/components/ui/SearchInput.tsx` | Course search |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/courses` | Courses.tsx | Protected |
| `/courses/:id` | CourseDetail.tsx | Protected |

## Features
- [x] Course list with card grid
- [x] Course progress bars
- [x] Create course modal (MUI Dialog)
- [x] Search and filter UI
- [x] Course detail with 4 tabs (Info, Schedule, Materials, Tasks)
- [x] Course info section with stats
- [x] Materials list with download buttons
- [x] Task list by status
- [x] Mini schedule grid
- [ ] Course CRUD operations
- [ ] File upload for materials
- [ ] Real data persistence

## Next Steps
1. Create Course interface/type
2. Add Firestore collection for courses
3. Implement CRUD operations
4. Add file upload for materials
5. Connect to real data

## Dependencies
- Firebase Firestore (pending)
- Firebase Storage (pending)
- React Router v7
- MUI components
