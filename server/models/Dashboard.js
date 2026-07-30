const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    singletonKey: { type: String, default: "main", unique: true },
    crowdDensity: { type: Number, default: 0, min: 0, max: 100 },
    crowdLevel: { type: String, default: "LOW" },
    activeGate: { type: String, default: "Main Entrance" },
    parkingOccupied: { type: Number, default: 0, min: 0 },
    parkingCapacity: { type: Number, default: 200, min: 1 },
    parkingAvailable: { type: Number, default: 200, min: 0 },
    temperature: { type: Number, default: 0 },
    weather: { type: String, default: "Clear" },
    humidity: { type: Number, default: null },
    wind: { type: Number, default: null },
    airQualityIndex: { type: Number, default: null, min: 1, max: 5 },
    airQuality: { type: String, default: "Unavailable" },
    securityAlerts: { type: Number, default: 0, min: 0 },
    aiPrediction: { type: String, default: "Collecting live stadium data." },
    dataSource: { type: String, default: "waiting" },
    lastTelemetryAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dashboard", dashboardSchema);
