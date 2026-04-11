import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Filter,
  Calendar
} from 'lucide-react';
import { Button, SearchInput } from '@/components/ui';
import { TaskCard } from '@/components/tasks';
import { useTasks } from '@/hooks/useTasks';
import type { Task as TaskType, TaskStatus } from '@/types';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const Tasks = () => {
  const { tasks, loading, error, createTask, updateTaskStatus } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'bg-slate-400' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-brand-purple' },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-500' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Determine the new status based on the column where the task was dropped
      const newStatus = over.id as TaskStatus;

      // Update the task status
      if (updateTaskStatus) {
        updateTaskStatus(active.id as string, newStatus);
      }
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto"></div>
        <p className="mt-4 text-slate-500">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load tasks</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Group tasks by status for the Kanban board
  const groupedTasks = columns.map(column => ({
    status: column.id,
    tasks: filteredTasks.filter(task => task.status === column.id)
  }));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Daily Rituals</h1>
            <p className="text-slate-500 mt-1">Stay on top of your tasks and find your flow.</p>
          </div>
          <Button
            startIcon={<Plus size={20} />}
            onClick={() => {
              // Handle new task creation
              createTask({
                title: 'New Task',
                status: 'todo',
                priority: 'medium',
                description: 'Add details to your new task',
              }).catch(console.error);
            }}
          >
            New Task
          </Button>
        </header>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value as string)}
          />
          <div className="flex gap-2">
            <Button variant="outline" startIcon={<Filter size={18} />}>
              Filter
            </Button>
            <Button variant="outline" startIcon={<Calendar size={18} />}>
              Calendar
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((column) => (
            <div
              key={column.id}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className={column.color + ' w-2 h-2 rounded-full'}></div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {column.label}
                  </h3>
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
                    {groupedTasks.find(g => g.status === column.id)?.tasks.length}
                  </span>
                </div>
                <Button variant="ghost" size="small" className="p-1">
                  <Filter size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                <SortableContext
                  items={groupedTasks.find(g => g.status === column.id)?.tasks.map(t => t.id) || []}
                  strategy={verticalListSortingStrategy}
                >
                  {groupedTasks.find(g => g.status === column.id)?.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={updateTaskStatus}
                    />
                  ))}
                </SortableContext>

                {groupedTasks.find(g => g.status === column.id)?.tasks.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 text-sm italic">
                    No tasks in this stage
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Tasks;