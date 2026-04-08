/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import SetupSemester from './pages/SetupSemester';
import Schedule from './pages/Schedule';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { PublicOnlyRoute } from './components/routing/PublicOnlyRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (guest only) */}
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
        <Route path="/verify-email" element={<PublicOnlyRoute><VerifyEmail /></PublicOnlyRoute>} />

        {/* Protected Routes — auth checked once at Layout level */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Additional Protected Routes (no Layout) */}
        <Route path="/setup" element={<ProtectedRoute><SetupSemester /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
