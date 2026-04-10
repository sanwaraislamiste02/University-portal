const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/university")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// ✅ Routes opes door in your backend
app.use("/", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/faculty", require("./routes/faculty"));
app.use("/student", require("./routes/student"));
app.use("/fees", require("./routes/Fees"));
app.use("/announcements", require("./routes/announcements"));
app.use("/messages", require("./routes/messages"));
app.use("/timetable", require("./routes/timetable"));
app.use("/courses", require("./routes/courses"));
app.use("/ratings", require("./routes/ratings"));

// ✅ Server
app.listen(5000, () => console.log("Server running on 5000"));