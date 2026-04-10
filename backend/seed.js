// backend/seed.js
// clears the database and fills it with realistic demo data
// no manually add data — this does everything

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// import all models
const User         = require("./models/Users");
const Course       = require("./models/Course");
const Result       = require("./models/Result");
const Fee          = require("./models/Fee");
const Announcement = require("./models/Announcement");
const Message      = require("./models/Message");
const Timetable    = require("./models/Timetable");

mongoose.connect("mongodb://127.0.0.1:27017/university")
  .then(() => console.log("Connected — seeding data..."));

async function seed() {
  try {

    // ── CLEAR ALL EXISTING DATA ──────────────────
    // This wipes everything so we start fresh
    await User.deleteMany();
    await Course.deleteMany();
    await Result.deleteMany();
    await Fee.deleteMany();
    await Announcement.deleteMany();
    await Message.deleteMany();
    await Timetable.deleteMany();
    console.log("✅ Cleared old data");

    // ── CREATE USERS ─────────────────────────────
    // All passwords are hashed — everyone's password is "password123"
    const hash = await bcrypt.hash("password123", 10);

    await User.insertMany([
      { name: "Alice Johnson",  email: "alice@university.com",   password: hash, role: "student" },
      { name: "Bob Smith",      email: "bob@university.com",     password: hash, role: "student" },
      { name: "Carol White",    email: "carol@university.com",   password: hash, role: "student" },
      { name: "David Brown",    email: "david@university.com",   password: hash, role: "student" },
      { name: "Emma Davis",     email: "emma@university.com",    password: hash, role: "student" },
      { name: "Dr. John Lee",   email: "john@university.com",    password: hash, role: "faculty" },
      { name: "Dr. Sara Ahmed", email: "sara@university.com",    password: hash, role: "faculty" },
      { name: "Admin User",     email: "admin@university.com",   password: hash, role: "admin"   },
    ]);
    console.log("✅ Users created");

    // ── CREATE COURSES ────────────────────────────
    await Course.insertMany([
      { name: "Data Structures",        instructor: "Dr. John Lee"   },
      { name: "Database Systems",       instructor: "Dr. Sara Ahmed" },
      { name: "Web Development",        instructor: "Dr. John Lee"   },
      { name: "Operating Systems",      instructor: "Dr. Sara Ahmed" },
      { name: "Computer Networks",      instructor: "Dr. John Lee"   },
      { name: "Software Engineering",   instructor: "Dr. Sara Ahmed" },
    ]);
    console.log("✅ Courses created");

    // ── CREATE RESULTS ────────────────────────────
    // Each student gets results for a few subjects
    await Result.insertMany([
      { studentEmail: "alice@university.com", subject: "Data Structures",  grade: "A"  },
      { studentEmail: "alice@university.com", subject: "Database Systems",  grade: "B+" },
      { studentEmail: "alice@university.com", subject: "Web Development",   grade: "A-" },
      { studentEmail: "bob@university.com",   subject: "Data Structures",   grade: "B"  },
      { studentEmail: "bob@university.com",   subject: "Operating Systems", grade: "A"  },
      { studentEmail: "carol@university.com", subject: "Web Development",   grade: "A+" },
      { studentEmail: "carol@university.com", subject: "Computer Networks", grade: "B-" },
      { studentEmail: "david@university.com", subject: "Database Systems",  grade: "C+" },
      { studentEmail: "david@university.com", subject: "Web Development",   grade: "B"  },
      { studentEmail: "emma@university.com",  subject: "Data Structures",   grade: "A"  },
      { studentEmail: "emma@university.com",  subject: "Computer Networks", grade: "A-" },
      
      await Course.insertMany([
      { name: "Data Structures",      instructor: "john@university.com", description: "Arrays, linked lists, trees, graphs and algorithm analysis." },
      { name: "Database Systems",     instructor: "sara@university.com", description: "Relational databases, SQL, normalization and transactions." },
      { name: "Web Development",      instructor: "john@university.com", description: "HTML, CSS, JavaScript, React and Node.js fundamentals." },
      { name: "Operating Systems",    instructor: "sara@university.com", description: "Processes, memory management, file systems and scheduling." },
      { name: "Computer Networks",    instructor: "john@university.com", description: "TCP/IP, routing, protocols and network security basics." },
      { name: "Software Engineering", instructor: "sara@university.com", description: "SDLC, agile methods, testing and project management." },
    ])
    ]);
    console.log("✅ Results created");

    // ── CREATE FEES ───────────────────────────────
    await Fee.insertMany([
      { studentEmail: "alice@university.com", description: "Semester Tuition Fee", amount: 1200, status: "paid",   paidAt: new Date() },
      { studentEmail: "alice@university.com", description: "Library Fee",          amount: 50,   status: "unpaid", paidAt: null },
      { studentEmail: "bob@university.com",   description: "Semester Tuition Fee", amount: 1200, status: "unpaid", paidAt: null },
      { studentEmail: "bob@university.com",   description: "Lab Fee",              amount: 150,  status: "unpaid", paidAt: null },
      { studentEmail: "carol@university.com", description: "Semester Tuition Fee", amount: 1200, status: "paid",   paidAt: new Date() },
      { studentEmail: "carol@university.com", description: "Exam Fee",             amount: 80,   status: "paid",   paidAt: new Date() },
      { studentEmail: "david@university.com", description: "Semester Tuition Fee", amount: 1200, status: "unpaid", paidAt: null },
      { studentEmail: "emma@university.com",  description: "Semester Tuition Fee", amount: 1200, status: "paid",   paidAt: new Date() },
      { studentEmail: "emma@university.com",  description: "Sports Fee",           amount: 60,   status: "unpaid", paidAt: null },
    ]);
    console.log("✅ Fees created");

    // ── CREATE ANNOUNCEMENTS ──────────────────────
    await Announcement.insertMany([
      {
        title: "Mid-Semester Exams Schedule Released",
        message: "Mid-semester examinations will be held from November 15–22. Please check the timetable on the portal and prepare accordingly. All students must carry their student ID.",
        postedBy: "admin@university.com",
        target: "student"
      },
      {
        title: "Faculty Meeting — November 10",
        message: "All faculty members are requested to attend the departmental meeting on November 10 at 2:00 PM in Conference Room B. Attendance is mandatory.",
        postedBy: "admin@university.com",
        target: "faculty"
      },
      {
        title: "Assignment 2 Deadline Extended",
        message: "Due to the public holiday, the deadline for Assignment 2 in Web Development has been extended to November 12. Submit via the portal before midnight.",
        postedBy: "john@university.com",
        target: "student"
      },
      {
        title: "Campus Wi-Fi Maintenance",
        message: "The campus network will undergo scheduled maintenance on Sunday November 5 from 10 PM to 2 AM. Internet services will be unavailable during this time.",
        postedBy: "admin@university.com",
        target: "all"
      },
      {
        title: "New Library Books Available",
        message: "The library has received new books on Data Structures, Machine Learning, and Cloud Computing. Students can borrow for up to 14 days. Visit the library counter for more details.",
        postedBy: "admin@university.com",
        target: "all"
      },
    ]);
    console.log("✅ Announcements created");

    // ── CREATE MESSAGES ───────────────────────────
    await Message.insertMany([
      {
        fromEmail: "alice@university.com",
        toEmail:   "john@university.com",
        subject:   "Question about Assignment 2",
        message:   "Dear Dr. Lee, I had a question regarding the requirements for Assignment 2. Could you clarify whether we need to implement sorting algorithms or just searching? Thank you.",
        read: false
      },
      {
        fromEmail: "bob@university.com",
        toEmail:   "john@university.com",
        subject:   "Missed Lecture Notes",
        message:   "Hi Dr. Lee, I was unwell and missed Tuesday's lecture on Binary Trees. Could you please share the notes or let me know where I can find them? Regards, Bob.",
        read: true
      },
      {
        fromEmail: "carol@university.com",
        toEmail:   "sara@university.com",
        subject:   "Project Topic Approval",
        message:   "Dear Dr. Ahmed, I would like to request approval for my project topic: Designing a Relational Database for Hospital Management. Please let me know if this is acceptable.",
        read: false
      },
      {
        fromEmail: "david@university.com",
        toEmail:   "sara@university.com",
        subject:   "Grade Query",
        message:   "Hello Dr. Ahmed, I noticed my Database Systems grade shows C+ but I believe I scored higher in the final exam. Could you please review my paper when you get a chance? Thank you.",
        read: false
      },
    ]);
    console.log("✅ Messages created");

    // ── CREATE TIMETABLE ──────────────────────────
    await Timetable.insertMany([
      { subject: "Data Structures",      day: "Monday",    time: "9:00 AM",  room: "Room 101", facultyEmail: "john@university.com" },
      { subject: "Database Systems",     day: "Monday",    time: "11:00 AM", room: "Room 203", facultyEmail: "sara@university.com" },
      { subject: "Web Development",      day: "Tuesday",   time: "10:00 AM", room: "Lab 1",    facultyEmail: "john@university.com" },
      { subject: "Operating Systems",    day: "Tuesday",   time: "2:00 PM",  room: "Room 105", facultyEmail: "sara@university.com" },
      { subject: "Computer Networks",    day: "Wednesday", time: "9:00 AM",  room: "Room 302", facultyEmail: "john@university.com" },
      { subject: "Software Engineering", day: "Wednesday", time: "1:00 PM",  room: "Room 201", facultyEmail: "sara@university.com" },
      { subject: "Data Structures",      day: "Thursday",  time: "10:00 AM", room: "Room 101", facultyEmail: "john@university.com" },
      { subject: "Database Systems",     day: "Thursday",  time: "3:00 PM",  room: "Room 203", facultyEmail: "sara@university.com" },
      { subject: "Web Development",      day: "Friday",    time: "11:00 AM", room: "Lab 1",    facultyEmail: "john@university.com" },
      { subject: "Software Engineering", day: "Friday",    time: "2:00 PM",  room: "Room 201", facultyEmail: "sara@university.com" },
    ]);
    
    console.log("✅ Timetable created");

    console.log("\n🎉 Database seeded successfully!");
    console.log("─────────────────────────────────");
    console.log("Login with any of these accounts:");
    console.log("Student:  alice@university.com  / password123");
    console.log("Student:  bob@university.com    / password123");
    console.log("Faculty:  john@university.com   / password123");
    console.log("Faculty:  sara@university.com   / password123");
    console.log("Admin:    admin@university.com  / password123");
    console.log("─────────────────────────────────");

    mongoose.disconnect();

  } catch (err) {
    console.error("Seeding failed:", err.message);
    mongoose.disconnect();
  }
}

seed();