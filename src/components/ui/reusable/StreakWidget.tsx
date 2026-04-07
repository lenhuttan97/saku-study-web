import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakWidgetProps {
  count: number;
  className?: string;
}

export const StreakWidget = ({ count, className }: StreakWidgetProps) => {
  return (
    <div className={cn("bg-white rounded-3xl border border-slate-100 card-shadow p-8 flex items-center gap-6", className)}>
      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
        <Flame size={32} fill="currentColor" />
      </div>
      <div className="shrink-0">
        <h2 className="text-3xl font-bold text-slate-800">{count}</h2>
        <p className="text-slate-500 font-medium">Day Study Streak</p>
      </div>
    </div>
  );
};