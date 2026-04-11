import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button, Dialog, DialogHeader, DialogContent, DialogActions, Input, Card, SearchInput } from '@/components/ui';
import { CourseCard } from '@/features/courses';
import type { Course } from '@/types';

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const courses: Course[] = [
    { 
      id: '1', 
      userId: 'user1',
      title: 'Graphic Design Basics',
      name: 'Graphic Design Basics', 
      instructor: 'Prof. Elena Vance',
      teacher: 'Prof. Elena Vance', 
      code: 'DES101',
      credits: 3,
      location: 'Room 402', 
      description: 'Introduction to visual communication and design principles.',
      progress: 65, 
      color: 'primary', // Maps to theme primary
      schedule: [],
      materials: [],
      assignments: [],
      exams: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '2', 
      userId: 'user1',
      title: 'Advanced Web Development',
      name: 'Advanced Web Development', 
      instructor: 'Dr. Marcus Chen',
      teacher: 'Dr. Marcus Chen', 
      code: 'WEB201',
      credits: 4,
      location: 'Lab 301', 
      description: 'Deep dive into modern web technologies and frameworks.',
      progress: 30, 
      color: 'secondary', // Maps to theme secondary
      schedule: [],
      materials: [],
      assignments: [],
      exams: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '3', 
      userId: 'user1',
      title: 'Mobile App Prototyping',
      name: 'Mobile App Prototyping', 
      instructor: 'Alex Rivera',
      teacher: 'Alex Rivera', 
      code: 'MOB301',
      credits: 3,
      location: 'Design Studio', 
      description: 'Creating interactive prototypes for mobile applications.',
      progress: 80, 
      color: 'info', // Maps to theme info
      schedule: [],
      materials: [],
      assignments: [],
      exams: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '4', 
      userId: 'user1',
      title: 'UX Research Methods',
      name: 'UX Research Methods', 
      instructor: 'Dr. Sarah Johnson',
      teacher: 'Dr. Sarah Johnson', 
      code: 'UXR401',
      credits: 3,
      location: 'Research Lab', 
      description: 'Qualitative and quantitative user research techniques.',
      progress: 0, 
      color: 'success', // Maps to theme success
      schedule: [],
      materials: [],
      assignments: [],
      exams: [],
      createdAt: new Date(),
      updatedAt: new Date()
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