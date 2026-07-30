import { useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [form, setForm] = useState({
    crowdDensity: "",
    parkingOccupied: "",
    parkingCapacity: "",
    temperature: "",
    securityAlerts: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:5000/api/dashboard", form);

      alert("Dashboard Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <h2>⚙ Admin Panel</h2>

      <input
        name="crowdDensity"
        placeholder="Crowd Density"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="parkingOccupied"
        placeholder="Parking Occupied"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="parkingCapacity"
        placeholder="Parking Capacity"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="temperature"
        placeholder="Temperature"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="securityAlerts"
        placeholder="Security Alerts"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        Save Dashboard
      </button>
    </div>
  );
}

export default AdminPanel;