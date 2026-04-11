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
import type { Task } from '@/types/task';

const COLLECTION_NAME = 'tasks';

const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore: (task: Task): Omit<Task, 'id'> => {
    // Return the task data without the id (Firestore generates it)
    const { id, ...data } = task;
    return {
      userId: data.userId,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      completedAt: data.completedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      courseId: data.courseId,
      tags: data.tags,
      reminder: data.reminder,
    };
  },
  fromFirestore: (snapshot): Task => {
    const data = snapshot.data() as DocumentData;
    return {
      id: snapshot.id,
      userId: data.userId ?? '',
      title: data.title ?? '',
      description: data.description,
      status: data.status ?? 'todo', // Default status
      priority: data.priority ?? 'medium', // Default priority
      dueDate: data.dueDate?.toDate?.() ?? undefined,
      completedAt: data.completedAt?.toDate?.() ?? undefined,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      courseId: data.courseId,
      tags: data.tags ?? [],
      reminder: data.reminder?.toDate?.() ?? undefined,
    };
  },
};

const tasksCollection = collection(db, COLLECTION_NAME).withConverter(taskConverter);

export const taskService = {
  // ==================== READ OPERATIONS ====================

  /**
   * Fetch all tasks for a specific user
   * @param userId - The user ID to filter tasks
   * @returns Array of Task objects
   */
  async fetchTasks(userId?: string): Promise<Task[]> {
    try {
      const q = userId ? query(tasksCollection, where('userId', '==', userId)) : tasksCollection;
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data());
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  },

  /**
   * Fetch tasks for a user sorted by a specific field
   */
  async fetchTasksSorted(userId: string, sortBy: 'dueDate' | 'priority' | 'createdAt' | 'updatedAt' = 'createdAt', descending: boolean = true): Promise<Task[]> {
    try {
      const q = query(
        tasksCollection,
        where('userId', '==', userId),
        orderBy(sortBy, descending ? 'desc' : 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data());
    } catch (error) {
      console.error('Failed to fetch tasks sorted:', error);
      throw error;
    }
  },

  /**
   * Fetch tasks filtered by status
   */
  async fetchTasksByStatus(userId: string, status: string): Promise<Task[]> {
    try {
      const q = query(
        tasksCollection,
        where('userId', '==', userId),
        where('status', '==', status)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data());
    } catch (error) {
      console.error('Failed to fetch tasks by status:', error);
      throw error;
    }
  },

  /**
   * Fetch a single task by ID
   * @param taskId - The task document ID
   * @returns Task object or null if not found
   */
  async fetchTaskById(taskId: string): Promise<Task | null> {
    try {
      const taskRef = doc(tasksCollection, taskId);
      const snapshot = await getDoc(taskRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (error) {
      console.error(`Failed to fetch task ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch tasks for a specific course
   */
  async fetchTasksByCourse(userId: string, courseId: string): Promise<Task[]> {
    try {
      const q = query(
        tasksCollection,
        where('userId', '==', userId),
        where('courseId', '==', courseId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data());
    } catch (error) {
      console.error('Failed to fetch tasks by course:', error);
      throw error;
    }
  },

  // ==================== WRITE OPERATIONS ====================

  /**
   * Create a new task
   * @param taskData - The task data (without id)
   * @returns The created task with generated ID
   */
  async createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    try {
      const now = new Date();
      const newTask: Omit<Task, 'id'> = {
        ...taskData,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(tasksCollection, newTask);

      return {
        ...newTask,
        id: docRef.id,
      } as Task;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  },

  /**
   * Update an existing task
   * @param taskId - The task document ID
   * @param updates - Partial task data to update
   * @returns The updated task
   */
  async updateTask(taskId: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
    try {
      const taskRef = doc(tasksCollection, taskId);

      // Separate the update data from metadata
      const { updatedAt, ...updateData } = updates;

      // Add updatedAt timestamp
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date(),
      };

      await updateDoc(taskRef, updateWithTimestamp);

      // Fetch and return the updated task
      const updatedDoc = await getDoc(taskRef);
      if (!updatedDoc.exists()) {
        throw new Error(`Task ${taskId} not found after update`);
      }

      return updatedDoc.data();
    } catch (error) {
      console.error(`Failed to update task ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a task
   * @param taskId - The task document ID
   * @returns void
   */
  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskRef = doc(tasksCollection, taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error(`Failed to delete task ${taskId}:`, error);
      throw error;
    }
  },

  // ==================== BATCH OPERATIONS ====================

  /**
   * Delete multiple tasks (batch operation)
   * @param taskIds - Array of task IDs to delete
   */
  async deleteTasks(taskIds: string[]): Promise<void> {
    try {
      const { writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);

      taskIds.forEach((taskId) => {
        const taskRef = doc(tasksCollection, taskId);
        batch.delete(taskRef);
      });

      await batch.commit();
    } catch (error) {
      console.error('Failed to delete tasks batch:', error);
      throw error;
    }
  },

  /**
   * Update multiple tasks (batch operation)
   * @param taskUpdates - Array of task IDs and their updates
   */
  async updateTasks(taskUpdates: { id: string; updates: Partial<Omit<Task, 'id'>> }[]): Promise<void> {
    try {
      const { writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);

      taskUpdates.forEach(({ id, updates }) => {
        const taskRef = doc(tasksCollection, id);
        batch.update(taskRef, { ...updates, updatedAt: new Date() });
      });

      await batch.commit();
    } catch (error) {
      console.error('Failed to update tasks batch:', error);
      throw error;
    }
  },
};

export type TaskService = typeof taskService;