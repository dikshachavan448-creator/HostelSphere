const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");


router.post(
  "/",
  authMiddleware,
  createComplaint
);


router.get(
  "/",
  authMiddleware,
  getComplaints
);


router.get(
  "/all",
  authMiddleware,
  getAllComplaints
);

router.put(
  "/:id/status",
  authMiddleware,
  updateComplaintStatus
);



module.exports = router;