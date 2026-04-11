# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + MUI (Material UI) |
| State | Redux Toolkit |
| Animations | Framer Motion (`motion`) |
| Icons | lucide-react |
| Backend | Firebase (Firestore + Auth) |

## 🏗️ Architecture Overview

The application follows a feature-based architecture with the following structure:

- `src/components/` - Reusable UI components organized by domain (courses, schedule, tasks, ui)
- `src/features/` - Feature modules that export related components, hooks, and types
- `src/pages/` - Route-level components that compose features
- `src/services/` - Data layer with Firebase integration
- `src/hooks/` - Custom React hooks for business logic
- `src/types/` - Shared TypeScript type definitions
- `src/lib/` - Utility functions

## 📁 Key Directories

- `src/services/firebase/` - Contains service layers for Firestore operations (authService, courseService, taskService, scheduleService)
- `src/types/` - Centralized type definitions for Course, Task, User, Schedule, etc.
- `src/hooks/` - Custom hooks like `useCourses`, `useTasks` that abstract data fetching logic
- `src/pages/Courses.tsx` - Main courses page that integrates with the course service and UI components

## 🗂️ Data Flow

1. **Services**: Located in `src/services/firebase/`, these handle all Firestore operations with proper TypeScript converters
2. **Hooks**: Located in `src/hooks/`, these manage state and provide data to components
3. **Components**: Located in `src/components/`, these are organized by feature domain
4. **Pages**: Located in `src/pages/`, these orchestrate the UI and connect to hooks

## 🔧 Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# TypeScript check
npm run lint
```

## 🌐 Environment Variables

Create `.env.local` with:

```env
GEMINI_API_KEY=your_api_key_here
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_firebase_app_id"
```

## 📝 Key Patterns

- **Firebase Integration**: Services use Firestore converters for proper type mapping between TypeScript interfaces and Firestore documents
- **Type Safety**: All components and hooks are strongly typed with interfaces defined in `src/types/`
- **Component Structure**: Components use MUI for complex UI elements and Tailwind for layout/styling
- **Animations**: Framer Motion is used for smooth transitions and animations
- **Routing**: ProtectedRoute and PublicOnlyRoute components handle authentication-based routing

## 📚 Course Entity Structure

The Course entity includes:
- Basic info (title, code, instructor, credits, color, description)
- Progress tracking (progress percentage)
- Schedule (with day/time/location)
- Materials, assignments, and exams arrays
- Timestamps (createdAt, updatedAt)
- User association (userId)

## 🔄 Service Methods Pattern

All Firebase services follow the same pattern:
- `fetchX()` - Read operations
- `createX()` - Write operations  
- `updateX()` - Update operations
- `deleteX()` - Delete operations
- Proper error handling with Firebase permission checks