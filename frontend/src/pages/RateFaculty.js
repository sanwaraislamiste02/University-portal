import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function RateFaculty() {
  const [facultyEmail, setFaculty] = useState("");
  const [rating, setRating]        = useState(0);
  const [hovered, setHovered]      = useState(0);
  const [comment, setComment]      = useState("");
  const [message, setMessage]      = useState("");
  const studentEmail = localStorage.getItem("email");

  const handleSubmit = async () => {
    if (!facultyEmail || rating === 0) {
      setMessage("Please enter faculty email and select a rating.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/ratings", {
        facultyEmail, studentEmail, rating, comment
      });
      setMessage(res.data.message);
      setFaculty(""); setRating(0); setComment("");
    } catch (err) {
      setMessage("Failed to submit rating.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Rate Faculty</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Your feedback is completely anonymous and helps
          improve teaching quality.
        </p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "28px", maxWidth: "520px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

        {message && (
          <p style={{ marginBottom: "16px", fontSize: "13px",
            fontWeight: "500",
            color: message.includes("submit") || message.includes("updat")
              ? "#1D9E75" : "#e24b4a" }}>{message}</p>
        )}

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>
          Faculty Email
        </label>
        <input type="email" placeholder="faculty@university.com"
          value={facultyEmail} onChange={e => setFaculty(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "20px" }} />

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "10px" }}>Rating</label>

        {/* Star rating */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          {[1,2,3,4,5].map(star => (
            <span key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              style={{ fontSize: "36px", cursor: "pointer",
                color: star <= (hovered || rating) ? "#e6a817" : "#ddd",
                transition: "color 0.1s" }}>
              &#9733;
            </span>
          ))}
        </div>

        {/* Rating label */}
        {(hovered || rating) > 0 && (
          <p style={{ fontSize: "13px", color: "#888",
            marginBottom: "16px", fontWeight: "500" }}>
            {labels[hovered || rating]}
          </p>
        )}

        {/* Visual rating bar */}
        {rating > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ height: "6px", background: "#f0f0f0",
              borderRadius: "99px", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "99px",
                background: "#e6a817",
                width: `${(rating / 5) * 100}%`,
                transition: "width 0.3s ease"
              }} />
            </div>
          </div>
        )}

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>
          Comment
          <span style={{ fontWeight: "400", color: "#aaa",
            marginLeft: "4px" }}>(optional)</span>
        </label>
        <textarea placeholder="Share your feedback anonymously..."
          value={comment} onChange={e => setComment(e.target.value)}
          rows={4} style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "20px",
            resize: "vertical" }} />

        <div style={{ fontSize: "12px", color: "#aaa",
          marginBottom: "16px", display: "flex",
          alignItems: "center", gap: "6px" }}>
          <span>&#128274;</span>
          Your identity is never revealed to faculty
        </div>

        <button onClick={handleSubmit} style={{
          background: "#e6a817", color: "#4a3728", border: "none",
          padding: "10px 28px", borderRadius: "6px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
          Submit Rating
        </button>
      </div>
    </Layout>
  );
}

export default RateFaculty;