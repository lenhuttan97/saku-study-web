import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Plus, 
  Quote, 
  Timer,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Chào buổi sáng, Sakura! 👋</h1>
          <p className="text-slate-500 mt-1">Ready to find your focus today?</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100">
          <Calendar size={16} className="text-brand-purple" />
          <span>Sunday, April 5, 2026</span>
        </div>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Main Schedule */}
        <motion.div variants={item} className="md:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Your Schedule</h2>
            <button className="text-brand-purple text-sm font-semibold hover:underline flex items-center gap-1">
              View Calendar <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { time: '09:00 AM', title: 'Graphic Design Basics', room: 'Room 402', color: 'bg-brand-purple' },
              { time: '11:30 AM', title: 'Typography Workshop', room: 'Studio A', color: 'bg-brand-pink' },
              { time: '02:00 PM', title: 'Study Group: Color Theory', room: 'Library', color: 'bg-brand-blue' },
            ].map((session, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="w-20 text-sm font-medium text-slate-400">{session.time}</div>
                <div className={cn("w-1 h-12 rounded-full", session.color)}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{session.title}</h3>
                  <p className="text-sm text-slate-500">{session.room}</p>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* To-Do List */}
        <motion.div variants={item} className="md:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 card-shadow flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">To-Do List</h2>
            <button className="p-2 bg-brand-purple/10 text-brand-purple rounded-xl hover:bg-brand-purple/20 transition-colors">
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {[
              { task: 'Finish logo sketches', done: true },
              { task: 'Read Chapter 4: Grid Systems', done: false },
              { task: 'Upload portfolio draft', done: false },
            ].map((todo, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <button className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                  todo.done ? "bg-brand-purple border-brand-purple text-white" : "border-slate-200 hover:border-brand-purple"
                )}>
                  {todo.done && <CheckCircle2 size={14} />}
                </button>
                <span className={cn("text-sm transition-all", todo.done ? "text-slate-400 line-through" : "text-slate-700")}>
                  {todo.task}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Daily Progress</span>
              <span>33%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-purple w-1/3 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Focus Mode */}
        <motion.div variants={item} className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white card-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Timer size={160} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Timer size={24} className="text-brand-purple" />
            </div>
            <h2 className="text-xl font-bold mb-2">Focus Mode</h2>
            <p className="text-slate-400 text-sm mb-6">Block distractions and get things done.</p>
            <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
              Start Session
            </button>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div variants={item} className="md:col-span-4 bg-brand-purple/5 rounded-3xl p-8 border border-brand-purple/10 card-shadow flex flex-col justify-center items-center text-center">
          <Quote size={32} className="text-brand-purple/20 mb-4" />
          <p className="text-lg font-medium italic text-slate-700 leading-relaxed">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
          <span className="mt-4 text-sm font-bold text-brand-purple">— Steve Jobs</span>
        </motion.div>

        {/* Streak */}
        <motion.div variants={item} className="md:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 card-shadow flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
            <Flame size={32} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">12</h2>
            <p className="text-slate-500 font-medium">Day Study Streak</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
