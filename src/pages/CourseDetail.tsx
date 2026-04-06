import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Calendar, 
  FileText, 
  CheckSquare, 
  ChevronLeft,
  User,
  MapPin,
  Clock,
  Download,
  Plus,
  ExternalLink,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Info', icon: Info },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="space-y-6">
        <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-purple font-semibold transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Courses</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl", course.color)}>
              <Info size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{course.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><User size={16} /> {course.teacher}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {course.location}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> {course.semester}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
              <MoreVertical size={20} />
            </button>
            <button className="bg-brand-purple text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95">
              Edit Course
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <div className="flex border-b border-slate-100 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-5 text-sm font-bold transition-all relative",
                activeTab === tab.id ? "text-brand-purple" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

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
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">Next Lesson</h4>
                      <p className="text-slate-500 text-sm mb-4">Tomorrow at 09:00 AM</p>
                      <div className="flex items-center gap-2 text-brand-purple font-bold">
                        <Calendar size={16} />
                        <span>Add to Calendar</span>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">Current Progress</h4>
                      <p className="text-slate-500 text-sm mb-4">You have completed 8/12 lessons</p>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-purple w-2/3 rounded-full"></div>
                      </div>
                    </div>
                  </section>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-brand-purple/5 p-8 rounded-3xl border border-brand-purple/10">
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
                  </div>
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
                  <button className="flex items-center gap-2 text-brand-purple font-bold hover:underline">
                    <Plus size={18} /> Upload New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {course.materials.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-purple/20 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-purple shadow-sm">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{file.name}</h4>
                          <p className="text-xs text-slate-500">{file.size} • Uploaded {file.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-brand-purple transition-colors">
                          <Download size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <ExternalLink size={20} />
                        </button>
                      </div>
                    </div>
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
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Assignments & Tasks</h3>
                  <button className="bg-brand-purple text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md">
                    Add Task
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['upcoming', 'in-progress', 'done'].map((status) => (
                    <div key={status} className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">{status.replace('-', ' ')}</h4>
                      <div className="space-y-4">
                        {course.tasks.filter(t => t.status === status).map(task => (
                          <div key={task.id} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <h5 className="font-bold text-slate-800 mb-3">{task.title}</h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                <Clock size={12} /> Due {task.dueDate}
                              </span>
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                status === 'done' ? 'bg-emerald-500' : status === 'in-progress' ? 'bg-brand-purple' : 'bg-slate-300'
                              )}></div>
                            </div>
                          </div>
                        ))}
                        {course.tasks.filter(t => t.status === status).length === 0 && (
                          <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center text-slate-400 text-sm italic">
                            No tasks here
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-800">Weekly Schedule</h3>
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 overflow-x-auto">
                  <div className="min-w-[600px] grid grid-cols-6 gap-4">
                    <div className="col-span-1"></div>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                      <div key={day} className="text-center font-bold text-slate-400 text-sm uppercase py-2">{day}</div>
                    ))}
                    
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(time => (
                      <React.Fragment key={time}>
                        <div className="text-right pr-4 text-xs font-bold text-slate-400 py-4">{time}</div>
                        {[1, 2, 3, 4, 5].map(day => (
                          <div key={`${day}-${time}`} className="bg-white rounded-xl border border-slate-100 h-16 relative group">
                            {day === 1 && time === '09:00' && (
                              <div className="absolute inset-1 bg-brand-purple/10 border-l-4 border-brand-purple rounded-lg p-2 z-10">
                                <p className="text-[10px] font-bold text-brand-purple">Lecture</p>
                                <p className="text-[10px] text-slate-600 truncate">Room 402</p>
                              </div>
                            )}
                            {day === 3 && time === '11:00' && (
                              <div className="absolute inset-1 bg-brand-pink/10 border-l-4 border-brand-pink rounded-lg p-2 z-10">
                                <p className="text-[10px] font-bold text-brand-pink">Workshop</p>
                                <p className="text-[10px] text-slate-600 truncate">Studio A</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
