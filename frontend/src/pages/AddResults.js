import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function AddResults() {
  const [studentEmail, setStudentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/faculty/add-result", {
        studentEmail, subject, grade
      });
      setMessage("Result added successfully!");
      setStudentEmail("");
      setSubject("");
      setGrade("");
    } catch (err) {
      setMessage("Failed to add result.");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add Result</h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <input
        type="email"
        placeholder="Student Email"
        className="border p-2 w-full mb-3 rounded"
        value={studentEmail}
        onChange={e => setStudentEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        className="border p-2 w-full mb-3 rounded"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grade (e.g. A, B+)"
        className="border p-2 w-full mb-3 rounded"
        value={grade}
        onChange={e => setGrade(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Result
      </button>
    </Layout>
  );
}

export default AddResults;