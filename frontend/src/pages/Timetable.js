// frontend/src/pages/Timetable.js
// Fetches all timetable slots from backend
// Groups them by day so we can show Monday, Tuesday etc as sections
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

// Days in the correct weekly order
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Timetable() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/timetable")
      .then(res => { setSlots(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Groups slots by day — e.g. { Monday: [...], Tuesday: [...] }
  const grouped = DAYS.reduce((acc, day) => {
    acc[day] = slots.filter(s => s.day === day);
    return acc;
  }, {});

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Timetable</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Your weekly class schedule.
        </p>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading...</p>}

      {!loading && slots.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗓️</div>
          <p>No timetable available yet.</p>
        </div>
      )}

      {/* Loop through each day and show its slots */}
      {DAYS.map(day => (
        grouped[day].length > 0 && (
          <div key={day} style={{ marginBottom: "28px" }}>

            {/* Day heading with gold left border */}
            <div style={{ borderLeft: "4px solid #e6a817",
              paddingLeft: "12px", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700",
                color: "#4a3728" }}>{day}</h2>
            </div>

            {/* Table for this day's classes */}
            <div style={{ background: "#fff", border: "1px solid #e0e0e0",
              borderRadius: "8px", overflow: "hidden" }}>
              {/* Table header */}
              <div style={{ display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                background: "#4a3728", color: "white",
                padding: "10px 16px", fontSize: "13px",
                fontWeight: "600" }}>
                <span>Subject</span>
                <span>Time</span>
                <span>Room</span>
                <span>Faculty</span>
              </div>

              {/* Each slot row */}
              {grouped[day].map((slot, i) => (
                <div key={slot._id} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  padding: "12px 16px", fontSize: "14px",
                  // alternating row colors for readability
                  background: i % 2 === 0 ? "#fff" : "#fafafa",
                  borderTop: "1px solid #f0f0f0"
                }}>
                  <span style={{ fontWeight: "600",
                    color: "#4a3728" }}>{slot.subject}</span>
                  <span style={{ color: "#555" }}>{slot.time}</span>
                  <span style={{ color: "#555" }}>{slot.room}</span>
                  <span style={{ color: "#888",
                    fontSize: "13px" }}>{slot.facultyEmail}</span>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </Layout>
  );
}

export default Timetable;