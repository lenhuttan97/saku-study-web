// Schedule Feature - Main Entry Point
// Explicit exports to avoid naming conflicts between component and type ScheduleEvent
export { generateTimeSlots, calculateEventPosition, getDayLabels, filterEventsByDay, ScheduleItem, ScheduleEvent } from '../../components/schedule';
export type { ScheduleEventType as GridScheduleEvent } from '../../components/schedule';
export * from './hooks';
export type { ScheduleEvent as CalendarScheduleEvent, EventType, Reminder, CalendarView, TimeSlot } from './types';