import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  type DocumentData,
  type FirestoreDataConverter,
} from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import type { Course } from '@/types/course';

const COLLECTION_NAME = 'courses';

const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore: (course: Course): Omit<Course, 'id'> => {
    // Return the course data without the id (Firestore generates it)
    const { id, ...data } = course;
    return {
      userId: data.userId,
      title: data.title,
      code: data.code,
      instructor: data.instructor,
      credits: data.credits,
      color: data.color,
      description: data.description,
      location: data.location,
      progress: data.progress,
      schedule: data.schedule,
      materials: data.materials,
      assignments: data.assignments,
      exams: data.exams,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  fromFirestore: (snapshot): Course => {
    const data = snapshot.data() as DocumentData;
    return {
      id: snapshot.id,
      userId: data.userId ?? '',
      title: data.title ?? '',
      name: data.name ?? data.title ?? '', // Alias for title
      code: data.code ?? '',
      instructor: data.instructor ?? '',
      teacher: data.teacher ?? data.instructor ?? '', // Alias for instructor
      credits: data.credits ?? 0,
      description: data.description,
      location: data.location,
      progress: data.progress,
      color: data.color ?? 'primary', // Use theme primary color identifier
      schedule: data.schedule ?? [],
      materials: data.materials ?? [],
      assignments: data.assignments ?? [],
      exams: data.exams ?? [],
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
    };
  },
};

const coursesCollection = collection(db, COLLECTION_NAME).withConverter(courseConverter);

export const courseService = {
  // ==================== READ OPERATIONS ====================
  
  /**
   * Fetch all courses for a specific user
   * @param userId - The user ID to filter courses
   * @returns Array of Course objects
   */
  async fetchCourses(userId?: string): Promise<Course[]> {
    try {
      const q = userId ? query(coursesCollection, where('userId', '==', userId)) : coursesCollection;
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data());
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw error;
    }
  },

  /**
   * Fetch courses for a user sorted by creation date
   */
  async fetchCoursesSorted(userId: string, descending: boolean = true): Promise<Course[]> {
    try {
      const q = query(
        coursesCollection, 
        where('userId', '==', userId),
        orderBy('createdAt', descending ? 'desc' : 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data());
    } catch (error) {
      console.error('Failed to fetch courses sorted:', error);
      throw error;
    }
  },

  /**
   * Fetch a single course by ID
   * @param courseId - The course document ID
   * @returns Course object or null if not found
   */
  async fetchCourseById(courseId: string): Promise<Course | null> {
    try {
      const courseRef = doc(coursesCollection, courseId);
      const snapshot = await getDoc(courseRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (error) {
      console.error(`Failed to fetch course ${courseId}:`, error);
      throw error;
    }
  },

  // ==================== WRITE OPERATIONS ====================

  /**
   * Create a new course
   * @param courseData - The course data (without id)
   * @returns The created course with generated ID
   */
  async createCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
    try {
      const now = new Date();
      const newCourse: Omit<Course, 'id'> = {
        ...courseData,
        schedule: courseData.schedule ?? [],
        materials: courseData.materials ?? [],
        assignments: courseData.assignments ?? [],
        exams: courseData.exams ?? [],
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(coursesCollection, newCourse);
      
      return {
        ...newCourse,
        id: docRef.id,
      } as Course;
    } catch (error) {
      console.error('Failed to create course:', error);
      throw error;
    }
  },

  /**
   * Update an existing course
   * @param courseId - The course document ID
   * @param updates - Partial course data to update
   * @returns The updated course
   */
  async updateCourse(courseId: string, updates: Partial<Omit<Course, 'id'>>): Promise<Course> {
    try {
      const courseRef = doc(coursesCollection, courseId);
      
      // Separate the update data from metadata
      const { updatedAt, ...updateData } = updates;
      
      // Add updatedAt timestamp
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date(),
      };

      await updateDoc(courseRef, updateWithTimestamp);

      // Fetch and return the updated course
      const updatedDoc = await getDoc(courseRef);
      if (!updatedDoc.exists()) {
        throw new Error(`Course ${courseId} not found after update`);
      }

      return updatedDoc.data();
    } catch (error) {
      console.error(`Failed to update course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a course
   * @param courseId - The course document ID
   * @returns void
   */
  async deleteCourse(courseId: string): Promise<void> {
    try {
      const courseRef = doc(coursesCollection, courseId);
      await deleteDoc(courseRef);
    } catch (error) {
      console.error(`Failed to delete course ${courseId}:`, error);
      throw error;
    }
  },

  // ==================== BATCH OPERATIONS ====================

  /**
   * Delete multiple courses (batch operation)
   * @param courseIds - Array of course IDs to delete
   */
  async deleteCourses(courseIds: string[]): Promise<void> {
    try {
      const { writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);

      courseIds.forEach((courseId) => {
        const courseRef = doc(coursesCollection, courseId);
        batch.delete(courseRef);
      });

      await batch.commit();
    } catch (error) {
      console.error('Failed to delete courses batch:', error);
      throw error;
    }
  },
};

export type CourseService = typeof courseService;
