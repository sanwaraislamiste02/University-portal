// frontend/src/pages/Contact.js
// This is the form students use to send a message to faculty
// axios.post sends the form data to our backend route
import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function Contact() {
  // each useState holds one form field's value
  const [toEmail, setToEmail]   = useState("");
  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState(""); // success/error message
  const [sending, setSending]   = useState(false);

  const fromEmail = localStorage.getItem("email"); // logged in student

  const handleSend = async () => {
    if (!toEmail || !subject || !message) {
      setStatus("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      await axios.post("http://localhost:5000/messages", {
        fromEmail, toEmail, subject, message
      });
      setStatus("Message sent successfully!");
      // clear form after sending
      setToEmail(""); setSubject(""); setMessage("");
    } catch (err) {
      setStatus("Failed to send. Try again.");
    }
    setSending(false);
  };

  return (
    <Layout>
      {/* Page header */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Contact Faculty</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Send a message to your faculty or supervisor.
        </p>
      </div>

      {/* The form card */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "28px",
        maxWidth: "600px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

        {/* Show from email so student knows who is sending */}
        <div style={{ marginBottom: "16px", fontSize: "13px",
          color: "#888" }}>
          From: <strong style={{ color: "#4a3728" }}>{fromEmail}</strong>
        </div>

        {/* Faculty email input */}
        <label style={{ fontSize: "13px", fontWeight: "600",
          color: "#333", display: "block", marginBottom: "6px" }}>
          Faculty Email
        </label>
        <input
          type="email"
          placeholder="faculty@university.com"
          value={toEmail}
          onChange={e => setToEmail(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "16px" }}
        />

        {/* Subject input */}
        <label style={{ fontSize: "13px", fontWeight: "600",
          color: "#333", display: "block", marginBottom: "6px" }}>
          Subject
        </label>
        <input
          type="text"
          placeholder="e.g. Question about assignment"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "16px" }}
        />

        {/* Message textarea */}
        <label style={{ fontSize: "13px", fontWeight: "600",
          color: "#333", display: "block", marginBottom: "6px" }}>
          Message
        </label>
        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "20px",
            resize: "vertical" }}
        />

        {/* Status message - green for success, red for error */}
        {status && (
          <p style={{ marginBottom: "16px", fontSize: "13px",
            color: status.includes("success") ? "#1D9E75" : "#e24b4a" }}>
            {status}
          </p>
        )}

        <button
          onClick={handleSend}
          disabled={sending}
          style={{ background: "#e6a817", color: "#4a3728",
            border: "none", padding: "10px 28px",
            borderRadius: "6px", fontWeight: "700",
            fontSize: "14px", cursor: "pointer" }}
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </Layout>
  );
}

export default Contact;