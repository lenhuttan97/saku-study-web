import { useState, useEffect } from 'react';
import { Task } from '@/types';

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Complete assignment',
    description: 'Finish the math homework',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Study for exam',
    description: 'Review chapters 1-3 for upcoming exam',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 500);
  }, []);

  return { tasks, loading, error, refetch: () => {} };
};

export const useTasksByStatus = (status: string) => {
  const { tasks, loading, error } = useTasks();
  const filteredTasks = tasks.filter(task => task.status === status);
  
  return { tasks: filteredTasks, loading, error };
};

export const useTaskById = (id: string) => {
  const { tasks, loading, error } = useTasks();
  const task = tasks.find(t => t.id === id);
  
  return { task, loading, error };
};