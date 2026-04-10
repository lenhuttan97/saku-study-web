# TASK-011D: Add Language Selector in Settings

**Feature**: FT-011: Internationalization (i18n)  
**Status**: pending  
**Estimate**: 30m  
**Priority**: Medium

## Description

Add language selector in Settings page to allow users to switch between Vietnamese and English.

## Requirements

1. Update Settings page to include Language section
2. Add language dropdown/selector with options:
   - Tiếng Việt (Vietnamese)
   - English (English)
3. On language change:
   - Update i18n language
   - Save preference to localStorage (key: 'language')
   - Update UI immediately without page reload

4. Integrate with existing Settings tabs structure

## UI Reference

From design mockup `/design-mockup/cài_đặt_light_mode_không_sidebar/code.html`:
- Settings page has sidebar with sections
- Language selector should appear alongside Theme toggle

## Implementation Notes

- Use `i18n.changeLanguage(langCode)` to switch language
- Listen for language changes to persist to localStorage
- Add to Settings > Localization section

## Acceptance Criteria

- [ ] Language selector visible in Settings
- [ ] Switching language updates all text immediately
- [ ] Language preference persists after page reload
- [ ] Both Vietnamese and English work correctly