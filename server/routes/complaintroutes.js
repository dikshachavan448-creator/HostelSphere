const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");



// ==============================
// Student Routes
// ==============================


// Create Complaint
// POST /api/complaints

router.post(
  "/",
  authMiddleware,
  createComplaint
);



// Get Logged-in Student Complaints
// GET /api/complaints

router.get(
  "/",
  authMiddleware,
  getComplaints
);





// ==============================
// Admin Routes
// ==============================


// Get All Complaints
// GET /api/complaints/all

router.get(
  "/all",
  authMiddleware,
  getAllComplaints
);



// Update Complaint Status
// PUT /api/complaints/:id/status

router.put(
  "/:id/status",
  authMiddleware,
  updateComplaintStatus
);



module.exports = router;