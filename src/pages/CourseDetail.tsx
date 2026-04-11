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
import { Button, Tabs, Card } from '@/components/ui';
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
      dueDate: exam.examDate ? new Date(exam.examDate).toLocaleDateString() : 'No date',
    }));

    return [...assignmentTasks, ...examTasks];
  }, [course]);

  const handleUpdateCourse = async (formData: any) => {
    if (!course) return;

    try {
      // Prepare the update data with proper mapping
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
      console.error('Error updating course:', err);
    }
  };

  const handleDeleteCourse = async () => {
    if (!course) return;

    try {
      await deleteCourse(course.id);
      navigate('/courses'); // Navigate back to courses list after deletion
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

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
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Course not found</h2>
        <p className="text-slate-500 mb-6">Invalid course ID.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-40 bg-slate-200 rounded" />
          <div className="h-20 w-full bg-slate-200 rounded-3xl" />
          <div className="h-[420px] w-full bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load course</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Course not found</h2>
        <p className="text-slate-500 mb-6">The requested course does not exist.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
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

                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card elevation="low">
                      <h4 className="font-bold text-slate-800 mb-2">Next Lesson</h4>
                      <p className="text-slate-500 text-sm mb-4">
                        {scheduleEvents[0] ? `${scheduleEvents[0].title} at ${scheduleEvents[0].time}` : 'No lesson scheduled yet'}
                      </p>
                      <div className="flex items-center gap-2 text-brand-purple font-bold cursor-pointer hover:underline">
                        <Calendar size={16} />
                        <span>Add to Calendar</span>
                      </div>
                    </Card>
                    <Card elevation="low">
                      <h4 className="font-bold text-slate-800 mb-2">Current Progress</h4>
                      <p className="text-slate-500 text-sm mb-4">
                        Progress based on course tracking
                      </p>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-purple rounded-full" style={{ width: `${course.progress ?? 0}%` }} />
                      </div>
                    </Card>
                  </section>
                </div>

                <div className="space-y-8">
                  <Card elevation="none" className="bg-brand-purple/5 border border-brand-purple/10">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-bold text-slate-800">{course.progress ?? 0}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Assignments</span>
                        <span className="font-bold text-slate-800">{course.assignments.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Materials</span>
                        <span className="font-bold text-brand-purple">{course.materials.length}</span>
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
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Course Modal */}
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
                onSubmit={handleUpdateCourse}
                onCancel={() => setShowEditModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteCourse}
        itemName={course.name || course.title}
        itemType="course"
      />
    </div>
  );
};

export default CourseDetail;