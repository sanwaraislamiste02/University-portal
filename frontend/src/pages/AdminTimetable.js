// frontend/src/pages/AdminTimetable.js
// Admin uses this form to add new class slots to the timetable
// Each submission calls POST /timetable on the backend
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function AdminTimetable() {
  const [slots, setSlots]         = useState([]);
  const [subject, setSubject]     = useState("");
  const [day, setDay]             = useState("Monday");
  const [time, setTime]           = useState("");
  const [room, setRoom]           = useState("");
  const [facultyEmail, setFaculty]= useState("");
  const [message, setMessage]     = useState("");

  const fetchSlots = () => {
    axios.get("http://localhost:5000/timetable")
      .then(res => setSlots(res.data));
  };

  useEffect(() => { fetchSlots(); }, []);

  const handleAdd = async () => {
    if (!subject || !time || !room || !facultyEmail) {
      setMessage("Please fill in all fields."); return;
    }
    try {
      await axios.post("http://localhost:5000/timetable", {
        subject, day, time, room, facultyEmail
      });
      setMessage("Slot added successfully!");
      // clear form
      setSubject(""); setTime(""); setRoom(""); setFaculty("");
      fetchSlots(); // refresh list
    } catch (err) {
      setMessage("Failed to add slot.");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/timetable/${id}`);
    fetchSlots(); // refresh after delete
  };

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Manage Timetable</h1>
      </div>

      {/* Add slot form */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "24px", marginBottom: "32px",
        maxWidth: "600px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600",
          marginBottom: "16px", color: "#333" }}>Add new slot</h2>

        {message && <p style={{ marginBottom: "12px", fontSize: "13px",
          color: message.includes("success") ? "#1D9E75" : "#e24b4a" }}>
          {message}</p>}

        {/* Input helper — reusable label + input block */}
        {[
          ["Subject", subject, setSubject, "text", "e.g. Mathematics"],
          ["Time", time, setTime, "text", "e.g. 9:00 AM"],
          ["Room", room, setRoom, "text", "e.g. Room 101"],
          ["Faculty Email", facultyEmail, setFaculty, "email", "faculty@university.com"],
        ].map(([label, val, setter, type, ph]) => (
          <div key={label} style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600",
              display: "block", marginBottom: "5px", color: "#333" }}>
              {label}
            </label>
            <input type={type} placeholder={ph} value={val}
              onChange={e => setter(e.target.value)}
              style={{ width: "100%", padding: "9px 12px",
                border: "1px solid #ddd", borderRadius: "6px",
                fontSize: "14px" }} />
          </div>
        ))}

        {/* Day dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: "600",
            display: "block", marginBottom: "5px", color: "#333" }}>
            Day
          </label>
          <select value={day} onChange={e => setDay(e.target.value)}
            style={{ width: "100%", padding: "9px 12px",
              border: "1px solid #ddd", borderRadius: "6px",
              fontSize: "14px" }}>
            {DAYS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <button onClick={handleAdd} style={{
          background: "#e6a817", color: "#4a3728", border: "none",
          padding: "10px 28px", borderRadius: "6px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
          Add Slot
        </button>
      </div>

      {/* Existing slots list */}
      <h2 style={{ fontSize: "16px", fontWeight: "600",
        marginBottom: "14px", color: "#333" }}>All slots</h2>

      {slots.length === 0 && (
        <p style={{ color: "#888", fontSize: "14px" }}>No slots added yet.</p>
      )}

      {slots.map(slot => (
        <div key={slot._id} style={{
          background: "#fff", border: "1px solid #e0e0e0",
          borderRadius: "8px", padding: "14px 20px",
          marginBottom: "10px", display: "flex",
          justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: "600", color: "#4a3728",
              marginRight: "10px" }}>{slot.subject}</span>
            <span style={{ fontSize: "13px", color: "#666" }}>
              {slot.day} · {slot.time} · {slot.room}
            </span>
          </div>
          <button onClick={() => handleDelete(slot._id)}
            style={{ background: "transparent",
              border: "1px solid #e24b4a", color: "#e24b4a",
              padding: "4px 12px", borderRadius: "4px",
              fontSize: "12px", cursor: "pointer" }}>
            Remove
          </button>
        </div>
      ))}
    </Layout>
  );
}

export default AdminTimetable;