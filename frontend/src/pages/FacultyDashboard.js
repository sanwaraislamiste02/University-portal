import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout";

function FacultyDashboard() {
  const navigate  = useNavigate();
  const email     = localStorage.getItem("email");
  const [unread, setUnread] = useState(0);
  const [courses, setCourses] = useState(0);

  useEffect(() => {
    // fetch unread messages count
    axios.get(`http://localhost:5000/messages/${email}`)
      .then(res => setUnread(res.data.filter(m => !m.read).length))
      .catch(() => {});
    // fetch course count
    axios.get("http://localhost:5000/courses")
      .then(res => setCourses(
        res.data.filter(c => c.instructor === email).length
      ))
      .catch(() => {});
  }, [email]);

  const tools = [
    { icon: "📝", title: "Add Results",
      desc: "Enter grades and results for your students.",
      path: "/add-result",
      stat: "Enter grades" },
    { icon: "📚", title: "Manage Courses",
      desc: "Add and manage the courses you teach.",
      path: "/manage-courses",
      stat: `${courses} course${courses !== 1 ? "s" : ""}` },
    { icon: "✉️", title: "Inbox",
      desc: "Read and reply to messages from your students.",
      path: "/inbox",
      stat: unread > 0 ? `${unread} unread` : "No new messages" },
    { icon: "📢", title: "Post Announcement",
      desc: "Broadcast a notice to students or all users.",
      path: "/post-announcement",
      stat: "Notify students" },
    { icon: "🗓️", title: "Timetable",
      desc: "View the weekly class schedule.",
      path: "/timetable",
      stat: "Weekly schedule" },
      { icon: "👥", title: "My Students",
      desc: "View students enrolled in your courses.",
      path: "/my-students",
      stat: `${courses} course${courses !== 1 ? "s" : ""}` },
  ];

  return (
    <Layout>
      {/* Welcome banner */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "20px", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700",
          color: "#4a3728", marginBottom: "8px" }}>
          Faculty Portal
        </h1>
        <p style={{ color: "#555", fontSize: "15px", maxWidth: "560px" }}>
          Manage your courses, students and communications
          all from one place.
        </p>
        <p style={{ marginTop: "8px", fontSize: "13px", color: "#888" }}>
          Logged in as: <strong>{email}</strong>
        </p>
      </div>

      {/* Section title */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "8px", marginBottom: "24px",
        display: "inline-block" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Faculty tools
        </h2>
      </div>

      {/* Tool cards */}
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px", marginBottom: "40px" }}>
        {tools.map(tool => (
          <div key={tool.path} onClick={() => navigate(tool.path)}
            style={{ background: "#fff", border: "1px solid #e0e0e0",
              borderRadius: "8px", padding: "20px", cursor: "pointer",
              display: "flex", gap: "16px", alignItems: "flex-start",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.2s, transform 0.15s" }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
            <div style={{ width: "44px", height: "44px",
              borderRadius: "50%", background: "#4a3728",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "20px",
              flexShrink: 0 }}>
              {tool.icon}
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "15px",
                color: "#4a3728", marginBottom: "4px" }}>
                {tool.title}
              </div>
              <div style={{ fontSize: "13px", color: "#666",
                lineHeight: "1.5", marginBottom: "6px" }}>
                {tool.desc}
              </div>
              <div style={{ fontSize: "12px", color: "#e6a817",
                fontWeight: "600" }}>{tool.stat}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "8px", marginBottom: "20px",
        display: "inline-block" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Quick links
        </h2>
      </div>
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "8px 24px" }}>
        {tools.map(tool => (
          <div key={tool.path} onClick={() => navigate(tool.path)}
            style={{ padding: "6px 0",
              borderLeft: "2px solid #e0e0e0",
              paddingLeft: "10px", fontSize: "14px",
              color: "#4a3728", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#e6a817"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e0e0"}>
            {tool.title} →
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default FacultyDashboard;