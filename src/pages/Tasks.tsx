import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Filter, 
  Calendar
} from 'lucide-react';
import { Button, SearchInput } from '@/components/ui';
import { KanbanColumn } from '@/features/tasks';

interface Task {
  id: number;
  title: string;
  status: 'done' | 'in-progress' | 'upcoming';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Finish logo sketches', status: 'done', priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Read Chapter 4: Grid Systems', status: 'in-progress', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Upload portfolio draft', status: 'upcoming', priority: 'high', dueDate: 'Apr 10' },
    { id: 4, title: 'Color Palette Selection', status: 'in-progress', priority: 'low', dueDate: 'Apr 12' },
    { id: 5, title: 'Typography Research', status: 'upcoming', priority: 'medium', dueDate: 'Apr 15' },
  ]);

  const columns = [
    { id: 'upcoming', label: 'Upcoming', color: 'bg-slate-400' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-brand-purple' },
    { id: 'done', label: 'Completed', color: 'bg-emerald-500' },
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