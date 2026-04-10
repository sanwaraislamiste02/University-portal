import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";
import StarRating from "../components/StarRating";

function Courses() {
  const [courses, setCourses]   = useState([]);
  const [ratings, setRatings]   = useState({});
  const [loading, setLoading]   = useState(true);
  const [message, setMessage]   = useState("");
  const email = localStorage.getItem("email");
  const role  = localStorage.getItem("role");

  const fetchCourses = () => {
    axios.get("http://localhost:5000/courses")
      .then(async res => {
        setCourses(res.data);

        // fetch rating for each unique instructor
        const instructors = [...new Set(res.data.map(c => c.instructor))];
        const ratingData  = {};
        await Promise.all(
          instructors.map(async instructor => {
            try {
              const r = await axios.get(
                `http://localhost:5000/ratings/${instructor}`
              );
              ratingData[instructor] = r.data;
            } catch {
              ratingData[instructor] = { average: 0, total: 0 };
            }
          })
        );
        setRatings(ratingData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleEnrol = async (courseId) => {
    try {
      const res = await axios.post("http://localhost:5000/courses/enrol", {
        courseId, studentEmail: email
      });
      setMessage(res.data.message);
      fetchCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Enrolment failed.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Courses</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Browse and enrol in available courses.
        </p>
      </div>

      {message && (
        <div style={{ padding: "10px 16px", borderRadius: "6px",
          marginBottom: "20px", fontSize: "13px", fontWeight: "500",
          background: message.includes("success") || message.includes("Enrolled")
            ? "#E1F5EE" : "#FCEBEB",
          color: message.includes("success") || message.includes("Enrolled")
            ? "#085041" : "#791F1F" }}>
          {message}
        </div>
      )}

      {loading && <p style={{ color: "#888" }}>Loading courses...</p>}

      {!loading && courses.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📚</div>
          <p>No courses available yet.</p>
        </div>
      )}

      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px" }}>
        {courses.map(course => {
          const enrolled = course.enrolledStudents?.includes(email);
          const r = ratings[course.instructor] || { average: 0, total: 0 };

          return (
            <div key={course._id} style={{
              background: "#fff", border: "1px solid #e0e0e0",
              borderRadius: "8px", padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column",
              justifyContent: "space-between", gap: "14px" }}>

              <div>
                {/* Course icon and name */}
                <div style={{ display: "flex", alignItems: "center",
                  gap: "10px", marginBottom: "10px" }}>
                  <div style={{ width: "40px", height: "40px",
                    borderRadius: "50%", background: "#4a3728",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px", flexShrink: 0 }}>📘</div>
                  <div style={{ fontWeight: "700", fontSize: "15px",
                    color: "#4a3728" }}>{course.name}</div>
                </div>

                {/* Instructor name */}
                <p style={{ fontSize: "13px", color: "#666",
                  marginBottom: "6px" }}>
                  Instructor: <strong>{course.instructor}</strong>
                </p>

                {/* Star rating below instructor name */}
                <div style={{ marginBottom: "8px" }}>
                  <StarRating average={r.average} total={r.total} />
                </div>

                {course.description && (
                  <p style={{ fontSize: "13px", color: "#888",
                    lineHeight: "1.5" }}>{course.description}</p>
                )}
              </div>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center",
                justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "#aaa" }}>
                  {course.enrolledStudents?.length || 0} enrolled
                </span>

                {role === "student" && (
                  enrolled ? (
                    <span style={{ background: "#E1F5EE", color: "#085041",
                      padding: "5px 14px", borderRadius: "99px",
                      fontSize: "12px", fontWeight: "600" }}>
                      ✓ Enrolled
                    </span>
                  ) : (
                    <button onClick={() => handleEnrol(course._id)} style={{
                      background: "#e6a817", color: "#4a3728",
                      border: "none", padding: "7px 18px",
                      borderRadius: "6px", fontWeight: "700",
                      fontSize: "13px", cursor: "pointer" }}>
                      Enrol
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Courses;