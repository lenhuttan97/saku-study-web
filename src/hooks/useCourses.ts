import { useState, useEffect } from 'react';
import { Course } from '@/types';

// Mock data for development
const mockCourses: Course[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Mathematics 101',
    name: 'Mathematics 101',
    code: 'MATH101',
    instructor: 'Dr. Smith',
    teacher: 'Dr. Smith',
    credits: 3,
    color: 'bg-purple-500',
    description: 'Introduction to basic mathematics concepts',
    location: 'Room A101',
    progress: 75,
    schedule: [],
    materials: [],
    assignments: [],
    exams: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 500);
  }, []);

  return { courses, loading, error, refetch: () => {} };
};

export const useCourseById = (id: string) => {
  const { courses, loading, error } = useCourses();
  const course = courses.find(c => c.id === id);
  
  return { course, loading, error };
};

export const useCourseMaterials = (courseId: string) => {
  const { course, loading, error } = useCourseById(courseId);
  
  return { materials: course?.materials || [], loading, error };
};