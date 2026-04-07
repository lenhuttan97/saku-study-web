# UI Component Library

## Status
done

## Description
16 reusable UI components in `src/components/ui/`. All components use MUI + Tailwind dual styling.

## Components
| Component | File | Description |
|-----------|------|-------------|
| Button | `src/components/ui/Button.tsx` | MUI Button wrapper with Tailwind variants |
| Input | `src/components/ui/Input.tsx` | MUI TextField wrapper with label |
| Card | `src/components/ui/Card.tsx` | MUI Paper wrapper with elevation |
| CardHeader | `src/components/ui/Card.tsx` | Card header component |
| CardContent | `src/components/ui/Card.tsx` | Card content component |
| Dialog | `src/components/ui/Dialog.tsx` | MUI Dialog wrapper |
| DialogHeader | `src/components/ui/Dialog.tsx` | Dialog header |
| DialogContent | `src/components/ui/Dialog.tsx` | Dialog content area |
| DialogActions | `src/components/ui/Dialog.tsx` | Dialog action buttons |
| Tabs | `src/components/ui/Tabs.tsx` | MUI Tabs wrapper |
| Badge | `src/components/ui/Badge.tsx` | MUI Badge wrapper |
| List | `src/components/ui/List.tsx` | MUI List wrapper |
| ListItem | `src/components/ui/List.tsx` | MUI ListItem wrapper |
| ListItemButton | `src/components/ui/List.tsx` | MUI ListItemButton wrapper |
| ListItemIcon | `src/components/ui/List.tsx` | MUI ListItemIcon wrapper |
| ListItemText | `src/components/ui/List.tsx` | MUI ListItemText wrapper |
| ListSubheader | `src/components/ui/List.tsx` | MUI ListSubheader wrapper |
| ToggleButtonGroup | `src/components/ui/ToggleButton.tsx` | MUI ToggleButtonGroup wrapper |
| ProgressBar | `src/components/ui/Progress.tsx` | Custom progress bar component |
| SearchInput | `src/components/ui/SearchInput.tsx` | Search input with icon |
| SocialLoginButtons | `src/components/ui/SocialLoginButtons.tsx` | Social login button group |
| AuthFormHeader | `src/components/ui/AuthFormHeader.tsx` | Auth form header with logo |
| ScheduleEvent | `src/components/ui/ScheduleEvent.tsx` | Schedule event card |
| ScheduleGrid | `src/components/ui/ScheduleGrid.tsx` | Schedule grid utilities |
| TaskCard | `src/components/ui/TaskCard.tsx` | Task card for Kanban |
| KanbanColumn | `src/components/ui/KanbanColumn.tsx` | Kanban column component |

## Export
All components exported from `src/components/ui/index.ts`

## Usage
```tsx
import { Button, Card, Input, Dialog } from '@/components/ui';
```

## Next Steps
1. Add more specialized components as needed
2. Create component stories for documentation
3. Add unit tests for components

## Dependencies
- MUI (Material UI)
- Tailwind CSS v4
- lucide-react icons
