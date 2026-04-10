import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function Results() {
  const [results, setResults] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;
    axios.get(`http://localhost:5000/student/results/${email}`)
      .then(res => setResults(res.data))
      .catch(err => console.log(err));
  }, [email]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">My Results</h1>

      {results.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}

      {results.map((r, i) => (
        <div key={i} className="bg-white p-4 mb-3 rounded shadow">
          <span className="font-semibold">{r.subject}</span> - {r.grade}
        </div>
      ))}
    </Layout>
  );
}

export default Results;