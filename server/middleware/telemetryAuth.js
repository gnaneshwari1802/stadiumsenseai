const crypto = require("crypto");

function verifyTelemetryKey(req, res, next) {
  const configuredKey = process.env.TELEMETRY_INGEST_KEY;
  const providedKey = req.get("x-telemetry-key");

  if (!configuredKey) {
    return res.status(503).json({ success: false, message: "Telemetry ingestion is not configured" });
  }

  if (!providedKey || providedKey.length !== configuredKey.length) {
    return res.status(401).json({ success: false, message: "Invalid telemetry credentials" });
  }

  const valid = crypto.timingSafeEqual(Buffer.from(providedKey), Buffer.from(configuredKey));
  if (!valid) {
    return res.status(401).json({ success: false, message: "Invalid telemetry credentials" });
  }

  next();
}

module.exports = { verifyTelemetryKey };
