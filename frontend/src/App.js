import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import PrivateRoute from "./components/Privateroute";
import RoleRoute from "./components/RoleRoute";
import RateFaculty from "./pages/RateFaculty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<RoleRoute />} />
        <Route path="/student" element={<RoleRoute allowedRoles={["student"]}><StudentDashboard /></RoleRoute>} />
        <Route path="/faculty" element={<RoleRoute allowedRoles={["faculty"]}><FacultyDashboard /></RoleRoute>} />
        <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}><AdminDashboard /></RoleRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/timetable" element={<PrivateRoute><AdminTimetable /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
        <Route path="/fees" element={<PrivateRoute><Fees /></PrivateRoute>} />
        <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/inbox" element={<PrivateRoute><FacultyInbox /></PrivateRoute>} />
        <Route path="/timetable" element={<PrivateRoute><Timetable /></PrivateRoute>} />
        <Route path="/post-announcement" element={<PrivateRoute><PostAnnouncement /></PrivateRoute>} />
        <Route path="/manage-courses" element={<PrivateRoute><ManageCourses /></PrivateRoute>} />
        <Route path="/rate-faculty" element={<PrivateRoute><RateFaculty /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;