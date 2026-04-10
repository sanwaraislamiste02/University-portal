// frontend/src/pages/AdminDashboard.js
// Admin sees stats cards and quick links to all admin functions
// Each card navigates to the relevant admin page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout";

function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);

  // fetch total user count to show on dashboard
  useEffect(() => {
    axios.get("http://localhost:5000/admin/users")
      .then(res => setUserCount(res.data.length))
      .catch(() => {});
  }, []);

  const cards = [
    { icon: "👥", title: "Manage Users",      desc: "View, create and manage all student, faculty and admin accounts.", path: "/admin/users",     stat: `${userCount} total users` },
    { icon: "🗓️", title: "Manage Timetable",  desc: "Add and remove class slots from the weekly timetable.",           path: "/admin/timetable", stat: "Weekly schedule"          },
    { icon: "📢", title: "Post Announcement", desc: "Broadcast notices to students, faculty or everyone.",             path: "/post-announcement",stat: "Notify everyone"          },
    { icon: "📚", title: "Courses",           desc: "Browse all available courses and enrollment counts.",             path: "/courses",          stat: "All courses"              },
    { icon: "💳", title: "Announcements",     desc: "View all announcements posted in the system.",                   path: "/announcements",    stat: "View all"                 },
  ];

  return (
    <Layout>
      {/* Welcome banner */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "20px", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700",
          color: "#4a3728", marginBottom: "8px" }}>
          Admin Dashboard
        </h1>
        <p style={{ color: "#555", fontSize: "15px" }}>
          Manage users, timetables, fees and announcements from here.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))",
        gap: "16px", marginBottom: "36px" }}>
        {[
          { label: "Total Users",  value: userCount, icon: "👥" },
          { label: "Active Roles", value: "3",       icon: "🔐" },
          { label: "System",       value: "Online",  icon: "✅" },
        ].map(stat => (
          <div key={stat.label} style={{
            background: "#4a3728", color: "white",
            borderRadius: "8px", padding: "18px 20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>
              {stat.icon}
            </div>
            <div style={{ fontSize: "22px", fontWeight: "700",
              color: "#e6a817" }}>{stat.value}</div>
            <div style={{ fontSize: "12px", opacity: 0.8,
              marginTop: "2px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section title */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "8px", marginBottom: "24px",
        display: "inline-block" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
          Admin tools
        </h2>
      </div>

      {/* Tool cards */}
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
        gap: "20px" }}>
        {cards.map(card => (
          <div key={card.path} onClick={() => navigate(card.path)}
            style={{
              background: "#fff", border: "1px solid #e0e0e0",
              borderRadius: "8px", padding: "20px", cursor: "pointer",
              display: "flex", gap: "16px", alignItems: "flex-start",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%",
              background: "#4a3728", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "15px",
                color: "#4a3728", marginBottom: "4px" }}>{card.title}</div>
              <div style={{ fontSize: "13px", color: "#666",
                lineHeight: "1.5", marginBottom: "6px" }}>{card.desc}</div>
              <div style={{ fontSize: "12px", color: "#e6a817",
                fontWeight: "600" }}>{card.stat}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default AdminDashboard;