import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email, password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",  res.data.role);
      localStorage.setItem("email", res.data.email);

      if (res.data.role === "admin")        navigate("/admin");
      else if (res.data.role === "faculty") navigate("/faculty");
      else                                  navigate("/student");

    } catch (err) {
      alert("Login failed — check your email and password.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5",
      display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>

      <div style={{ background: "#fff", borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
        width: "100%", maxWidth: "400px",
        overflow: "hidden" }}>

        {/* Red header */}
        <div style={{ background: "#e6a817", padding: "28px",
          textAlign: "center" }}>
          <div style={{ fontSize: "32px", fontWeight: "900",
            color: "white", letterSpacing: "-1px" }}>
            <span style={{ fontStyle: "italic", fontWeight: "300",
              fontSize: "26px" }}>my</span>Metro
          </div>
          <div style={{ color: "rgba(255,255,255,0.85)",
            fontSize: "14px", marginTop: "6px" }}>
            Sign in to your account
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: "28px" }}>

          <label style={{ fontSize: "13px", fontWeight: "600",
            display: "block", marginBottom: "5px",
            color: "#333" }}>Email</label>
          <input
            type="email"
            placeholder="your@university.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "10px 12px",
              border: "1px solid #ddd", borderRadius: "6px",
              fontSize: "14px", marginBottom: "16px",
              outline: "none" }}
          />

          <label style={{ fontSize: "13px", fontWeight: "600",
            display: "block", marginBottom: "5px",
            color: "#333" }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "10px 12px",
              border: "1px solid #ddd", borderRadius: "6px",
              fontSize: "14px", marginBottom: "24px",
              outline: "none" }}
          />

          <button
            onClick={handleLogin}
            style={{ width: "100%", background: "#e6a817",
              color: "white", border: "none", padding: "12px",
              borderRadius: "6px", fontWeight: "700",
              fontSize: "15px", cursor: "pointer",
              transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = "#e6a817"}
            onMouseLeave={e => e.target.style.background = "#e6a817"}>
            Sign In
          </button>

          <div style={{ textAlign: "center", marginTop: "16px",
            fontSize: "13px", color: "#888" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#e6a817",
              fontWeight: "600", textDecoration: "none" }}>
              Sign up
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <Link to="/" style={{ color: "#aaa", fontSize: "12px",
              textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;