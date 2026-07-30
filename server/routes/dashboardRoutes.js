const express = require("express");
const { getDashboard, updateDashboard } = require("../controllers/dashboardController");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, getDashboard);
router.put("/", verifyToken, isAdmin, updateDashboard);

module.exports = router;
