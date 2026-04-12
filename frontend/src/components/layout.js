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
        .then(res => {
          const unread = res.data.filter(m => !m.read).length;
          setUnreadCount(unread);
        }).catch(() => {});
    }
  }, [email, role]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5",
      display: "flex", flexDirection: "column" }}>

      {/* ── TOP HEADER ── */}
      <header style={{
        background: "#4a3728", color: "white",
        padding: "0 32px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        height: "64px", position: "sticky", top: 0,
        zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
      }}>
        {/* Logo area */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", color: "white",
              fontSize: "22px", cursor: "pointer", padding: "4px 8px" }}>
            ☰
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px",
              background: "#e6a817", borderRadius: "6px",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "bold",
              fontSize: "16px", color: "#4a3728" }}>U</div>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              University Portal
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#ccc" }}>{email}</span>
          <span style={{ background: "#e6a817", color: "#4a3728",
            padding: "3px 10px", borderRadius: "99px",
            fontSize: "12px", fontWeight: "600",
            textTransform: "capitalize" }}>{role}</span>

          {/* Notification bell */}
          <div style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setShowBell(!showBell)}>
            <span style={{ fontSize: "20px" }}>🔔</span>
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px",
                background: "#e24b4a", color: "white", fontSize: "10px",
                fontWeight: "700", width: "16px", height: "16px",
                borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                {unreadCount}
              </span>
            )}
            {showBell && (
              <div style={{ position: "absolute", top: "32px", right: 0,
                background: "#fff", border: "1px solid #e0e0e0",
                borderRadius: "8px", padding: "12px 16px",
                width: "220px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                color: "#333", zIndex: 200 }}>
                <div style={{ fontSize: "13px", fontWeight: "600",
                  marginBottom: "6px", color: "#4a3728" }}>
                  Notifications
                </div>
                {unreadCount > 0 ? (
                  <div style={{ fontSize: "13px", color: "#555" }}>
                    You have{" "}
                    <strong style={{ color: "#e24b4a" }}>
                      {unreadCount}
                    </strong>{" "}
                    unread message{unreadCount !== 1 ? "s" : ""}.
                    <div style={{ marginTop: "8px" }}>
                      <a href="/inbox" style={{ color: "#4a3728",
                        fontWeight: "600", fontSize: "13px" }}>
                        Go to inbox →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: "13px", color: "#888" }}>
                    No new notifications.
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            style={{ background: "transparent", border: "1px solid #aaa",
              color: "white", padding: "5px 14px", borderRadius: "4px",
              cursor: "pointer", fontSize: "13px" }}>
            Logout
          </button>
        </div>
      </header>

      {/* ── SIDEBAR + MAIN ── */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar isOpen={sidebarOpen} role={role} />
        <main style={{ flex: 1, padding: "32px", maxWidth: "960px" }}>
          {children}
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#4a3728", color: "#ccc",
        padding: "24px 32px", fontSize: "13px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto",
          display: "flex", flexDirection: "column", // Changed to column
          alignItems: "center", // Center horizontally
          textAlign: "center", // Center text
          gap: "12px" }}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px",
              color: "#e6a817", marginBottom: "4px" }}>
              myMetro University Portal
            </div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              University Management System · CSE Final Year Project
            </div>
          </div>
          {/* Removed the dashboard/courses link div from here */}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "16px", paddingTop: "12px",
          textAlign: "center", fontSize: "12px", opacity: 0.6 }}>
          © 2024 myMetro University Portal · All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default Layout;