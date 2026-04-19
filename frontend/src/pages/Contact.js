import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";

function Contact() {
  const [toEmail, setToEmail]     = useState("");
  const [subject, setSubject]     = useState("");
  const [message, setMessage]     = useState("");
  const [status, setStatus]       = useState("");
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState([]);
  const [loadingSent, setLoading] = useState(true);
  const [activeTab, setTab]       = useState("send");

  const fromEmail = localStorage.getItem("email");

  const fetchSent = () => {
    axios.get(`http://localhost:5000/messages/sent/${fromEmail}`)
      .then(res => { setSent(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchSent(); }, [fromEmail]);

  const handleSend = async () => {
    if (!toEmail || !subject || !message) {
      setStatus("Please fill in all fields."); return;
    }
    setSending(true);
    try {
      await axios.post("http://localhost:5000/messages", {
        fromEmail, toEmail, subject, message
      });
      setStatus("Message sent successfully!");
      setToEmail(""); setSubject(""); setMessage("");
      fetchSent();
    } catch {
      setStatus("Failed to send. Try again.");
    }
    setSending(false);
    setTimeout(() => setStatus(""), 3000);
  };

  const repliedMessages   = sent.filter(m => m.reply);
  const unrepliedMessages = sent.filter(m => !m.reply);

  const tabStyle = (tab) => ({
    padding: "10px 24px", border: "none", cursor: "pointer",
    fontWeight: "600", fontSize: "14px", borderRadius: "6px 6px 0 0",
    background: activeTab === tab ? "#fff" : "#f0f0f0",
    color: activeTab === tab ? "#4a3728" : "#888",
    borderBottom: activeTab === tab
      ? "2px solid #e6a817" : "2px solid transparent"
  });

  return (
    <Layout>
      <div style={{ borderBottom: "3px solid #e6a817",
        paddingBottom: "16px", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700",
          color: "#4a3728" }}>Contact Faculty</h1>
        <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
          Send messages to faculty and view their replies.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "0",
        borderBottom: "1px solid #e0e0e0" }}>
        <button style={tabStyle("send")} onClick={() => setTab("send")}>
          Send Message
        </button>
        <button style={tabStyle("replies")} onClick={() => setTab("replies")}>
          Replies
          {repliedMessages.length > 0 && (
            <span style={{ marginLeft: "6px", background: "#e6a817",
              color: "#4a3728", fontSize: "11px", padding: "1px 7px",
              borderRadius: "99px", fontWeight: "700" }}>
              {repliedMessages.length}
            </span>
          )}
        </button>
        <button style={tabStyle("sent")} onClick={() => setTab("sent")}>
          Sent
          {unrepliedMessages.length > 0 && (
            <span style={{ marginLeft: "6px", background: "#e0e0e0",
              color: "#888", fontSize: "11px", padding: "1px 7px",
              borderRadius: "99px" }}>
              {unrepliedMessages.length}
            </span>
          )}
        </button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e0e0e0",
        borderTop: "none", borderRadius: "0 0 8px 8px",
        padding: "24px", marginBottom: "24px" }}>

        {/* SEND TAB */}
        {activeTab === "send" && (
          <div style={{ maxWidth: "560px" }}>
            {status && (
              <p style={{ marginBottom: "14px", fontSize: "13px",
                fontWeight: "500",
                color: status.includes("success") ? "#1D9E75" : "#e24b4a" }}>
                {status}
              </p>
            )}

            <div style={{ fontSize: "12px", color: "#888",
              marginBottom: "16px" }}>
              From: <strong style={{ color: "#4a3728" }}>{fromEmail}</strong>
            </div>

            <label style={{ fontSize: "13px", fontWeight: "600",
              display: "block", marginBottom: "5px" }}>
              Faculty Email
            </label>
            <input type="email" placeholder="faculty@university.com"
              value={toEmail} onChange={e => setToEmail(e.target.value)}
              style={{ width: "100%", padding: "10px 12px",
                border: "1px solid #ddd", borderRadius: "6px",
                fontSize: "14px", marginBottom: "14px",
                outline: "none" }} />

            <label style={{ fontSize: "13px", fontWeight: "600",
              display: "block", marginBottom: "5px" }}>Subject</label>
            <input type="text" placeholder="e.g. Question about assignment"
              value={subject} onChange={e => setSubject(e.target.value)}
              style={{ width: "100%", padding: "10px 12px",
                border: "1px solid #ddd", borderRadius: "6px",
                fontSize: "14px", marginBottom: "14px",
                outline: "none" }} />

            <label style={{ fontSize: "13px", fontWeight: "600",
              display: "block", marginBottom: "5px" }}>Message</label>
            <textarea placeholder="Write your message here..."
              value={message} onChange={e => setMessage(e.target.value)}
              rows={5} style={{ width: "100%", padding: "10px 12px",
                border: "1px solid #ddd", borderRadius: "6px",
                fontSize: "14px", marginBottom: "20px",
                resize: "vertical", outline: "none" }} />

            <button onClick={handleSend} disabled={sending} style={{
              background: "#e6a817", color: "#4a3728", border: "none",
              padding: "10px 28px", borderRadius: "6px",
              fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        )}

        {/* REPLIES TAB */}
        {activeTab === "replies" && (
          <div>
            {loadingSent && <p style={{ color: "#888" }}>Loading...</p>}

            {!loadingSent && repliedMessages.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0",
                color: "#888" }}>
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                  💬
                </div>
                <p>No replies from faculty yet.</p>
              </div>
            )}

            {repliedMessages.map(m => (
              <div key={m._id} style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px", overflow: "hidden",
                marginBottom: "16px" }}>

                {/* Message header */}
                <div style={{ background: "#f9f6f2", padding: "12px 16px",
                  borderBottom: "1px solid #e0e0e0" }}>
                  <div style={{ fontWeight: "700", color: "#4a3728",
                    fontSize: "15px", marginBottom: "4px" }}>
                    {m.subject}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888",
                    display: "flex", gap: "16px" }}>
                    <span>To: {m.toEmail}</span>
                    <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Original message */}
                <div style={{ padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ fontSize: "12px", color: "#aaa",
                    marginBottom: "4px", fontWeight: "600" }}>
                    YOUR MESSAGE
                  </div>
                  <p style={{ fontSize: "14px", color: "#555",
                    lineHeight: "1.6" }}>{m.message}</p>
                </div>

                {/* Faculty reply */}
                <div style={{ padding: "12px 16px",
                  background: "#f0f7f0" }}>
                  <div style={{ fontSize: "12px", color: "#1D9E75",
                    marginBottom: "6px", fontWeight: "700",
                    display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>✓</span> FACULTY REPLY
                  </div>
                  <p style={{ fontSize: "14px", color: "#333",
                    lineHeight: "1.6" }}>{m.reply}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SENT TAB */}
        {activeTab === "sent" && (
          <div>
            {loadingSent && <p style={{ color: "#888" }}>Loading...</p>}

            {!loadingSent && sent.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0",
                color: "#888" }}>
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                  📤
                </div>
                <p>No messages sent yet.</p>
              </div>
            )}

            {sent.map(m => (
              <div key={m._id} style={{
                background: "#fff", border: "1px solid #e0e0e0",
                borderLeft: `4px solid ${m.reply ? "#1D9E75" : "#e6a817"}`,
                borderRadius: "8px", padding: "14px 20px",
                marginBottom: "10px" }}>
                <div style={{ display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: "600", color: "#4a3728",
                      fontSize: "14px", marginBottom: "2px" }}>
                      {m.subject}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      To: {m.toEmail} ·{" "}
                      {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span style={{
                    background: m.reply ? "#E1F5EE" : "#FAEEDA",
                    color: m.reply ? "#085041" : "#633806",
                    padding: "3px 10px", borderRadius: "99px",
                    fontSize: "11px", fontWeight: "600" }}>
                    {m.reply ? "Replied" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Contact;