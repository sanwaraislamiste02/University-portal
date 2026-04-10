import React from "react";
import Layout from "../components/layout";

function FacultyDashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card title="📘 Manage Courses" />
        <Card title="📝 Grades" />
        <Card title="📢 Announcements" />
      </div>
    </Layout>
  );
}

const Card = ({ title }) => (
  <div className="bg-white p-6 rounded shadow hover:shadow-lg">
    {title}
  </div>
);

export default FacultyDashboard;