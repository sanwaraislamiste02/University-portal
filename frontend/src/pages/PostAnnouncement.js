// frontend/src/pages/PostAnnouncement.js
// Faculty and admin use this to post a new announcement
// They fill title, message, and choose who can see it (target)
// axios.post sends it to our backend /announcements route
import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function PostAnnouncement() {
  const [title, setTitle]     = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget]   = useState("all");
  const [status, setStatus]   = useState("");
  const [sending, setSending] = useState(false);
  const postedBy = localStorage.getItem("email");

  const handlePost = async () => {
    if (!title || !message) {
      setStatus("Please fill in all fields."); return;
    }
    setSending(true);
    try {
      await axios.post("http://localhost:5000/announcements", {
        title, message, target, postedBy
      });
      setStatus("Announcement posted successfully!");
      setTitle(""); setMessage(""); setTarget("all");
    } catch (err) {
      setStatus("Failed to post. Try again.");
    }
    setSending(false);
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Post Announcement</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Post a notice to students, faculty, or everyone.
        </p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "28px", maxWidth: "600px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

        {status && (
          <p style={{ marginBottom: "16px", fontSize: "13px",
            color: status.includes("success") ? "#1D9E75" : "#e24b4a" }}>
            {status}
          </p>
        )}

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>Title</label>
        <input type="text" placeholder="e.g. Exam Schedule Released"
          value={title} onChange={e => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "16px" }} />

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>Message</label>
        <textarea placeholder="Write your announcement here..."
          value={message} onChange={e => setMessage(e.target.value)}
          rows={5} style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "16px", resize: "vertical" }} />

        {/* Target dropdown — who sees this announcement */}
        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>Visible to</label>
        <select value={target} onChange={e => setTarget(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "20px" }}>
          <option value="all">Everyone</option>
          <option value="student">Students only</option>
          <option value="faculty">Faculty only</option>
        </select>

        <div style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>
          Posting as: <strong style={{ color: "#4a3728" }}>{postedBy}</strong>
        </div>

        <button onClick={handlePost} disabled={sending} style={{
          background: "#e6a817", color: "#4a3728", border: "none",
          padding: "10px 28px", borderRadius: "6px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
          {sending ? "Posting..." : "Post Announcement"}
        </button>
      </div>
    </Layout>
  );
}

export default PostAnnouncement;