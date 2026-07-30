const express = require("express");
const { ingestTelemetry } = require("../controllers/telemetryController");
const { verifyTelemetryKey } = require("../middleware/telemetryAuth");

const router = express.Router();

router.post("/", verifyTelemetryKey, ingestTelemetry);

module.exports = router;
