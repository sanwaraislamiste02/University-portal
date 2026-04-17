import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");

  const fetchFees = () => {
    axios.get(`http://localhost:5000/fees/${email}`)
      .then(res => { setFees(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchFees(); }, []);

  const handlePay = async (id) => {
    try {
      await axios.put(`http://localhost:5000/fees/pay/${id}`);
      fetchFees(); // refresh list
    } catch (err) {
      alert("Payment failed. Try again.");
    }
  };

  const unpaid = fees.filter(f => f.status === "unpaid");
  const paid   = fees.filter(f => f.status === "paid");
  const total  = unpaid.reduce((sum, f) => sum + f.amount, 0);

  return (
    <Layout>
      {/* ── HEADER ── */}
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Fee Payment</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          View and pay your outstanding university fees.
        </p>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading fees...</p>}

      {/* ── SUMMARY CARD ── */}
      {!loading && (
        <div style={{
          background: "#4a3728", color: "white",
          borderRadius: "8px", padding: "20px 24px",
          marginBottom: "28px", display: "flex",
          justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: "13px", opacity: 0.8 }}>Total outstanding</div>
            <div style={{ fontSize: "28px", fontWeight: "700",
              color: "#e6a817" }}>
              {total.toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: "13px", opacity: 0.8 }}>
            <div>{unpaid.length} unpaid</div>
            <div>{paid.length} paid</div>
          </div>
        </div>
      )}

      {/* ── UNPAID FEES ── */}
      {unpaid.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600",
            marginBottom: "12px", color: "#333" }}>
            Outstanding fees
          </h2>
          {unpaid.map(fee => (
            <div key={fee._id} style={{
              background: "#fff", border: "1px solid #e0e0e0",
              borderLeft: "4px solid #e24b4a", borderRadius: "8px",
              padding: "16px 20px", marginBottom: "12px",
              display: "flex", justifyContent: "space-between",
              alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
            }}>
              <div>
                <div style={{ fontWeight: "600", color: "#333" }}>
                  {fee.description}
                </div>
                <div style={{ fontSize: "13px", color: "#888",
                  marginTop: "2px" }}>
                  Due: {new Date(fee.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center",
                gap: "16px" }}>
                <span style={{ fontWeight: "700", fontSize: "16px",
                  color: "#4a3728" }}>
                  {fee.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handlePay(fee._id)}
                  style={{
                    background: "#e6a817", color: "#4a3728",
                    border: "none", padding: "7px 18px",
                    borderRadius: "4px", fontWeight: "600",
                    cursor: "pointer", fontSize: "13px"
                  }}
                >
                  Pay now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PAID FEES ── */}
      {paid.length > 0 && (
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: "600",
            marginBottom: "12px", color: "#333" }}>
            Payment history
          </h2>
          {paid.map(fee => (
            <div key={fee._id} style={{
              background: "#fff", border: "1px solid #e0e0e0",
              borderLeft: "4px solid #1D9E75", borderRadius: "8px",
              padding: "16px 20px", marginBottom: "12px",
              display: "flex", justifyContent: "space-between",
              alignItems: "center", opacity: 0.8
            }}>
              <div>
                <div style={{ fontWeight: "600", color: "#333" }}>
                  {fee.description}
                </div>
                <div style={{ fontSize: "13px", color: "#888",
                  marginTop: "2px" }}>
                  Paid on: {new Date(fee.paidAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center",
                gap: "12px" }}>
                <span style={{ fontWeight: "700", color: "#4a3728" }}>
                  ${fee.amount.toFixed(2)}
                </span>
                <span style={{
                  background: "#E1F5EE", color: "#085041",
                  padding: "3px 10px", borderRadius: "99px",
                  fontSize: "12px", fontWeight: "600"
                }}>Paid</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {!loading && fees.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0",
          color: "#888" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>
            💳
          </div>
          <p>No fees found for your account.</p>
        </div>
      )}
    </Layout>
  );
}

export default Fees;