import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState(""); // ADDED: Name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false); // ADDED: Loading state

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) return alert("Please fill all fields"); // ADDED: Validation
    
    setLoading(true); // ADDED: Start loading
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name, // ADDED: Sending name to backend
        email,
        password,
        role
      });

      alert(res.data.message || "Signup successful!");

      // clear input (better UX)
      setName(""); // ADDED
      setEmail("");
      setPassword("");
      setRole("student");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false); // ADDED: Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        {/* NAME INPUT */}
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ROLE SELECT */}
        <select
          className="border p-2 w-full mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          disabled={loading} // ADDED: Disable button while loading
          className={`${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white w-full p-2 rounded transition`}
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>

      </div>
    </div>
  );
}

export default Signup;