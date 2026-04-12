import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import Courses from "./pages/Course";
import Results from "./pages/Results";
import Fees from "./pages/Fees";
import Announcements from "./pages/Announcements";
import Contact from "./pages/Contact";
import FacultyInbox from "./pages/FacultyInbox";
import Timetable from "./pages/Timetable";
import AdminTimetable from "./pages/AdminTimetable";
import PostAnnouncement from "./pages/PostAnnouncement";
import ManageCourses from "./pages/ManageCourses";
import RateFaculty from "./pages/RateFaculty";
import FacultyList from "./pages/FacultyList";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

// Component Imports
import PrivateRoute from "./components/Privateroute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 1. GUEST ROUTES --- */}
        {/* This is the MyMetro Landing Page (Root) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* This is the Dedicated Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* User Registration */}
        <Route path="/signup" element={<Signup />} />

        {/* --- 2. AUTHENTICATED ROUTES --- */}
        {/* Unified Dashboard Route */}
        <Route path="/dashboard" element={<RoleRoute />} />

        {/* --- 3. ROLE-SPECIFIC DASHBOARDS --- */}
        <Route path="/student" element={<RoleRoute allowedRoles={["student"]}><StudentDashboard /></RoleRoute>} />
        <Route path="/faculty" element={<RoleRoute allowedRoles={["faculty"]}><FacultyDashboard /></RoleRoute>} />
        <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}><AdminDashboard /></RoleRoute>} />

        {/* --- 4. PROTECTED ADMIN FEATURES --- */}
        <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/timetable" element={<PrivateRoute><AdminTimetable /></PrivateRoute>} />
        <Route path="/manage-courses" element={<PrivateRoute><ManageCourses /></PrivateRoute>} />
        <Route path="/post-announcement" element={<PrivateRoute><PostAnnouncement /></PrivateRoute>} />

        {/* --- 5. SHARED STUDENT/FACULTY FEATURES --- */}
        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
        <Route path="/fees" element={<PrivateRoute><Fees /></PrivateRoute>} />
        <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/inbox" element={<PrivateRoute><FacultyInbox /></PrivateRoute>} />
        <Route path="/timetable" element={<PrivateRoute><Timetable /></PrivateRoute>} />
        <Route path="/rate-faculty" element={<PrivateRoute><RateFaculty /></PrivateRoute>} />
        <Route path="/faculty-list" element={<PrivateRoute><FacultyList /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;