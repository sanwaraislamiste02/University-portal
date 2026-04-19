import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

const tools = [
  { icon: "📚", title: "Courses",       desc: "View and enrol in available courses.",          path: "/courses"       },
  { icon: "📊", title: "Results",       desc: "Check your grades and academic results.",        path: "/results"       },
  { icon: "💳", title: "Fees",          desc: "View and pay your outstanding fees.",            path: "/fees"          },
  { icon: "🗓️", title: "Timetable",    desc: "See your weekly class schedule.",                path: "/timetable"     },
  { icon: "📢", title: "Announcements", desc: "Stay updated with notices from faculty.",        path: "/announcements" },
  { icon: "✉️", title: "Contact",       desc: "Send a message to your faculty or supervisor.", path: "/contact"       },
  { icon: "⭐", title: "Rate Faculty",  desc: "Anonymously rate your faculty members.",         path: "/rate-faculty"  },
  { icon: "👨‍🏫", title: "Faculty",     desc: "View faculty members and their ratings.",         path: "/faculty-list"  },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const email    = localStorage.getItem("email");

  return (
    <Layout>
      <style>{`
        .sd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 36px;
        }
        .sd-card {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 18px;
          cursor: pointer;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          transition: box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .sd-card:hover {
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .sd-ql-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 6px 20px;
        }
        .sd-ql-item {
          padding: 7px 0 7px 10px;
          border-left: 2px solid #e0e0e0;
          font-size: 14px;
          color: #4a3728;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: border-color 0.15s;
        }
        .sd-ql-item:hover { border-color: #e6a817; }

        @media (max-width: 480px) {
          .sd-grid { grid-template-columns: 1fr; }
          .sd-ql-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Welcome banner */}
      <div style={{ borderBottom:"3px solid #e6a817", paddingBottom:"18px", marginBottom:"28px" }}>
        <h1 style={{ fontSize:"26px", fontWeight:"700", color:"#4a3728", marginBottom:"8px" }}>
          Current Students
        </h1>
        <p style={{ color:"#555", fontSize:"14px", maxWidth:"520px", lineHeight:"1.6" }}>
          We are here to help you succeed! Here are your tools, resources and information for your academic journey.
        </p>
        <p style={{ marginTop:"8px", fontSize:"13px", color:"#888" }}>
          Logged in as: <strong>{email}</strong>
        </p>
      </div>

      {/* Section title */}
      <div style={{ borderBottom:"3px solid #e6a817", paddingBottom:"6px", marginBottom:"20px", display:"inline-block" }}>
        <h2 style={{ fontSize:"18px", fontWeight:"600", color:"#333" }}>Useful online tools</h2>
      </div>

      {/* Tool cards */}
      <div className="sd-grid">
        {tools.map(tool => (
          <div key={tool.path} className="sd-card" onClick={() => navigate(tool.path)}>
            <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"#4a3728", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
              {tool.icon}
            </div>
            <div>
              <div style={{ fontWeight:"600", fontSize:"15px", color:"#4a3728", marginBottom:"4px" }}>
                {tool.title}
              </div>
              <div style={{ fontSize:"13px", color:"#666", lineHeight:"1.5" }}>
                {tool.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ borderBottom:"3px solid #e6a817", paddingBottom:"6px", marginBottom:"18px", display:"inline-block" }}>
        <h2 style={{ fontSize:"18px", fontWeight:"600", color:"#333" }}>Most visited pages</h2>
      </div>

      <div className="sd-ql-grid">
        {tools.map(tool => (
          <div key={tool.path} className="sd-ql-item" onClick={() => navigate(tool.path)}>
            {tool.title} →
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default StudentDashboard;