import { useState, useEffect, useRef } from 'react';
import { taskService } from '@/services/firebase/taskService';
import type { Task } from '@/types';

// Temporary hardcoded user ID - in real app this would come from auth context
const CURRENT_USER_ID = 'user1'; // This should be replaced with actual user ID from auth

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.fetchTasks(CURRENT_USER_ID);
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
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
        setError('Failed to fetch tasks. Please check your Firebase configuration.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time listener
  useEffect(() => {
    // Unsubscribe from previous listener if exists
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    // Set up new real-time listener
    unsubscribeRef.current = taskService.listenToTasks(CURRENT_USER_ID, (updatedTasks) => {
      setTasks(updatedTasks);
    });

    // Cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  const createTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);

      const taskWithUser: Omit<Task, 'id'> = {
        ...taskData,
        userId: CURRENT_USER_ID,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newTask = await taskService.createTask(taskWithUser);
      // Real-time listener will update the state automatically
      return newTask;
    } catch (err) {
      console.error('Error creating task:', err);
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = err.message as string;
        if (errorMessage.includes('Missing or insufficient permissions')) {
          setError('Firebase permissions not configured. Task not created.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to create task. Please check your Firebase configuration.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Omit<Task, 'id' | 'userId'>>) => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await taskService.updateTask(taskId, updates);
      // Real-time listener will update the state automatically
      return updatedTask;
    } catch (err) {
      console.error('Error updating task:', err);
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = err.message as string;
        if (errorMessage.includes('Missing or insufficient permissions')) {
          setError('Firebase permissions not configured. Task not updated.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to update task. Please check your Firebase configuration.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await taskService.updateTaskStatus(taskId, status);
      // Real-time listener will update the state automatically
      return updatedTask;
    } catch (err) {
      console.error('Error updating task status:', err);
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = err.message as string;
        if (errorMessage.includes('Missing or insufficient permissions')) {
          setError('Firebase permissions not configured. Task status not updated.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to update task status. Please check your Firebase configuration.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      setError(null);

      await taskService.deleteTask(taskId);
      // Real-time listener will update the state automatically
    } catch (err) {
      console.error('Error deleting task:', err);
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = err.message as string;
        if (errorMessage.includes('Missing or insufficient permissions')) {
          setError('Firebase permissions not configured. Task not deleted.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to delete task. Please check your Firebase configuration.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    refetch,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  };
};

export const useTasksByStatus = (status: string) => {
  const { tasks, loading, error, refetch, createTask, updateTask, updateTaskStatus, deleteTask } = useTasks();
  const filteredTasks = tasks.filter(task => task.status === status);

  return {
    tasks: filteredTasks,
    loading,
    error,
    refetch,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  };
};

export const useTaskById = (id: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Unsubscribe from previous listener if exists
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    // Set up new real-time listener for specific task
    unsubscribeRef.current = taskService.listenToTask(id, (fetchedTask) => {
      setTask(fetchedTask);
      setError(null);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [id]);

  return { task, loading, error };
};