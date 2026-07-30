import { useEffect, useState } from "react";
import axios from "axios";
import AdminAnalytics from "../components/AdminAnalytics";

function AdminDashboard() {
  const [form, setForm] = useState({
    crowdDensity: "",
    parkingOccupied: "",
    parkingCapacity: "",
    temperature: "",
    securityAlerts: "",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res = await axios.get("http://localhost:5000/api/dashboard");
    setForm(res.data.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSave = async () => {
    await axios.put(
      "http://localhost:5000/api/dashboard",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Dashboard Updated Successfully");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>⚙ Admin Dashboard</h1>

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
        Save Changes
      </button>
    </div>
  );
}

export default AdminDashboard;