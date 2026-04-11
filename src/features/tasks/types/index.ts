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
import type { Task as BaseTask, TaskStatus as BaseTaskStatus } from '@/types/task';

export interface TaskWithCourse extends BaseTask {
  courseName?: string;
  courseColor?: string;
}

export interface KanbanColumn {
  status: BaseTaskStatus;
  title: string;
  tasks: BaseTask[];
  color: string;
}