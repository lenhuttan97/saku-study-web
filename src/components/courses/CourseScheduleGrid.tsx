import React from 'react';
import { cn } from '@/lib/utils';

interface CourseScheduleEvent {
  day: number;
  time: string;
  title: string;
  location: string;
  type: 'Lecture' | 'Workshop' | 'Lab';
  color: string;
}

interface CourseScheduleGridProps {
  events: CourseScheduleEvent[];
}

export const CourseScheduleGrid = ({ events }: CourseScheduleGridProps) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  const getEvent = (dayIndex: number, time: string) => {
    return events.find(e => e.day === dayIndex && e.time === time);
  };

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'Lecture':
        return 'bg-brand-purple/10 border-l-4 border-brand-purple';
      case 'Workshop':
        return 'bg-brand-pink/10 border-l-4 border-brand-pink';
      case 'Lab':
        return 'bg-brand-blue/10 border-l-4 border-brand-blue';
      default:
        return 'bg-slate-50 border-l-4 border-slate-200';
    }
  };

  const getTextStyle = (type: string) => {
    switch (type) {
      case 'Lecture':
        return 'text-brand-purple';
      case 'Workshop':
        return 'text-brand-pink';
      case 'Lab':
        return 'text-brand-blue';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">Weekly Schedule</h3>
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 overflow-x-auto">
        <div className="min-w-[600px] grid grid-cols-6 gap-4">
          <div className="col-span-1"></div>
          {days.map(day => (
            <div key={day} className="text-center font-bold text-slate-400 text-sm uppercase py-2">{day}</div>
          ))}
          
          {times.map(time => (
            <React.Fragment key={time}>
              <div className="text-right pr-4 text-xs font-bold text-slate-400 py-4">{time}</div>
              {[1, 2, 3, 4, 5].map(day => {
                const event = getEvent(day, time);
                return (
                  <div key={`${day}-${time}`} className="bg-white rounded-xl border border-slate-100 h-16 relative group">
                    {event && (
                      <div className={cn("absolute inset-1 rounded-lg p-2 z-10", getEventStyle(event.type))}>
                        <p className={cn("text-[10px] font-bold", getTextStyle(event.type))}>{event.type}</p>
                        <p className="text-[10px] text-slate-600 truncate">{event.location}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};