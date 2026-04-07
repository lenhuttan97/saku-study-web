# TASK-0009-[UI] Define color design tokens

## Overview
Define comprehensive CSS variables for the full color palette in src/index.css to replace hardcoded Tailwind color classes throughout the project.

## Description
Create a complete set of CSS custom properties (variables) that map to appropriate Tailwind color values. This includes text colors, background colors, border colors, semantic colors, and hover/state colors.

## Acceptance Criteria
- [ ] Text colors defined: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-inverse`
- [ ] Background colors defined: `--color-bg-surface`, `--color-bg-elevated`, `--color-bg-subtle`, `--color-bg-dark`
- [ ] Border colors defined: `--color-border-default`, `--color-border-subtle`, `--color-border-strong`
- [ ] Semantic colors defined: `--color-success`, `--color-warning`, `--color-danger`, `--color-info`
- [ ] Hover/State colors defined: `--color-hover-subtle`, `--color-hover-strong`
- [ ] Each variable mapped to appropriate Tailwind color values (slate palette equivalents)
- [ ] Variables documented with comments explaining their usage

## Dependencies
None - This is the foundational task

## Scope
UI

## Priority
High

## Estimate
1h

## Status
pending

## Details

### Text Colors Mapping
| Variable | Tailwind Value | Usage |
|----------|----------------|-------|
| --color-text-primary | slate-900 | Main text, headings |
| --color-text-secondary | slate-600 | Secondary text, descriptions |
| --color-text-tertiary | slate-400 | Placeholder, disabled text |
| --color-text-inverse | white | Text on dark backgrounds |

### Background Colors Mapping
| Variable | Tailwind Value | Usage |
|----------|----------------|-------|
| --color-bg-surface | slate-50 | Card backgrounds |
| --color-bg-elevated | white | Elevated surfaces, modals |
| --color-bg-subtle | slate-100 | Subtle highlights |
| --color-bg-dark | slate-900 | Dark sections |

### Border Colors Mapping
| Variable | Tailwind Value | Usage |
|----------|----------------|-------|
| --color-border-default | slate-200 | Default borders |
| --color-border-subtle | slate-100 | Subtle dividers |
| --color-border-strong | slate-400 | Strong borders |

### Semantic Colors Mapping
| Variable | Tailwind Value | Usage |
|----------|----------------|-------|
| --color-success | emerald-500 | Success states |
| --color-warning | orange-500 | Warning states |
| --color-danger | red-500 | Error/danger states |
| --color-info | blue-500 | Info states |

### Hover/State Colors Mapping
| Variable | Tailwind Value | Usage |
|----------|----------------|-------|
| --color-hover-subtle | slate-100 | Subtle hover |
| --color-hover-strong | slate-200 | Strong hover |
