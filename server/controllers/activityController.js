const Activity = require("../models/Activity");

exports.getActivities = async (req, res) => {

    try {

        const activities = await Activity
            .find()
            .sort({ createdAt: -1 })
            .limit(30);

        res.json({

            success: true,

            data: activities

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};