import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Layout from "../components/layout";

const IMGBB_API_KEY = "86abac556693392c813acd8939f90e97";

const EMPTY = {
  name: "", phone: "", age: "", department: "", address: "",
  dob: "", gender: "", blood: "", nationality: "", profilePic: "",
  studentId: "", program: "", year: "", batch: "", rollNo: "", admDate: "",
  designation: "", officeRoom: "", expertise: ""
};

const inp = {
  padding: "6px 10px", border: "1px solid #ccc",
  borderRadius: "4px", fontSize: "13px",
  outline: "none", width: "100%"
};

// TR is defined OUTSIDE Profile so it never gets recreated on keystrokes
const TR = ({ label, value, field, type = "text",
              options, editMode, data, onChange }) => {
  const bg = field ? "#fff" : "#f0f5fb";
  return (
    <tr>
      <td style={{ padding: "9px 16px", fontSize: "13px",
        color: "#4a7fb5", fontWeight: "600", textAlign: "right",
        background: "#dce8f5", width: "200px",
        borderBottom: "1px solid #ccdaea" }}>
        {label}
      </td>
      <td style={{ padding: "9px 16px", fontSize: "14px",
        color: "#333", background: bg,
        borderBottom: "1px solid #e4ecf5" }}>
        {editMode && field ? (
          options ? (
            <select value={data[field]} style={inp}
              onChange={e => onChange(field, e.target.value)}>
              {options.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input type={type} value={data[field]} style={inp}
              onChange={e => onChange(field, e.target.value)} />
          )
        ) : (
          value || <span style={{ color: "#bbb" }}>Not set</span>
        )}
      </td>
    </tr>
  );
};

function Profile() {
  const email = localStorage.getItem("email");
  const role  = localStorage.getItem("role");

  const [data, setData]           = useState(EMPTY);
  const [joined, setJoined]       = useState("");
  const [editMode, setEditMode]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCamera, setCamera]   = useState(false);
  const [message, setMessage]     = useState({ text: "", ok: true });

  const fileRef   = useRef();
  const videoRef  = useRef();
  const canvasRef = useRef();

  const onChange = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/profile/${email}`)
      .then(res => {
        const d = res.data;
        setData({
          name:        d.name        || "",
          phone:       d.phone       || "",
          age:         d.age         || "",
          department:  d.department  || "",
          address:     d.address     || "",
          dob:         d.dob         || "",
          gender:      d.gender      || "",
          blood:       d.blood       || "",
          nationality: d.nationality || "",
          profilePic:  d.profilePic  || "",
          studentId:   d.studentId   || "",
          program:     d.program     || "",
          year:        d.year        || "",
          batch:       d.batch       || "",
          rollNo:      d.rollNo      || "",
          admDate:     d.admDate     || "",
          designation: d.designation || "",
          officeRoom:  d.officeRoom  || "",
          expertise:   d.expertise   || "",
        });
        setJoined(d.createdAt || "");
      }).catch(() => {});
  }, [email]);

  const showMsg = (text, ok = true) => {
    setMessage({ text, ok });
    setTimeout(() => setMessage({ text: "", ok: true }), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/profile/update",
        { email, ...data });
      showMsg("Profile updated successfully!");
      setEditMode(false);
    } catch {
      showMsg("Failed to update.", false);
    }
    setSaving(false);
  };

  const uploadToImgBB = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload  = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
      });

      const form = new FormData();
      form.append("image", base64);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        form
      );

      const url = res.data.data.url;
      await axios.put("http://localhost:5000/profile/update", {
        email, ...data, profilePic: url
      });
      setData(prev => ({ ...prev, profilePic: url }));
      showMsg("Profile picture updated!");
    } catch (err) {
      showMsg("Upload failed: " +
        (err.response?.data?.error?.message || err.message), false);
    }
    setUploading(false);
  };

  const openCamera = async () => {
    setCamera(true);
    try {
      const stream = await navigator.mediaDevices
        .getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch {
      showMsg("Camera access denied.", false);
      setCamera(false);
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    video.srcObject.getTracks().forEach(t => t.stop());
    setCamera(false);
    canvas.toBlob(blob => {
      uploadToImgBB(new File([blob], "photo.jpg",
        { type: "image/jpeg" }));
    }, "image/jpeg");
  };

  // shared props passed to every TR
  const trProps = { editMode, data, onChange };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "#888", marginBottom: "14px" }}>
        Home &gt; {role === "student" ? "Students" : "Faculty"} &gt;{" "}
        <strong style={{ color: "#333" }}>{data.name || email}</strong>
      </div>

      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: "18px",
        paddingBottom: "12px", borderBottom: "2px solid #e0e0e0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>
            {role === "student" ? "🎓" : "👨‍🏫"}
          </span>
          <span style={{ fontSize: "16px", fontWeight: "700",
            color: "#333" }}>
            {role === "student" ? "Student info" : "Faculty info"}
          </span>
          <span style={{ color: "#ddd" }}>|</span>
          <span style={{ fontSize: "13px", color: "#888" }}>Profile</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {!editMode ? (
            <button onClick={() => setEditMode(true)} style={{
              background: "#c8102e", color: "#fff", border: "none",
              padding: "7px 18px", borderRadius: "4px",
              fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
              Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} disabled={saving} style={{
                background: "#1D9E75", color: "#fff", border: "none",
                padding: "7px 18px", borderRadius: "4px",
                fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditMode(false)} style={{
                background: "#888", color: "#fff", border: "none",
                padding: "7px 18px", borderRadius: "4px",
                fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div style={{ marginBottom: "14px", padding: "10px 14px",
          borderRadius: "4px", fontSize: "13px", fontWeight: "500",
          background: message.ok ? "#E1F5EE" : "#FCEBEB",
          color: message.ok ? "#085041" : "#791F1F" }}>
          {message.text}
        </div>
      )}

      {/* TOP — photo + key info */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "20px",
        padding: "20px", background: "#fff",
        border: "1px solid #dce8f5", borderRadius: "6px" }}>

        {/* Photo column */}
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <div style={{ width: "110px", height: "130px",
            border: "2px solid #c0d0e0", borderRadius: "4px",
            overflow: "hidden", background: "#f0f4f8",
            display: "flex", alignItems: "center",
            justifyContent: "center", marginBottom: "8px" }}>
            {data.profilePic ? (
              <img src={data.profilePic} alt="Profile"
                style={{ width: "100%", height: "100%",
                  objectFit: "cover" }} />
            ) : (
              <div style={{ color: "#aaa", textAlign: "center" }}>
                <div style={{ fontSize: "44px" }}>
                  {role === "student" ? "🎓" : "👨‍🏫"}
                </div>
                <div style={{ fontSize: "10px", marginTop: "4px" }}>
                  No photo
                </div>
              </div>
            )}
          </div>

          <button onClick={() => fileRef.current.click()}
            disabled={uploading}
            style={{ width: "110px", background: "#4a7fb5",
              color: "#fff", border: "none", padding: "5px",
              borderRadius: "3px", fontSize: "11px", fontWeight: "600",
              cursor: "pointer", marginBottom: "4px", display: "block" }}>
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
          <button onClick={openCamera} style={{
            width: "110px", background: "#5a6a7a",
            color: "#fff", border: "none", padding: "5px",
            borderRadius: "3px", fontSize: "11px", fontWeight: "600",
            cursor: "pointer", display: "block" }}>
            Take Photo
          </button>

          <input type="file" ref={fileRef} style={{ display: "none" }}
            accept="image/*"
            onChange={e => uploadToImgBB(e.target.files[0])} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Key info */}
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700",
            color: "#1a1a1a", marginBottom: "10px" }}>
            {data.name || "Name not set"}
          </h2>
          {role === "student" ? (
            [["Course",       data.program],
             ["Batch",        data.batch],
             ["Admission No", data.studentId],
             ["Roll Number",  data.rollNo]
            ].map(([l, v]) => (
              <div key={l} style={{ fontSize: "14px", color: "#c8102e",
                fontWeight: "500", marginBottom: "3px" }}>
                <strong>{l}:</strong> {v || "Not set"}
              </div>
            ))
          ) : (
            [["Designation", data.designation],
             ["Department",  data.department],
             ["Office",      data.officeRoom],
             ["Expertise",   data.expertise]
            ].map(([l, v]) => (
              <div key={l} style={{ fontSize: "14px", color: "#c8102e",
                fontWeight: "500", marginBottom: "3px" }}>
                <strong>{l}:</strong> {v || "Not set"}
              </div>
            ))
          )}
        </div>
      </div>

      {/* DETAILS TABLE */}
      <div style={{ border: "1px solid #d0dcea", borderRadius: "6px",
        overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <TR {...trProps} label="Full Name"
              field="name" value={data.name} />
            <TR {...trProps} label="Date of Birth"
              field="dob" value={data.dob} type="date" />
            <TR {...trProps} label="Age"
              field="age" value={data.age ? `${data.age} years` : ""}
              type="number" />
            <TR {...trProps} label="Blood Group" field="blood"
              value={data.blood}
              options={["","A+","A-","B+","B-","AB+","AB-","O+","O-"]} />
            <TR {...trProps} label="Gender" field="gender"
              value={data.gender}
              options={["","Male","Female","Other"]} />
            <TR {...trProps} label="Nationality"
              field="nationality" value={data.nationality} />
            <TR {...trProps} label="Phone"
              field="phone" value={data.phone} type="tel" />
            <TR {...trProps} label="Email" value={email} />
            <TR {...trProps} label="Department"
              field="department" value={data.department} />
            <TR {...trProps} label="Address"
              field="address" value={data.address} />

            {role === "student" && <>
              <TR {...trProps} label="Program"
                field="program" value={data.program} />
              <TR {...trProps} label="Year" field="year"
                value={data.year}
                options={["","1st Year","2nd Year","3rd Year","4th Year"]} />
              <TR {...trProps} label="Batch"
                field="batch" value={data.batch} />
              <TR {...trProps} label="Roll Number"
                field="rollNo" value={data.rollNo} />
              <TR {...trProps} label="Student ID"
                field="studentId" value={data.studentId} />
              <TR {...trProps} label="Admission Date"
                field="admDate" value={data.admDate} type="date" />
            </>}

            {role === "faculty" && <>
              <TR {...trProps} label="Designation"
                field="designation" value={data.designation} />
              <TR {...trProps} label="Office Room"
                field="officeRoom" value={data.officeRoom} />
              <TR {...trProps} label="Expertise"
                field="expertise" value={data.expertise} />
            </>}

            <TR {...trProps} label="Member Since"
              value={joined ? new Date(joined).toLocaleDateString(
                "en-US", { day:"numeric", month:"long", year:"numeric" }
              ) : ""} />
          </tbody>
        </table>
      </div>

      {editMode && (
        <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
          <button onClick={handleSave} disabled={saving} style={{
            background: "#c8102e", color: "#fff", border: "none",
            padding: "10px 28px", borderRadius: "4px",
            fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button onClick={() => setEditMode(false)} style={{
            background: "#888", color: "#fff", border: "none",
            padding: "10px 28px", borderRadius: "4px",
            fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      )}

      {/* Camera modal */}
      {showCamera && (
        <div style={{ position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.75)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "10px",
            padding: "24px", textAlign: "center",
            maxWidth: "480px", width: "90%" }}>
            <h3 style={{ marginBottom: "14px", color: "#333",
              fontSize: "16px" }}>Take a Photo</h3>
            <video ref={videoRef} autoPlay
              style={{ width: "100%", borderRadius: "6px",
                marginBottom: "14px" }} />
            <div style={{ display: "flex", gap: "10px",
              justifyContent: "center" }}>
              <button onClick={takePhoto} style={{
                background: "#c8102e", color: "#fff", border: "none",
                padding: "9px 24px", borderRadius: "4px",
                fontWeight: "700", cursor: "pointer" }}>
                Capture
              </button>
              <button onClick={() => {
                videoRef.current?.srcObject?.getTracks()
                  .forEach(t => t.stop());
                setCamera(false);
              }} style={{
                background: "#888", color: "#fff", border: "none",
                padding: "9px 24px", borderRadius: "4px",
                fontWeight: "700", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;