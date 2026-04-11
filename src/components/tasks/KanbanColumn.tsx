import React from 'react';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { TaskCard } from './TaskCard';

import type { Task, TaskStatus } from '@/types';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  color: string;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, newStatus: string) => void;
  onMenuClick?: () => void;
  className?: string;
}

export function KanbanColumn({
  title,
  status,
  color,
  tasks,
  onTaskClick,
  onTaskStatusChange,
  onMenuClick,
  className,
}: KanbanColumnProps) {
  const filteredTasks = tasks.filter((t) => t.status === status);

  // Handle dropping a task into this column
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onTaskStatusChange) {
      onTaskStatusChange(taskId, status);
    }
  };

  return (
    <div
      className={cn('space-y-6', className)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className={cn('w-2 h-2 rounded-full', color)}></div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            {title}
          </h3>
          <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
            {filteredTasks.length}
          </span>
        </div>
        <Button variant="ghost" size="small" className="p-1" onClick={onMenuClick}>
          <MoreVertical size={18} />
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick?.(task.id)}
            onStatusChange={onTaskStatusChange}
          />
        ))}

        {filteredTasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 text-sm italic">
            No tasks in this stage
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;