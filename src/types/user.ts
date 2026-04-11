// User-related type definitions

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  semesterStart?: Date;
  semesterEnd?: Date;
  notificationPreferences?: NotificationPreferences;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  dueDateReminders: boolean;
  dailyDigest: boolean;
}