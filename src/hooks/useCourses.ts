import { useState, useEffect } from 'react';
import { Course } from '@/types';
import { courseService } from '@/services/firebase/courseService';

// Temporary hardcoded user ID - in real app this would come from auth context
const CURRENT_USER_ID = 'user1'; // This should be replaced with actual user ID from auth
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
    color: 'primary', // Maps to theme primary color
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

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch courses for current user
      const fetchedCourses = await courseService.fetchCourses(CURRENT_USER_ID);
      setCourses(fetchedCourses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      // Handle Firebase permission errors gracefully
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = err.message as string;
        if (errorMessage.includes('Missing or insufficient permissions')) {
          setError('Firebase permissions not configured. Showing demo data.');
          // Optionally load mock data for demo purposes
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to fetch courses. Please check your Firebase configuration.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Create a new course and refresh the list
  const createCourse = async (courseData: Omit<Course, 'id' | 'userId'>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add the current user ID to the course data
      const courseWithUser: Omit<Course, 'id'> = {
        ...courseData,
        userId: CURRENT_USER_ID,
      };
      
      // Create the course via service
      const newCourse = await courseService.createCourse(courseWithUser);
      
      // Add the new course to the local state
      setCourses(prev => [...prev, newCourse]);
      
      return newCourse;
    } catch (err) {
      console.error('Error creating course:', err);
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = err.message as string;
        if (errorMessage.includes('Missing or insufficient permissions')) {
          setError('Firebase permissions not configured. Course not created.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to create course. Please check your Firebase configuration.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, refetch, createCourse };
};

export const useCourseById = (id: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCourse = await courseService.fetchCourseById(id);
        setCourse(fetchedCourse);
      } catch (err) {
        console.error(`Error fetching course ${id}:`, err);
        if (err && typeof err === 'object' && 'message' in err) {
          const errorMessage = err.message as string;
          if (errorMessage.includes('Missing or insufficient permissions')) {
            setError('Firebase permissions not configured. Course not found.');
          } else {
            setError(errorMessage);
          }
        } else {
          setError('Failed to fetch course. Please check your Firebase configuration.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return { course, loading, error };
};

export const useCourseMaterials = (courseId: string) => {
  const { course, loading, error } = useCourseById(courseId);
  
  return { materials: course?.materials || [], loading, error };
};