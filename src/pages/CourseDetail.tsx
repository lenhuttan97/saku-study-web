import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Info,
  Calendar,
  FileText,
  CheckSquare,
  Plus,
} from 'lucide-react';
import { Button, Tabs, Card, LoadingSpinner, LoadingError } from '@/components/ui';
import { CourseHeader, MaterialItem, CourseTasksList, CourseScheduleGrid, useCourseById } from '@/features/courses';
import { MaterialsTab } from '@/components/courses/MaterialsTab';
import CourseCreateForm from '@/components/courses/CourseCreateForm';
import DeleteConfirmDialog from '@/components/courses/DeleteConfirmDialog';
import { useCourses } from '@/hooks/useCourses';
import type { Course } from '@/types';

const formatFileSize = (size?: number): string => {
  if (!size) return 'Unknown size';
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  if (size >= 1024) return `${Math.round(size / 1024)} KB`;
  return `${size} B`;
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { course, loading, error } = useCourseById(id ?? '');
  const { updateCourse, deleteCourse } = useCourses();

  const tabs = [
    { id: 'info', label: 'Info', icon: <Info size={18} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'materials', label: 'Materials', icon: <FileText size={18} /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
  ];

  const scheduleEvents = useMemo(() => {
    if (!course) return [];

    return course.schedule
      .filter((item) => item.dayOfWeek >= 1 && item.dayOfWeek <= 5)
      .map((item) => ({
        day: item.dayOfWeek,
        time: item.startTime,
        title: item.type,
        location: item.location || course.location || 'TBD',
        type: item.type === 'lecture' ? 'Lecture' as const : item.type === 'lab' ? 'Lab' as const : 'Workshop' as const,
        color: course.color || 'bg-brand-purple',
      }));
  }, [course]);

  const materialItems = useMemo(() => {
    if (!course) return [];

    return course.materials.map((material) => ({
      name: material.fileName || material.title,
      size: formatFileSize(material.size),
      date: material.uploadedAt ? new Date(material.uploadedAt).toLocaleDateString() : 'N/A',
    }));
  }, [course]);

  const taskItems = useMemo(() => {
    if (!course) return [];

    const assignmentTasks = course.assignments.map((assignment, index) => ({
      id: index + 1,
      title: assignment.title,
      status: assignment.completed ? 'done' : 'in-progress',
      dueDate: assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date',
    }));

    const examTasks = course.exams.map((exam, index) => ({
      id: assignmentTasks.length + index + 1,
      title: exam.title,
      status: exam.completed ? 'done' : 'upcoming',
      dueDate: exam.examDate ? new Date(exam.examDate).toLocaleDateString() : 'No date set',
    }));

    return [...assignmentTasks, ...examTasks];
  }, [course]);

  const handleMaterialsUpdate = async (materials: any) => {
    if (!course) return;

    try {
      await updateCourse(course.id, { materials });
    } catch (err) {
      console.error('Error updating materials:', err);
    }
  };

  if (!id) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <LoadingError
          title="Course not found"
          message="Invalid course ID."
          retryText="Go Back"
          onRetry={() => window.history.back()}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <LoadingSpinner text="Loading course..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <LoadingError
          title="Failed to load course"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <LoadingError
          title="Course not found"
          message="The requested course does not exist."
          retryText="Go Back"
          onRetry={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <CourseHeader
        name={course.name || course.title || 'Untitled Course'}
        teacher={course.teacher || course.instructor || 'Unknown instructor'}
        location={course.location || 'TBD'}
        semester={course.code || 'Current term'}
        color={course.color || 'bg-brand-purple'}
        onEditClick={() => setShowEditModal(true)}
      />

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
                      {course.description || 'No description available for this course yet.'}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-800">Progress</h3>
                      <span className="text-sm font-medium text-slate-500">
                        {course.progress || 0}% complete
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className="bg-brand-purple h-3 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Course Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Credits</span>
                        <span className="font-medium">{course.credits || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location</span>
                        <span className="font-medium">{course.location || 'TBD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Instructor</span>
                        <span className="font-medium">{course.teacher || course.instructor || 'Unknown'}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Events</h3>
                    <div className="space-y-3">
                      {taskItems.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-slate-500">{task.dueDate}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            task.status === 'done' ? 'bg-emerald-500' :
                            task.status === 'in-progress' ? 'bg-brand-purple' : 'bg-amber-500'
                          }`}></div>
                        </div>
                      ))}
                      {taskItems.length === 0 && (
                        <p className="text-slate-500 text-sm italic">No upcoming events</p>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CourseScheduleGrid events={scheduleEvents} />
              </motion.div>
            )}

            {activeTab === 'materials' && (
              <motion.div
                key="materials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <MaterialsTab
                  course={course}
                  onMaterialsUpdate={handleMaterialsUpdate}
                />
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CourseTasksList tasks={taskItems} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <CourseCreateForm
                initialData={course}
                onSubmit={async (formData) => {
                  try {
                    const updateData: Partial<Omit<Course, 'id' | 'userId'>> = {
                      title: formData.name,
                      name: formData.name,
                      code: formData.code,
                      instructor: formData.instructor,
                      teacher: formData.instructor,
                      credits: formData.credits,
                      description: formData.description,
                      location: formData.location,
                      color: formData.color,
                      updatedAt: new Date()
                    };

                    await updateCourse(course.id, updateData);
                    setShowEditModal(false);
                  } catch (err) {
                    console.error('Failed to update course:', err);
                  }
                }}
                onCancel={() => setShowEditModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={async () => {
          try {
            await deleteCourse(course.id);
            navigate('/courses');
          } catch (err) {
            console.error('Failed to delete course:', err);
          }
        }}
        itemName={course.name || course.title}
        itemType="course"
      />
    </div>
  );
};

export default CourseDetail;