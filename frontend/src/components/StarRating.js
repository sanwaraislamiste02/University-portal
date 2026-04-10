// frontend/src/components/StarRating.js
// Reusable component — shows average rating as stars
// Used in both faculty list and courses page
// average = number like 3.7, total = how many ratings
import React from "react";

function StarRating({ average, total }) {
  const avg = parseFloat(average) || 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {/* 5 stars — filled based on average */}
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} style={{
          fontSize: "14px",
          color: star <= Math.round(avg) ? "#e6a817" : "#ddd"
        }}>&#9733;</span>
      ))}
      <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>
        {avg > 0 ? `${avg} (${total})` : "No ratings yet"}
      </span>
    </div>
  );
}

export default StarRating;