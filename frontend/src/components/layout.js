import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>

      {/* ── TOP HEADER ── */}
      <header style={{
        background: "#4a3728",
        color: "white",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
      }}>
        {/* Logo area */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", color: "white",
              fontSize: "22px", cursor: "pointer", padding: "4px 8px" }}
          >
            ☰
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", background: "#e6a817",
              borderRadius: "6px", display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "bold", fontSize: "16px"
            }}>U</div>
            <span style={{ fontSize: "18px", fontWeight: "600",
              letterSpacing: "0.3px" }}>
              University Portal
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#ccc" }}>{email}</span>
          <span style={{
            background: "#e6a817", color: "#4a3728",
            padding: "3px 10px", borderRadius: "99px",
            fontSize: "12px", fontWeight: "600",
            textTransform: "capitalize"
          }}>{role}</span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            style={{
              background: "transparent", border: "1px solid #aaa",
              color: "white", padding: "5px 14px", borderRadius: "4px",
              cursor: "pointer", fontSize: "13px"
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: "flex" }}>
        {/* ── SIDEBAR ── */}
        <Sidebar isOpen={sidebarOpen} role={role} />

        {/* ── MAIN CONTENT ── */}
        <main style={{
          flex: 1,
          padding: "32px",
          maxWidth: "960px"
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;