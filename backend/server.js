const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const http     = require("http"); 
const { Server } = require("socket.io"); 

const app = express();

// --- UPDATED CORS FOR MULTI-BROWSER SUPPORT ---
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // Allows sessions/cookies to work across different browsers
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
// ----------------------------------------------

app.use(express.json());

const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT"],
    credentials: true // Match the app's cors settings
  }
});

io.on("connection", (socket) => {
  // Added a small log so you can see when a browser connects
  console.log("A user connected:", socket.id);

  socket.on("profile-updated", (email) => {
    // Broadcast to all other connected browsers to refresh
    io.emit("profile-updated", email);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

mongoose.connect("mongodb://127.0.0.1:27017/university")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/",               require("./routes/auth"));
app.use("/admin",          require("./routes/admin"));
app.use("/faculty",        require("./routes/faculty"));
app.use("/student",        require("./routes/student"));
app.use("/fees",           require("./routes/Fees"));
app.use("/announcements", require("./routes/announcements"));
app.use("/messages",       require("./routes/messages"));
app.use("/timetable",      require("./routes/timetable"));
app.use("/courses",        require("./routes/courses"));
app.use("/ratings",        require("./routes/ratings"));

server.listen(5000, () => console.log("Server running on 5000"));