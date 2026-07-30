const notificationService = require("../services/notificationService");
const { broadcast } = require("../socket");

async function getNotifications(req, res) {
  try {
    res.json({ success: true, data: await notificationService.latest() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createNotification(data) {
  const notification = await notificationService.create(data.type, data.title, data.message, data.priority);
  broadcast("notification", notification);
  return notification;
}

async function markNotificationRead(req, res) {
  try {
    const notification = await notificationService.markRead(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { createNotification, getNotifications, markNotificationRead };
