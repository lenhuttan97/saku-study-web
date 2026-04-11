// src/features/tasks/index.ts
/**
 * Tasks Feature Module
 * 
 * Organized per architecture guidelines:
 * - components/ - UI components
 * - hooks/ - Business logic hooks
 * - types/ - Feature-specific types
 */

// Explicit re-exports to avoid naming conflicts
export { TaskCard, KanbanColumn, TodoItem } from '../../components/tasks';
export * from './hooks';
export type { Task, TaskStatus, TaskPriority, TaskFilter, TaskSort, TaskWithCourse, KanbanColumn as KanbanColumnType } from './types';