import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function MyStudents() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get("http://localhost:5000/courses")
      .then(res => {
        // only courses taught by this faculty
        const mine = res.data.filter(c => c.instructor === email);
        setCourses(mine);
        if (mine.length > 0) setSelected(mine[0]._id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [email]);

  const selectedCourse = courses.find(c => c._id === selected);

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>My Students</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Students enrolled in your courses.
        </p>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading...</p>}

      {!loading && courses.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📚</div>
          <p>You have no courses yet. Add courses first.</p>
        </div>
      )}

      {courses.length > 0 && (
        <>
          {/* Course tabs */}
          <div style={{ display: "flex", gap: "8px",
            flexWrap: "wrap", marginBottom: "24px" }}>
            {courses.map(c => (
              <button key={c._id}
                onClick={() => setSelected(c._id)}
                style={{
                  padding: "8px 18px", borderRadius: "6px",
                  border: "2px solid",
                  borderColor: selected === c._id ? "#e6a817" : "#e0e0e0",
                  background: selected === c._id ? "#e6a817" : "#fff",
                  color: selected === c._id ? "#4a3728" : "#555",
                  fontWeight: selected === c._id ? "700" : "400",
                  fontSize: "13px", cursor: "pointer" }}>
                {c.name}
                <span style={{ marginLeft: "6px", fontSize: "11px",
                  background: selected === c._id
                    ? "rgba(74,55,40,0.2)" : "#f0f0f0",
                  color: selected === c._id ? "#4a3728" : "#888",
                  padding: "1px 6px", borderRadius: "99px" }}>
                  {c.enrolledStudents?.length || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Selected course info */}
          {selectedCourse && (
            <>
              <div style={{ background: "#4a3728", color: "white",
                borderRadius: "8px", padding: "16px 20px",
                marginBottom: "20px", display: "flex",
                justifyContent: "space-between", alignItems: "center",
                flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    {selectedCourse.name}
                  </div>
                  {selectedCourse.description && (
                    <div style={{ fontSize: "13px", opacity: 0.8,
                      marginTop: "4px" }}>
                      {selectedCourse.description}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "28px", fontWeight: "800",
                    color: "#e6a817" }}>
                    {selectedCourse.enrolledStudents?.length || 0}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>
                    enrolled students
                  </div>
                </div>
              </div>

              {/* Students list */}
              {selectedCourse.enrolledStudents?.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0",
                  color: "#888", background: "#fff",
                  border: "1px solid #e0e0e0", borderRadius: "8px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                    👥
                  </div>
                  <p>No students enrolled in this course yet.</p>
                </div>
              ) : (
                <div style={{ background: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px", overflow: "hidden" }}>

                  {/* Table header */}
                  <div style={{ display: "grid",
                    gridTemplateColumns: "40px 1fr 1fr",
                    background: "#4a3728", color: "white",
                    padding: "10px 20px", fontSize: "13px",
                    fontWeight: "600" }}>
                    <span>#</span>
                    <span>Student Email</span>
                    <span>Status</span>
                  </div>

                  {selectedCourse.enrolledStudents.map((studentEmail, i) => (
                    <div key={i} style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 1fr",
                      padding: "12px 20px", fontSize: "14px",
                      background: i % 2 === 0 ? "#fff" : "#fafafa",
                      borderTop: "1px solid #f0f0f0",
                      alignItems: "center" }}>
                      <span style={{ color: "#aaa", fontSize: "13px" }}>
                        {i + 1}
                      </span>
                      <div style={{ display: "flex", alignItems: "center",
                        gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px",
                          borderRadius: "50%", background: "#4a3728",
                          display: "flex", alignItems: "center",
                          justifyContent: "center", color: "#e6a817",
                          fontWeight: "700", fontSize: "14px",
                          flexShrink: 0 }}>
                          {studentEmail[0].toUpperCase()}
                        </div>
                        <span style={{ color: "#333" }}>{studentEmail}</span>
                      </div>
                      <span style={{ background: "#E1F5EE",
                        color: "#085041", padding: "3px 10px",
                        borderRadius: "99px", fontSize: "12px",
                        fontWeight: "600", display: "inline-block" }}>
                        Enrolled
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default MyStudents;