import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, User, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';

import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  idx?: number;
}

export const CourseCard = ({ course, idx = 0 }: CourseCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Card hoverable elevation="medium" className="p-6">
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
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-purple transition-colors">{course.name || course.title}</h3>
            <p className="text-slate-500 text-sm mt-1 line-clamp-2">{course.description || `${course.code} course`}</p>
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User size={16} className="text-slate-400" />
              <span>{course.teacher || course.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} className="text-slate-400" />
              <span>{course.location || 'TBD'}</span>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Progress</span>
              <span>{course.progress ?? 0}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${course.progress ?? 0}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={cn("h-full rounded-full", course.color.replace('shadow-lg', ''))}
              ></motion.div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};