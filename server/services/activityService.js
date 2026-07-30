const Activity = require("../models/Activity");

async function log(action, description, options = {}) {
  return Activity.create({
    action,
    description,
    type: options.type || "system",
    priority: options.priority || "normal",
    user: options.user || "System",
    data: options.data || {},
  });
}

async function latest(limit = 20) {
  return Activity.find().sort({ createdAt: -1 }).limit(limit);
}

module.exports = { latest, log };
