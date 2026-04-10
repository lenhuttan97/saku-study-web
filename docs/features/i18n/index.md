# FT-011: Internationalization (i18n)

**Status**: pending  
**Feature**: Multi-language support for Sanctuary application

## Overview

Add internationalization (i18n) support to allow users to switch between languages. The application currently has hardcoded Vietnamese text in design mockups and should support both Vietnamese and English.

## Pages

- Language selection in Settings
- All UI text uses translation keys
- Language persisted in localStorage

## Description

Implement multi-language support using react-i18next. Support Vietnamese (default) and English. Store language preference in localStorage. Update all hardcoded text to use translation keys.

## Technical Stack

- `i18next` - Core i18n library
- `react-i18next` - React bindings for i18n
- Translation files in `/locales/` folder (vi.json, en.json)

## Subtasks

| Subtask | Description | Estimate |
|---------|-------------|----------|
| TASK-011A | Install and configure i18next | 30m |
| TASK-011B | Create translation files (vi, en) | 1h |
| TASK-011C | Update all components to use translation keys | 3h |
| TASK-011D | Add language selector in Settings | 30m |
| TASK-011E | Test and verify all languages work | 1h |

## Related Tasks

- [TASK-007B: Theme & Appearance Settings](../settings/TASK-007B-theme.md) - Add language selector alongside theme toggle

## Status

- [ ] Pending implementation