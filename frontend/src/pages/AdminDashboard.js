import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout";

function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users")
      .then(res => setUserCount(res.data.length))
      .catch(() => {});
  }, []);

  // Courses card REMOVED
  const cards = [
    { icon: "👥", title: "Manage Users",      desc: "View, create and manage all student, faculty and admin accounts.", path: "/admin/users",      stat: `${userCount} total users` },
    { icon: "🗓️", title: "Manage Timetable",  desc: "Add and remove class slots from the weekly timetable.",           path: "/admin/timetable",  stat: "Weekly schedule"          },
    { icon: "📣", title: "Post Announcement", desc: "Broadcast notices to students, faculty or everyone.",             path: "/post-announcement", stat: "Notify everyone"          },
    { icon: "📢", title: "Announcements",     desc: "View all announcements posted in the system.",                   path: "/announcements",     stat: "View all"                 },
  ];

  return (
    <Layout>
      <style>{`
        .ad-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 14px;
          margin-bottom: 32px;
        }
        .ad-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 18px;
        }
        .ad-card {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          cursor: pointer;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .ad-card:hover {
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        @media (max-width: 480px) {
          .ad-cards { grid-template-columns: 1fr; }
          .ad-stats  { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* Welcome */}
      <div style={{ borderBottom:"3px solid #e6a817", paddingBottom:"18px", marginBottom:"28px" }}>
        <h1 style={{ fontSize:"26px", fontWeight:"700", color:"#4a3728", marginBottom:"6px" }}>Admin Dashboard</h1>
        <p style={{ color:"#555", fontSize:"14px" }}>Manage users, timetables and announcements from here.</p>
      </div>

      {/* Stats */}
      <div className="ad-stats">
        {[
          { label:"Total Users",  value:userCount, icon:"👥" },
          { label:"Active Roles", value:"3",       icon:"🔧" },
          { label:"System",       value:"Online",  icon:"✅" },
        ].map(s => (
          <div key={s.label} style={{ background:"#4a3728", color:"white", borderRadius:"8px", padding:"16px", textAlign:"center" }}>
            <div style={{ fontSize:"22px", marginBottom:"4px" }}>{s.icon}</div>
            <div style={{ fontSize:"20px", fontWeight:"700", color:"#e6a817" }}>{s.value}</div>
            <div style={{ fontSize:"11px", opacity:0.8, marginTop:"2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section title */}
      <div style={{ borderBottom:"3px solid #e6a817", paddingBottom:"6px", marginBottom:"20px", display:"inline-block" }}>
        <h2 style={{ fontSize:"18px", fontWeight:"600", color:"#333" }}>Admin tools</h2>
      </div>

      {/* Cards */}
      <div className="ad-cards">
        {cards.map(card => (
          <div key={card.path} className="ad-card" onClick={() => navigate(card.path)}>
            <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"#4a3728", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontWeight:"600", fontSize:"15px", color:"#4a3728", marginBottom:"4px" }}>{card.title}</div>
              <div style={{ fontSize:"13px", color:"#666", lineHeight:"1.5", marginBottom:"6px" }}>{card.desc}</div>
              <div style={{ fontSize:"12px", color:"#e6a817", fontWeight:"600" }}>{card.stat}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default AdminDashboard;