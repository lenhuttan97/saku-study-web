# Migration Decision Plan: Architecture Reconciliation

## Overview

This document outlines the plan to resolve architecture conflicts between:
- **Feature-based modules** (`src/features/*`)
- **Domain-based components** (`src/components/<domain>`)

---

## A) Recommended Architecture (Single Source of Truth)

### Architecture Decision: Feature-First Organization

Based on the existing `.opencode/rules/architecture.md`, the recommended single source of truth is **Feature-Based Organization** with these principles:

| Layer | Location | Purpose |
|-------|----------|---------|
| **Feature Components** | `src/features/<feature>/components/` | UI components specific to a feature |
| **Feature Hooks** | `src/features/<feature>/hooks/` | Business logic for a feature |
| **Feature Types** | `src/features/<feature>/types/` | Types specific to a feature |
| **Shared UI Components** | `src/components/ui/mui/` | Generic MUI wrappers |
| **Shared Reusable** | `src/components/ui/reusable/` | Cross-feature reusable components |
| **Layout** | `src/components/layout/` | Shell components |
| **Pages** | `src/pages/` | Thin orchestrators only |

### Why Feature-First?
1. ✅ Aligns with existing `.opencode/rules/architecture.md`
2. ✅ Keeps related code together (components + hooks + types)
3. ✅ Easier to find related files
4. ✅ Clear ownership per feature
5. ✅ Allows feature-level testing and deployment

### What stays in `components/ui/reusable/`:
- Generic widgets usable across multiple features (FocusWidget, StreakWidget)
- Auth components (SocialLoginButtons, AuthFormHeader)
- Layout utilities (SettingsSidebar)
- MUI wrappers (Button, Card, Input, etc.)

---

## B) Component Mapping

### Current State vs Target State

#### Duplicated Components (MUST RESOLVE)

| Component | Current Location 1 | Current Location 2 | Target Location | Action |
|-----------|-------------------|-------------------|-----------------|--------|
| `ScheduleItem` | `src/features/schedule/components/` | `src/components/ui/reusable/` | `src/features/schedule/components/` | Keep in features, DELETE from reusable |
| `ScheduleEvent` | `src/components/ui/reusable/` | ❌ Not in features | `src/features/schedule/components/` | Move to features |
| `ScheduleGrid` | `src/components/ui/reusable/` | `src/features/schedule/components/ScheduleGrid.tsx` | `src/features/schedule/components/` | Keep in features, DELETE from reusable |

#### Feature Components (Keep in features/)

| Feature | Components | Target Location |
|---------|------------|-----------------|
| **schedule** | ScheduleItem, ScheduleEvent, ScheduleGrid | `src/features/schedule/components/` |
| **tasks** | KanbanColumn, TaskCard, TodoItem | `src/features/tasks/components/` |
| **courses** | CourseCard, CourseHeader, CourseTasksList, MaterialItem, CourseScheduleGrid | `src/features/courses/components/` |

#### Shared Components (Keep in components/ui/)

| Component | Location | Reason |
|-----------|----------|--------|
| `Button` | `src/components/ui/mui/` | Generic MUI wrapper |
| `Card` | `src/components/ui/mui/` | Generic MUI wrapper |
| `Input` | `src/components/ui/mui/` | Generic MUI wrapper |
| `SearchInput` | `src/components/ui/reusable/` | Cross-feature reusable |
| `FocusWidget` | `src/components/ui/reusable/` | Dashboard-specific |
| `StreakWidget` | `src/components/ui/reusable/` | Dashboard-specific |
| `QuoteCard` | `src/components/ui/reusable/` | Dashboard-specific |
| `SocialLoginButtons` | `src/components/ui/reusable/` | Auth domain |
| `AuthFormHeader` | `src/components/ui/reusable/` | Auth domain |
| `SettingsSidebar` | `src/components/ui/reusable/` | Settings page |

#### Layout Components (Keep in components/layout/)

| Component | Reason |
|-----------|--------|
| `Layout` | Shell component |
| `Sidebar` | Navigation |
| `TopNav` | Header |

#### Routing Components (Keep in components/routing/)

| Component | Reason |
|-----------|--------|
| `ProtectedRoute` | Auth guard |
| `PublicOnlyRoute` | Auth guard |

---

## C) Migration Steps (Safe Order with Validation Checkpoints)

### Phase 1: Component Deduplication (Safety: HIGH)

**Goal**: Remove duplicate ScheduleItem, resolve imports

**Steps**:
1. ✅ **Checkpoint 1**: Verify both ScheduleItem files are identical
2. Update `src/components/ui/index.ts` to re-export from features:
   ```typescript
   // BEFORE: export { ScheduleItem } from './reusable/ScheduleItem';
   // AFTER: export { ScheduleItem } from '@/features/schedule/components';
   ```
3. Update all imports from `@/components/ui` to use `@/features/schedule`
4. Delete `src/components/ui/reusable/ScheduleItem.tsx`
5. ✅ **Checkpoint 2**: Verify no broken imports

**Files to Update**:
- `src/components/ui/index.ts`
- `src/pages/Dashboard.tsx` (change import to `@/features/schedule`)

**Estimated**: 30 min

---

### Phase 2: Schedule Feature Cleanup (Safety: HIGH)

**Goal**: Consolidate schedule components in features

**Steps**:
1. ✅ **Checkpoint 1**: Identify all schedule-related files in both locations
2. Move `ScheduleEvent` from `components/ui/reusable/` to `features/schedule/components/`
3. Move `ScheduleGrid` (if different) from `components/ui/reusable/` to `features/schedule/components/`
4. Update `src/features/schedule/components/index.ts` to export new components
5. Update `src/features/schedule/index.ts` to re-export
6. Delete from `components/ui/reusable/`
7. ✅ **Checkpoint 2**: Build passes, no missing imports

**Files to Update**:
- `src/features/schedule/components/ScheduleEvent.tsx` (move)
- `src/features/schedule/components/ScheduleGrid.tsx` (move)
- `src/features/schedule/components/index.ts`
- `src/components/ui/index.ts` (remove exports)

**Estimated**: 1 hour

---

### Phase 3: Page Thinification (Safety: MEDIUM)

**Goal**: Move business logic from pages to hooks

#### 3a. Schedule Page
**Steps**:
1. ✅ **Checkpoint 1**: Identify business logic in `pages/Schedule.tsx`
   - `scheduleItems` mock data
   - `getPosition()` calculation
   - `getHeight()` calculation
   - View state (`currentWeek`, `viewMode`)
2. Create `src/features/schedule/hooks/useSchedule.ts`:
   ```typescript
   export function useSchedule() {
     // Move all business logic here
     // Return: scheduleItems, getPosition, getHeight, currentWeek, viewMode
   }
   ```
3. Refactor `pages/Schedule.tsx` to use hook
4. ✅ **Checkpoint 2**: Page reduced to ~50 lines, build passes

#### 3b. Tasks Page
**Steps**:
1. ✅ **Checkpoint 1**: Identify business logic in `pages/Tasks.tsx`
   - `tasks` state (mock data)
   - `columns` definition
2. Create `src/features/tasks/hooks/useTasks.ts`:
   ```typescript
   export function useTasks() {
     // Return: tasks, columns, addTask, updateTask, deleteTask
   }
   ```
3. Refactor `pages/Tasks.tsx` to use hook
4. ✅ **Checkpoint 2**: Page reduced to ~30 lines, build passes

#### 3c. Dashboard Page
**Steps**:
1. ✅ **Checkpoint 1**: Identify business logic in `pages/Dashboard.tsx`
   - `scheduleItems` mock data
   - `todoItems` mock data
   - Animation variants
2. Create `src/features/dashboard/hooks/useDashboard.ts` (new feature):
   ```typescript
   export function useDashboard() {
     // Return: scheduleItems, todoItems, variants
   }
   ```
3. Refactor `pages/Dashboard.tsx` to use hook
4. ✅ **Checkpoint 2**: Page reduced to ~40 lines, build passes

**Estimated**: 2-3 hours

---

### Phase 4: Import Pattern Standardization (Safety: HIGH)

**Goal**: Consistent import patterns across codebase

**Steps**:
1. ✅ **Checkpoint 1**: Audit all import patterns
2. Create migration rules:
   - Feature components: `import { X } from '@/features/<feature>'`
   - Shared UI: `import { X } from '@/components/ui'`
   - Layout: `import { X } from '@/components/layout'`
3. Update `src/components/ui/index.ts` to re-export from features:
   ```typescript
   // Re-export from features
   export { ScheduleItem, ScheduleEvent, ScheduleGrid } from '@/features/schedule';
   export { KanbanColumn, TaskCard, TodoItem } from '@/features/tasks';
   export { CourseCard, CourseHeader } from '@/features/courses';
   ```
4. ✅ **Checkpoint 2**: All imports work, no circular dependencies

**Files to Update**:
- `src/components/ui/index.ts`
- All files with mixed imports

**Estimated**: 1 hour

---

### Phase 5: Type Centralization (Safety: MEDIUM)

**Goal**: Ensure types are properly organized

**Steps**:
1. ✅ **Checkpoint 1**: Audit type definitions in features vs `src/types/`
2. Move feature-specific types to `src/features/<feature>/types/`
3. Keep shared types in `src/types/`
4. Update all imports to use centralized types
5. ✅ **Checkpoint 2**: Build passes, no "any" types

**Estimated**: 1 hour

---

### Phase 6: Index File Cleanup (Safety: HIGH)

**Goal**: Clean up index exports

**Steps**:
1. ✅ **Checkpoint 1**: Review all index.ts files
2. Ensure each feature has clean public API in `index.ts`
3. Remove re-exports that cause confusion
4. Add JSDoc to explain purpose
5. ✅ **Checkpoint 2**: Can import from feature root

**Estimated**: 30 min

---

## Migration Order Summary

| Phase | Action | Safety | Duration |
|-------|--------|--------|----------|
| 1 | Component Deduplication | HIGH | 30 min |
| 2 | Schedule Feature Cleanup | HIGH | 1 hour |
| 3a | Schedule Page Thinification | MEDIUM | 45 min |
| 3b | Tasks Page Thinification | MEDIUM | 45 min |
| 3c | Dashboard Page Thinification | MEDIUM | 45 min |
| 4 | Import Pattern Standardization | HIGH | 1 hour |
| 5 | Type Centralization | MEDIUM | 1 hour |
| 6 | Index File Cleanup | HIGH | 30 min |

**Total Estimated**: ~6 hours

---

## D) Timeline and Effort Estimation

### Effort by Phase

| Phase | Complexity | Risk | Dependencies |
|-------|------------|------|---------------|
| 1. Deduplication | Low | Low | None |
| 2. Schedule Cleanup | Low | Low | Phase 1 |
| 3. Page Thinification | Medium | Medium | Phase 2 |
| 4. Import Standardization | Medium | Low | Phase 3 |
| 5. Type Centralization | Medium | Medium | Phase 4 |
| 6. Index Cleanup | Low | Low | None |

### Recommended Schedule

```
Week 1:
- Phase 1 (30 min)
- Phase 2 (1 hour)
- Phase 4 (1 hour) - can parallel with Phase 2

Week 2:
- Phase 3a (45 min)
- Phase 3b (45 min)
- Phase 3c (45 min)

Week 3:
- Phase 5 (1 hour)
- Phase 6 (30 min)
```

### Validation Checkpoints After Each Phase

After each phase, run:
```bash
npm run lint    # TypeScript check
npm run build   # Production build
```

If either fails → **STOP** and fix before proceeding.

---

## E) Rollback Plan

### If Issues Occur During Migration

#### Quick Rollback (Same Session)
1. Revert file changes using version control:
   ```bash
   git checkout -- .
   ```
2. Run validation again

#### Rollback by Phase

| Phase | What to Revert |
|-------|----------------|
| 1 | Restore `components/ui/index.ts`, restore deleted files |
| 2 | Move files back, update index exports |
| 3 | Restore page files, delete created hooks |
| 4 | Restore original import patterns |
| 5 | Restore type locations |
| 6 | Restore index files |

#### Full Rollback
```bash
git stash
# Or
git reset --hard HEAD~<commit>
```

### Post-Migration Verification

After full migration, run these checks:

1. **Import Check**:
   ```bash
   grep -r "from '@/components/ui/reusable/Schedule" src/
   # Should return nothing
   ```

2. **Page Size Check**:
   ```bash
   wc -l src/pages/Schedule.tsx src/pages/Tasks.tsx src/pages/Dashboard.tsx
   # Should be < 100 lines each
   ```

3. **Feature Import Check**:
   ```bash
   grep -r "from '@/features" src/pages/
   # Should return imports from features
   ```

4. **Build Check**:
   ```bash
   npm run build
   # Must pass
   ```

---

## Summary

### Key Decisions

1. **Single Source of Truth**: Feature-based organization (`src/features/<feature>/`)
2. **ScheduleItem**: Keep in `src/features/schedule/components/`, remove from `components/ui/reusable/`
3. **ScheduleEvent/ScheduleGrid**: Move from `components/ui/reusable/` to `features/schedule/components/`
4. **Pages**: Must be thin orchestrators, no business logic
5. **Imports**: Feature components from `@/features/<feature>`, shared UI from `@/components/ui`

### Migration Priority

1. **HIGH SAFETY**: Component deduplication, import standardization
2. **MEDIUM SAFETY**: Page thinification, type centralization

### Success Criteria

- ✅ No duplicate components
- ✅ Pages < 100 lines each
- ✅ All business logic in hooks
- ✅ Clean import patterns
- ✅ Build passes
- ✅ Lint passes