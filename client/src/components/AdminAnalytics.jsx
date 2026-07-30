import { useState } from "react";
import { addAnalytics } from "../services/adminAnalyticsApi";

function AdminAnalytics() {
  const [form, setForm] = useState({
    crowdDensity: 70,
    parkingOccupied: 140,
    parkingCapacity: 200,
    temperature: 29,
    securityAlerts: 1,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async () => {
    try {
      await addAnalytics(form);

      alert("✅ Analytics Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Update Failed");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
        marginTop: 20,
      }}
    >
      <h2>📈 Update Analytics</h2>

      <input
        type="number"
        name="crowdDensity"
        placeholder="Crowd Density"
        value={form.crowdDensity}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="parkingOccupied"
        placeholder="Parking Occupied"
        value={form.parkingOccupied}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="parkingCapacity"
        placeholder="Parking Capacity"
        value={form.parkingCapacity}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="temperature"
        placeholder="Temperature"
        value={form.temperature}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="securityAlerts"
        placeholder="Security Alerts"
        value={form.securityAlerts}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Update Analytics
      </button>
    </div>
  );
}

export default AdminAnalytics;