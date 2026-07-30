import { useState } from "react";
import { updateDashboard } from "../services/adminApi";

function AdminPage() {
  const [form, setForm] = useState({
    crowdDensity: 70,
    parkingOccupied: 145,
    parkingCapacity: 200,
    temperature: 29,
    securityAlerts: 2,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSave = async () => {
    try {
      await updateDashboard(form);
      alert("Dashboard Updated Successfully!");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🛠 Admin Dashboard</h2>

      <input
        name="crowdDensity"
        value={form.crowdDensity}
        onChange={handleChange}
        placeholder="Crowd Density"
      />

      <br /><br />

      <input
        name="parkingOccupied"
        value={form.parkingOccupied}
        onChange={handleChange}
        placeholder="Parking Occupied"
      />

      <br /><br />

      <input
        name="parkingCapacity"
        value={form.parkingCapacity}
        onChange={handleChange}
        placeholder="Parking Capacity"
      />

      <br /><br />

      <input
        name="temperature"
        value={form.temperature}
        onChange={handleChange}
        placeholder="Temperature"
      />

      <br /><br />

      <input
        name="securityAlerts"
        value={form.securityAlerts}
        onChange={handleChange}
        placeholder="Security Alerts"
      />

      <br /><br />

      <button onClick={handleSave}>
        Update Dashboard
      </button>
    </div>
  );
}

export default AdminPage;