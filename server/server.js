const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const noticeRoutes = require("./routes/noticeRoutes");
const authRoutes = require("./routes/authroutes");
const complaintRoutes = require("./routes/complaintroutes");
const leaveRoutes = require("./routes/leaveroutes");
const app = express();
const userRoutes = require("./routes/userRoutes");
// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userRoutes);
console.log("USER ROUTES MOUNTED");
// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err.message);
  });

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 HostelSphere Backend API Running Successfully",
  });
});

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/leaves", leaveRoutes);
// Future Routes
// app.use("/api/leaves", leaveRoutes);
// app.use("/api/notices", noticeRoutes);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});
