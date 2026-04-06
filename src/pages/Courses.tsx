import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MapPin, 
  User, 
  Clock, 
  Plus,
  ChevronRight,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CourseCard = ({ course, idx }: { course: any; idx: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.1 }}
    className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow group hover:border-brand-purple/20 transition-all"
  >
    <Link to={`/courses/${course.id}`} className="block space-y-4">
      <div className="flex items-start justify-between">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", course.color)}>
          <BookOpen size={24} />
        </div>
        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-purple transition-colors">{course.name}</h3>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{course.description}</p>
      </div>

      <div className="pt-4 border-t border-slate-50 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User size={16} className="text-slate-400" />
          <span>{course.teacher}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="text-slate-400" />
          <span>{course.location}</span>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={cn("h-full rounded-full", course.color.replace('shadow-lg', ''))}
          ></motion.div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const courses = [
    { 
      id: '1', 
      name: 'Graphic Design Basics', 
      teacher: 'Prof. Elena Vance', 
      location: 'Room 402', 
      description: 'Introduction to visual communication and design principles.',
      progress: 65, 
      color: 'bg-brand-purple shadow-brand-purple/20' 
    },
    { 
      id: '2', 
      name: 'Typography Workshop', 
      teacher: 'Dr. Julian Thorne', 
      location: 'Studio A', 
      description: 'The art and technique of arranging type to make written language legible.',
      progress: 40, 
      color: 'bg-brand-pink shadow-brand-pink/20' 
    },
    { 
      id: '3', 
      name: 'Color Theory', 
      teacher: 'Sarah Jenkins', 
      location: 'Library', 
      description: 'Understanding color relationships and psychological impacts.',
      progress: 85, 
      color: 'bg-brand-blue shadow-brand-blue/20' 
    },
    { 
      id: '4', 
      name: 'Web Development', 
      teacher: 'Mike Ross', 
      location: 'Lab 10', 
      description: 'Building responsive websites using modern technologies.',
      progress: 20, 
      color: 'bg-emerald-500 shadow-emerald-500/20' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Courses</h1>
          <p className="text-slate-500 mt-1">Manage your academic journey and track progress.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-purple text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>New Course</span>
        </button>
      </header>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] p-10 border border-slate-100 card-shadow overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Create New Course</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Course Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Graphic Design"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Teacher</label>
                    <input 
                      type="text" 
                      placeholder="Prof. Elena Vance"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Semester</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all appearance-none">
                      <option>Spring 2026</option>
                      <option>Summer 2026</option>
                      <option>Fall 2026</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Location</label>
                    <input 
                      type="text" 
                      placeholder="Room 402"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe the course goals and content..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-brand-purple text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <div key={course.id}>
            <CourseCard course={course} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { CourseCard };
export default Courses;
