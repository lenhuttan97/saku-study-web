import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button, Dialog, DialogHeader, DialogContent, DialogActions, Input, SearchInput } from '@/components/ui';
import { CourseCard } from '@/features/courses';
import type { Course } from '@/types';
import { useCourses } from '@/hooks/useCourses';
import DeleteConfirmDialog from '@/components/courses/DeleteConfirmDialog';
import CourseCreateForm from '@/components/courses/CourseCreateForm';
import { motion, AnimatePresence } from 'motion/react';

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    semester: '',
    location: '',
    description: ''
  });

  const { courses, loading, error, refetch, createCourse, updateCourse, deleteCourse } = useCourses();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await createCourse({
        title: formData.name,
        name: formData.name,
        instructor: formData.instructor,
        teacher: formData.instructor,
        code: formData.name.substring(0, 3).toUpperCase() + '101', // Generate a simple code
        credits: 3, // Default credits
        location: formData.location,
        description: formData.description,
        progress: 0, // Default progress
        color: 'primary', // Maps to theme primary color
        schedule: [],
        materials: [],
        assignments: [],
        exams: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Reset form and close modal
      setFormData({
        name: '',
        instructor: '',
        semester: '',
        location: '',
        description: ''
      });
      setShowModal(false);
    } catch (err) {
      console.error('Failed to create course:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (course: Course) => {
    setCourseToEdit(course);
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (formData: any) => {
    if (!courseToEdit) return;

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

      await updateCourse(courseToEdit.id, updateData);
      setShowEditModal(false);
      setCourseToEdit(null);
    } catch (err) {
      console.error('Failed to update course:', err);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      await deleteCourse(courseToDelete.id);
      setCourseToDelete(null);
      setShowDeleteDialog(false);
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  if (loading && courses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Courses</h1>
            <p className="text-slate-500 mt-1">Manage your academic journey and track progress.</p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            startIcon={<Plus size={20} />}
            disabled
          >
            New Course
          </Button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-200"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                </div>

                <div className="pt-4">
                  <div className="h-2 bg-slate-200 rounded-full w-full mb-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-8">
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

        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading courses</div>
          <p className="text-slate-500 mb-6 text-center">{error}</p>
          <Button onClick={handleRetry}>Try Again</Button>
        </div>
      </div>
    );
  }

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
        onClose={() => !isSubmitting && setShowModal(false)}
        title=""
      >
        <DialogHeader>
          <h2 className="text-2xl font-bold text-slate-900">Create New Course</h2>
          <Button
            variant="ghost"
            onClick={() => !isSubmitting && setShowModal(false)}
            className="p-2"
            disabled={isSubmitting}
          >
            <Plus size={24} className="rotate-45" />
          </Button>
        </DialogHeader>

        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                name="name"
                label="Course Name"
                placeholder="e.g. Graphic Design"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="instructor"
                label="Teacher"
                placeholder="Prof. Elena Vance"
                value={formData.instructor}
                onChange={handleInputChange}
                required
              />
              <Input
                name="semester"
                label="Semester"
                placeholder="Spring 2026"
                value={formData.semester}
                onChange={handleInputChange}
              />
              <Input
                name="location"
                label="Location"
                placeholder="Room 402"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <Input
              name="description"
              label="Description"
              placeholder="Briefly describe the course goals and content..."
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />

            <DialogActions>
              <Button
                variant="ghost"
                onClick={() => !isSubmitting && setShowModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Course'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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
                initialData={courseToEdit || undefined}
                onSubmit={handleUpdateCourse}
                onCancel={() => setShowEditModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <CourseCard
              course={course}
              idx={idx}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        itemName={courseToDelete?.name || courseToDelete?.title}
        itemType="course"
      />
    </div>
  );
};

export default Courses;