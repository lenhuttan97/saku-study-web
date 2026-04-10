# Kế hoạch Refactor Kiến trúc - Sanctuary

## Tổng quan & Quyết định Kiến trúc

Tài liệu này trình bày kế hoạch refactor để đưa cấu trúc project về theo kiến trúc **Feature-First** — single source of truth từ `.opencode/rules/architecture.md`.

### Nguyên tắc Kiến trúc (Single Source of Truth)

| Layer | Location | Mục đích |
|-------|----------|----------|
| **Feature Components** | `src/features/<feature>/components/` | UI components specific to a feature |
| **Feature Hooks** | `src/features/<feature>/hooks/` | Business logic cho feature |
| **Feature Types** | `src/features/<feature>/types/` | Types specific to feature |
| **Shared UI Components** | `src/components/ui/mui/` | Generic MUI wrappers |
| **Shared Reusable** | `src/components/ui/reusable/` | Cross-feature reusable components |
| **Layout** | `src/components/layout/` | Shell components |
| **Pages** | `src/pages/` | Thin orchestrators only |

### Điều gì ở lại `components/ui/reusable/`

- Generic widgets: FocusWidget, StreakWidget, QuoteCard
- Auth components: SocialLoginButtons, AuthFormHeader
- Layout utilities: SettingsSidebar
- MUI wrappers: Button, Card, Input

### Điều gì chuyển sang `features/`

- Course components → `src/features/courses/components/`
- Task components → `src/features/tasks/components/`
- Schedule components → `src/features/schedule/components/`

---

## Hiện trạng Ngắn gọn

### Cấu trúc Hiện tại

```
src/
├── components/ui/reusable/    # Tất cả UI components (flat structure)
├── pages/                    # Pages chứa mock data + business logic
├── context/AuthContext.tsx   # Auth logic trực tiếp trong context
├── firebase/config.ts         # Firebase config ở root
```

### Cấu trúc Mục tiêu

```
src/
├── features/                 # Feature-based organization
│   ├── courses/
│   ├── tasks/
│   └── schedule/
├── hooks/                    # Custom hooks cho business logic
├── services/                  # Service layer abstraction
├── types/                     # Centralized type definitions
├── components/ui/             # Shared UI system
└── pages/                    # Thin orchestrators
```

---

## Gap Chính

| Gap | Mức độ Ưu tiên | Chiến lược |
|-----|---------------|------------|
| Components phân tán trong reusable/ | Cao | Di chuyển theo feature |
| Pages chứa mock data + business logic | Cao | Thinify → hooks |
| AuthContext chứa logic | Trung bình | Extract to hook |
| Trùng lặp components (ScheduleItem) | Cao | Deduplicate → keep in features |

---

## Kế hoạch Thực thi Theo Phase

### Phase 1: Component Deduplication (An toàn: Cao)

**Mục tiêu:** Loại bỏ trùng lặp ScheduleItem, resolve imports

**Các bước:**
1. Verify cả 2 file ScheduleItem identical
2. Update `src/components/ui/index.ts` re-export từ features
3. Update imports trong pages → `@/features/schedule`
4. Delete `src/components/ui/reusable/ScheduleItem.tsx`
5. **Checkpoint:** Verify không broken imports

**Files cần update:**
- `src/components/ui/index.ts`
- `src/pages/Dashboard.tsx`

**Ước lượng:** 30 phút

---

### Phase 2: Schedule Feature Cleanup (An toàn: Cao)

**Mục tiêu:** Consolidate schedule components trong features

**Các bước:**
1. Identify all schedule-related files ở cả 2 locations
2. Move ScheduleEvent từ `components/ui/reusable/` → `features/schedule/components/`
3. Move ScheduleGrid (nếu khác) → `features/schedule/components/`
4. Update feature index exports
5. Delete from `components/ui/reusable/`
6. **Checkpoint:** Build passes

**Files cần update:**
- `src/features/schedule/components/ScheduleEvent.tsx`
- `src/features/schedule/components/ScheduleGrid.tsx`
- `src/features/schedule/components/index.ts`
- `src/components/ui/index.ts` (remove exports)

**Ước lượng:** 1 giờ

---

### Phase 3: Page Thinification (An toàn: Trung bình)

**Mục tiêu:** Di chuyển business logic từ pages sang hooks

#### 3a. Schedule Page
1. Identify business logic trong `pages/Schedule.tsx`:
   - `scheduleItems` mock data
   - `getPosition()`, `getHeight()` calculations
2. Create `src/features/schedule/hooks/useSchedule.ts`
3. Refactor page → sử dụng hook
4. **Checkpoint:** Page < 50 lines, build passes

#### 3b. Tasks Page
1. Identify business logic trong `pages/Tasks.tsx`
2. Create `src/features/tasks/hooks/useTasks.ts`
3. Refactor page → sử dụng hook
4. **Checkpoint:** Page < 30 lines

#### 3c. Dashboard Page
1. Identify business logic trong `pages/Dashboard.tsx`
2. Create `src/features/dashboard/hooks/useDashboard.ts`
3. Refactor page → sử dụng hook
4. **Checkpoint:** Page < 40 lines

**Ước lượng:** 2-3 giờ

---

### Phase 4: Import Pattern Standardization (An toàn: Cao)

**Mục tiêu:** Consistent import patterns across codebase

**Các bước:**
1. Audit all import patterns
2. Create migration rules:
   - Feature components: `import { X } from '@/features/<feature>'`
   - Shared UI: `import { X } from '@/components/ui'`
3. Update `src/components/ui/index.ts` re-export từ features
4. **Checkpoint:** All imports work, no circular deps

**Files cần update:**
- `src/components/ui/index.ts`
- All files with mixed imports

**Ước lượng:** 1 giờ

---

### Phase 5: Type Centralization (An toàn: Trung bình)

**Mục tiêu:** Đảm bảo types được tổ chức đúng

**Các bước:**
1. Audit type definitions in features vs `src/types/`
2. Move feature-specific types → `src/features/<feature>/types/`
3. Keep shared types in `src/types/`
4. Update all imports → centralized types
5. **Checkpoint:** Build passes, no "any"

**Ước lượng:** 1 giờ

---

### Phase 6: Index File Cleanup (An toàn: Cao)

**Mục tiêu:** Clean index exports

**Các bước:**
1. Review all index.ts files
2. Ensure each feature có clean public API
3. Remove re-exports gây confuse
4. Add JSDoc giải thích purpose
5. **Checkpoint:** Can import from feature root

**Ước lượng:** 30 phút

---

## Timeline Tổng hợp

| Phase | Mô tả | An toàn | Ước lượng |
|-------|-------|--------|----------|
| 1 | Component Deduplication | Cao | 30 min |
| 2 | Schedule Feature Cleanup | Cao | 1 giờ |
| 3a | Schedule Page Thinification | Trung bình | 45 min |
| 3b | Tasks Page Thinification | Trung bình | 45 min |
| 3c | Dashboard Page Thinification | Trung bình | 45 min |
| 4 | Import Pattern Standardization | Cao | 1 giờ |
| 5 | Type Centralization | Trung bình | 1 giờ |
| 6 | Index File Cleanup | Cao | 30 min |
| **TỔNG** | | | **~6 giờ** |

---

## Validation Checkpoints

Sau mỗi phase, chạy:

```bash
npm run lint    # TypeScript check
npm run build   # Production build
```

Nếu fail → **DỪNG** và fix trước khi tiếp tục.

### Post-Migration Verification

1. **Import Check:**
   ```bash
   grep -r "from '@/components/ui/reusable/Schedule" src/
   # Should return nothing
   ```

2. **Page Size Check:**
   ```bash
   wc -l src/pages/Schedule.tsx src/pages/Tasks.tsx src/pages/Dashboard.tsx
   # Should be < 100 lines each
   ```

3. **Build Check:**
   ```bash
   npm run build
   # Must pass
   ```

---

## Risk-First Notes

| Risk | Impact | Mitigation |
|------|--------|------------|
| Import path breaks | Medium | Run build sau mỗi move |
| Pages break | Medium | Manual test sau changes |
| Duplicate files | Low | Verify before delete |
| Unknown issues | Low | Allow buffer time |

### Pre-Implementation Notes

1. **Phase 3 status:** Verify course/task components trước khi start Phase 3. Nếu chưa move, consider completing trước hoặc làm together.

2. **Schedule page dependencies:** Có thể có complex logic. Test kỹ sau khi move components.

3. **Feature module pattern:** Once schedule done, pattern established for future features.

4. **Buffer time:** Add 20% buffer to all estimates.

---

## Rollback Plan

### Quick Rollback (Same Session)

```bash
git checkout -- .
```

### Rollback by Phase

| Phase | What to Revert |
|-------|--------------|
| 1 | Restore components/ui/index.ts, restore deleted files |
| 2 | Move files back, update index exports |
| 3 | Restore page files, delete created hooks |
| 4 | Restore original import patterns |
| 5 | Restore type locations |
| 6 | Restore index files |

### Full Rollback

```bash
git stash
# Or
git reset --hard HEAD~<commit>
```

---

## Summary

### Key Decisions

1. **Single Source of Truth:** Feature-based organization (`src/features/<feature>/`)
2. **ScheduleItem:** Keep in `src/features/schedule/components/`, remove from `components/ui/reusable/`
3. **ScheduleEvent/ScheduleGrid:** Move from `components/ui/reusable/` → `features/schedule/components/`
4. **Pages:** Must be thin orchestrators, no business logic
5. **Imports:** Feature components from `@/features/<feature>`, shared UI from `@/components/ui`

### Success Criteria

- ✅ No duplicate components
- ✅ Pages < 100 lines each
- ✅ All business logic in hooks
- ✅ Clean import patterns
- ✅ Build passes
- ✅ Lint passes