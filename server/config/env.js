const requiredInProduction = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];

function getAllowedOrigins() {
  return (process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function validateEnvironment() {
  if (process.env.NODE_ENV !== "production") return;

  const required = process.env.ENABLE_DEMO_TELEMETRY === "true"
    ? requiredInProduction
    : [...requiredInProduction, "TELEMETRY_INGEST_KEY"];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }

  if (process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production");
  }
}

module.exports = { getAllowedOrigins, validateEnvironment };
