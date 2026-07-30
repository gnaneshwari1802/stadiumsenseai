const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    title: String,

    message: String,

    type: {
        type: String,
        default: "info"
    },

    priority: {
        type: String,
        default: "medium"
    },

    read: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Notification", notificationSchema);