/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import SetupSemester from './pages/SetupSemester';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<SetupSemester />} />

        {/* Protected Routes (Layout included) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
          <Route path="calendar" element={<div className="p-8 text-center text-slate-400 italic">Calendar view coming soon...</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
