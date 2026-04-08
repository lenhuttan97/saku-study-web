# TASK-011C: Update All Components to Use Translation Keys

**Feature**: FT-011: Internationalization (i18n)  
**Status**: pending  
**Estimate**: 3h  
**Priority**: High

## Description

Replace all hardcoded text in components with translation keys using useTranslation hook.

## Scope

### Components to Update

| Layer | Files |
|-------|-------|
| Layout | `src/components/layout/Layout.tsx`, `Sidebar.tsx`, `TopNav.tsx` |
| UI | `src/components/ui/` (16 components) |
| Pages | `src/pages/` (9 pages) |

### Example Transformation

**Before (hardcoded):**
```tsx
<h1>Trang chủ</h1>
<Button>Thêm môn học</Button>
<Link>Đăng xuất</Link>
```

**After (translation):**
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<h1>{t('dashboard.title')}</h1>
<Button>{t('courses.addCourse')}</Button>
<Link>{t('common.logout')}</Link>
```

## Requirements

1. Add `useTranslation` hook to all functional components
2. Replace hardcoded text with `t('key.path')` calls
3. Group translation keys in locales files by feature
4. Test that all text displays correctly

## Acceptance Criteria

- [ ] All hardcoded Vietnamese text replaced with translation keys
- [ ] No console warnings about missing translations
- [ ] Components render correctly in both languages