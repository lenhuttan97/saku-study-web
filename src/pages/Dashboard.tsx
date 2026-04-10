import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ChevronRight, Plus, CheckCircle2 } from 'lucide-react';
import { Button, Card, ProgressBar } from '@/components/ui';
import { ScheduleItem, FocusWidget, QuoteCard, StreakWidget } from '@/components/ui';
import { TodoItem } from '@/features/tasks';

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

  const scheduleItems = [
    { time: '09:00 AM', title: 'Graphic Design Basics', room: 'Room 402', color: 'bg-brand-purple' },
    { time: '11:30 AM', title: 'Typography Workshop', room: 'Studio A', color: 'bg-brand-pink' },
    { time: '02:00 PM', title: 'Study Group: Color Theory', room: 'Library', color: 'bg-brand-blue' },
  ];

  const todoItems = [
    { task: 'Finish logo sketches', done: true },
    { task: 'Read Chapter 4: Grid Systems', done: false },
    { task: 'Upload portfolio draft', done: false },
  ];

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
        {/* Main Schedule - Using ScheduleItem */}
        <motion.div variants={item} className="md:col-span-8">
          <Card elevation="medium" className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Your Schedule</h2>
              <Link to="/schedule" className="text-brand-purple text-sm font-semibold hover:underline flex items-center gap-1">
                View Calendar <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {scheduleItems.map((session, idx) => (
                <ScheduleItem key={idx} {...session} />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* To-Do List - Using TodoItem */}
        <motion.div variants={item} className="md:col-span-4">
          <Card elevation="medium" className="p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">To-Do List</h2>
              <Button variant="primary" size="small" className="p-2">
                <Plus size={18} />
              </Button>
            </div>
            
            <div className="space-y-4 flex-1">
              {todoItems.map((todo, idx) => (
                <TodoItem key={idx} {...todo} />
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>Daily Progress</span>
                <span>33%</span>
              </div>
              <ProgressBar value={33} size="small" />
            </div>
          </Card>
        </motion.div>

        {/* Focus Mode - Using FocusWidget */}
        <motion.div variants={item} className="md:col-span-4">
          <FocusWidget />
        </motion.div>

        {/* Quote - Using QuoteCard */}
        <motion.div variants={item} className="md:col-span-4">
          <QuoteCard 
            quote="Design is not just what it looks like and feels like. Design is how it works." 
            author="Steve Jobs" 
          />
        </motion.div>

        {/* Streak - Using StreakWidget */}
        <motion.div variants={item} className="md:col-span-4">
          <StreakWidget count={12} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;