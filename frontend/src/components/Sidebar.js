import React from "react";
import { Link, useLocation } from "react-router-dom";

const studentLinks = [
  { label: "Dashboard",   path: "/student",      icon: "🏠" },
  { label: "My Profile", path: "/profile", icon: "👤" },
  { label: "Courses",     path: "/courses",       icon: "📚" },
  { label: "Results",     path: "/results",       icon: "📊" },
  { label: "Timetable",   path: "/timetable",     icon: "🗓️" },
  { label: "Fees",        path: "/fees",          icon: "💳" },
  { label: "Announcements", path: "/announcements", icon: "📢" },
  { label: "Contact",     path: "/contact",       icon: "✉️" },
  { label: "Rate Faculty", path: "/rate-faculty", icon: "⭐" },
  { label: "Faculty",  path: "/faculty-list", icon: "👨‍🏫" },
];

const facultyLinks = [
  { label: "Dashboard",     path: "/faculty",         icon: "🏠" },
  { label: "My Profile", path: "/profile", icon: "👤" },
  { label: "Manage Courses",path: "/manage-courses",  icon: "📚" },
  { label: "Add Result",    path: "/add-result",      icon: "📝" },
  { label: "Announcements", path: "/announcements",   icon: "📢" },
  { label: "Inbox", path: "/inbox", icon: "✉️" },
  { label: "Post Announcement", path: "/post-announcement", icon: "📢" },
];

const adminLinks = [
  { label: "Dashboard",  path: "/admin",        icon: "🏠" },
  { label: "Users",      path: "/admin/users",  icon: "👥" },
  { label: "Courses",    path: "/admin/courses",icon: "📚" },
  { label: "Timetable", path: "/admin/timetable", icon: "🗓️" },
  { label: "Post Announcement", path: "/post-announcement", icon: "📢" },
];

function Sidebar({ isOpen, role }) {
  const location = useLocation();

  const links =
    role === "faculty" ? facultyLinks :
    role === "admin"   ? adminLinks   :
    studentLinks;

  return (
    <aside style={{
      width: isOpen ? "220px" : "0",
      minHeight: "calc(100vh - 64px)",
      background: "#fff",
      borderRight: "1px solid #e0e0e0",
      overflow: "hidden",
      transition: "width 0.25s ease",
      flexShrink: 0
    }}>
      <div style={{ padding: "16px 0", whiteSpace: "nowrap" }}>

        {/* role label */}
        <div style={{
          padding: "8px 20px 16px",
          fontSize: "11px",
          fontWeight: "600",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          {role} menu
        </div>

        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                textDecoration: "none",
                fontSize: "14px",
                color: active ? "#4a3728" : "#444",
                background: active ? "#fdf3e3" : "transparent",
                borderLeft: active ? "3px solid #e6a817" : "3px solid transparent",
                fontWeight: active ? "600" : "400",
                transition: "background 0.15s"
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;