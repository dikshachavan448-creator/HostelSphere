const express = require("express");

const router = express.Router();

const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
}=require("../controllers/leaveController");


const authMiddleware=require("../middleware/authMiddleware");



router.post(
  "/",
  authMiddleware,
  createLeave
);
router.get(
    "/my",
    authMiddleware,
    getMyLeaves
);


router.get(
  "/all",
  authMiddleware,
  getAllLeaves
);


router.put(
  "/:id",
  authMiddleware,
  updateLeaveStatus
);


module.exports=router;