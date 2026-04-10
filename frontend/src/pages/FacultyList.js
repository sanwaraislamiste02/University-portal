// frontend/src/pages/FacultyList.js
// Shows all faculty members with their average rating
// Student can click Rate to go to rate faculty page
// Ratings are fetched for each faculty from /ratings/:email
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import StarRating from "../components/StarRating";

function FacultyList() {
  const [faculty, setFaculty]   = useState([]);
  const [ratings, setRatings]   = useState({});
  const [loading, setLoading]   = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch all users then filter faculty only
    axios.get("http://localhost:5000/admin/users")
      .then(async res => {
        const facultyOnly = res.data.filter(u => u.role === "faculty");
        setFaculty(facultyOnly);

        // fetch rating for each faculty member
        const ratingData = {};
        await Promise.all(
          facultyOnly.map(async f => {
            try {
              const r = await axios.get(
                `http://localhost:5000/ratings/${f.email}`
              );
              ratingData[f.email] = r.data;
            } catch {
              ratingData[f.email] = { average: 0, total: 0 };
            }
          })
        );
        setRatings(ratingData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Faculty</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          View faculty members and their student ratings.
        </p>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading...</p>}

      {!loading && faculty.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>👨‍🏫</div>
          <p>No faculty found.</p>
        </div>
      )}

      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
        gap: "16px" }}>
        {faculty.map(f => {
          const r = ratings[f.email] || { average: 0, total: 0 };
          return (
            <div key={f._id} style={{
              background: "#fff", border: "1px solid #e0e0e0",
              borderRadius: "8px", padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

              {/* Avatar and name */}
              <div style={{ display: "flex", gap: "14px",
                alignItems: "center", marginBottom: "14px" }}>
                <div style={{ width: "48px", height: "48px",
                  borderRadius: "50%", background: "#4a3728",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "20px",
                  color: "#e6a817", fontWeight: "700", flexShrink: 0 }}>
                  {(f.name || f.email)[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px",
                    color: "#4a3728" }}>
                    {f.name || "Faculty Member"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888",
                    marginTop: "2px" }}>{f.email}</div>
                </div>
              </div>

              {/* Star rating */}
              <div style={{ marginBottom: "14px" }}>
                <StarRating average={r.average} total={r.total} />
              </div>

              {/* Rating breakdown if has ratings */}
              {r.total > 0 && (
                <div style={{ background: "#f9f6f2", borderRadius: "6px",
                  padding: "8px 12px", marginBottom: "14px" }}>
                  <div style={{ fontSize: "12px", color: "#666",
                    display: "flex", justifyContent: "space-between" }}>
                    <span>Average rating</span>
                    <span style={{ fontWeight: "700", color: "#4a3728" }}>
                      {r.average} / 5.0
                    </span>
                  </div>
                  {/* Mini progress bar */}
                  <div style={{ height: "5px", background: "#e0e0e0",
                    borderRadius: "99px", marginTop: "6px",
                    overflow: "hidden" }}>
                    <div style={{
                      height: "100%", background: "#e6a817",
                      borderRadius: "99px",
                      width: `${(r.average / 5) * 100}%`
                    }} />
                  </div>
                  <div style={{ fontSize: "11px", color: "#aaa",
                    marginTop: "4px" }}>
                    Based on {r.total} student review{r.total !== 1 ? "s" : ""}
                  </div>
                </div>
              )}

              {/* Rate button */}
              <button
                onClick={() => navigate("/rate-faculty")}
                style={{ width: "100%", background: "#e6a817",
                  color: "#4a3728", border: "none", padding: "8px",
                  borderRadius: "6px", fontWeight: "700",
                  fontSize: "13px", cursor: "pointer" }}>
                {r.total > 0 ? "Update Rating" : "Rate this faculty"}
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default FacultyList;