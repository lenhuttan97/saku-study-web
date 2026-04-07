# Tasks Index

Tasks for implementing backend functionality. Each task is linked to its corresponding feature.

## Task Overview

| ID | Task | Feature | Status | Effort |
|----|------|---------|--------|--------|
| TASK-001 | Firebase Auth Integration | FT-001: User Authentication | pending | 4h |
| TASK-002 | Course CRUD Operations | FT-002: Course Management | pending | 5h |
| TASK-003 | Task Management Backend | FT-003: Task Management | pending | 4h |
| TASK-004 | Dashboard Real Data Integration | FT-004: Dashboard | pending | 4h |
| TASK-005 | Semester Setup Data Persistence | FT-005: Semester Setup | pending | 3h |
| TASK-006 | Schedule View Real Data | FT-006: Schedule View | pending | 6h |
| TASK-007 | Settings Backend Integration | FT-007: Settings | pending | 4h |
| TASK-008 | Auth Guard & Route Protection | FT-008: Navigation Shell | pending | 3.5h |
| TASK-0009 | Define color design tokens | Color Refactoring | pending | 1h |
| TASK-0010 | Refactor layout components | Color Refactoring | pending | 1h |
| TASK-0011 | Refactor MUI wrapper components | Color Refactoring | pending | 1h |
| TASK-0012 | Refactor reusable UI components | Color Refactoring | pending | 3h |
| TASK-0013 | Refactor page components | Color Refactoring | pending | 4h |
| TASK-0014 | Verify and test color consistency | Color Refactoring | pending | 1h |
| TASK-0015 | Define CSS Color Tokens for Light & Dark Mode | Design System | pending | 2h |
| TASK-0016 | Remove 1px Borders - Implement "No-Line" Rule | Design System | pending | 3h |
| TASK-0017 | Update Border Radius System | Design System | pending | 2h |
| TASK-0018 | Implement Glassmorphism Components | Design System | pending | 2h |
| TASK-0019 | Update Shadow System | Design System | pending | 1h |
| TASK-0020 | Implement Dark Mode Toggle | Design System | pending | 2h |
| TASK-0021 | Typography Enhancement | Design System | pending | 1h |
| TASK-0022 | Verify Design System Implementation | Design System | pending | 2h |

## Status Legend

| Status | Meaning |
|--------|---------|
| pending | Not yet started |
| in_progress | Currently being worked on |
| done | Completed |

## Task Details

### TASK-001: Firebase Auth Integration
- **Feature**: [FT-001: User Authentication](../features/user-authentication/index.md)
- **File**: `user-authentication/TASK-001-firebase-auth.md`
- **Subtasks**:
  - TASK-001A: Install and Configure Firebase (30m)
  - TASK-001B: Implement Login/Registration UI Logic (1.5h)
  - TASK-001C: Email Verification & Password Reset (1h)
  - TASK-001D: Auth Provider & Session Management (1h)

### TASK-002: Course CRUD Operations
- **Feature**: [FT-002: Course Management](../features/course-management/index.md)
- **File**: `course-management/TASK-002-course-crud.md`
- **Subtasks**:
  - TASK-002A: Firestore Setup & Course Type (30m)
  - TASK-002B: Course Create & Read (1.5h)
  - TASK-002C: Course Update & Delete (1.5h)
  - TASK-002D: Course Materials File Upload (1.5h)

### TASK-003: Task Management Backend
- **Feature**: [FT-003: Task Management](../features/task-management/index.md)
- **File**: `task-management/TASK-003-task-management.md`
- **Subtasks**:
  - TASK-003A: Task Type & Firestore Setup (30m)
  - TASK-003B: Task CRUD Operations (1.5h)
  - TASK-003C: Drag and Drop Functionality (2h)

### TASK-004: Dashboard Real Data Integration
- **Feature**: [FT-004: Dashboard](../features/dashboard/index.md)
- **File**: `dashboard/TASK-004-dashboard-data.md`
- **Subtasks**:
  - TASK-004A: Schedule & To-Do Data Integration (1.5h)
  - TASK-004B: Focus Mode Timer (1.5h)
  - TASK-004C: Quote API & Streak Tracking (1h)

### TASK-005: Semester Setup Data Persistence
- **Feature**: [FT-005: Semester Setup](../features/semester-setup/index.md)
- **File**: `semester-setup/TASK-005-semester-setup.md`
- **Subtasks**:
  - TASK-005A: Form Validation (1h)
  - TASK-005B: Save Setup Data to Firestore (1.5h)
  - TASK-005C: Redirect Logic (30m)

### TASK-006: Schedule View Real Data
- **Feature**: [FT-006: Schedule View](../features/schedule-view/index.md)
- **File**: `schedule-view/TASK-006-schedule-data.md`
- **Subtasks**:
  - TASK-006A: Schedule Data Integration (1.5h)
  - TASK-006B: Day & Month View Implementation (2h)
  - TASK-006C: Calendar Export & Current Time (1h)
  - TASK-006D: Create/Edit Schedule Item (1.5h)

### TASK-007: Settings Backend Integration
- **Feature**: [FT-007: Settings](../features/settings/index.md)
- **File**: `settings/TASK-007-settings.md`
- **Subtasks**:
  - TASK-007A: Profile & Avatar Update (1.5h)
  - TASK-007B: Theme & Appearance Settings (1h)
  - TASK-007C: Security Settings (1.5h)

### TASK-008: Auth Guard & Route Protection
- **Feature**: [FT-008: Navigation Shell](../features/navigation-shell/index.md)
- **File**: `navigation-shell/TASK-008-auth-guard.md`
- **Subtasks**:
  - TASK-008A: Auth Provider Integration (1h)
  - TASK-008B: Logout & Sidebar State (1h)
  - TASK-008C: Mobile Responsive & Notifications (1.5h)

## Total Estimated Effort
**33.5 hours** (existing tasks)
**+ 11 hours** (Color Refactoring: TASK-0009 → TASK-0014)
**+ 15 hours** (Design System: TASK-0015 → TASK-0022)
**= 59.5 hours** (all tasks)

### TASK-0009: Define color design tokens
- **Feature**: Color Refactoring
- **File**: `color-refactor/TASK-0009-[UI]-define-color-design-tokens.md`
- **Description**: Define comprehensive CSS variables for full color palette (text, background, border, semantic, hover/state colors)
- **Estimate**: 1h

### TASK-0010: Refactor layout components
- **Feature**: Color Refactoring
- **File**: `color-refactor/TASK-0010-[UI]-refactor-layout-components.md`
- **Description**: Replace hardcoded slate-* colors in Sidebar.tsx, TopNav.tsx, Layout.tsx (~43 instances)
- **Estimate**: 1h

### TASK-0011: Refactor MUI wrapper components
- **Feature**: Color Refactoring
- **File**: `color-refactor/TASK-0011-[UI]-refactor-mui-wrapper-components.md`
- **Description**: Replace hardcoded colors in MUI wrapper components (Card, Progress, ToggleButton, Tabs, Input)
- **Estimate**: 1h

### TASK-0012: Refactor reusable UI components
- **Feature**: Color Refactoring
- **File**: `color-refactor/TASK-0012-[UI]-refactor-reusable-ui-components.md`
- **Description**: Replace hardcoded colors in all reusable UI components (~18 files)
- **Estimate**: 3h

### TASK-0013: Refactor page components
- **Feature**: Color Refactoring
- **File**: `color-refactor/TASK-0013-[UI]-refactor-page-components.md`
- **Description**: Replace hardcoded colors in all page components (~99+ instances across 9 files)
- **Estimate**: 4h

### TASK-0014: Verify and test color consistency
- **Feature**: Color Refactoring
- **File**: `color-refactor/TASK-0014-[UI]-verify-and-test-color-consistency.md`
- **Description**: Run dev server and verify all pages look the same, check for color regressions
- **Estimate**: 1h

## Design System Tasks (TASK-0015 → TASK-0022)

### TASK-0015: Define CSS Color Tokens for Light & Dark Mode
- **Feature**: Design System
- **File**: `design-system/TASK-0015-[UI]-define-css-color-tokens.md`
- **Description**: Create comprehensive CSS variables for both light and dark mode. Light mode: --color-bg (#fef8fa), --color-surface-low (#f8f2f4), --color-surface-lowest (#ffffff), --color-secondary-container (#bee1ff), --color-primary (#795465), --color-primary-container (#f8c8dc). Dark mode: --color-bg-dark (#081425), --color-surface-dark, --color-surface-low-dark. Gradient definitions: --color-gradient-primary (135deg from primary to primary-container). Semantic tokens: --color-ghost-border (15% opacity), --color-glass-bg.
- **Estimate**: 2h

### TASK-0016: Remove 1px Borders - Implement "No-Line" Rule
- **Feature**: Design System
- **File**: `design-system/TASK-0016-[UI]-remove-1px-borders.md`
- **Description**: Replace all 1px solid borders with background color shifts. Update sidebar, cards, inputs, modals to use background transitions instead. Add tonal surface colors where needed. Use ghost border (15% opacity) only for accessibility in input fields.
- **Estimate**: 3h

### TASK-0017: Update Border Radius System
- **Feature**: Design System
- **File**: `design-system/TASK-0017-[UI]-update-border-radius-system.md`
- **Description**: Replace sharp corners with appropriate radius tokens. Light mode: use xl (3rem) for containers, lg (2rem) for study cards, md (1.5rem) for inputs. Dark mode: use full (9999px) for all interactive elements. Update buttons, cards, inputs, dialogs.
- **Estimate**: 2h

### TASK-0018: Implement Glassmorphism Components
- **Feature**: Design System
- **File**: `design-system/TASK-0018-[UI]-implement-glassmorphism.md`
- **Description**: Create glassmorphism utility classes for floating elements. Bottom navigation dock: 70-80% opacity + 24px backdrop-blur. Modals: 60-70% opacity + 24px blur. Apply to Sidebar, TopNav, floating menus.
- **Estimate**: 2h

### TASK-0019: Update Shadow System
- **Feature**: Design System
- **File**: `design-system/TASK-0019-[UI]-update-shadow-system.md`
- **Description**: Replace default shadows with "Sanctuary Shadow". Light mode: 0px 10px 40px rgba(121, 84, 101, 0.08) tinted with primary. Dark mode: 40px blur, 0 spread, 6% opacity tinted with on-surface. Update elevated cards, FABs, floating menus.
- **Estimate**: 1h

### TASK-0020: Implement Dark Mode Toggle
- **Feature**: Design System
- **File**: `design-system/TASK-0020-[UI-AUTH]-implement-dark-mode-toggle.md`
- **Description**: Add dark/light mode toggle in Settings. Store preference in localStorage (key: 'theme-preference'). Apply data-theme attribute to root element. Test theme switching with smooth 300ms transitions.
- **Estimate**: 2h

### TASK-0021: Typography Enhancement
- **Feature**: Design System
- **File**: `design-system/TASK-0021-[UI]-typography-enhancement.md`
- **Description**: Verify Plus Jakarta Sans + Be Vietnam Pro fonts are loaded. Update label-md to use uppercase + letter-spacing (0.5px) for category labels. Add display-lg (3.5rem, 700), headline-md (1.75rem, 600), title-lg (1.375rem, 500), body-lg (1rem, 400), label-md (0.75rem, 600) tokens.
- **Estimate**: 1h

### TASK-0022: Verify Design System Implementation
- **Feature**: Design System
- **File**: `design-system/TASK-0022-[UI]-verify-design-system.md`
- **Description**: Run dev server and verify both light/dark modes. Check all pages follow "No-Line" rule (no 1px borders, use background shifts). Verify border-radius consistency (xl for containers, full for interactive in dark mode). Check Glassmorphism effects (70-80% opacity, 24px blur). Test responsive behavior across mobile/tablet/desktop.
- **Estimate**: 2h
