# Architecture Rules - saku-study-web

## Overview
This document defines the architectural guidelines for the saku-study-web project to ensure proper separation of concerns and maintainable code structure.

## Core Principles

### 1. Separation of Concerns
- **Business Logic**: Must be separated from UI components
- **Data Access**: Must be abstracted behind service layers
- **Presentation**: Should only handle UI state and rendering
- **Domain Types**: Must be centralized in `src/types/`

### 2. Feature-Based Organization
- All code must be organized by feature in `src/features/<feature>/`
- Each feature module must have its own:
  - `hooks/` - Custom hooks for data and business logic
  - `types/` - Feature-specific type definitions
  - `index.ts` - Public API exports

### 3. Service Layer Abstraction
- All data access must go through service layers in `src/services/`
- Firebase must be abstracted behind interfaces to allow future replacement
- Service implementations must be in `src/services/firebase/`
- Future API implementations will go in `src/services/api/`

### 4. Hook-Driven Data Flow
- All data fetching and business logic must be encapsulated in custom hooks
- Pages should only consume data from hooks, not implement business logic
- Hooks must be located in `src/hooks/` or within feature modules

## Directory Structure

### Required Structure
```
src/
├── types/                    # Centralized type definitions
│   ├── index.ts
│   ├── user.ts
│   ├── course.ts
│   ├── task.ts
│   └── schedule.ts
├── services/                 # Service layer abstraction
│   ├── index.ts
│   ├── firebase/            # Firebase implementations
│   │   ├── config.ts
│   │   ├── firebaseClient.ts
│   │   ├── authService.ts
│   │   ├── courseService.ts
│   │   ├── taskService.ts
│   │   └── scheduleService.ts
│   └── api/                 # Future API implementations
│       └── apiClient.ts
├── hooks/                    # Custom hooks
│   ├── index.ts
│   ├── useAuth.ts
│   ├── useCourses.ts
│   ├── useTasks.ts
│   └── useSchedule.ts
├── features/                 # Feature-based organization
│   ├── auth/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   ├── courses/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   ├── tasks/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   └── schedule/
│       ├── hooks/
│       ├── types/
│       └── index.ts
├── components/                          # UI COMPONENTS (organized by domain)
│   ├── ui/                              # SHARED UI SYSTEM
│   │   ├── mui/                         # Generic MUI wrappers (Button, Card,Dialog)
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
├── pages/                    # Thin orchestrators (no business logic)
└── lib/                     # Utility functions
```

### Forbidden Patterns
- ❌ Pages containing business logic or mock data
- ❌ Direct Firebase SDK imports in components/pages
- ❌ Scattered type definitions throughout the codebase
- ❌ Components accessing data directly without hooks
- ❌ Cross-feature dependencies without proper abstraction

## Service Layer Requirements

### Interface Contracts
```typescript
// Example service interface contract
export interface ICourseService {
  getCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course>;
  createCourse(dto: CreateCourseDTO): Promise<Course>;
  updateCourse(id: string, dto: Partial<Course>): Promise<Course>;
  deleteCourse(id: string): Promise<void>;
}
```

### Firebase Abstraction
- All Firebase operations must go through service layer
- Services must implement interfaces to allow swapping
- Firebase SDK must only be imported in `src/services/firebase/`
- No Firebase SDK imports allowed in UI components

## Hook Design Guidelines

### Business Logic Hooks
- Must encapsulate all data fetching and business logic
- Must handle loading/error states
- Must provide clear API for components to interact with
- Must be reusable across different components

### Data Flow Pattern
```typescript
// Component uses hook
const MyComponent = () => {
  const { data, loading, error, refetch } = useMyHook();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <PresentationalComponent data={data} onRefresh={refetch} />;
};
```

## Testing Considerations

### Service Layer Testing
- Services must be easily mockable for unit tests
- Business logic must be testable without UI dependencies
- Data access patterns must be verifiable in tests

### Component Testing
- Components must be testable with mocked hooks
- Presentation logic must be separate from data logic
- UI interactions must be testable independently

## Migration Guidelines

### From Current Structure
1. **Phase 1**: Create types folder and centralize all type definitions
2. **Phase 2**: Create service layer with Firebase abstractions
3. **Phase 3**: Build custom hooks that consume services
4. **Phase 4**: Create feature modules and move related code
5. **Phase 5**: Refactor pages to use hooks and feature components

### Validation Checklist
- [ ] No direct Firebase imports in UI components
- [ ] All business logic moved to hooks/services
- [ ] Types centralized in `src/types/`
- [ ] Features organized in `src/features/`
- [ ] Pages only orchestrate data from hooks
- [ ] Service interfaces allow future backend replacement

## Enforcement
These rules must be followed for all new code and refactoring efforts. Code reviews will validate compliance with these architectural guidelines.