const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const http      = require("http");
const { Server } = require("socket.io");

const app    = express();
const server = http.createServer(app);   // wrap express in http server

// Socket.io with CORS allowed for React dev server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/university")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/",              require("./routes/auth"));
app.use("/admin",         require("./routes/admin"));
app.use("/faculty",       require("./routes/faculty"));
app.use("/student",       require("./routes/student"));
app.use("/fees",          require("./routes/Fees"));
app.use("/announcements", require("./routes/announcements"));
app.use("/messages",      require("./routes/messages"));
app.use("/timetable",     require("./routes/timetable"));
app.use("/courses",       require("./routes/courses"));
app.use("/ratings",       require("./routes/ratings"));

// ── Real-time: relay profile-updated events to all browsers ──
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("profile-updated", (email) => {
    // Broadcast to ALL other connected clients
    socket.broadcast.emit("profile-updated", email);
    console.log(`📡 Profile updated broadcast for: ${email}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Use server.listen (not app.listen) so Socket.io works
server.listen(5000, () => console.log("Server running on 5000"));
