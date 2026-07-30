const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, default: "System" },
    action: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: "system" },
    priority: { type: String, default: "normal" },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
