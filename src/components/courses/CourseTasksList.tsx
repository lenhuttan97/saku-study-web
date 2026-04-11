import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Button } from '@/components/ui';

import type { Task } from '@/types';
import { useTasks } from '@/hooks/useTasks';

interface CourseTask {
  id: number;
  title: string;
  status: 'done' | 'in-progress' | 'upcoming' | string;
  dueDate: string;
}

interface CourseTasksListProps {
  tasks: CourseTask[];
  onAddTask?: () => void;
}

export const CourseTasksList = ({ tasks, onAddTask }: CourseTasksListProps) => {
  const columns = [
    { id: 'upcoming', label: 'upcoming' },
    { id: 'in-progress', label: 'in progress' },
    { id: 'done', label: 'done' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Assignments & Tasks</h3>
        <Button size="small" onClick={onAddTask}>
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">{column.label}</h4>
            <div className="space-y-4">
              {tasks.filter(t => t.status === column.id).map(task => (
                <Card key={task.id} elevation="low">
                  <h5 className="font-bold text-slate-800 mb-3">{task.title}</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> Due {task.dueDate}
                    </span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.status === 'done' ? 'bg-emerald-500' : task.status === 'in-progress' ? 'bg-brand-purple' : 'bg-slate-300'
                    )}></div>
                  </div>
                </Card>
              ))}
              {tasks.filter(t => t.status === column.id).length === 0 && (
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center text-slate-400 text-sm italic">
                  No tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};