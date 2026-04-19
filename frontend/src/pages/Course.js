// frontend/src/pages/Course.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

const DEPT_COLORS = {
  "Computer Science & Engineering":      { bg:"#e8f0fe", border:"#4285f4", badge:"#4285f4" },
  "Electrical & Electronic Engineering": { bg:"#fff8e1", border:"#f9ab00", badge:"#f9ab00" },
  "Software Engineering":                { bg:"#e6f4ea", border:"#34a853", badge:"#34a853" },
  "Law (LLB)":                           { bg:"#fce8e6", border:"#ea4335", badge:"#ea4335" },
  "Economics":                           { bg:"#f3e8fd", border:"#9334e6", badge:"#9334e6" },
  "Business Administration":             { bg:"#fff3e0", border:"#fa7b17", badge:"#fa7b17" },
  "English":                             { bg:"#e8f5e9", border:"#1e8e3e", badge:"#1e8e3e" },
};
const DEPT_ICONS = {
  "Computer Science & Engineering":"💻",
  "Electrical & Electronic Engineering":"⚡",
  "Software Engineering":"🛠️",
  "Law (LLB)":"⚖️",
  "Economics":"📈",
  "Business Administration":"💼",
  "English":"📖",
};

function Course() {
  const role  = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const [courses, setCourses]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch]         = useState("");
  const [message, setMessage]       = useState("");
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [showAdd, setShowAdd]       = useState(false);
  const [newCourse, setNewCourse]   = useState({ name:"", code:"", department:"", instructor:"", instructorEmail:"", description:"", credits:3 });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = () => {
    setLoading(true);
    axios.get("http://localhost:5000/courses")
      .then(res => {
        setCourses(res.data);
        if (role === "student") {
          setEnrolledIds(res.data.filter(c => c.enrolledStudents.includes(email)).map(c => c._id));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleEnrol = async (courseId) => {
    try {
      await axios.post("http://localhost:5000/courses/enrol", { courseId, studentEmail: email });
      setEnrolledIds(prev => [...prev, courseId]);
      showMsg("✅ Enrolled successfully!");
      fetchCourses();
    } catch (err) {
      showMsg(err.response?.data?.message || "Enrolment failed.");
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.name || !newCourse.code || !newCourse.department) {
      showMsg("Name, Code and Department are required."); return;
    }
    try {
      await axios.post("http://localhost:5000/courses/add", newCourse);
      showMsg("✅ Course added!");
      setShowAdd(false);
      setNewCourse({ name:"", code:"", department:"", instructor:"", instructorEmail:"", description:"", credits:3 });
      fetchCourses();
    } catch (err) {
      showMsg(err.response?.data?.message || "Failed to add course.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      showMsg("Course deleted."); fetchCourses();
    } catch { showMsg("Delete failed."); }
  };

  const showMsg = (text) => { setMessage(text); setTimeout(() => setMessage(""), 3500); };

  const allDepts = ["All", ...Object.keys(DEPT_ICONS)];
  const filtered = courses.filter(c => {
    const matchDept   = selectedDept === "All" || c.department === selectedDept;
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.instructor || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.code || "").toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });
  const grouped = {};
  filtered.forEach(c => { if (!grouped[c.department]) grouped[c.department] = []; grouped[c.department].push(c); });

  const inp = { width:"100%", padding:"8px 10px", border:"1px solid #ddd", borderRadius:"6px", fontSize:"13px", outline:"none", boxSizing:"border-box" };

  return (
    <Layout>
      <style>{`
        .cc { transition: box-shadow 0.2s, transform 0.2s; }
        .cc:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.13); transform: translateY(-2px); }
        .dtab { cursor:pointer; padding:7px 14px; border-radius:20px; font-size:12px; font-weight:700; border:none; transition:all 0.15s; white-space:nowrap; }
        .ebtn { cursor:pointer; border:none; padding:6px 14px; border-radius:5px; font-size:12px; font-weight:700; }
        .ebtn:hover { opacity:0.85; }
      `}</style>

      {/* Page header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"18px", flexWrap:"wrap", gap:"10px" }}>
        <div>
          <h1 style={{ fontSize:"22px", fontWeight:"700", color:"#333", margin:0 }}>📚 Courses</h1>
          <p style={{ fontSize:"13px", color:"#888", margin:"4px 0 0" }}>
            {courses.length} courses across 7 departments
          </p>
        </div>
        {role === "admin" && (
          <button onClick={() => setShowAdd(true)}
            style={{ background:"#4a3728", color:"#fff", border:"none", padding:"9px 20px", borderRadius:"6px", fontWeight:"700", fontSize:"13px", cursor:"pointer" }}>
            + Add Course
          </button>
        )}
      </div>

      {message && (
        <div style={{ marginBottom:"14px", padding:"10px 14px", borderRadius:"6px", fontSize:"13px", fontWeight:"500", background:message.startsWith("✅")?"#e6f4ea":"#fce8e6", color:message.startsWith("✅")?"#137333":"#c5221f" }}>
          {message}
        </div>
      )}

      {/* Search */}
      <input placeholder="🔍  Search by name, code or instructor..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{ ...inp, marginBottom:"14px", fontSize:"14px", padding:"10px 14px" }} />

      {/* Dept tabs */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"24px" }}>
        {allDepts.map(d => (
          <button key={d} className="dtab" onClick={() => setSelectedDept(d)}
            style={{ background:selectedDept===d?"#4a3728":"#f0f0f0", color:selectedDept===d?"#fff":"#555" }}>
            {DEPT_ICONS[d] || "🏫"} {d === "All" ? "All" : d}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#888" }}>Loading courses...</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#aaa" }}>
          <div style={{ fontSize:"48px" }}>📭</div>
          <div style={{ marginTop:"12px" }}>No courses found.</div>
        </div>
      ) : (
        Object.entries(grouped).map(([dept, dcs]) => {
          const col = DEPT_COLORS[dept] || { bg:"#f5f5f5", border:"#999", badge:"#999" };
          return (
            <div key={dept} style={{ marginBottom:"32px" }}>
              {/* Dept title */}
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px", paddingBottom:"10px", borderBottom:`3px solid ${col.border}` }}>
                <span style={{ fontSize:"20px" }}>{DEPT_ICONS[dept]}</span>
                <span style={{ fontSize:"17px", fontWeight:"700", color:"#333" }}>{dept}</span>
                <span style={{ background:col.badge, color:"#fff", fontSize:"11px", fontWeight:"700", padding:"2px 9px", borderRadius:"99px" }}>
                  {dcs.length} courses
                </span>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:"16px" }}>
                {dcs.map(course => {
                  const isEnrolled = enrolledIds.includes(course._id);
                  return (
                    <div key={course._id} className="cc"
                      style={{ background:"#fff", border:`1px solid ${col.border}30`, borderLeft:`4px solid ${col.border}`, borderRadius:"8px", padding:"18px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>

                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                        <span style={{ background:col.bg, color:col.badge, fontSize:"11px", fontWeight:"700", padding:"3px 8px", borderRadius:"4px" }}>
                          {course.code}
                        </span>
                        <span style={{ fontSize:"11px", color:"#888", fontWeight:"600" }}>{course.credits} credits</span>
                      </div>

                      <div style={{ fontSize:"15px", fontWeight:"700", color:"#222", marginBottom:"6px", lineHeight:"1.3" }}>
                        {course.name}
                      </div>

                      {course.description && (
                        <div style={{ fontSize:"12px", color:"#666", lineHeight:"1.5", marginBottom:"12px" }}>
                          {course.description}
                        </div>
                      )}

                      {/* Faculty card */}
                      {course.instructor && (
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px", background:"#f8f8f8", borderRadius:"6px", marginBottom:"12px" }}>
                          <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:col.border, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"13px", fontWeight:"700", flexShrink:0 }}>
                            {course.instructor.split(" ").slice(-1)[0][0]}
                          </div>
                          <div>
                            <div style={{ fontSize:"12px", fontWeight:"700", color:"#333" }}>{course.instructor}</div>
                            <div style={{ fontSize:"11px", color:"#888" }}>{course.instructorEmail}</div>
                          </div>
                        </div>
                      )}

                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:"11px", color:"#888" }}>
                          👥 {course.enrolledStudents?.length || 0} enrolled
                        </span>
                        <div style={{ display:"flex", gap:"6px" }}>
                          {role === "student" && (
                            isEnrolled ? (
                              <span style={{ background:"#e6f4ea", color:"#137333", fontSize:"11px", fontWeight:"700", padding:"5px 12px", borderRadius:"5px" }}>✓ Enrolled</span>
                            ) : (
                              <button className="ebtn" onClick={() => handleEnrol(course._id)}
                                style={{ background:col.badge, color:"#fff" }}>Enrol</button>
                            )
                          )}
                          {role === "admin" && (
                            <button className="ebtn" onClick={() => handleDelete(course._id)}
                              style={{ background:"#ea4335", color:"#fff" }}>Delete</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* Add Course Modal */}
      {showAdd && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
          <div style={{ background:"#fff", borderRadius:"10px", padding:"28px", width:"90%", maxWidth:"480px", maxHeight:"90vh", overflowY:"auto" }}>
            <h3 style={{ margin:"0 0 20px", fontSize:"18px", color:"#333" }}>➕ Add New Course</h3>
            {[["Course Name *","name","text","e.g. Introduction to Programming"],["Course Code *","code","text","e.g. CSE-101"],["Instructor Name","instructor","text","e.g. Dr. Fatima Khanam"],["Instructor Email","instructorEmail","email","e.g. fatima@university.edu"],["Credits","credits","number","3"]].map(([label,field,type,ph]) => (
              <div key={field} style={{ marginBottom:"12px" }}>
                <label style={{ fontSize:"12px", fontWeight:"700", color:"#555", display:"block", marginBottom:"4px" }}>{label}</label>
                <input type={type} placeholder={ph} value={newCourse[field]}
                  onChange={e => setNewCourse(p => ({ ...p, [field]:e.target.value }))} style={inp} />
              </div>
            ))}
            <div style={{ marginBottom:"12px" }}>
              <label style={{ fontSize:"12px", fontWeight:"700", color:"#555", display:"block", marginBottom:"4px" }}>Department *</label>
              <select value={newCourse.department}
                onChange={e => setNewCourse(p => ({ ...p, department:e.target.value }))} style={inp}>
                <option value="">-- Select --</option>
                {Object.keys(DEPT_ICONS).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:"20px" }}>
              <label style={{ fontSize:"12px", fontWeight:"700", color:"#555", display:"block", marginBottom:"4px" }}>Description</label>
              <textarea placeholder="Brief course description..." value={newCourse.description}
                onChange={e => setNewCourse(p => ({ ...p, description:e.target.value }))}
                style={{ ...inp, height:"75px", resize:"vertical" }} />
            </div>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={handleAddCourse}
                style={{ flex:1, background:"#4a3728", color:"#fff", border:"none", padding:"11px", borderRadius:"6px", fontWeight:"700", cursor:"pointer" }}>
                Add Course
              </button>
              <button onClick={() => setShowAdd(false)}
                style={{ flex:1, background:"#eee", color:"#555", border:"none", padding:"11px", borderRadius:"6px", fontWeight:"700", cursor:"pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Course;
