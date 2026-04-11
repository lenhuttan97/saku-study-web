// Task-related type definitions

export interface Task {
  id: string;
  userId: string; // Reference to the user who owns this task
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  courseId?: string; // Optional reference to a course
  tags?: string[];
  reminder?: Date;
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskSort = 'dueDate' | 'priority' | 'createdAt' | 'updatedAt'; // Sorting options

export interface TaskCategory {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon?: string;
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  courseId?: string;
  dueDateRange?: [Date, Date];
  searchQuery?: string;
}