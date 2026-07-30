const CROWD_HIGH_THRESHOLD = 80;
const CROWD_MODERATE_THRESHOLD = 60;
const PARKING_HIGH_THRESHOLD = 15;
const PARKING_MODERATE_THRESHOLD = 35;

function riskFor(value, moderateThreshold, highThreshold, inverse = false) {
  const isHigh = inverse ? value <= highThreshold : value >= highThreshold;
  const isModerate = inverse ? value <= moderateThreshold : value >= moderateThreshold;

  if (isHigh) return "high";
  if (isModerate) return "moderate";
  return "low";
}

function buildMessage({ crowdRisk, parkingRisk, securityAlerts, activeGate }) {
  const actions = [];

  if (crowdRisk === "high") actions.push(`Deploy stewards near ${activeGate}.`);
  else if (crowdRisk === "moderate") actions.push(`Monitor flows near ${activeGate}.`);

  if (parkingRisk === "high") actions.push("Open overflow parking and update visitor signage.");
  else if (parkingRisk === "moderate") actions.push("Prepare overflow parking guidance.");

  if (securityAlerts > 0) actions.push("Review active security alerts immediately.");
  if (!actions.length) actions.push("Normal operations can continue.");

  return actions.join(" ");
}

function predict({ crowdDensity = 0, parkingOccupied = 0, parkingCapacity = 1, securityAlerts = 0, activeGate = "the active gate" }) {
  const safeCapacity = Math.max(Number(parkingCapacity) || 1, 1);
  const parkingPercentage = Math.min(Math.max((Number(parkingOccupied) / safeCapacity) * 100, 0), 100);
  const projectedCrowd = Math.min(100, Math.round(Number(crowdDensity) + (crowdDensity >= 70 ? 8 : 3)));
  const projectedParking = Math.min(100, Math.round(parkingPercentage + (parkingPercentage >= 75 ? 6 : 2)));
  const crowdRisk = riskFor(projectedCrowd, CROWD_MODERATE_THRESHOLD, CROWD_HIGH_THRESHOLD);
  const parkingRisk = riskFor(projectedParking, 100 - PARKING_MODERATE_THRESHOLD, 100 - PARKING_HIGH_THRESHOLD);
  const congestionRisk = securityAlerts > 0 || crowdRisk === "high" || parkingRisk === "high"
    ? "high"
    : crowdRisk === "moderate" || parkingRisk === "moderate"
      ? "moderate"
      : "low";

  return {
    projectedCrowd,
    projectedParking,
    crowdRisk,
    parkingRisk,
    congestionRisk,
    message: buildMessage({ crowdRisk, parkingRisk, securityAlerts, activeGate }),
    generatedAt: new Date(),
  };
}

module.exports = { predict };
