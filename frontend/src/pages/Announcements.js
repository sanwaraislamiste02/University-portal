// frontend/src/pages/Announcements.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function Announcements() {
  // useState stores the list of announcements
  // starts as empty array [], gets filled after fetch
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect runs once when page loads
  // it calls the backend and saves the result in state
  useEffect(() => {
    axios.get("http://localhost:5000/announcements")
      .then(res => {
        setAnnouncements(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []); // [] means run only once

  return (
    <Layout>
      {/* Page heading with gold underline - matches UM style */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#4a3728" }}>
          Announcements
        </h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Latest notices from your faculty and administration.
        </p>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading...</p>}

      {/* If no announcements, show a friendly message */}
      {!loading && announcements.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📢</div>
          <p>No announcements yet.</p>
        </div>
      )}

      {/* Loop through each announcement and show as a card */}
      {announcements.map((a) => (
        <div key={a._id} style={{
          background: "#fff", border: "1px solid #e0e0e0",
          borderLeft: "4px solid #e6a817", borderRadius: "8px",
          padding: "20px", marginBottom: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          <div style={{ fontWeight: "700", fontSize: "16px",
            color: "#4a3728", marginBottom: "6px" }}>
            {a.title}
          </div>
          <p style={{ color: "#444", fontSize: "14px",
            lineHeight: "1.6", marginBottom: "12px" }}>
            {a.message}
          </p>
          {/* Footer shows who posted it and when */}
          <div style={{ fontSize: "12px", color: "#999",
            display: "flex", gap: "16px" }}>
            <span>Posted by: {a.postedBy}</span>
            <span>{new Date(a.createdAt).toLocaleDateString()}</span>
            <span style={{
              background: "#f5f0eb", color: "#4a3728",
              padding: "1px 8px", borderRadius: "99px",
              fontWeight: "600", textTransform: "capitalize"
            }}>{a.target}</span>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default Announcements;