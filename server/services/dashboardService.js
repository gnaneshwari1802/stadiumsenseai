const Dashboard = require("../models/Dashboard");
const Analytics = require("../models/Analytics");

const defaults = {
  singletonKey: "main",
  crowdDensity: 45,
  crowdLevel: "MEDIUM",
  activeGate: "Main Entrance",
  parkingOccupied: 120,
  parkingCapacity: 200,
  parkingAvailable: 80,
  temperature: 30,
  weather: "Clear",
  humidity: null,
  wind: null,
  airQualityIndex: null,
  airQuality: "Unavailable",
  securityAlerts: 0,
  aiPrediction: "Normal crowd flow. Continue monitoring the Main Entrance.",
  dataSource: "waiting",
  lastTelemetryAt: null,
};

const legacyGateNames = {
  "Gate A": "Main Entrance",
  "Gate B": "East Entrance",
  "Gate C": "West Entrance",
};

function buildPrediction({ crowdDensity, parkingAvailable, securityAlerts }) {
  const crowdRisk = crowdDensity >= 80 ? "high" : crowdDensity >= 60 ? "moderate" : "low";
  const parkingRisk = parkingAvailable <= 20 ? "high" : parkingAvailable <= 60 ? "moderate" : "low";
  const securitySuggestion = securityAlerts > 0
    ? "Deploy security staff to active areas."
    : "Maintain standard security patrols.";

  return `Crowd risk: ${crowdRisk}. Parking congestion: ${parkingRisk}. ${securitySuggestion}`;
}

async function getDashboard() {
  const dashboards = await Dashboard.find().sort({ createdAt: 1 });
  let dashboard = dashboards[0];

  if (!dashboard) {
    dashboard = await Dashboard.create(defaults);
  } else {
    if (dashboards.length > 1) {
      await Dashboard.deleteMany({ _id: { $in: dashboards.slice(1).map(({ _id }) => _id) } });
    }
    let needsSave = false;
    if (dashboard.singletonKey !== "main") {
      dashboard.singletonKey = "main";
      needsSave = true;
    }
    if (legacyGateNames[dashboard.activeGate]) {
      dashboard.activeGate = legacyGateNames[dashboard.activeGate];
      needsSave = true;
    }
    if (needsSave) {
      await dashboard.save();
    }
  }

  return dashboard;
}

async function updateDashboard(values, { recordAnalytics = true } = {}) {
  const dashboard = await getDashboard();
  const nextValues = { ...values };

  if (Number.isFinite(nextValues.parkingCapacity)) {
    nextValues.parkingCapacity = Math.max(nextValues.parkingCapacity, 1);
  }

  if (Number.isFinite(nextValues.parkingOccupied)) {
    const parkingCapacity = nextValues.parkingCapacity || dashboard.parkingCapacity;
    nextValues.parkingOccupied = Math.min(Math.max(nextValues.parkingOccupied, 0), parkingCapacity);
    nextValues.parkingAvailable = parkingCapacity - nextValues.parkingOccupied;
  }

  Object.assign(dashboard, nextValues);
  dashboard.aiPrediction = buildPrediction({
    crowdDensity: dashboard.crowdDensity,
    parkingAvailable: dashboard.parkingAvailable,
    securityAlerts: dashboard.securityAlerts,
  });
  await dashboard.save();

  if (recordAnalytics) {
    await Analytics.create({
      crowdDensity: dashboard.crowdDensity,
      parkingOccupied: dashboard.parkingOccupied,
      temperature: dashboard.temperature,
      securityAlerts: dashboard.securityAlerts,
    });
  }

  return dashboard;
}

module.exports = { buildPrediction, getDashboard, updateDashboard };
