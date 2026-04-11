import React from 'react';
import { Clock, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, Button, Card } from '@/components/ui';

import type { Task, TaskStatus, TaskPriority } from '@/types';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

const priorityConfig = {
  high: { label: 'High Priority', color: 'error' as const },
  medium: { label: 'Medium Priority', color: 'warning' as const },
  low: { label: 'Low Priority', color: 'info' as const },
};

export function TaskCard({
  task,
  onClick,
  onMenuClick,
  className,
}: TaskCardProps) {
  const config = priorityConfig[task.priority];

  return (
    <Card
      hoverable
      elevation="low"
      className={cn('group p-5', className)}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <Badge label={config.label} color={config.color} size="small" />
        <Button
          variant="ghost"
          size="small"
          className="opacity-0 group-hover:opacity-100 p-1"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.();
          }}
        >
          <MoreVertical size={16} />
        </Button>
      </div>

      <h4
        className={cn(
          'font-bold text-slate-800 mb-4 leading-snug',
          task.status === 'completed' && 'line-through text-slate-400'
        )}
      >
        {task.title}
      </h4>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Clock size={14} />
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
        </div>
      </div>
    </Card>
  );
}

export default TaskCard;