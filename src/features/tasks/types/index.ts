// src/features/tasks/types/index.ts
/**
 * Tasks feature-specific types.
 * Extends base types from src/types/
 */

export type { 
  Task, 
  TaskStatus, 
  TaskPriority,
  TaskFilter,
  TaskSort
} from '@/types/task';

// Task-specific view models
export interface TaskWithCourse extends import('@/types/task').Task {
  courseName?: string;
  courseColor?: string;
}

export interface KanbanColumn {
  status: import('@/types/task').TaskStatus;
  title: string;
  tasks: import('@/types/task').Task[];
  color: string;
}