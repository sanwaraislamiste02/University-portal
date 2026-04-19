import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function Layout({ children }) {
  const role  = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showBell, setShowBell]       = useState(false);

  useEffect(() => {
    if (!email) return;
    if (role === "faculty" || role === "admin") {
      axios.get(`http://localhost:5000/messages/${email}`)
        .then(res => setUnreadCount(res.data.filter(m => !m.read).length))
        .catch(() => {});
    }
  }, [email, role]);

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" }}>

      <style>{`
        * { box-sizing: border-box; }

        /* ── Header ── */
        .up-header {
          background: #4a3728;
          color: white;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          position: sticky;
          top: 0;
          z-index: 200;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .up-logo-text {
          font-size: 18px;
          font-weight: 600;
        }
        .up-email {
          font-size: 13px;
          color: #ccc;
        }
        .up-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ── Body ── */
        .up-body {
          display: flex;
          flex: 1;
          position: relative;
        }

        /* ── Sidebar overlay (mobile) ── */
        .up-overlay {
          display: none;
          position: fixed;
          inset: 64px 0 0 0;
          background: rgba(0,0,0,0.4);
          z-index: 150;
        }
        .up-overlay.open { display: block; }

        /* ── Main content ── */
        .up-main {
          flex: 1;
          min-width: 0;
          padding: 28px 24px;
        }
        .up-inner {
          max-width: 960px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Footer ── */
        .up-footer {
          background: #4a3728;
          color: #ccc;
          padding: 20px 24px;
          font-size: 13px;
          text-align: center;
        }

        /* ── Mobile: hide email, shrink gaps ── */
        @media (max-width: 640px) {
          .up-email { display: none; }
          .up-logo-text { font-size: 15px; }
          .up-header { padding: 0 12px; }
          .up-main { padding: 16px 14px; }
          .up-right { gap: 8px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="up-header">
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background:"none", border:"none", color:"white", fontSize:"22px", cursor:"pointer", padding:"4px 6px", lineHeight:1 }}
          >☰</button>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"34px", height:"34px", background:"#e6a817", borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", fontSize:"16px", color:"#4a3728", flexShrink:0 }}>U</div>
            <span className="up-logo-text">University Portal</span>
          </div>
        </div>

        <div className="up-right">
          <span className="up-email">{email}</span>
          <span style={{ background:"#e6a817", color:"#4a3728", padding:"3px 10px", borderRadius:"99px", fontSize:"12px", fontWeight:"600", textTransform:"capitalize", whiteSpace:"nowrap" }}>
            {role}
          </span>

          {/* Bell */}
          <div style={{ position:"relative", cursor:"pointer" }} onClick={() => setShowBell(b => !b)}>
            <span style={{ fontSize:"20px" }}>🔔</span>
            {unreadCount > 0 && (
              <span style={{ position:"absolute", top:"-6px", right:"-6px", background:"#e24b4a", color:"white", fontSize:"10px", fontWeight:"700", width:"16px", height:"16px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {unreadCount}
              </span>
            )}
            {showBell && (
              <div style={{ position:"absolute", top:"32px", right:0, background:"#fff", border:"1px solid #e0e0e0", borderRadius:"8px", padding:"12px 16px", width:"210px", boxShadow:"0 4px 12px rgba(0,0,0,0.15)", color:"#333", zIndex:300 }}>
                <div style={{ fontSize:"13px", fontWeight:"600", marginBottom:"6px", color:"#4a3728" }}>Notifications</div>
                {unreadCount > 0 ? (
                  <div style={{ fontSize:"13px", color:"#555" }}>
                    You have <strong style={{ color:"#e24b4a" }}>{unreadCount}</strong> unread message{unreadCount !== 1 ? "s" : ""}.
                    <div style={{ marginTop:"8px" }}>
                      <a href="/inbox" style={{ color:"#4a3728", fontWeight:"600", fontSize:"13px" }}>Go to inbox →</a>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize:"13px", color:"#888" }}>No new notifications.</div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            style={{ background:"transparent", border:"1px solid #aaa", color:"white", padding:"5px 12px", borderRadius:"4px", cursor:"pointer", fontSize:"13px", whiteSpace:"nowrap" }}
          >Logout</button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="up-body">

        {/* Mobile overlay — click to close sidebar */}
        <div className={`up-overlay ${sidebarOpen ? "open" : ""}`} onClick={handleOverlayClick} />

        <Sidebar isOpen={sidebarOpen} role={role} onClose={() => setSidebarOpen(false)} />

        <main className="up-main">
          <div className="up-inner">
            {children}
          </div>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer className="up-footer">
        <div style={{ fontWeight:"700", fontSize:"15px", color:"#e6a817", marginBottom:"4px" }}>
          myMetro University Portal
        </div>
        <div style={{ fontSize:"12px", opacity:0.7 }}>
          University Management System · CSE Final Year Project
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", marginTop:"12px", paddingTop:"10px", fontSize:"12px", opacity:0.6 }}>
          © 2024 myMetro University Portal · All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default Layout;