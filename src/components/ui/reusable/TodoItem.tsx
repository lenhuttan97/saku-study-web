import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  task: string;
  done: boolean;
}

export const TodoItem = ({ task, done }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-3 group">
      <button className={cn(
        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
        done ? "bg-brand-purple border-brand-purple text-white" : "border-slate-200 hover:border-brand-purple"
      )}>
        {done && <CheckCircle2 size={14} />}
      </button>
      <span className={cn("text-sm transition-all", done ? "text-slate-400 line-through" : "text-slate-700")}>
        {task}
      </span>
    </div>
  );
};