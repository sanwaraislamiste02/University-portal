import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

const tools = [
  { icon: "📚", title: "Courses",       desc: "View and enrol in available courses.",         path: "/courses"       },
  { icon: "📊", title: "Results",       desc: "Check your grades and academic results.",       path: "/results"       },
  { icon: "💳", title: "Fees",          desc: "View and pay your outstanding fees.",           path: "/fees"          },
  { icon: "🗓️", title: "Timetable",    desc: "See your weekly class schedule.",               path: "/timetable"     },
  { icon: "📢", title: "Announcements", desc: "Stay updated with notices from faculty.",       path: "/announcements" },
  { icon: "✉️", title: "Contact",       desc: "Send a message to your faculty or supervisor.", path: "/contact"       },
  { icon: "⭐", title: "Rate Faculty", desc: "Anonymously rate your faculty members.", path: "/rate-faculty" },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  return (
    <Layout>

      {/* ── WELCOME BANNER ── */}
      <div style={{
        borderBottom: "3px solid #e6a817",
        paddingBottom: "20px",
        marginBottom: "32px"
      }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700",
          color: "#4a3728", marginBottom: "8px" }}>
          Current Students
        </h1>
        <p style={{ color: "#555", fontSize: "15px", maxWidth: "560px" }}>
          We are here to help you succeed! Here are your tools,
          resources and information for your academic journey.
        </p>
        <p style={{ marginTop: "8px", fontSize: "13px", color: "#888" }}>
          Logged in as: <strong>{email}</strong>
        </p>
      </div>

      {/* ── SECTION TITLE ── */}
      <div style={{
        borderBottom: "3px solid #e6a817",
        paddingBottom: "8px",
        marginBottom: "24px",
        display: "inline-block"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Useful online tools
        </h2>
      </div>

      {/* ── TOOL CARDS ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {tools.map((tool) => (
          <div
            key={tool.path}
            onClick={() => navigate(tool.path)}
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "20px",
              cursor: "pointer",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              transition: "box-shadow 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"}
          >
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "#4a3728", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "20px", flexShrink: 0
            }}>
              {tool.icon}
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "15px",
                color: "#4a3728", marginBottom: "4px" }}>
                {tool.title}
              </div>
              <div style={{ fontSize: "13px", color: "#666",
                lineHeight: "1.5" }}>
                {tool.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── QUICK LINKS ── */}
      <div style={{
        borderBottom: "3px solid #e6a817",
        paddingBottom: "8px",
        marginBottom: "20px",
        display: "inline-block"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Most visited pages
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "8px 24px"
      }}>
        {tools.map((tool) => (
          <div
            key={tool.path}
            onClick={() => navigate(tool.path)}
            style={{
              padding: "6px 0",
              borderLeft: "2px solid #e0e0e0",
              paddingLeft: "10px",
              fontSize: "14px",
              color: "#4a3728",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#e6a817"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e0e0"}
          >
            {tool.title} →
          </div>
        ))}
      </div>

    </Layout>
  );
}

export default StudentDashboard;