import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function AdminUsers() {
  const [users, setUsers]       = useState([]);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [loading, setLoading]   = useState(true);
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("student");
  const [message, setMessage]   = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axios.get("http://localhost:5000/admin/users")
      .then(res => { 
        setUsers(res.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    if (!email || !password) {
      setMessage("Please fill in email and password."); return;
    }
    try {
      await axios.post("http://localhost:5000/signup", {
        name, email, password, role
      });
      setMessage("User created successfully!");
      setName(""); setEmail(""); setPassword(""); setRole("student");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create user.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    setDeleteId(id); 
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      
      // Update UI instantly by filtering the local state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      
      setMessage("User deleted successfully!");
    } catch (err) {
      setMessage("Failed to delete user.");
    } finally {
      setDeleteId(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const filtered = users.filter(u => {
    const matchRole   = filter === "all" || u.role === filter;
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase())
      || (u.name || "").toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const roleBadge = (role) => {
    const colors = {
      student: { bg: "#E6F1FB", color: "#0C447C" },
      faculty: { bg: "#E1F5EE", color: "#085041" },
      admin:   { bg: "#FAEEDA", color: "#633806" },
    };
    const c = colors[role] || colors.student;
    return (
      <span style={{ background: c.bg, color: c.color,
        padding: "2px 10px", borderRadius: "99px",
        fontSize: "11px", fontWeight: "600",
        textTransform: "capitalize" }}>
        {role}
      </span>
    );
  };

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817", paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#4a3728" }}>Manage Users</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>View, create and delete system users.</p>
      </div>

      {/* Form Section */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", marginBottom: "28px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "14px", color: "#333" }}>Create new user</h2>
        {message && (
          <p style={{ marginBottom: "12px", fontSize: "13px", color: message.includes("success") ? "#1D9E75" : "#e24b4a", fontWeight: "500" }}>
            {message}
          </p>
        )}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, minWidth: "150px", padding: "9px 12px", border: "1px solid #ddd", borderRadius: "6px" }} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, minWidth: "180px", padding: "9px 12px", border: "1px solid #ddd", borderRadius: "6px" }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ flex: 1, minWidth: "140px", padding: "9px 12px", border: "1px solid #ddd", borderRadius: "6px" }} />
          <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleCreate} style={{ background: "#e6a817", color: "#4a3728", border: "none", padding: "9px 20px", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Create</button>
        </div>
      </div>

      {/* Filter Section */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: "200px", padding: "9px 12px", border: "1px solid #ddd", borderRadius: "6px" }} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #ddd", borderRadius: "6px" }}>
          <option value="all">All roles</option>
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table Section */}
      {loading ? <p>Loading...</p> : (
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 80px", background: "#4a3728", color: "white", padding: "10px 20px", fontWeight: "600" }}>
            <span>Name</span><span>Email</span><span>Role</span><span>Action</span>
          </div>
          {filtered.map((u, i) => (
            <div key={u._id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 80px", padding: "12px 20px", background: i % 2 === 0 ? "#fff" : "#fafafa", borderTop: "1px solid #f0f0f0", alignItems: "center" }}>
              <span>{u.name || "—"}</span>
              <span style={{ color: "#666" }}>{u.email}</span>
              {roleBadge(u.role)}
              <button onClick={() => handleDelete(u._id)} disabled={deleteId === u._id} style={{ border: "1px solid #e24b4a", color: deleteId === u._id ? "#ccc" : "#e24b4a", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                {deleteId === u._id ? "..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default AdminUsers;