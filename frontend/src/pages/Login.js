import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password
    });
    //  SAVE TOKEN
localStorage.setItem("token", res.data.token);

//  SAVE ROLE
localStorage.setItem("role", res.data.role);
localStorage.setItem("email", res.data.email);

// REDIRECT BASED ON ROLE
if (res.data.role === "admin") {
  navigate("/admin");
} else if (res.data.role === "faculty") {
  navigate("/faculty");
} else {
  navigate("/student");
}

  } catch (err) {
    console.log(err.response?.data);
    alert("Login failed");
  }
};

return (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
      
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-4 rounded"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4 rounded"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-gray-900 text-white w-full p-2 rounded hover:bg-gray-700"
      >
        Login
      </button>

    </div>
  </div>
);
}

export default Login;