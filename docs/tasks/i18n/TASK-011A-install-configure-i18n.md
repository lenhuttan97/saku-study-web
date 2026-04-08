# TASK-011A: Install and Configure i18next

**Feature**: FT-011: Internationalization (i18n)  
**Status**: pending  
**Estimate**: 30m  
**Priority**: Medium

## Description

Install and configure i18next with react-i18next for the React application.

## Requirements

1. Install dependencies:
   ```bash
   npm install i18next react-i18next
   ```

2. Create i18n configuration file at `src/i18n/index.ts`:
   - Configure i18next with Vietnamese as default language
   - Set up language detection from localStorage
   - Enable fallback to Vietnamese if translation missing

3. Import and initialize i18n in `src/main.tsx`

4. Create folder structure for translation files:
   ```
   src/locales/
   ├── vi.json
   └── en.json
   ```

## Acceptance Criteria

- [ ] i18next installed and working
- [ ] Default language is Vietnamese
- [ ] Language can be changed via i18n instance
- [ ] No console errors on app load