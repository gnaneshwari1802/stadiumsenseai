const axios = require("axios");
const Dashboard = require("../models/Dashboard");

exports.generateInsight = async (req, res) => {

    try {

        const dashboard = await Dashboard.findOne();

        const prompt = `
Analyze this stadium data.

Crowd Density: ${dashboard.crowdDensity}%

Parking: ${dashboard.parkingOccupied}/${dashboard.parkingCapacity}

Temperature: ${dashboard.temperature}°C

Security Alerts: ${dashboard.securityAlerts}

Provide short operational recommendations.
`;

        const response = await axios.post(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

{

contents:[{

parts:[{

text:prompt

}]

}]

}

);

const insight=

response.data.candidates[0]

.content.parts[0].text;

res.json({

success:true,

insight

});

    }

    catch(err){

res.status(500).json({

success:false,

message:err.message

});

    }

};
