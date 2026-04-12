import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "../components/layout";

const gradePoints = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName]       = useState("");
  const email = localStorage.getItem("email");
  const printRef = useRef();

  useEffect(() => {
    if (!email) return;
    axios.get(`http://localhost:5000/student/results/${email}`)
      .then(res => { setResults(res.data); setLoading(false); })
      .catch(() => setLoading(false));

    // fetch name from profile
    axios.get(`http://localhost:5000/profile/${email}`)
      .then(res => setName(res.data.name || ""))
      .catch(() => {});
  }, [email]);

  const validResults = results.filter(
    r => gradePoints[r.grade] !== undefined
  );
  const gpa = validResults.length > 0
    ? (validResults.reduce((sum, r) =>
        sum + gradePoints[r.grade], 0) / validResults.length).toFixed(2)
    : null;

  const gpaColor = !gpa ? "#888"
    : gpa >= 3.5 ? "#1D9E75"
    : gpa >= 2.5 ? "#e6a817"
    : "#e24b4a";

  const gpaLabel = !gpa ? "N/A"
    : gpa >= 3.5 ? "Excellent"
    : gpa >= 3.0 ? "Good"
    : gpa >= 2.5 ? "Satisfactory"
    : "Needs Improvement";

  const gpaPercent = gpa ? (parseFloat(gpa) / 4.0) * 100 : 0;

  // PDF download using print
  const handleDownloadPDF = () => {
    const printContent = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Academic Results — ${name || email}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; padding: 40px;
            color: #333; background: white; }
          .header { text-align: center; margin-bottom: 30px;
            padding-bottom: 20px; border-bottom: 3px solid #4a3728; }
          .header h1 { font-size: 24px; color: #4a3728; margin-bottom: 4px; }
          .header p  { font-size: 13px; color: #666; }
          .header .uni { font-size: 18px; font-weight: bold;
            color: #e6a817; margin-bottom: 8px; }
          .info-row { display: flex; justify-content: space-between;
            margin-bottom: 24px; background: #f9f6f2;
            padding: 14px 16px; border-radius: 6px; }
          .info-item { font-size: 13px; }
          .info-item span { font-weight: bold; color: #4a3728; }
          .gpa-box { background: #4a3728; color: white;
            padding: 16px 20px; border-radius: 8px;
            display: flex; justify-content: space-between;
            align-items: center; margin-bottom: 24px; }
          .gpa-num { font-size: 36px; font-weight: 800;
            color: ${gpaColor}; }
          .gpa-label { font-size: 13px; color: ${gpaColor};
            font-weight: 600; }
          table { width: 100%; border-collapse: collapse;
            margin-bottom: 24px; }
          thead tr { background: #4a3728; color: white; }
          thead th { padding: 10px 14px; text-align: left;
            font-size: 13px; }
          tbody tr:nth-child(even) { background: #f9f6f2; }
          tbody td { padding: 10px 14px; font-size: 14px;
            border-bottom: 1px solid #eee; }
          .grade { font-weight: 700; font-size: 16px; }
          .grade-A { color: #1D9E75; }
          .grade-B { color: #e6a817; }
          .grade-C { color: #e24b4a; }
          .footer { text-align: center; font-size: 11px;
            color: #aaa; margin-top: 30px;
            padding-top: 16px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="uni">myMetro University Portal</div>
          <h1>Official Academic Transcript</h1>
          <p>University Management System</p>
        </div>

        <div class="info-row">
          <div class="info-item">
            Student Name: <span>${name || "N/A"}</span>
          </div>
          <div class="info-item">
            Email: <span>${email}</span>
          </div>
          <div class="info-item">
            Date: <span>${new Date().toLocaleDateString("en-US", {
              day: "numeric", month: "long", year: "numeric"
            })}</span>
          </div>
        </div>

        <div class="gpa-box">
          <div>
            <div style="font-size:13px;color:#ccc;margin-bottom:4px">
              Cumulative GPA
            </div>
            <div class="gpa-num">${gpa || "N/A"}</div>
            <div class="gpa-label">${gpaLabel}</div>
          </div>
          <div style="text-align:right;font-size:13px;color:#ccc">
            <div>${validResults.length} subjects</div>
            <div>Scale: 4.0</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Grade Points</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${results.map((r, i) => {
              const pts = gradePoints[r.grade];
              const cls = pts >= 3.5 ? "grade-A"
                : pts >= 2.0 ? "grade-B" : "grade-C";
              const remark = pts >= 3.5 ? "Excellent"
                : pts >= 3.0 ? "Good"
                : pts >= 2.0 ? "Satisfactory"
                : pts >= 1.0 ? "Pass" : "Fail";
              return `
                <tr>
                  <td>${i + 1}</td>
                  <td>${r.subject}</td>
                  <td><span class="grade ${cls}">${r.grade}</span></td>
                  <td>${pts !== undefined ? pts.toFixed(1) : "N/A"}</td>
                  <td>${remark}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>

        <div class="footer">
          This is an official academic transcript generated from
          myMetro University Portal.<br/>
          Generated on ${new Date().toLocaleString()}
        </div>
      </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 500);
  };

  return (
    <Layout>
      <div ref={printRef} style={{ display: "none" }} />

      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "700",
            color: "#4a3728" }}>My Results</h1>
          <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
            Your academic results and GPA summary.
          </p>
        </div>
        {/* Download PDF button */}
        <button onClick={handleDownloadPDF}
          disabled={results.length === 0}
          style={{ background: "#4a3728", color: "white",
            border: "none", padding: "10px 20px",
            borderRadius: "6px", fontWeight: "700",
            fontSize: "13px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px" }}>
          ⬇ Download PDF
        </button>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading...</p>}

      {/* GPA Summary Card */}
      {!loading && gpa && (
        <div style={{ background: "#4a3728", borderRadius: "8px",
          padding: "24px 28px", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap",
            gap: "16px", marginBottom: "20px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#ccc",
                marginBottom: "4px" }}>Cumulative GPA</div>
              <div style={{ fontSize: "52px", fontWeight: "800",
                color: gpaColor, lineHeight: 1 }}>{gpa}</div>
              <div style={{ fontSize: "14px", color: gpaColor,
                fontWeight: "600", marginTop: "6px" }}>{gpaLabel}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "#ccc",
                marginBottom: "8px" }}>
                Based on {validResults.length} subject
                {validResults.length !== 1 ? "s" : ""}
              </div>
              <div style={{ display: "flex", gap: "6px",
                flexWrap: "wrap", justifyContent: "flex-end" }}>
                {[["A","4.0"],["B","3.0"],["C","2.0"],["D","1.0"]]
                  .map(([g, p]) => (
                  <div key={g} style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "3px 8px", borderRadius: "4px",
                    fontSize: "12px", color: "#ddd" }}>
                    {g} = {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GPA progress bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between",
              fontSize: "12px", color: "#ccc", marginBottom: "6px" }}>
              <span>0.0</span>
              <span>GPA out of 4.0</span>
              <span>4.0</span>
            </div>
            <div style={{ height: "10px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: "99px",
                background: gpaColor, width: `${gpaPercent}%`,
                transition: "width 1s ease" }} />
            </div>
          </div>

          {/* Per subject mini cards */}
          <div style={{ marginTop: "20px", display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))",
            gap: "8px" }}>
            {validResults.map((r, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "6px", padding: "8px 12px" }}>
                <div style={{ fontSize: "12px", color: "#ccc",
                  marginBottom: "2px", overflow: "hidden",
                  textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.subject}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "700",
                  color: gradePoints[r.grade] >= 3.5 ? "#1D9E75"
                    : gradePoints[r.grade] >= 2.0 ? "#e6a817"
                    : "#e24b4a" }}>
                  {r.grade}
                  <span style={{ fontSize: "11px", color: "#aaa",
                    marginLeft: "4px" }}>
                    ({gradePoints[r.grade]?.toFixed(1)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results list */}
      {!loading && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0",
          color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📊</div>
          <p>No results found.</p>
        </div>
      )}

      {results.map((r, i) => (
        <div key={i} style={{
          background: "#fff", border: "1px solid #e0e0e0",
          borderLeft: `4px solid ${
            gradePoints[r.grade] >= 3.5 ? "#1D9E75"
            : gradePoints[r.grade] >= 2.0 ? "#e6a817"
            : "#e24b4a"}`,
          borderRadius: "8px", padding: "16px 20px",
          marginBottom: "10px", display: "flex",
          justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: "600", color: "#4a3728",
              fontSize: "15px" }}>{r.subject}</div>
            <div style={{ fontSize: "12px", color: "#aaa",
              marginTop: "2px" }}>
              {gradePoints[r.grade] !== undefined
                ? `${gradePoints[r.grade].toFixed(1)} grade points`
                : "Grade not in scale"}
            </div>
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700",
            color: gradePoints[r.grade] >= 3.5 ? "#1D9E75"
              : gradePoints[r.grade] >= 2.0 ? "#e6a817"
              : "#e24b4a" }}>
            {r.grade}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default Results;