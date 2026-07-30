const { broadcast } = require("../socket");
const { evaluateOperations } = require("../services/sensorService");
const crowdService = require("../services/crowdService");
const parkingService = require("../services/parkingService");
const activityService = require("../services/activityService");
const notificationService = require("../services/notificationService");
const { predict } = require("../services/predictionService");
const { updateDashboard } = require("../services/dashboardService");
const { updateWeather } = require("../services/weatherService");

let realtimeTimer;
let weatherTimer;
let lastAlertSignature;
let lastAlertAt = 0;

async function runRealtimeUpdate() {
  const crowd = crowdService.generate();
  const parking = parkingService.generate(crowd.density);
  const sensor = evaluateOperations({ crowdDensity: crowd.density, parkingAvailable: parking.available });
  const dashboard = await updateDashboard({
    crowdDensity: crowd.density,
    crowdLevel: crowd.level,
    activeGate: crowd.gate,
    parkingOccupied: parking.occupied,
    parkingCapacity: parking.occupied + parking.available,
    parkingAvailable: parking.available,
    securityAlerts: sensor.securityAlerts,
    dataSource: "demo",
    lastTelemetryAt: new Date(),
  });
  const activity = await activityService.log(
    "Live dashboard updated",
    `Crowd ${crowd.density}% at ${crowd.gate}; parking ${parking.available} spaces available.`,
    { type: "dashboard", priority: crowd.level === "HIGH" ? "high" : "normal" }
  );

  broadcast("dashboardUpdate", dashboard);
  broadcast("crowdUpdate", crowd);
  broadcast("parkingUpdate", parking);
  broadcast("predictionUpdate", predict(dashboard));
  broadcast("activityUpdate", [activity, ...(await activityService.latest(19))]);

  const alertSignature = `${crowd.level}:${parking.available <= 20}:${sensor.securityAlerts}`;
  const shouldAlert = crowd.level === "HIGH" || parking.available <= 20 || sensor.securityAlerts > 0;
  if (shouldAlert && (alertSignature !== lastAlertSignature || Date.now() - lastAlertAt > 60_000)) {
    const notification = await notificationService.create(
      crowd.level === "HIGH" ? "crowd" : "operations",
      crowd.level === "HIGH" ? "High crowd density" : "Stadium operations alert",
      crowd.level === "HIGH"
        ? `Heavy crowd detected near ${crowd.gate}.`
        : `Parking availability: ${parking.available}; security alerts: ${sensor.securityAlerts}.`,
      "high"
    );
    broadcast("notification", notification);
    broadcast("notificationUpdate", notification);
    lastAlertSignature = alertSignature;
    lastAlertAt = Date.now();
  }
}

async function runWeatherUpdate() {
  try {
    const weather = await updateWeather();
    broadcast("weatherUpdate", weather);
    broadcast("dashboardUpdate", await updateDashboard({}, { recordAnalytics: false }));
  } catch (error) {
    console.error("Weather update failed:", error.message);
  }
}

function startRealtimeScheduler() {
  if (realtimeTimer) return;

  if (process.env.ENABLE_DEMO_TELEMETRY === "true") {
    runRealtimeUpdate().catch((error) => console.error("Demo telemetry update failed:", error.message));
    realtimeTimer = setInterval(() => runRealtimeUpdate().catch((error) => console.error("Demo telemetry update failed:", error.message)), 5000);
    console.warn("Demo telemetry is enabled. Do not use simulated data in production.");
  } else {
    console.log("Waiting for live telemetry at POST /api/telemetry.");
  }

  runWeatherUpdate();
  weatherTimer = setInterval(runWeatherUpdate, 5 * 60 * 1000);
}

function stopRealtimeScheduler() {
  if (realtimeTimer) clearInterval(realtimeTimer);
  clearInterval(weatherTimer);
  realtimeTimer = undefined;
  weatherTimer = undefined;
}

module.exports = { startRealtimeScheduler, stopRealtimeScheduler };
