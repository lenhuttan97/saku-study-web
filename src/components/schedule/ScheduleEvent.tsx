import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ScheduleEventProps {
  title: string;
  room: string;
  startTime: string;
  endTime: string;
  color: string;
  onClick?: () => void;
  className?: string;
}

export function ScheduleEvent({ title, room, startTime, endTime, color, onClick, className }: ScheduleEventProps) {
  return (
    <motion.div
      layoutId={title}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn(
        'border-l-4 rounded-2xl p-3 cursor-pointer transition-all',
        color,
        className
      )}
    >
      <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{room}</p>
      <p className="text-xs text-slate-400 mt-1">
        {startTime} - {endTime}
      </p>
    </motion.div>
  );
}

export default ScheduleEvent;