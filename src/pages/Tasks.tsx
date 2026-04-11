import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Filter, 
  Calendar
} from 'lucide-react';
import { Button, SearchInput } from '@/components/ui';
import { KanbanColumn } from '@/features/tasks';
import type { Task as TaskType, TaskStatus } from '@/types';

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { 
      id: '1', 
      userId: 'demo-user',
      title: 'Finish logo sketches', 
      status: 'completed', 
      priority: 'high', 
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Complete the logo sketches for client review',
    },
    { 
      id: '2', 
      userId: 'demo-user',
      title: 'Read Chapter 4: Grid Systems', 
      status: 'in-progress', 
      priority: 'medium', 
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Read and take notes on grid systems chapter',
    },
    { 
      id: '3', 
      userId: 'demo-user',
      title: 'Upload portfolio draft', 
      status: 'todo', 
      priority: 'high', 
      dueDate: new Date(Date.now() + 4 * 86400000), // 4 days from now
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Upload the latest portfolio draft for review',
    },
    { 
      id: '4', 
      userId: 'demo-user',
      title: 'Color Palette Selection', 
      status: 'in-progress', 
      priority: 'low', 
      dueDate: new Date(Date.now() + 6 * 86400000), // 6 days from now
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Select color palette for new project',
    },
    { 
      id: '5', 
      userId: 'demo-user',
      title: 'Typography Research', 
      status: 'todo', 
      priority: 'medium', 
      dueDate: new Date(Date.now() + 9 * 86400000), // 9 days from now
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Research typography options for brand identity',
    },
  ]);

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'bg-slate-400' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-brand-purple' },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Daily Rituals</h1>
          <p className="text-slate-500 mt-1">Stay on top of your tasks and find your flow.</p>
        </div>
        <Button startIcon={<Plus size={20} />}>
          New Task
        </Button>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput placeholder="Search tasks..." />
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
            tasks={tasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;