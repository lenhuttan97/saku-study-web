import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button, Dialog, DialogHeader, DialogContent, DialogActions, Input, Card, SearchInput, CourseCard } from '@/components/ui';
import type { CourseType } from '@/components/ui';

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const courses: CourseType[] = [
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

export default Courses;