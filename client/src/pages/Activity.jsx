import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/activity");
      setActivities(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h2>📜 Activity Log</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr key={item._id}>
                <td>
                  {new Date(item.createdAt).toLocaleString()}
                </td>

                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Activity;