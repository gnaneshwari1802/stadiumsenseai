import { useEffect, useState } from "react";
import axios from "axios";

function Insights() {
  const [insight, setInsight] = useState("Loading AI insights...");

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const dashboard = await axios.get("http://localhost:5000/api/dashboard");

      const prompt = `
Crowd Density: ${dashboard.data.data.crowdDensity}%
Parking: ${dashboard.data.data.parkingOccupied}/${dashboard.data.data.parkingCapacity}
Temperature: ${dashboard.data.data.temperature}°C
Security Alerts: ${dashboard.data.data.securityAlerts}

Give 3 recommendations for stadium management.
`;

      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: prompt,
        }
      );

      setInsight(response.data.data.answer);
    } catch (err) {
      console.log(err);
      setInsight("Unable to load AI insights.");
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        padding: 20,
        background: "#fff7e6",
        borderRadius: 10,
      }}
    >
      <h2>🧠 AI Insights</h2>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {insight}
      </pre>
    </div>
  );
}

export default Insights;