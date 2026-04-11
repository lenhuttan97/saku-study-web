import { useState, useEffect } from 'react';
import { taskService } from '@/services/firebase/taskService';
import type { Task } from '@/types';

// Temporary hardcoded user ID - in real app this would come from auth context
const CURRENT_USER_ID = 'user1'; // This should be replaced with actual user ID from auth

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    refetch();
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
      setTasks(prev => [...prev, newTask]);
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
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
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

  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      setError(null);

      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
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
    deleteTask
  };
};

export const useTasksByStatus = (status: string) => {
  const { tasks, loading, error, refetch, createTask, updateTask, deleteTask } = useTasks();
  const filteredTasks = tasks.filter(task => task.status === status);

  return {
    tasks: filteredTasks,
    loading,
    error,
    refetch,
    createTask,
    updateTask,
    deleteTask
  };
};

export const useTaskById = (id: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const fetchedTask = await taskService.fetchTaskById(id);
        setTask(fetchedTask);
        setError(null);
      } catch (err) {
        console.error('Error fetching task by ID:', err);
        // Handle Firebase permission errors gracefully
        if (err && typeof err === 'object' && 'message' in err) {
          const errorMessage = err.message as string;
          if (errorMessage.includes('Missing or insufficient permissions')) {
            setError('Firebase permissions not configured. Task not found.');
          } else {
            setError(errorMessage);
          }
        } else {
          setError('Failed to fetch task. Please check your Firebase configuration.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  return { task, loading, error };
};