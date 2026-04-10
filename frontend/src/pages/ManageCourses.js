// frontend/src/pages/ManageCourses.js
// Faculty use this to add new courses to the system
// Simple form — name, description, instructor auto-filled from their email
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function ManageCourses() {
  const [courses, setCourses]     = useState([]);
  const [name, setName]           = useState("");
  const [description, setDesc]    = useState("");
  const [message, setMessage]     = useState("");
  const instructor = localStorage.getItem("email");

  const fetchCourses = () => {
    axios.get("http://localhost:5000/courses")
      .then(res => setCourses(res.data));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleAdd = async () => {
    if (!name) { setMessage("Please enter a course name."); return; }
    try {
      await axios.post("http://localhost:5000/courses/add", {
        name, description, instructor
      });
      setMessage("Course added successfully!");
      setName(""); setDesc("");
      fetchCourses();
    } catch (err) {
      setMessage("Failed to add course.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Manage Courses</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Add and manage your courses.
        </p>
      </div>

      {/* Add course form */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "24px", marginBottom: "32px",
        maxWidth: "560px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "600",
          marginBottom: "16px", color: "#333" }}>Add new course</h2>

        {message && (
          <p style={{ marginBottom: "12px", fontSize: "13px",
            color: message.includes("success") ? "#1D9E75" : "#e24b4a" }}>
            {message}
          </p>
        )}

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>Course Name</label>
        <input type="text" placeholder="e.g. Advanced Algorithms"
          value={name} onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: "9px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "14px" }} />

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>Description</label>
        <textarea placeholder="Brief course description..."
          value={description} onChange={e => setDesc(e.target.value)}
          rows={3} style={{ width: "100%", padding: "9px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "20px", resize: "vertical" }} />

        <button onClick={handleAdd} style={{
          background: "#e6a817", color: "#4a3728", border: "none",
          padding: "10px 28px", borderRadius: "6px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
          Add Course
        </button>
      </div>

      {/* Courses list */}
      <h2 style={{ fontSize: "15px", fontWeight: "600",
        marginBottom: "14px", color: "#333" }}>Your courses</h2>

      {courses.filter(c => c.instructor === instructor).length === 0 && (
        <p style={{ color: "#888", fontSize: "14px" }}>
          You have not added any courses yet.
        </p>
      )}

      {courses
        .filter(c => c.instructor === instructor)
        .map(course => (
          <div key={course._id} style={{
            background: "#fff", border: "1px solid #e0e0e0",
            borderLeft: "4px solid #e6a817", borderRadius: "8px",
            padding: "16px 20px", marginBottom: "12px" }}>
            <div style={{ fontWeight: "600", color: "#4a3728",
              marginBottom: "4px" }}>{course.name}</div>
            <div style={{ fontSize: "13px", color: "#888" }}>
              {course.enrolledStudents?.length || 0} students enrolled
            </div>
            {course.description && (
              <div style={{ fontSize: "13px", color: "#666",
                marginTop: "4px" }}>{course.description}</div>
            )}
          </div>
        ))}
    </Layout>
  );
}

export default ManageCourses;