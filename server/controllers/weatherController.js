const { getCurrentWeather } = require("../services/weatherService");

async function getWeather(req, res) {
  try {
    const data = await getCurrentWeather(req.query.city);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getWeather };
