// src/features/courses/types/index.ts
/**
 * Course feature-specific types.
 * Extends base types from src/types/
 */

export type { 
  Course, 
  CourseMaterial, 
  CourseProgress,
  CourseStatus,
  CourseDifficulty
} from '@/types/course';

// Course-specific view models
export interface CourseWithProgress extends import('@/types/course').Course {
  materialsCompleted: number;
  materialsTotal: number;
  nextSession?: {
    day: string;
    time: string;
    room: string;
  };
}

// Course card display props
export interface CourseCardProps {
  course: import('@/types/course').Course;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}