import React from 'react';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface ScheduleItemProps {
  time: string;
  title: string;
  room: string;
  color: string;
}

export const ScheduleItem = ({ time, title, room, color }: ScheduleItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
      <div className="w-20 text-sm font-medium text-slate-400">{time}</div>
      <div className={cn("w-1 h-12 rounded-full", color)}></div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{room}</p>
      </div>
      <Button variant="ghost" size="small" className="opacity-0 group-hover:opacity-100">
        <MoreVertical size={18} />
      </Button>
    </div>
  );
};