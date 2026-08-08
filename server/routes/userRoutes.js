const express = require("express");
const router = express.Router();
const { getStudents } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
router.get(
  "/students",
  authMiddleware,
  getStudents
);
module.exports = router;