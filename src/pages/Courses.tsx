import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  MapPin, 
  User, 
  Plus,
  MoreVertical,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button, Dialog, DialogHeader, DialogContent, DialogActions, Input, Card, SearchInput } from '@/components/ui';

interface Course {
  id: string;
  name: string;
  teacher: string;
  location: string;
  description: string;
  progress: number;
  color: string;
}

const CourseCard = ({ course, idx }: { course: Course; idx: number }) => (
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
    </Card>
  </motion.div>
);

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const courses: Course[] = [
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
        <Button 
          onClick={() => setShowModal(true)}
          startIcon={<Plus size={20} />}
        >
          New Course
        </Button>
      </header>

      {/* Create Course Modal - Using MUI Dialog */}
      <Dialog 
        open={showModal} 
        onClose={() => setShowModal(false)}
        title=""
      >
        <DialogHeader>
          <h2 className="text-2xl font-bold text-slate-900">Create New Course</h2>
          <Button 
            variant="ghost" 
            onClick={() => setShowModal(false)}
            className="p-2"
          >
            <Plus size={24} className="rotate-45" />
          </Button>
        </DialogHeader>

        <DialogContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input 
                label="Course Name"
                placeholder="e.g. Graphic Design"
              />
              <Input 
                label="Teacher"
                placeholder="Prof. Elena Vance"
              />
              <Input 
                label="Semester"
                placeholder="Spring 2026"
              />
              <Input 
                label="Location"
                placeholder="Room 402"
              />
            </div>

            <Input 
              label="Description"
              placeholder="Briefly describe the course goals and content..."
              multiline
              rows={4}
            />

            <DialogActions>
              <Button 
                variant="ghost" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Course
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput placeholder="Search courses..." />
        <Button variant="outline" startIcon={<Filter size={18} />}>
          Filter
        </Button>
      </div>

      {/* Course Grid */}
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