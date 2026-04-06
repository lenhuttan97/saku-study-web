import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus,
  MoreVertical,
  Download,
  Printer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, ToggleButtonGroup, Card } from '@/components/ui';

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState('April 6 - April 12, 2026');
  const [viewMode, setViewMode] = useState('Week');
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const scheduleItems = [
    { day: 'Mon', start: '09:00', end: '10:30', title: 'Graphic Design', room: 'Room 402', color: 'bg-brand-purple' },
    { day: 'Mon', start: '14:00', end: '15:30', title: 'Typography', room: 'Studio A', color: 'bg-brand-pink' },
    { day: 'Tue', start: '10:00', end: '12:00', title: 'Web Dev', room: 'Lab 10', color: 'bg-emerald-500' },
    { day: 'Wed', start: '09:00', end: '10:30', title: 'Graphic Design', room: 'Room 402', color: 'bg-brand-purple' },
    { day: 'Wed', start: '13:00', end: '14:30', title: 'Color Theory', room: 'Library', color: 'bg-brand-blue' },
    { day: 'Thu', start: '10:00', end: '12:00', title: 'Web Dev', room: 'Lab 10', color: 'bg-emerald-500' },
    { day: 'Fri', start: '11:30', end: '13:00', title: 'Typography', room: 'Studio A', color: 'bg-brand-pink' },
  ];

  const getPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startHour = 8;
    return (hours - startHour) * 80 + (minutes / 60) * 80;
  };

  const getHeight = (start: string, end: string) => {
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    const durationInMinutes = (eH * 60 + eM) - (sH * 60 + sM);
    return (durationInMinutes / 60) * 80;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Thời khóa biểu tuần</h1>
          <p className="text-slate-500 mt-1">Visualize your week and find your focus.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="p-3">
            <Printer size={20} />
          </Button>
          <Button variant="outline" className="p-3">
            <Download size={20} />
          </Button>
          <Button startIcon={<Plus size={20} />}>
            Add Class
          </Button>
        </div>
      </header>

      <Card elevation="medium" className="overflow-hidden p-0">
        {/* Calendar Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
              <Button variant="ghost" size="small" className="p-2">
                <ChevronLeft size={20} />
              </Button>
              <Button variant="ghost" size="small" className="px-4 text-slate-700">
                Today
              </Button>
              <Button variant="ghost" size="small" className="p-2">
                <ChevronRight size={20} />
              </Button>
            </div>
            <h2 className="text-lg font-bold text-slate-800">{currentWeek}</h2>
          </div>
          
          <ToggleButtonGroup
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'Day', label: 'Day' },
              { value: 'Week', label: 'Week' },
              { value: 'Month', label: 'Month' },
            ]}
          />
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] relative">
            {/* Days Header */}
            <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-100">
              <div className="h-16 flex items-center justify-center border-r border-slate-100">
                <Clock size={18} className="text-slate-300" />
              </div>
              {days.map((day, idx) => (
                <div key={day} className="h-16 flex flex-col items-center justify-center border-r border-slate-100 last:border-r-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</span>
                  <span className={cn(
                    "text-lg font-bold mt-0.5",
                    idx === 0 ? "text-brand-purple" : "text-slate-800"
                  )}>{6 + idx}</span>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative grid grid-cols-[100px_repeat(7,1fr)]">
              {/* Time Labels */}
              <div className="flex flex-col">
                {timeSlots.map(time => (
                  <div key={time} className="h-20 flex items-start justify-center pr-4 border-r border-slate-100">
                    <span className="text-xs font-bold text-slate-400 mt-[-8px]">{time}</span>
                  </div>
                ))}
              </div>

              {/* Grid Columns */}
              {days.map(day => (
                <div key={day} className="relative border-r border-slate-100 last:border-r-0 h-[880px]">
                  {/* Horizontal Grid Lines */}
                  {timeSlots.map(time => (
                    <div key={time} className="absolute w-full border-t border-slate-50" style={{ top: `${getPosition(time)}px` }}></div>
                  ))}

                  {/* Schedule Items for this day */}
                  {scheduleItems.filter(item => item.day === day).map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={idx}
                      className={cn(
                        "absolute left-1 right-1 rounded-2xl p-3 border-l-4 shadow-sm group hover:shadow-md transition-all z-10",
                        item.color.replace('bg-', 'bg-opacity-10 border-'),
                        item.color.replace('bg-', 'text-')
                      )}
                      style={{ 
                        top: `${getPosition(item.start)}px`, 
                        height: `${getHeight(item.start, item.end)}px` 
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-xs truncate">{item.title}</h4>
                          <p className="text-[10px] opacity-80 font-medium truncate">{item.room}</p>
                          <p className="text-[10px] opacity-60 mt-1">{item.start} - {item.end}</p>
                        </div>
                        <Button variant="ghost" size="small" className="opacity-0 group-hover:opacity-100 p-0">
                          <MoreVertical size={14} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}

              {/* Current Time Indicator (Mock for Monday 10:15 AM) */}
              <div className="absolute left-[100px] right-0 h-0.5 bg-brand-pink z-20 pointer-events-none" style={{ top: `${getPosition('10:15')}px` }}>
                <div className="absolute -left-1.5 -top-1.5 w-3.5 h-3.5 bg-brand-pink rounded-full border-2 border-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Schedule;