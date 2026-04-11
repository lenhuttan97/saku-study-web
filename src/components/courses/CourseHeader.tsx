import React from 'react';
import { Link } from 'react-router-dom';
import { Info, User, MapPin, Clock, ChevronLeft, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface CourseHeaderProps {
  name: string;
  teacher: string;
  location: string;
  semester: string;
  color: string;
  onBack?: string;
  onEditClick?: () => void; // New prop for edit functionality
}

export const CourseHeader = ({ name, teacher, location, semester, color, onBack = '/courses', onEditClick }: CourseHeaderProps) => {
  return (
    <header className="space-y-6">
      <Link to={onBack} className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-purple font-semibold transition-colors group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Courses</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl", color)}>
            <Info size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><User size={16} /> {teacher}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {location}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1.5"><Clock size={16} /> {semester}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            <MoreVertical size={20} />
          </Button>
          <Button onClick={onEditClick}>
            Edit Course
          </Button>
        </div>
      </div>
    </header>
  );
};