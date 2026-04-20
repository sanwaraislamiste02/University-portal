import React from "react";
import { Link, useLocation } from "react-router-dom";

const studentLinks = [
  { label: "Dashboard",     path: "/student",       icon: "🏠" },
  { label: "My Profile",    path: "/profile",        icon: "👤" },
  { label: "Courses",       path: "/courses",        icon: "📚" },
  { label: "Results",       path: "/results",        icon: "📊" },
  { label: "Timetable",     path: "/timetable",      icon: "🗓️" },
  { label: "Fees",          path: "/fees",           icon: "💳" },
  { label: "Announcements", path: "/announcements",  icon: "📢" },
  { label: "Contact",       path: "/contact",        icon: "✉️" },
  { label: "Rate Faculty",  path: "/rate-faculty",   icon: "⭐" },
  { label: "Faculty",       path: "/faculty-list",   icon: "👨‍🏫" },
];

const facultyLinks = [
  { label: "Dashboard",       path: "/faculty",              icon: "🏠" },
  { label: "My Profile",      path: "/profile",               icon: "👤" },
  { label: "Manage Courses",  path: "/manage-courses",        icon: "📚" },
  { label: "Add Result",      path: "/add-result",            icon: "📝" },
  { label: "Announcements",   path: "/announcements",         icon: "📢" },
  { label: "Inbox",           path: "/inbox",                 icon: "✉️" },
  { label: "Post Announcement", path: "/post-announcement",   icon: "📣" },
  { label: "My Students", path: "/my-students", icon: "👥" },
];

const adminLinks = [
  { label: "Dashboard",         path: "/admin",                 icon: "🏠" },
  { label: "My Profile",        path: "/profile",               icon: "👤" },
  { label: "Users",             path: "/admin/users",          icon: "👥" },
  { label: "Timetable",         path: "/admin/timetable",      icon: "🗓️" },
  { label: "Post Announcement", path: "/post-announcement",    icon: "📣" },
  { label: "Announcements",     path: "/announcements",        icon: "📢" },
];

function Sidebar({ isOpen, role, onClose }) {
  const location = useLocation();

  const links =
    role === "faculty" ? facultyLinks :
    role === "admin"   ? adminLinks   :
    studentLinks;

  return (
    <>
      <style>{`
        .up-sidebar {
          width: 220px;
          min-height: calc(100vh - 64px);
          background: #fff;
          border-right: 1px solid #e0e0e0;
          overflow: hidden;
          transition: width 0.25s ease, transform 0.25s ease;
          flex-shrink: 0;
          z-index: 160;
        }

        /* Desktop: slide in/out by width */
        @media (min-width: 641px) {
          .up-sidebar { width: ${isOpen ? "220px" : "0"}; }
        }

        /* Mobile: fixed overlay sidebar */
        @media (max-width: 640px) {
          .up-sidebar {
            position: fixed;
            top: 64px;
            left: 0;
            bottom: 0;
            width: 220px !important;
            transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
            box-shadow: 4px 0 16px rgba(0,0,0,0.15);
          }
          
          /* ADDED: Mobile Backdrop */
          .sidebar-overlay {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 150;
            display: ${isOpen ? "block" : "none"};
          }
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 20px;
          text-decoration: none;
          font-size: 14px;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .sidebar-link:hover {
          background: #fdf3e3;
        }
      `}</style>

      {/* ADDED: Overlay div for mobile */}
      <div className="sidebar-overlay" onClick={onClose}></div>

      <aside className="up-sidebar">
        <div style={{ padding:"16px 0", whiteSpace:"nowrap" }}>

          <div style={{ padding:"8px 20px 14px", fontSize:"11px", fontWeight:"600", color:"#999", textTransform:"uppercase", letterSpacing:"1px" }}>
            {role} menu
          </div>

          {links.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="sidebar-link"
                style={{
                  color:      active ? "#4a3728" : "#444",
                  background: active ? "#fdf3e3" : "transparent",
                  borderLeft: active ? "3px solid #e6a817" : "3px solid transparent",
                  fontWeight: active ? "600" : "400",
                }}
              >
                <span style={{ fontSize:"16px" }}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;