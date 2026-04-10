# MUI + Tailwind CSS + Motion Integration Rules

## Mục đích
Quy tắc sử dụng phối hợp giữa MUI (Material UI), Tailwind CSS, và Framer Motion để đảm bảo kiến trúc rõ ràng, tránh xung đột và tối ưu hiệu suất. Cấu trúc tuân thủ nguyên tắc tách biệt UI components khỏi business logic.

---

## 1. Folder Structure (Recommended)

```
src/
├── components/                          # UI COMPONENTS (organized by domain)
│   ├── ui/                              # SHARED UI SYSTEM
│   │   ├── mui/                         # Generic MUI wrappers (Button, Card, Dialog)
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   └── common/                      # Common reusable components (not domain-specific)
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── Modal.tsx
│   │       ├── SearchInput.tsx
│   │       └── ...
│   ├── auth/                            # Auth domain components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SocialLoginButtons.tsx
│   │   └── ...
│   ├── courses/                         # Course domain components
│   │   ├── CourseCard.tsx
│   │   ├── CourseList.tsx
│   │   ├── CreateCourseModal.tsx
│   │   └── ...
│   ├── tasks/                           # Task domain components
│   │   ├── TaskCard.tsx
│   │   ├── KanbanBoard.tsx
│   │   └── ...
│   ├── dashboard/                       # Dashboard domain components
│   │   ├── FocusWidget.tsx
│   │   ├── StreakWidget.tsx
│   │   └── ...
│   ├── layout/                          # Layout shell components
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopNav.tsx
│   └── routing/                         # Route guards
│       ├── ProtectedRoute.tsx
│       └── PublicOnlyRoute.tsx
│
├── features/                            # BUSINESS LOGIC (no JSX)
├── pages/                               # PAGE ORCHESTRATION (no business logic)
│   ├── Dashboard.tsx
│   ├── Courses.tsx
│   ├── Login.tsx
│   └── ...
│
├── hooks/                               # DATA LOGIC (custom hooks)
├── services/                            # API ABSTRACTION (no UI)
├── types/                               # TYPE DEFINITIONS
├── theme/
│   └── muiTheme.ts                      # MUI Theme (source of truth)
│
└── index.css                            # Tailwind v4 + custom utilities
```

---

## 2. Decision Matrix: When to Use What

### MUI — Use When You Need:
| Category | Components | Location |
|----------|------------|----------|
| Complex interactive | Dialog, Menu, Select, Autocomplete, Popover, Tooltip | `components/ui/mui/` |
| Form controls | TextField, Checkbox, Radio, Switch, Slider | `components/ui/mui/` |
| Navigation | Tabs, Drawer, AppBar, BottomNavigation | `components/ui/mui/` |
| Data display | Table, DataGrid, List, Chip, Avatar | `components/ui/mui/` |
| Feedback | Snackbar, Alert, CircularProgress, Skeleton | `components/ui/mui/` |
| Built-in accessibility | ARIA, keyboard navigation | `components/ui/mui/` |

### Tailwind — Use When You Need:
| Category | Examples | Usage |
|----------|----------|-------|
| Layout | flex, grid, gap, justify, align | All components |
| Spacing | p-*, m-*, space-* | All components |
| Typography | font-*, text-*, leading-*, tracking-* | All components |
| Responsive | sm:, md:, lg:, xl: | All components |
| Visual | rounded-*, shadow-*, border-*, opacity-* | All components |
| States | hover:, focus:, active: | All components |
| Transitions | transition-*, duration-*, ease-* | All components |

### Motion — Use When You Need:
| Category | Examples | Usage |
|----------|----------|-------|
| Page transitions | Enter/exit animations | Pages wrapping components |
| Component animations | Stagger, fade, slide | Domain components |
| Interactive | Hover effects, tap feedback | Domain components |
| Scroll-triggered | Reveal on scroll | Domain components |
| Complex choreographies | Spring animations, keyframes | Domain components |
| Gestures | Drag, swipe | Domain components |

---

## 3. Anti-Patterns

### ❌ DON'T Use MUI For:
- Simple layout containers → use `<div className="flex">`
- Basic spacing needs → use Tailwind utilities
- Custom visual styling that doesn't fit MUI patterns

### ❌ DON'T Use Tailwind For:
- Component logic (menus, selects, dialogs) → use MUI
- Theme-dependent colors → use MUI palette
- Complex accessibility requirements → use MUI

### ❌ DON'T Use Motion For:
- Simple hover states → use Tailwind transition
- Micro-interactions without spring physics
- Performance-critical animations → use CSS

### ❌ DON'T Mix Colors Systems
```tsx
// ❌ AVOID: Mixing hardcoded colors
<div className="bg-[#7C3AED]">

// ✅ GOOD: Use theme tokens
<div className="bg-brand-purple">  // CSS variable from index.css
<div sx={{ bgcolor: 'primary.main' }}>  // MUI theme

// ✅ GOOD: Use MUI + Tailwind together
<Button className="mt-4" variant="contained">
```

---

## 4. Component Patterns

### Pattern A: Generic UI Component (in `components/ui/mui/`)

```tsx
// components/ui/mui/Button.tsx
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface ButtonProps extends MuiButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <MuiButton
      className={cn(
        'rounded-lg',
        variant === 'outline' && 'border border-gray-300',
        className
      )}
      {...props}
    />
  );
}
```

### Pattern B: Common UI Component (in `components/ui/common/`)

```tsx
// components/ui/common/Modal.tsx
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn('p-6', className)}
        >
          <DialogTitle>{title}</DialogTitle>
          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
```

### Pattern C: Domain Component (in `components/courses/`, `components/tasks/`, etc.)

```tsx
// components/courses/CourseCard.tsx
import { Card } from '@/components/ui/common/Card';
import { Button } from '@/components/ui/mui/Button';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card hoverable className="p-6 cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${course.color}`}>
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">{course.name}</h3>
        </div>
        <Button variant="contained" className="mt-4">
          View Course
        </Button>
      </Card>
    </motion.div>
  );
}
```

### Pattern D: Page Orchestration (in `pages/`)

```tsx
// pages/Courses.tsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/mui/Button';
import { useCourses } from '@/features/courses';
import { CourseCard } from '@/components/courses/CourseCard';

export function CoursesPage() {
  const [showModal, setShowModal] = useState(false);
  const { courses, loading } = useCourses();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1>Your Courses</h1>
        <Button onClick={() => setShowModal(true)} startIcon={<Plus />}>
          New Course
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
```

### Pattern B: MUI with Motion Variants

```tsx
import { Box } from '@mui/material';
import { motion } from 'motion/react';

export function AnimatedCard({ children, isActive }) {
  return (
    <Box
      component={motion.div}
      animate={{
        scale: isActive ? 1.05 : 1,
        backgroundColor: isActive ? 'primary.main' : 'background.paper'
      }}
      className="flex flex-col gap-4 p-6"
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </Box>
  );
}
```

### Pattern C: Tailwind-First for Simple Layouts

```tsx
import { motion } from 'motion/react';

export function SimpleContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen gap-6 bg-bg-main"
    >
      {children}
    </motion.div>
  );
}
```

---

## 5. Color System & Theming

### MUI Theme (src/theme/muiTheme.ts)
- **Primary**: `#7C3AED` (brand-purple)
- **Secondary**: `#EC4899` (brand-pink)
- **Background**: `#FDF8FF`
- **Single source of truth** for all theme values

### Tailwind CSS (src/index.css)
```css
@theme {
  --color-brand-purple: #7C3AED;
  --color-brand-pink: #EC4899;
  --color-brand-blue: #3B82F6;
  --color-bg-main: #FDF8FF;
  --color-bg-card: #FFFFFF;
}
```

### Sync Rule
> **MUST** keep MUI theme and Tailwind CSS variables in sync.
> When updating brand colors, update both `src/theme/muiTheme.ts` and `src/index.css`.

---

## 6. Migration Plan

### Phase 1: Organize Current Code (Week 1)
- [ ] Analyze current `components/ui/reusable/` components
- [ ] Move domain-specific components to appropriate domain folders:
  - Course components → `components/courses/`
  - Task components → `components/tasks/`
  - Auth components → `components/auth/`
  - Dashboard components → `components/dashboard/`
- [ ] Move truly generic components to `components/ui/common/`
- [ ] Update all import paths in pages and features

### Phase 2: Create Business Logic Layer (Week 1-2)
- [ ] Create `features/*/hooks/` folders
- [ ] Move business logic from pages to custom hooks
- [ ] Create `services/` folder for API/Firebase abstraction
- [ ] Create `types/` folder for type definitions

### Phase 3: Refactor Existing Components (Week 2-3)
- [ ] Add Motion animations to domain components
- [ ] Replace hardcoded colors with theme tokens
- [ ] Ensure all UI components remain generic
- [ ] Verify separation between UI and business logic

---

## 7. Do/Don't Checklist

### ✅ DO
- Use MUI for complex interactive components (Dialog, Menu, Select) → `components/ui/mui/`
- Use Tailwind for layout and spacing (flex, grid, gap, p-*, m-*) → All components
- Use Motion for enter/exit animations (page transitions, stagger) → Domain components
- Place generic UI components in `components/ui/mui/` (Button, Card, Dialog)
- Place common components in `components/ui/common/` (Modal, Loading, EmptyState)
- Place domain components in `components/<domain>/` (CourseCard, TaskCard, LoginForm)
- Keep business logic in `features/*/hooks/` and `services/` (no JSX)
- Keep pages as orchestration only (no business logic)

### ❌ DON'T
- Don't put domain-specific components in `components/ui/` folders
- Don't mix business logic with UI components
- Don't put Firebase/API calls directly in UI components
- Don't use domain types in generic UI components
- Don't let generic UI components know about business concepts
- Don't put presentation logic in hooks/services
- Keep MUI theme as single source of truth
- Use `cn()` utility for class merging
- Create feature index files for clean exports
- Use TypeScript for all components
- Keep pages thin (orchestration only - call hooks, not business logic)

### ❌ DON'T
- Use MUI for simple containers → use `<div className="flex">`
- Mix hardcoded colors with theme → use theme tokens
- Duplicate MUI styles in Tailwind → pick ONE system
- Put business logic in components → use hooks/services
- Use MUI `styled()` for simple layout → use Tailwind classes
- Forget Motion for animations → add `<motion.div>` for page transitions
- Hardcode import paths → use path aliases `@/components/ui`
- Skip TypeScript types → always define `interface Props`

---

## 8. Import Conventions

### Path Aliases
```typescript
// MUI wrappers & reusable UI
import { Button, Card, Dialog } from '@/components/ui';

// Feature components
import { CourseCard, CourseCreateModal } from '@/features/courses/components';

// Layout components
import { Layout, Sidebar, TopNav } from '@/components/layout';

// Pages
import { Dashboard, Courses } from '@/pages';
```

---

## Related Documents
- `@/AGENTS.md` - Project overview and stack
- `@/.opencode/rules/architecture.md` - Architecture guidelines
- `@/src/theme/muiTheme.ts` - MUI theme configuration
- `@/src/index.css` - Tailwind v4 configuration