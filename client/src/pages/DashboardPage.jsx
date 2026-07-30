import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "25px",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >
        <Dashboard />
      </div>
    </>
  );
}

export default DashboardPage;