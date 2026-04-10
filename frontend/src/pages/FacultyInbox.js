// frontend/src/pages/FacultyInbox.js
// Faculty opens this page to read student messages
// useEffect fetches messages using the faculty's email from localStorage
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function FacultyInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get(`http://localhost:5000/messages/${email}`)
      .then(res => { setMessages(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [email]);

  const markRead = async (id) => {
    // tells backend this message was read, then updates UI
    await axios.put(`http://localhost:5000/messages/${id}/read`);
    setMessages(prev =>
      prev.map(m => m._id === id ? { ...m, read: true } : m)
    );
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>
          Inbox
          {/* Show unread count badge if there are unread messages */}
          {unread > 0 && (
            <span style={{ marginLeft: "10px", background: "#e24b4a",
              color: "white", fontSize: "13px", padding: "2px 10px",
              borderRadius: "99px", fontWeight: "600" }}>
              {unread} new
            </span>
          )}
        </h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Messages from your students.
        </p>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading...</p>}

      {!loading && messages.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>✉️</div>
          <p>No messages yet.</p>
        </div>
      )}

      {messages.map(m => (
        <div key={m._id} style={{
          background: m.read ? "#fff" : "#fdf3e3", // unread = light gold
          border: "1px solid #e0e0e0",
          borderLeft: `4px solid ${m.read ? "#e0e0e0" : "#e6a817"}`,
          borderRadius: "8px", padding: "20px",
          marginBottom: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: "8px" }}>
            <div>
              <span style={{ fontWeight: "700", fontSize: "15px",
                color: "#4a3728" }}>{m.subject}</span>
              {!m.read && (
                <span style={{ marginLeft: "8px", background: "#e6a817",
                  color: "#4a3728", fontSize: "11px", padding: "1px 7px",
                  borderRadius: "99px", fontWeight: "600" }}>New</span>
              )}
            </div>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {new Date(m.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p style={{ fontSize: "13px", color: "#666",
            marginBottom: "4px" }}>
            From: <strong>{m.fromEmail}</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#444",
            lineHeight: "1.6", marginBottom: "12px" }}>
            {m.message}
          </p>

          {/* Only show Mark as read button if not read yet */}
          {!m.read && (
            <button
              onClick={() => markRead(m._id)}
              style={{ background: "transparent",
                border: "1px solid #e6a817", color: "#4a3728",
                padding: "5px 14px", borderRadius: "4px",
                fontSize: "12px", cursor: "pointer", fontWeight: "600" }}
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </Layout>
  );
}

export default FacultyInbox;