# Documentation Index

Main documentation for the Sanctuary academic planner application.

## Overview

| Section | Description |
|---------|-------------|
| [Features](./features/) | Feature specifications (FT-001 to FT-010) |
| [Tasks](./tasks/) | Implementation tasks linked to GitHub Issues |
| [Reports](./reports/) | Project analysis and reports |

## Project Status

### Features (11 total)
| ID | Feature | Status | Implementation |
|----|---------|--------|----------------|
| FT-001 | User Authentication | ui-done | Firebase Auth integration |
| FT-002 | Course Management | ui-done | Firestore CRUD, file upload |
| FT-003 | Task Management | ui-done | Task CRUD, drag-and-drop |
| FT-004 | Dashboard | ui-done | Real data, focus timer, quotes |
| FT-005 | Semester Setup | ui-done | Form validation, Firestore save |
| FT-006 | Schedule View | ui-done | Real data, Day/Month views |
| FT-007 | Settings | ui-done | Profile, theme, security |
| FT-008 | Navigation Shell | done | Auth guard, responsive |
| FT-009 | UI Component Library | done | 16 reusable components |
| FT-010 | Design System & UI Refactoring | pending | Color tokens, no-line, glassmorphism, dark mode |
| FT-011 | Internationalization (i18n) | pending | Multi-language support (Vietnamese + English) |

### Milestones

| Milestone | Description | Due Date | Issues |
|-----------|-------------|----------|--------|
| FT-001 - FT-008 | Core Features | 2026-04-30 | 27 |
| **Design System & UI Refactoring** | Serene Sakura Design System | 2026-05-31 | 15 |

## Quick Links

### GitHub
- [All Milestones](https://github.com/lenhuttan97/saku-study-web/milestones)
- [All Issues](https://github.com/lenhuttan97/saku-study-web/issues)
- [Design System Milestone](https://github.com/lenhuttan97/saku-study-web/milestone/15)

### Features
- [User Authentication](./features/user-authentication/)
- [Course Management](./features/course-management/)
- [Task Management](./features/task-management/)
- [Dashboard](./features/dashboard/)
- [Semester Setup](./features/semester-setup/)
- [Schedule View](./features/schedule-view/)
- [Settings](./features/settings/)
- [Navigation Shell](./features/navigation-shell/)
- [UI Component Library](./features/ui-component-library/)
- [Design System](./features/design-system/)

### Tasks
- [Tasks Index](./tasks/INDEX.md)

## Reports

| Report | Description |
|--------|-------------|
| [Project Analysis](./reports/project-analysis.md) | Full project analysis - tech stack, architecture, gaps |
| [Design Mockup Analysis](./reports/design-mockup-analysis.md) | Design system specs, screens, and patterns from mockups |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + MUI |
| Backend | Firebase (Firestore + Auth + Storage) |
| Icons | lucide-react |
| Animations | Framer Motion |

## Estimated Effort

**Total: 59.5 hours** (41 tasks across 10 features)

### Core Features (FT-001 - FT-008)
| Feature | Tasks | Effort |
|---------|-------|--------|
| FT-001: User Authentication | 4 | 4h |
| FT-002: Course Management | 4 | 5h |
| FT-003: Task Management | 3 | 4h |
| FT-004: Dashboard | 3 | 4h |
| FT-005: Semester Setup | 3 | 3h |
| FT-006: Schedule View | 4 | 6h |
| FT-007: Settings | 3 | 4h |
| FT-008: Navigation Shell | 3 | 3.5h |
| **Subtotal** | **27** | **33.5h** |

### Design System & UI Refactoring (FT-010)
| Feature | Tasks | Effort |
|---------|-------|--------|
| TASK-0009: Define color design tokens | 1 | 1h |
| TASK-0010: Refactor layout components | 1 | 1h |
| TASK-0011: Refactor MUI wrapper components | 1 | 1h |
| TASK-0012: Refactor reusable UI components | 1 | 3h |
| TASK-0013: Refactor page components | 1 | 4h |
| TASK-0014: Verify and test color consistency | 1 | 1h |
| TASK-0015: Define CSS Color Tokens for Light & Dark Mode | 1 | 2h |
| TASK-0016: Remove 1px Borders - Implement No-Line Rule | 1 | 3h |
| TASK-0017: Update Border Radius System | 1 | 2h |
| TASK-0018: Implement Glassmorphism Components | 1 | 2h |
| TASK-0019: Update Shadow System | 1 | 1h |
| TASK-0020: Implement Dark Mode Toggle | 1 | 2h |
| TASK-0021: Typography Enhancement | 1 | 1h |
| TASK-0022: Verify Design System Implementation | 1 | 2h |
| **Subtotal** | **14** | **26h** |

## Design System

This project follows the **"Serene Sakura"** design system for a premium, sanctuary-like experience.

### Design Specs
- [Light Mode](./design-mockup/serene_sakura/DESIGN.md) - "Editorial Serenity"
- [Dark Mode](./design-mockup/serene_sakura_night/DESIGN.md) - "The Ethereal Sanctuary"

### Key Principles
1. **No-Line Rule**: Boundaries through background shifts, not borders
2. **Tonal Surface Hierarchy**: Background → Surface-Low → Surface-Lowest
3. **Glassmorphism**: 70% opacity + 24px blur for floating elements
4. **Sanctuary Shadow**: Primary-tinted shadows for elevated elements
5. **Full Rounding**: Border radius for soft, approachable UI
6. **Dark Mode**: "Night Sanctuary" with deep Navy/Slate foundation
