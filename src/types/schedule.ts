// Schedule-related type definitions

export interface ScheduleEvent {
  id: string;
  userId: string; // Reference to the user who owns this event
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
  location?: string;
  eventType: EventType;
  courseId?: string; // Optional reference to a course
  taskId?: string; // Optional reference to a task
  color?: string;
  reminders?: Reminder[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventType = 'class' | 'exam' | 'assignment' | 'meeting' | 'personal' | 'other';

export interface Reminder {
  id: string;
  eventId: string;
  remindAt: Date;
  method: 'notification' | 'email';
}

export interface CalendarView {
  view: 'day' | 'week' | 'month';
  date: Date;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}