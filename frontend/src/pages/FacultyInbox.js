import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function FacultyInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [replies, setReplies]   = useState({});
  const [sending, setSending]   = useState({});
  const email = localStorage.getItem("email");

  const fetchMessages = () => {
    axios.get(`http://localhost:5000/messages/${email}`)
      .then(res => { setMessages(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, [email]);

  const markRead = async (id) => {
    await axios.put(`http://localhost:5000/messages/${id}/read`);
    setMessages(prev =>
      prev.map(m => m._id === id ? { ...m, read: true } : m)
    );
  };

  const handleReply = async (id) => {
    const reply = replies[id];
    if (!reply || !reply.trim()) return;
    setSending(prev => ({ ...prev, [id]: true }));
    try {
      await axios.post(`http://localhost:5000/messages/reply/${id}`,
        { reply });
      setMessages(prev =>
        prev.map(m => m._id === id
          ? { ...m, reply, read: true } : m)
      );
      setReplies(prev => ({ ...prev, [id]: "" }));
    } catch {
      alert("Failed to send reply.");
    }
    setSending(prev => ({ ...prev, [id]: false }));
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>
          Inbox
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
        <div style={{ textAlign: "center", padding: "60px 0",
          color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>✉️</div>
          <p>No messages yet.</p>
        </div>
      )}

      {messages.map(m => (
        <div key={m._id} style={{
          background: m.read ? "#fff" : "#fdf3e3",
          border: "1px solid #e0e0e0",
          borderLeft: `4px solid ${m.read ? "#e0e0e0" : "#e6a817"}`,
          borderRadius: "8px", padding: "20px",
          marginBottom: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

          {/* Message header */}
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: "8px" }}>
            <div>
              <span style={{ fontWeight: "700", fontSize: "15px",
                color: "#4a3728" }}>{m.subject}</span>
              {!m.read && (
                <span style={{ marginLeft: "8px", background: "#e6a817",
                  color: "#4a3728", fontSize: "11px",
                  padding: "1px 7px", borderRadius: "99px",
                  fontWeight: "600" }}>New</span>
              )}
            </div>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {new Date(m.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>
            From: <strong>{m.fromEmail}</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#444",
            lineHeight: "1.6", marginBottom: "12px" }}>
            {m.message}
          </p>

          {/* Show existing reply if already replied */}
          {m.reply && (
            <div style={{ background: "#f0f7f0",
              border: "1px solid #c8e6c9", borderRadius: "6px",
              padding: "10px 14px", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", color: "#1D9E75",
                fontWeight: "600", marginBottom: "4px" }}>
                Your reply:
              </div>
              <div style={{ fontSize: "13px", color: "#333" }}>
                {m.reply}
              </div>
            </div>
          )}

          {/* Reply box */}
          <div style={{ marginTop: "12px" }}>
            <textarea
              placeholder="Write a reply..."
              value={replies[m._id] || ""}
              onChange={e => setReplies(prev => ({
                ...prev, [m._id]: e.target.value
              }))}
              rows={3}
              style={{ width: "100%", padding: "8px 12px",
                border: "1px solid #ddd", borderRadius: "6px",
                fontSize: "13px", resize: "vertical",
                marginBottom: "8px", outline: "none" }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleReply(m._id)}
                disabled={sending[m._id]}
                style={{ background: "#e6a817", color: "#4a3728",
                  border: "none", padding: "6px 16px",
                  borderRadius: "4px", fontWeight: "700",
                  fontSize: "13px", cursor: "pointer" }}>
                {sending[m._id] ? "Sending..." : "Send Reply"}
              </button>
              {!m.read && (
                <button onClick={() => markRead(m._id)} style={{
                  background: "transparent",
                  border: "1px solid #e6a817", color: "#4a3728",
                  padding: "6px 14px", borderRadius: "4px",
                  fontSize: "12px", cursor: "pointer",
                  fontWeight: "600" }}>
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default FacultyInbox;