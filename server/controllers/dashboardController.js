const { getDashboard, updateDashboard } = require("../services/dashboardService");
const { broadcast } = require("../socket");

async function getDashboardController(req, res) {
  try {
    res.json({ success: true, data: await getDashboard() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateDashboardController(req, res) {
  try {
    const dashboard = await updateDashboard(req.body);
    broadcast("dashboardUpdate", dashboard);
    res.json({ success: true, data: dashboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getDashboard: getDashboardController, updateDashboard: updateDashboardController };
