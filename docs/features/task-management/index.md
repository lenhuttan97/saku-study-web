# Task Management (Kanban)

## Status
ui-done

## Description
Kanban board with 3 columns (Upcoming, In Progress, Completed), drag-and-drop task management UI, search and filter functionality. Backend integration pending.

## Pages
- `src/pages/Tasks.tsx` - Kanban board with task columns

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| KanbanColumn | `src/components/ui/KanbanColumn.tsx` | Column for task status |
| TaskCard | `src/components/ui/TaskCard.tsx` | Individual task card |
| SearchInput | `src/components/ui/SearchInput.tsx` | Task search |
| Button | `src/components/ui/Button.tsx` | Action buttons |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/tasks` | Tasks.tsx | Protected |

## Features
- [x] Kanban board with 3 columns (Upcoming, In Progress, Completed)
- [x] Task cards with title, priority, due date
- [x] Priority indicators (high, medium, low)
- [x] Search tasks UI
- [x] Filter button UI
- [x] Calendar view button UI
- [x] New task button
- [ ] Drag-and-drop functionality
- [ ] Task CRUD operations
- [ ] Real data persistence

## Next Steps
1. Implement drag-and-drop with @dnd-kit
2. Create Task interface/type
3. Add Firestore collection for tasks
4. Implement task CRUD
5. Connect to real data

## Dependencies
- Firebase Firestore (pending)
- @dnd-kit (pending)
- React Router v7
- MUI components
