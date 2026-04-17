import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const tools = [
    { label: "Learn@Metro",        icon: "🎓", desc: "Access your courses and learning materials"    },
    { label: "Student Home",       icon: "🏠", desc: "Your personal student dashboard"               },
    { label: "The Service Hub",    icon: "❓", desc: "Get help and access student services"          },
    { label: "Apps and Tools",     icon: "⊞",  desc: "All your university apps in one place"        },
    { label: "Email",              icon: "✉",  desc: "Stay connected with your university email"    },
    { label: "MyNews",             icon: "📰", desc: "Latest news from around the university"       },
    { label: "Metro Libraries",    icon: "🏛", desc: "Access library resources and books"           },
    { label: "Student Federation", icon: "🏛", desc: "Student government and campus life"           },
    { label: "Technical Support",  icon: "ℹ", desc: "Get IT help and technical assistance"         },
    { label: "Upcoming Events",    icon: "📅", desc: "See what is happening on campus"              },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff",
      fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── TOP NAV ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8",
        padding: "0 48px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "56px",
        position: "sticky", top: 0, zIndex: 100 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "28px", fontWeight: "900",
            letterSpacing: "-1px", color: "#e6a817" }}>
            <span style={{ fontStyle: "italic", fontWeight: "300",
              fontSize: "22px" }}>my</span>Metro
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Home", "Browse ▾", "Spaces ▾", "Admin"].map(link => (
            <span key={link} style={{ fontSize: "14px", color: "#333",
              cursor: "pointer", fontWeight: "400" }}>{link}</span>
          ))}
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <div style={{ padding: "60px 48px 48px",
        textAlign: "center", maxWidth: "820px",
        margin: "0 auto" }}>

        {/* Big logo text */}
        <div style={{ fontSize: "56px", fontWeight: "900",
          letterSpacing: "-2px", color: "#e6a817",
          marginBottom: "28px", lineHeight: 1 }}>
          <span style={{ fontStyle: "italic", fontWeight: "300",
            fontSize: "44px" }}>my</span>Metro
        </div>

        <h1 style={{ fontSize: "36px", fontWeight: "800",
          color: "#1a1a1a", marginBottom: "16px",
          lineHeight: "1.2", letterSpacing: "-0.5px" }}>
          MyMetro provides instant access<br />
          to services and support information
        </h1>

        <p style={{ fontSize: "16px", color: "#555",
          maxWidth: "580px", margin: "0 auto 40px",
          lineHeight: "1.6" }}>
          The student and employee MyMetro platforms provide search
          capabilities and easier access to the information and
          resources you need, all from one place.
        </p>

        {/* Two main buttons */}
        <div style={{ display: "flex", gap: "16px",
          justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/login")}
            style={{ background: "#e6a817", color: "white",
              border: "none", padding: "14px 36px",
              borderRadius: "4px", fontWeight: "700",
              fontSize: "16px", cursor: "pointer",
              minWidth: "220px", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = "#e6a817"}
            onMouseLeave={e => e.target.style.background = "#e6a817"}>
            Student MyMetro
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{ background: "transparent", color: "#333",
              border: "2px solid #ccc", padding: "14px 36px",
              borderRadius: "4px", fontWeight: "600",
              fontSize: "16px", cursor: "pointer",
              minWidth: "220px", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.target.style.borderColor = "#999"}
            onMouseLeave={e => e.target.style.borderColor = "#ccc"}>
            Employee MyMetro
          </button>
        </div>
      </div>

      {/* ── PREVIEW SCREENSHOT AREA ── */}
      <div style={{ maxWidth: "820px", margin: "0 auto 48px",
        padding: "0 48px" }}>
        <div style={{ border: "1px solid #e0e0e0", borderRadius: "12px",
          overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>

          {/* Fake browser bar */}
          <div style={{ background: "#f5f5f5", padding: "10px 16px",
            borderBottom: "1px solid #e0e0e0",
            display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["#ff5f57","#ffbd2e","#28ca41"].map(c => (
                <div key={c} style={{ width: "12px", height: "12px",
                  borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ flex: 1, background: "#fff",
              borderRadius: "4px", padding: "4px 12px",
              fontSize: "12px", color: "#888",
              border: "1px solid #e0e0e0",
              textAlign: "center" }}>
              students.metrouniversity.ca
            </div>
          </div>

          {/* Mini preview of inner portal */}
          <div style={{ background: "#fff", padding: "0" }}>

            {/* Mini nav */}
            <div style={{ padding: "10px 20px",
              borderBottom: "1px solid #eee",
              display: "flex", alignItems: "center",
              justifyContent: "space-between" }}>
              <span style={{ fontSize: "16px", fontWeight: "900",
                color: "#e6a817", letterSpacing: "-0.5px" }}>
                <span style={{ fontStyle: "italic", fontWeight: "300",
                  fontSize: "13px" }}>my</span>Metro
              </span>
              <div style={{ display: "flex", alignItems: "center",
                gap: "8px", background: "#f5f5f5",
                borderRadius: "4px", padding: "4px 10px" }}>
                <span style={{ fontSize: "12px", color: "#888" }}>
                  Search
                </span>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                {["Home", "Browse ▾", "Spaces ▾", "Admin"].map(l => (
                  <span key={l} style={{ fontSize: "11px",
                    color: "#333" }}>{l}</span>
                ))}
              </div>
            </div>

            {/* Mini big red cards */}
            <div style={{ padding: "12px 20px",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px" }}>
              {["Learn@Metro", "Student Home", "The Service Hub"].map(label => (
                <div key={label} style={{
                  background: "#e6a817", color: "white",
                  padding: "12px", borderRadius: "4px",
                  fontSize: "12px", fontWeight: "600",
                  display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "14px" }}>
                    {label === "Learn@Metro" ? "🎓"
                      : label === "Student Home" ? "🏠" : "❓"}
                  </span>
                  {label}
                </div>
              ))}
            </div>

            {/* Mini tool grid */}
            <div style={{ padding: "0 20px 12px",
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)", gap: "6px" }}>
              {["Apps and Tools","Email","MyNews",
                "Metro Libraries","Student Federation","Technical Support"
              ].map(label => (
                <div key={label} style={{ padding: "8px 6px",
                  border: "1px solid #eee", borderRadius: "4px",
                  fontSize: "10px", color: "#333",
                  textAlign: "center", background: "#fafafa" }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOLS GRID ── */}
      <div style={{ maxWidth: "960px", margin: "0 auto 48px",
        padding: "0 48px" }}>
        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
          gap: "1px", background: "#e8e8e8",
          border: "1px solid #e8e8e8", borderRadius: "8px",
          overflow: "hidden" }}>
          {tools.map(tool => (
            <div key={tool.label}
              onClick={() => navigate("/login")}
              style={{ background: "#fff", padding: "18px 16px",
                cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>
                {tool.icon}
              </div>
              <div style={{ fontWeight: "600", fontSize: "13px",
                color: "#1a1a1a", marginBottom: "3px" }}>
                {tool.label}
              </div>
              <div style={{ fontSize: "11px", color: "#888",
                lineHeight: "1.4" }}>{tool.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a1a1a", color: "#aaa",
        padding: "28px 48px", textAlign: "center", fontSize: "13px" }}>
        <div style={{ fontSize: "22px", fontWeight: "900",
          color: "#0a1c74", marginBottom: "8px",
          letterSpacing: "-0.5px" }}>
          <span style={{ fontStyle: "italic", fontWeight: "300",
            fontSize: "18px", color: "#aaa" }}>my</span>
          <span style={{ color: "white" }}>Metro</span>
        </div>
        <div>Metro University Portal · University Management System</div>
        <div style={{ marginTop: "4px" }}>
          Final Year Project · CSE Department
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;