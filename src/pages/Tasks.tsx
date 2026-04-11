import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Filter,
  Calendar
} from 'lucide-react';
import { Button, SearchInput } from '@/components/ui';
import { KanbanColumn } from '@/features/tasks';
import { useTasks } from '@/hooks/useTasks';
import type { Task as TaskType, TaskStatus } from '@/types';

const Tasks = () => {
  const { tasks, loading, error, createTask, updateTaskStatus } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'bg-slate-400' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-brand-purple' },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-500' },
  ];

  if (loading && tasks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto"></div>
        <p className="mt-4 text-slate-500">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load tasks</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Daily Rituals</h1>
          <p className="text-slate-500 mt-1">Stay on top of your tasks and find your flow.</p>
        </div>
        <Button
          startIcon={<Plus size={20} />}
          onClick={() => {
            // Handle new task creation
            createTask({
              title: 'New Task',
              status: 'todo',
              priority: 'medium',
              description: 'Add details to your new task',
            }).catch(console.error);
          }}
        >
          New Task
        </Button>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(value) => setSearchTerm(value as string)}
        />
        <div className="flex gap-2">
          <Button variant="outline" startIcon={<Filter size={18} />}>
            Filter
          </Button>
          <Button variant="outline" startIcon={<Calendar size={18} />}>
            Calendar
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            title={column.label}
            status={column.id}
            color={column.color}
            tasks={filteredTasks}
            onTaskStatusChange={updateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;