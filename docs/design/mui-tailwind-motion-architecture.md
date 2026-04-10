# MUI + Tailwind + Motion Architecture Proposal

## Project: Sanctuary — Academic Planner Web App

**Version:** 1.0  
**Last Updated:** 2026-04-10  
**Status:** Proposal for Approval

---

## Executive Summary

This document proposes a **strict separation architecture** for organizing UI components, feature components, business logic, and presentation logic in the Sanctuary project. The current state incorrectly mixes these layers, leading to maintenance and scalability issues.

### Current Problems Identified

| Problem | Impact |
|---------|--------|
| UI components in `src/components/ui/reusable/` contain domain logic (CourseCard, TaskCard, etc.) | Cannot reuse in other projects; feature changes break UI components |
| Feature-specific components not separated | Unclear ownership; duplication risk |
| Pages contain data fetching and business logic | Hard to test; violates single responsibility |
| No clear MUI vs Tailwind vs Motion guidelines | Inconsistent implementation choices |
| No services layer abstraction | Business logic coupled to UI |

---

## 1. Correct Folder Structure

### 1.1 Target Architecture

```
src/
├── components/
│   ├── ui/                    # ═══════════════════════════════════
│   │   │                      # PURE UI COMPONENTS (Generic, reusable)
│   │   │                      # No business logic, no domain types
│   │   │                      # ═══════════════════════════════════
│   │   ├── mui/              # MUI complex components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── List.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── tailwind/           # Tailwind-only simple components
│   │   │   ├── GlassCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── motion/           # Animation wrappers
│   │   │   ├── FadeIn.tsx
│   │   │   ├── SlideIn.tsx
│   │   │   ├── ModalAnimate.tsx
│   │   │   ├── StaggerContainer.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts          # Main UI components barrel
│   │
│   ├── layout/               # ═══════════════════════════════════
│   │   │                      # SHELL LAYOUT COMPONENTS
│   │   │                      # Navigation, headers, sidebar
│   │   │                      # ═══════════════════════════════════
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   └── index.ts
│   │
│   └── routing/              # Route guards
│       ├── ProtectedRoute.tsx
│       └── PublicOnlyRoute.tsx
│
├── features/                # ═══════════════════════════════════
│   │                      # FEATURE-SPECIFIC COMPONENTS
│   │                      # Can use UI components, NO business logic
│   │                      # Contains domain types and presentation
│   │                      # ═══════════════════════════════════
│   ├── auth/
│   │   └── components/
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       ├── SocialLoginButtons.tsx
│   │       └── AuthFormHeader.tsx
│   │
│   ├── courses/
│   │   ├── components/
│   │   │   ├── CourseCard.tsx       # ← MOVED from reusable
│   │   │   ├── CourseList.tsx
│   │   │   ├── CourseHeader.tsx     # ← MOVED from reusable
│   │   │   ├── CreateCourseModal.tsx
│   │   │   └── index.ts
│   │   └── types/
│   │       └── course.ts
│   │
│   ├── tasks/
│   │   ├── components/
│   │   │   ├── TaskCard.tsx        # ← MOVED from reusable
│   │   │   ├── KanbanColumn.tsx     # ← MOVED from reusable
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── TodoItem.tsx      # ← MOVED from reusable
│   │   │   └── index.ts
│   │   └── types/
│   │       └── task.ts
│   │
│   ├── schedule/
│   │   ├── components/
│   │   │   ├── ScheduleItem.tsx # ← MOVED from reusable
│   │   │   ├── ScheduleGrid.tsx # ← MOVED from reusable
│   │   │   ├── ScheduleEvent.tsx # ← MOVED from reusable
│   │   │   └── index.ts
│   │   └── types/
│   │       └── schedule.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── FocusWidget.tsx    # ← MOVED from reusable
│   │   │   ├── QuoteCard.tsx     # ← MOVED from reusable
│   │   │   ├── StreakWidget.tsx  # ← MOVED from reusable
│   │   │   └── index.ts
│   │   └── types/
│   │       └── dashboard.ts
│   │
│   └── settings/
│       └── components/
│           └── SettingsSidebar.tsx # ← MOVED from reusable
│
├── pages/                  # ═══════════════════════════════════
│   │                      # ORCHESTRATION ONLY
│   │                      # No business logic, no data fetching
│   │                      # Only call hooks, render components
│   │                      # ═══════════════════════════════════
│   ├── Dashboard.tsx
│   ├── Courses.tsx
│   ├── CourseDetail.tsx
│   ├── Tasks.tsx
│   ├── Schedule.tsx
│   ├── Settings.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ForgotPassword.tsx
│   └── SetupSemester.tsx
│
├── hooks/                 # ═══════════════════════════════════
│   │                      # BUSINESS LOGIC (Custom Hooks)
│   │                      # No UI concerns, pure logic
│   │                      # ═══════════════════════════════════
│   ├── useAuth.ts
│   ├── useCourses.ts
│   ├── useTasks.ts
│   ├── useSchedule.ts
│   └── useStreak.ts
│
├── services/              # ═══════════════════════════════════
│   │                      # BUSINESS LOGIC (API Layer)
│   │                      # Firebase/Server abstraction
│   │                      # No UI concerns
│   │                      # ═══════════════════════════════════
│   ├── auth/
│   │   ├── authService.ts
│   │   └── index.ts
│   ├── courses/
│   │   ├── courseService.ts
│   │   └── index.ts
│   ├── tasks/
│   │   ├── taskService.ts
│   │   └── index.ts
│   └── firebase/
│       ├── firebase.ts
│       └── index.ts
│
├── types/                # ═══════════════════════════════════
│   │                      # SHARED TYPES (if needed)
│   │                      # ═══════════════════════════════════
│   └── common.ts
│
├── lib/                  # Utilities
│   ├── utils.ts
│   └── cn.ts
│
├── theme/                # MUI Theme
│   └── muiTheme.ts
│
├── App.tsx               # Router
├── main.tsx              # Entry
└── index.css            # Tailwind + global styles
```

### 1.2 Current vs. Target Comparison

| Current Location | Target Location | Component Type |
|--------------|--------------|-------------|
| `src/components/ui/mui/Button.tsx` | `src/components/ui/mui/Button.tsx` | Pure UI (keep) |
| `src/components/ui/reusable/CourseCard.tsx` | `src/features/courses/components/CourseCard.tsx` | Feature |
| `src/components/ui/reusable/TaskCard.tsx` | `src/features/tasks/components/TaskCard.tsx` | Feature |
| `src/components/ui/reusable/ScheduleItem.tsx` | `src/features/schedule/components/ScheduleItem.tsx` | Feature |
| `src/components/ui/reusable/FocusWidget.tsx` | `src/features/dashboard/components/FocusWidget.tsx` | Feature |
| `src/components/ui/reusable/StreakWidget.tsx` | `src/features/dashboard/components/StreakWidget.tsx` | Feature |

---

## 2. Clear Rule: MUI vs Tailwind vs Motion

### 2.1 Decision Matrix

| Use Case | Technology | Reason |
|---------|-----------|--------|
| **Forms**: TextField, Select, Autocomplete | **MUI** | Accessibility, validation, state management built-in |
| **Dialogs, Modals, Drawers** | **MUI** | Portal handling, accessibility, animations |
| **Data Tables, Grids** | **MUI** | Sorting, filtering, pagination complexity |
| **Navigation**: Tabs, Lists, Menus | **MUI** | Keyboard navigation, ARIA support |
| **Complex Cards with elevation** | **MUI Card** | Consistent shadows, elevation scale |
| **Progress indicators** | **MUI** | Built-in animations, accessibility |
| **Layout**: flex, grid, spacing | **Tailwind** | Utility-first, responsive |
| **Simple Cards (no logic)** | **Tailwind** | Lightweight, no MUI overhead |
| **Custom styled elements** | **Tailwind** | Rapid prototyping, theme consistency |
| **Typography utilities** | **Tailwind** | Consistent sizing, weights |
| **Background, borders, colors** | **Tailwind** | Theme tokens |
| **Page transitions** | **Motion** | Enter/exit animations |
| **Stagger animations** | **Motion** | List/grid animations |
| **Interactive gestures** | **Motion** | Drag, tap feedback |
| **Hover/focus animations** | **Tailwind transitions** | Simple state changes |

### 2.2 Component Technology Selection Flowchart

```
Is it a form control?
    ├── YES → Use MUI (TextField, Select, Autocomplete)
    └── NO ↓
        Is it a complex interactive component?
            ├── YES → Use MUI (Dialog, Tabs, Menu)
            └── NO ↓
                Is it a data display component?
                    ├── YES → Use MUI + Tailwind styling
                    └── NO ↓
                        Is it a layout/utility?
                            ├── YES → Use Tailwind
                            └── NO ↓
                                Needs animation?
                                    ├── YES → Use Motion
                                    └── NO → Use Tailwind
```

### 2.3 Technology Usage Examples

#### MUI + Tailwind Hybrid Pattern

```tsx
// Good: MUI for complex functionality, Tailwind for layout
import { Button } from '@/components/ui/mui';
import { cn } from '@/lib/utils';

export function MyComponent({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-between p-4', className)}>
      <Button variant="primary">Click me</Button>
    </div>
  );
}
```

#### Tailwind-Only Pattern

```tsx
// Good: Simple component, no complex functionality
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      'bg-white/70 backdrop-blur-md border border-white/20 rounded-xl p-6',
      className
    )}>
      {children}
    </div>
  );
}
```

#### Motion + Tailwind Pattern

```tsx
// Good: Animation + layout
import { motion } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 3. Pattern: UI Components Integration with Feature Components

### 3.1 Integration Rules

| UI Layer | Feature Layer | Page Layer |
|---------|------------|----------|
| Pure generic | Can use UI | Can use both |
| No domain types | Has domain types | No business logic |
| Exists independently | Depends on UI | Orchestrates hooks |

### 3.2 Import Hierarchy

```
pages/ → features/*/components/ → components/ui/
           ↓
         hooks/ → services/
```

### 3.3 Example: Creating a Course List

#### Step 1: Define Domain Types (Feature Layer)

```typescript
// src/features/courses/types/course.ts
export interface Course {
  id: string;
  name: string;
  teacher: string;
  location: string;
  description: string;
  progress: number;
  color: string;
}
```

#### Step 2: Create Business Logic Hook (Hooks Layer)

```typescript
// src/hooks/useCourses.ts
import { useState, useEffect } from 'react';
import { courseService } from '@/services/courses';
import type { Course } from '@/features/courses/types/course';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        setCourses(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return { courses, loading, error };
}
```

#### Step 3: Create Feature Component (Feature Layer)

```typescript
// src/features/courses/components/CourseCard.tsx
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, User, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/mui';
import { cn } from '@/lib/utils';
import type { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  idx?: number;
}

export const CourseCard = ({ course, idx = 0 }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Card elevation="medium" hoverable className="p-6">
        <Link to={`/courses/${course.id}`}>
          {/* Course display logic */}
        </Link>
      </Card>
    </motion.div>
  );
};
```

#### Step 4: Create Page (Page Layer - Orchestration Only)

```typescript
// src/pages/Courses.tsx
import React from 'react';
import { CourseCard } from '@/features/courses/components';
import { useCourses } from '@/hooks/useCourses';
import { GlassCard } from '@/components/ui/tailwind';

const Courses = () => {
  // NO business logic - just hook usage
  const { courses, loading, error } = useCourses();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map((course, idx) => (
        <CourseCard key={course.id} course={course} idx={idx} />
      ))}
    </div>
  );
};

export default Courses;
```

### 3.4 Component Dependency Rules

```
ALLOWED:
✓ UI components → lib/utils
✓ Feature components → UI components, lib/utils
✓ Feature components → feature types
✓ Pages → feature components, hooks
✓ Hooks → services

FORBIDDEN:
✗ UI components → feature types
✗ UI components → services
✗ Feature components → services (use hooks)
✗ Pages → services (use hooks)
✗ Pages → business logic
```

---

## 4. Naming and Theming Conventions

### 4.1 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `CourseCard.tsx` |
| Interfaces | PascalCase | `CourseCardProps` |
| Hooks | camelCase with `use` prefix | `useCourses.ts` |
| Services | camelCase with `Service` suffix | `courseService.ts` |
| Types | PascalCase | `Course.ts` |
| Utils | camelCase | `utils.ts` |
| Constants | UPPER_SNAKE_CASE | `API_CONFIG.ts` |

### 4.2 Export Barrel Pattern

```typescript
// src/features/courses/components/index.ts
export { CourseCard } from './CourseCard';
export { CourseList } from './CourseList';
export { CourseHeader } from './CourseHeader';
export { CreateCourseModal } from './CreateCourseModal';
export type { CourseCardProps } from './CourseCard';
```

### 4.3 MUI Theme Integration

```typescript
// src/theme/muiTheme.ts
// Keep in sync with Tailwind tokens in src/index.css
const BRAND_PURPLE = '#7C3AED';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: BRAND_PURPLE,
      // Automatically syncs with Tailwind --color-brand-purple
    },
  },
});
```

### 4.4 Tailwind + MUI Coexistence Guidelines

| Style Property | Use | Example |
|--------------|-----|---------|
| Layout (flex, grid) | Tailwind | `className="flex items-center"` |
| Spacing (margin, padding) | Tailwind | `className="p-6"` |
| Colors (background, text) | Tailwind | `className="bg-slate-100"` |
| Border radius | Either | MUI: `borderRadius: 12` OR Tailwind: `rounded-xl` |
| Elevation/Shadow | MUI | `elevation="medium"` OR Tailwind: `shadow-lg` |
| Typography | Use MUI theme via `sx` | `sx={{ fontWeight: 600 }}` |
| Responsive | Tailwind | `className="md:flex"` |

---

## 5. Migration Plan (Phased)

### Phase 1: Analysis & Preparation (Week 1)

**Tasks:**
- [ ] Document all current components with their usage
- [ ] Create new folder structure
- [ ] Update `tsconfig.json` path aliases if needed
- [ ] Create barrel files for new structure

**Deliverables:**
- Component inventory spreadsheet
- New folder structure created

### Phase 2: Create Pure UI Layer (Week 1-2)

**Tasks:**
- [ ] Review and clean `src/components/ui/mui/`
- [ ] Create `src/components/ui/tailwind/` for GlassCard, Avatar, StatCard
- [ ] Create `src/components/ui/motion/` for FadeIn, SlideIn
- [ ] Update `src/components/ui/index.ts`

**Deliverables:**
- Clean pure UI components

### Phase 3: Move Feature Components (Week 2-3)

**Tasks:**
- [ ] Create `src/features/*/components/` folders
- [ ] Move course components → `src/features/courses/components/`
- [ ] Move task components → `src/features/tasks/components/`
- [ ] Move schedule components → `src/features/schedule/components/`
- [ ] Move dashboard widgets → `src/features/dashboard/components/`
- [ ] Move settings sidebar → `src/features/settings/components/`
- [ ] Add domain types in `src/features/*/types/`

**Deliverables:**
- Feature components in proper locations

### Phase 4: Create Hooks & Services (Week 3-4)

**Tasks:**
- [ ] Create `src/hooks/useCourses.ts`
- [ ] Create `src/hooks/useTasks.ts`
- [ ] Create `src/services/courses/courseService.ts`
- [ ] Create `src/services/tasks/taskService.ts`
- [ ] Update pages to use hooks only

**Deliverables:**
- Clean pages with only orchestration

### Phase 5: Refactor Pages (Week 4)

**Tasks:**
- [ ] Update `src/pages/Dashboard.tsx`
- [ ] Update `src/pages/Courses.tsx`
- [ ] Update `src/pages/Tasks.tsx`
- [ ] Update `src/pages/Schedule.tsx`
- [ ] Update `src/pages/CourseDetail.tsx`
- [ ] Update `src/pages/Settings.tsx`

**Deliverables:**
- Clean pages (orchestration only)

### Phase 6: Cleanup & Testing (Week 5)

**Tasks:**
- [ ] Remove old `src/components/ui/reusable/` contents
- [ ] Run TypeScript checks
- [ ] Run build and fix errors
- [ ] Manual testing of all pages
- [ ] Update documentation

**Deliverables:**
- Clean codebase, tested functionality

### Migration Checklist

| Phase | Components to Move | Count |
|-------|------------------|------|
| Phase 3 | CourseCard, CourseList, CourseHeader | 3 |
| Phase 3 | TaskCard, KanbanColumn, TodoItem | 3 |
| Phase 3 | ScheduleItem, ScheduleGrid, ScheduleEvent | 3 |
| Phase 3 | FocusWidget, QuoteCard, StreakWidget | 3 |
| Phase 3 | SettingsSidebar | 1 |
| **Total** | | **13** |

---

## 6. Do/Don't Checklist

### Do ✓

| Rule | Example |
|------|---------|
| ✓ Create pure UI components in `src/components/ui/` | Button, Input, Card |
| ✓ Put feature-specific components in `src/features/*/` | CourseCard in features/courses |
| ✓ Use hooks for business logic | `const { courses } = useCourses()` |
| ✓ Use services for API calls | `courseService.getCourses()` |
| ✓ Keep pages as orchestrators | Pages call hooks, render components |
| ✓ Use MUI for complex form components | TextField, Select, Dialog |
| ✓ Use Tailwind for layout and utilities | flex, grid, padding, colors |
| ✓ Use Motion for page transitions | AnimatePresence |
| ✓ Define domain types in feature folders | `types/course.ts` |
| ✓ Use barrel exports (index.ts) | Export all from single file |

### Don't ✗

| Rule | Example |
|------|---------|
| ✗ Put business logic in UI components | Don't fetch data in Button |
| ✗ Call services directly from pages | Use hooks instead |
| ✗ Mix feature and UI components | CourseCard should NOT be in ui/reusable |
| ✗ Use domain types in UI components | UI buttons shouldn't know about Course |
| ✗ Put business logic in pages | Pages shouldn't fetch data directly |
| ✗ Use MUI for simple layout | Use Tailwind flex/grid |
| ✗ Use Motion for hover states | Use Tailwind transitions |
| ✗ Hardcode colors | Use design tokens |
| ✗ Skip barrel exports | Use index.ts for clean imports |

### Violation Detection

```
# Find components with business logic in UI layer
grep -r "useEffect\|useState\|async\|await\|service" src/components/ui/

# Find pages importing services directly
grep -r "from '@/services" src/pages/

# Find UI components with domain types
grep -r "Course\|Task\|Schedule" src/components/ui/mui/
```

---

## 7. Implementation Priority

### High Priority (Must Fix)

1. Create clear folder structure
2. Move feature components out of `src/components/ui/reusable/`
3. Create hooks layer for business logic
4. Clean up pages to orchestration only

### Medium Priority (Should Fix)

5. Add Motion components for animations
6. Create Tailwind-only simple UI components
7. Document all exports with barrel files

### Low Priority (Nice to Have)

8. Create Storybook for UI components
9. Add visual regression tests
10. Create design system documentation

---

## 8. Appendix: Quick Reference Card

### Import Path Reference

| Need | Import From |
|------|----------|
| Button | `@/components/ui/mui` |
| Card | `@/components/ui/mui` |
| GlassCard | `@/components/ui/tailwind` |
| FadeIn animation | `@/components/ui/motion` |
| CourseCard | `@/features/courses/components` |
| TaskCard | `@/features/tasks/components` |
| useCourses hook | `@/hooks/useCourses` |
| courseService | `@/services/courses` |

### Technology Selection Quick Guide

| Situation | Choice |
|-----------|--------|
| Need form with validation | MUI TextField |
| Need simple button | MUI Button |
| Need card with elevation | MUI Card |
| Need glass effect card | Tailwind GlassCard |
| Need simple layout | Tailwind flex/grid |
| Need page animation | Motion FadeIn |
| Need hover animation | Tailwind transition |

---

## 9. Approval & Next Steps

### Required Approvals

- [ ] Architecture proposal approved by Tech Lead
- [ ] Migration plan timeline agreed
- [ ] Resource allocation for Week 1-5

### Next Steps After Approval

1. Create folder structure
2. Begin Phase 1: Analysis
3. Schedule team walkthrough

---

**Document Status:** Draft for Review  
**Author:** UI Designer Agent  
**Reviewers:** Architect, Frontend Lead