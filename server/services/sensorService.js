// Hackathon simulation: alerts follow explainable operating rules, not arbitrary values.
function evaluateOperations({ crowdDensity, parkingAvailable }) {
  let securityAlerts = 0;
  if (crowdDensity >= 72) securityAlerts += 1;
  if (crowdDensity >= 88) securityAlerts += 1;
  if (parkingAvailable <= 15) securityAlerts += 1;
  return { securityAlerts };
}

module.exports = { evaluateOperations };
