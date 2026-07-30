const Notification = require("../models/Notification");

async function create(type, title, message, priority = "medium") {
  return Notification.create({ type, title, message, priority });
}

async function latest(limit = 20) {
  return Notification.find().sort({ createdAt: -1 }).limit(limit);
}

async function markRead(id) {
  return Notification.findByIdAndUpdate(id, { read: true }, { new: true });
}

module.exports = { create, latest, markRead };
