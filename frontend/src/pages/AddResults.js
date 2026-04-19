import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";

function AddResults() {
  const [studentEmail, setStudentEmail] = useState("");
  const [subject, setSubject]           = useState("");
  const [grade, setGrade]               = useState("");
  const [message, setMessage]           = useState("");
  const [results, setResults]           = useState([]);
  const [loading, setLoading]           = useState(false);

  const fetchRecent = () => {
    // fetch all results to show recently added
    axios.get("http://localhost:5000/faculty/results")
      .then(res => setResults(res.data))
      .catch(() => {});
  };

  useEffect(() => { fetchRecent(); }, []);

  const handleSubmit = async () => {
    if (!studentEmail || !subject || !grade) {
      setMessage("Please fill in all fields."); return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/faculty/add-result", {
        studentEmail, subject, grade
      });
      setMessage("Result added successfully!");
      setStudentEmail(""); setSubject(""); setGrade("");
      fetchRecent();
    } catch (err) {
      setMessage("Failed to add result.");
    }
    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const grades = ["A+","A","A-","B+","B","B-",
                  "C+","C","C-","D+","D","F"];

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Add Result</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Enter grades for your students.
        </p>
      </div>

      {/* Form */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "24px", maxWidth: "520px",
        marginBottom: "32px" }}>

        {message && (
          <p style={{ marginBottom: "14px", fontSize: "13px",
            fontWeight: "500",
            color: message.includes("success") ? "#1D9E75" : "#e24b4a" }}>
            {message}
          </p>
        )}

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>
          Student Email
        </label>
        <input type="email"
          placeholder="student@university.com"
          value={studentEmail}
          onChange={e => setStudentEmail(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "14px",
            outline: "none" }} />

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>
          Subject
        </label>
        <input type="text"
          placeholder="e.g. Data Structures"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "14px",
            outline: "none" }} />

        <label style={{ fontSize: "13px", fontWeight: "600",
          display: "block", marginBottom: "5px" }}>
          Grade
        </label>
        <select value={grade} onChange={e => setGrade(e.target.value)}
          style={{ width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px", marginBottom: "20px" }}>
          <option value="">Select grade</option>
          {grades.map(g => <option key={g}>{g}</option>)}
        </select>

        <button onClick={handleSubmit} disabled={loading} style={{
          background: "#e6a817", color: "#4a3728", border: "none",
          padding: "10px 28px", borderRadius: "6px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
          {loading ? "Adding..." : "Add Result"}
        </button>
      </div>

      {/* Recently added results */}
      {results.length > 0 && (
        <>
          <h2 style={{ fontSize: "16px", fontWeight: "600",
            marginBottom: "14px", color: "#333" }}>
            Recently added
          </h2>
          {results.slice(0, 10).map((r, i) => (
            <div key={i} style={{ background: "#fff",
              border: "1px solid #e0e0e0",
              borderLeft: "4px solid #e6a817",
              borderRadius: "8px", padding: "12px 20px",
              marginBottom: "8px", display: "flex",
              justifyContent: "space-between",
              alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: "600", color: "#4a3728",
                  fontSize: "14px" }}>{r.subject}</div>
                <div style={{ fontSize: "12px", color: "#888",
                  marginTop: "2px" }}>{r.studentEmail}</div>
              </div>
              <span style={{ fontWeight: "700", fontSize: "18px",
                color: "#4a3728" }}>{r.grade}</span>
            </div>
          ))}
        </>
      )}
    </Layout>
  );
}

export default AddResults;