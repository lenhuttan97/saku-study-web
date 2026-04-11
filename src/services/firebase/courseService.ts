import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  type FirestoreDataConverter,
} from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import type { Course } from '@/types/course';

const COLLECTION_NAME = 'courses';

const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore: () => {
    throw new Error('Course write operations are not supported in this service.');
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data() as DocumentData;
    return {
      id: snapshot.id,
      userId: data.userId ?? '',
      title: data.title ?? '',
      code: data.code ?? '',
      instructor: data.instructor ?? '',
      credits: data.credits ?? 0,
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
};

export type CourseService = typeof courseService;
