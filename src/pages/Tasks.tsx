import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Tasks = () => {
  const [tasks, setTasks] = useState([
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
        <button className="bg-brand-purple text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95">
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Calendar size={18} />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((column) => (
          <div key={column.id} className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className={cn("w-2 h-2 rounded-full", column.color)}></div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{column.label}</h3>
                <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>
              <button className="p-1 text-slate-400 hover:text-slate-600">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {tasks.filter(t => t.status === column.id).map((task) => (
                <motion.div
                  layoutId={task.id.toString()}
                  key={task.id}
                  className="bg-white p-6 rounded-3xl border border-slate-100 card-shadow group hover:border-brand-purple/20 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      task.priority === 'high' ? 'bg-red-50 text-red-500' : 
                      task.priority === 'medium' ? 'bg-orange-50 text-orange-500' : 
                      'bg-blue-50 text-blue-500'
                    )}>
                      {task.priority} Priority
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-300 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <h4 className={cn(
                    "font-bold text-slate-800 mb-4 leading-snug",
                    task.status === 'done' && 'line-through text-slate-400'
                  )}>
                    {task.title}
                  </h4>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Clock size={14} />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">
                          {i === 1 ? 'S' : '+1'}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {tasks.filter(t => t.status === column.id).length === 0 && (
                <div className="h-32 border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 text-sm italic">
                  No tasks in this stage
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
