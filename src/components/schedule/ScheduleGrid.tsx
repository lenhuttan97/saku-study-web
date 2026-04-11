/**
 * ScheduleGrid - Helper functions for schedule/time grid calculations.
 * The actual grid rendering logic remains in the page component for now.
 */

// These interfaces are specific to the grid rendering logic
// and differ from the centralized schedule types which are for data models
export interface TimeSlot {
  hour: number;
  label: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  room: string;
  startTime: string;
  endTime: string;
  color: string;
  dayIndex: number;
}

/**
 * Generate time slots for a given range (default 7:00 - 22:00).
 */
export function generateTimeSlots(startHour = 7, endHour = 22): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push({
      hour,
      label: `${hour.toString().padStart(2, '0')}:00`,
    });
  }
  return slots;
}

/**
 * Calculate the position and height of an event based on start/end times.
 * Returns top offset (in hours from start) and duration (in hours).
 */
export function calculateEventPosition(
  startTime: string,
  endTime: string,
  startHour = 7
): { top: number; height: number } {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const top = startH + startM / 60 - startHour;
  const height = endH + endM / 60 - startH - startM / 60;

  return { top, height };
}

/**
 * Get day labels for the schedule grid.
 */
export function getDayLabels(): string[] {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

/**
 * Filter events for a specific day.
 */
export function filterEventsByDay(events: ScheduleEvent[], dayIndex: number): ScheduleEvent[] {
  return events.filter((event) => event.dayIndex === dayIndex);
}