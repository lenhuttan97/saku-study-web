# Features Index

Inventory of all features in the Sanctuary academic planner application.

| ID | Name | Status | Description |
|----|------|--------|-------------|
| FT-001 | User Authentication | ui-done | Login/Register UI wireframes ready. Firebase Auth integration pending. |
| FT-002 | Course Management | ui-done | Course list page with mock data, course detail page with tabs (Info, Schedule, Materials, Tasks), create course modal. Backend CRUD pending. |
| FT-003 | Task Management (Kanban) | ui-done | Kanban board with 3 columns (Upcoming, In Progress, Completed), mock data, search/filter UI. Backend integration pending. |
| FT-004 | Dashboard | ui-done | Home page with schedule overview, to-do list, focus mode widget, quote card, and study streak. All mock data. |
| FT-005 | Semester Setup | ui-done | First-time setup wizard UI. Firebase persistence pending. |
| FT-006 | Calendar View | pending | Placeholder route exists (/calendar). Full calendar UI and integration pending. |
| FT-007 | Settings | ui-done | Settings page UI wireframe. Backend integration pending. |
| FT-008 | Navigation Shell | done | Layout with Sidebar and TopNav components. React Router nested routes configured. |

## Status Legend

| Status | Meaning |
|--------|---------|
| done | Fully implemented and functional |
| ui-done | UI/wireframe complete, backend integration pending |
| pending | Not yet implemented |

## Feature Details

Each feature has a dedicated spec file in `docs/features/<feature-name>/`.

### FT-001: User Authentication
- Login page: `src/pages/Login.tsx`
- Register page: `src/pages/Register.tsx`
- Auth feature folder: `src/features/auth/` (empty, ready for implementation)

### FT-002: Course Management
- Course list: `src/pages/Courses.tsx`
- Course detail: `src/pages/CourseDetail.tsx`
- Courses feature folder: `src/features/courses/` (empty, ready for implementation)

### FT-003: Task Management
- Tasks page: `src/pages/Tasks.tsx`
- Tasks feature folder: `src/features/tasks/` (empty, ready for implementation)

### FT-004: Dashboard
- Dashboard page: `src/pages/Dashboard.tsx`

### FT-005: Semester Setup
- Setup page: `src/pages/SetupSemester.tsx`

### FT-006: Calendar View
- Placeholder in `src/App.tsx` route `/calendar`
- Calendar feature folder: `src/features/calendar/` (empty, ready for implementation)

### FT-007: Settings
- Settings page: `src/pages/Settings.tsx`

### FT-008: Navigation Shell
- Layout: `src/components/layout/Layout.tsx`
- Sidebar: `src/components/layout/Sidebar.tsx`
- TopNav: `src/components/layout/TopNav.tsx`
