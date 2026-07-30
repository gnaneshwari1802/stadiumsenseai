const { broadcast } = require("../socket");
const activityService = require("../services/activityService");
const { updateDashboard } = require("../services/dashboardService");

const numericFields = {
  crowdDensity: { min: 0, max: 100 },
  parkingOccupied: { min: 0 },
  parkingCapacity: { min: 1 },
  temperature: { min: -80, max: 80 },
  securityAlerts: { min: 0, integer: true },
};

function validateTelemetry(body = {}) {
  const values = {};
  let hasMetric = false;

  for (const [field, rules] of Object.entries(numericFields)) {
    if (body[field] === undefined) continue;
    const value = Number(body[field]);
    if (!Number.isFinite(value) || value < rules.min || (rules.max !== undefined && value > rules.max) || (rules.integer && !Number.isInteger(value))) {
      return { error: `${field} must be a valid ${rules.integer ? "integer " : ""}number` };
    }
    values[field] = value;
    hasMetric = true;
  }

  if (body.activeGate !== undefined) {
    if (typeof body.activeGate !== "string" || !body.activeGate.trim() || body.activeGate.length > 80) {
      return { error: "activeGate must be a non-empty string of 80 characters or fewer" };
    }
    values.activeGate = body.activeGate.trim();
    hasMetric = true;
  }

  if (!hasMetric) return { error: "Provide at least one telemetry metric" };
  if (values.parkingOccupied !== undefined && values.parkingCapacity !== undefined && values.parkingOccupied > values.parkingCapacity) {
    return { error: "parkingOccupied cannot exceed parkingCapacity" };
  }

  if (values.crowdDensity !== undefined) {
    values.crowdLevel = values.crowdDensity >= 70 ? "HIGH" : values.crowdDensity >= 40 ? "MEDIUM" : "LOW";
  }

  values.dataSource = "telemetry";
  values.lastTelemetryAt = new Date();
  return { values };
}

async function ingestTelemetry(req, res) {
  const { values, error } = validateTelemetry(req.body);
  if (error) return res.status(400).json({ success: false, message: error });

  try {
    const dashboard = await updateDashboard(values);
    const activity = await activityService.log(
      "Live telemetry received",
      `Telemetry updated${values.activeGate ? ` for ${values.activeGate}` : ""}.`,
      { type: "telemetry", data: values }
    );

    broadcast("dashboardUpdate", dashboard);
    broadcast("telemetryUpdate", { dashboard, receivedAt: values.lastTelemetryAt });
    broadcast("activityUpdate", [activity, ...(await activityService.latest(19))]);

    return res.status(202).json({ success: true, data: dashboard });
  } catch (ingestError) {
    return res.status(500).json({ success: false, message: "Unable to process telemetry" });
  }
}

module.exports = { ingestTelemetry };
