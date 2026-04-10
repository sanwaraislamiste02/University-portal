// frontend/src/pages/AdminUsers.js
// Admin sees all users in a table
// Can filter by role and search by email
// Can also create new users directly from this page
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function AdminUsers() {
  const [users, setUsers]       = useState([]);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [loading, setLoading]   = useState(true);

  // new user form
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("student");
  const [message, setMessage]   = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:5000/admin/users")
      .then(res => { setUsers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    if (!email || !password) {
      setMessage("Please fill in email and password."); return;
    }
    try {
      await axios.post("http://localhost:5000/signup", {
        email, password, role
      });
      setMessage("User created successfully!");
      setEmail(""); setPassword(""); setRole("student");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create user.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // filter and search users
  const filtered = users.filter(u => {
    const matchRole   = filter === "all" || u.role === filter;
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase());
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
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Manage Users</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          View and manage all system users.
        </p>
      </div>

      {/* Create user form */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderRadius: "8px", padding: "20px", marginBottom: "28px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "600",
          marginBottom: "14px", color: "#333" }}>Create new user</h2>

        {message && (
          <p style={{ marginBottom: "12px", fontSize: "13px",
            color: message.includes("success") ? "#1D9E75" : "#e24b4a" }}>
            {message}
          </p>
        )}

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input type="email" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)}
            style={{ flex: 1, minWidth: "180px", padding: "9px 12px",
              border: "1px solid #ddd", borderRadius: "6px",
              fontSize: "14px" }} />
          <input type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{ flex: 1, minWidth: "140px", padding: "9px 12px",
              border: "1px solid #ddd", borderRadius: "6px",
              fontSize: "14px" }} />
          <select value={role} onChange={e => setRole(e.target.value)}
            style={{ padding: "9px 12px", border: "1px solid #ddd",
              borderRadius: "6px", fontSize: "14px" }}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleCreate} style={{
            background: "#e6a817", color: "#4a3728", border: "none",
            padding: "9px 20px", borderRadius: "6px",
            fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
            Create
          </button>
        </div>
      </div>

      {/* Search and filter */}
      <div style={{ display: "flex", gap: "12px",
        marginBottom: "16px", flexWrap: "wrap" }}>
        <input type="text" placeholder="Search by email..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "200px", padding: "9px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "14px" }} />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding: "9px 12px", border: "1px solid #ddd",
            borderRadius: "6px", fontSize: "14px" }}>
          <option value="all">All roles</option>
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users table */}
      {loading && <p style={{ color: "#888" }}>Loading users...</p>}

      {!loading && (
        <div style={{ background: "#fff", border: "1px solid #e0e0e0",
          borderRadius: "8px", overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            background: "#4a3728", color: "white",
            padding: "10px 20px", fontSize: "13px", fontWeight: "600" }}>
            <span>Email</span>
            <span>Name</span>
            <span>Role</span>
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "24px", textAlign: "center",
              color: "#888", fontSize: "14px" }}>
              No users found.
            </div>
          )}

          {filtered.map((u, i) => (
            <div key={u._id} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr auto",
              padding: "12px 20px", fontSize: "14px",
              background: i % 2 === 0 ? "#fff" : "#fafafa",
              borderTop: "1px solid #f0f0f0",
              alignItems: "center" }}>
              <span style={{ color: "#333" }}>{u.email}</span>
              <span style={{ color: "#666" }}>{u.name || "—"}</span>
              {roleBadge(u.role)}
            </div>
          ))}
        </div>
      )}

      {/* Total count */}
      {!loading && (
        <p style={{ marginTop: "12px", fontSize: "13px", color: "#888" }}>
          Showing {filtered.length} of {users.length} users
        </p>
      )}
    </Layout>
  );
}

export default AdminUsers;