// Course-related type definitions

export interface Course {
  id: string;
  userId: string; // Reference to the user who owns this course
  title: string;
  code: string;
  instructor: string;
  credits: number;
  color: string; // Course color for UI
  schedule: CourseSchedule[];
  materials: CourseMaterial[];
  assignments: CourseAssignment[];
  exams: CourseExam[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
  location: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'seminar';
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  url?: string;
  fileName?: string;
  fileType?: string;
  uploadedAt: Date;
  size?: number;
}

export interface CourseAssignment {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseExam {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  examDate: Date;
  durationMinutes?: number;
  location?: string;
  type: 'midterm' | 'final' | 'quiz' | 'presentation';
  completed: boolean;
}