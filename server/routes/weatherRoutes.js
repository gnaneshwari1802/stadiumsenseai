const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const {
    getWeather
} = require("../controllers/weatherController");

router.get("/", verifyToken, getWeather);

module.exports = router;
