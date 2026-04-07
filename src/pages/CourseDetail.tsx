import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Plus
} from 'lucide-react';
import { Button, Tabs, Card } from '@/components/ui';
import { CourseHeader, MaterialItem, CourseTasksList, CourseScheduleGrid } from '@/components/ui';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Info', icon: <Info size={18} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'materials', label: 'Materials', icon: <FileText size={18} /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
  ];

  // Mock data
  const course = {
    id: '1',
    name: 'Graphic Design Basics',
    teacher: 'Prof. Elena Vance',
    location: 'Room 402',
    semester: 'Spring 2026',
    description: 'This course covers the fundamental principles of graphic design, including layout, typography, and color theory. Students will learn to use industry-standard software to create visual solutions for various communication problems.',
    progress: 65,
    color: 'bg-brand-purple',
    materials: [
      { name: 'Syllabus_Spring2026.pdf', size: '1.2 MB', date: 'Mar 15, 2026' },
      { name: 'Color_Theory_Lecture.pptx', size: '4.5 MB', date: 'Mar 20, 2026' },
      { name: 'Project_1_Brief.pdf', size: '800 KB', date: 'Mar 22, 2026' },
    ],
    tasks: [
      { id: 1, title: 'Logo Sketches', status: 'done', dueDate: 'Mar 25' },
      { id: 2, title: 'Color Palette Selection', status: 'in-progress', dueDate: 'Apr 10' },
      { id: 3, title: 'Final Logo Design', status: 'upcoming', dueDate: 'Apr 20' },
    ]
  };

  const scheduleEvents = [
    { day: 1, time: '09:00', title: 'Lecture', location: 'Room 402', type: 'Lecture' as const, color: 'bg-brand-purple' },
    { day: 3, time: '11:00', title: 'Workshop', location: 'Studio A', type: 'Workshop' as const, color: 'bg-brand-pink' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Using CourseHeader */}
      <CourseHeader 
        name={course.name}
        teacher={course.teacher}
        location={course.location}
        semester={course.semester}
        color={course.color}
      />

      {/* MUI Tabs */}
      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <Tabs 
          tabs={tabs} 
          value={activeTab} 
          onChange={setActiveTab}
        />

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              >
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {course.description}
                    </p>
                  </section>
                  
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card elevation="low">
                      <h4 className="font-bold text-slate-800 mb-2">Next Lesson</h4>
                      <p className="text-slate-500 text-sm mb-4">Tomorrow at 09:00 AM</p>
                      <div className="flex items-center gap-2 text-brand-purple font-bold cursor-pointer hover:underline">
                        <Calendar size={16} />
                        <span>Add to Calendar</span>
                      </div>
                    </Card>
                    <Card elevation="low">
                      <h4 className="font-bold text-slate-800 mb-2">Current Progress</h4>
                      <p className="text-slate-500 text-sm mb-4">You have completed 8/12 lessons</p>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-purple w-2/3 rounded-full"></div>
                      </div>
                    </Card>
                  </section>
                </div>
                
                <div className="space-y-8">
                  <Card elevation="none" className="bg-brand-purple/5 border border-brand-purple/10">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Attendance</span>
                        <span className="font-bold text-slate-800">95%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Assignments</span>
                        <span className="font-bold text-slate-800">12/15</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Grade Average</span>
                        <span className="font-bold text-brand-purple">A-</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'materials' && (
              <motion.div
                key="materials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Course Materials</h3>
                  <Button variant="outline" size="small" startIcon={<Plus size={18} />}>
                    Upload New
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {course.materials.map((file, idx) => (
                    <MaterialItem key={idx} {...file} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Using CourseTasksList */}
                <CourseTasksList tasks={course.tasks} />
              </motion.div>
            )}
            
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Using CourseScheduleGrid */}
                <CourseScheduleGrid events={scheduleEvents} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;