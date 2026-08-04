const express = require("express");

const router = express.Router();


const {
    createNotice,
    getNotices,
    deleteNotice
}=require("../controllers/noticeController");


const authMiddleware = require("../middleware/authMiddleware");


// Admin create notice

router.post(
    "/",
    authMiddleware,
    createNotice
);


// Everyone fetch notices

router.get(
    "/",
    authMiddleware,
    getNotices
);


// Admin delete notice

router.delete(
    "/:id",
    authMiddleware,
    deleteNotice
);


module.exports = router;