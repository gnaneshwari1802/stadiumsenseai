const express = require("express");
const { getNotifications, markNotificationRead } = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.patch("/:id/read", verifyToken, markNotificationRead);

module.exports = router;
