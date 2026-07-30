import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportReport({ analytics }) {

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("StadiumSense AI Analytics Report", 14, 20);

    autoTable(doc, {
      startY: 30,

      head: [[
        "Time",
        "Crowd %",
        "Parking",
        "Temperature",
        "Alerts"
      ]],

      body: analytics.map(item => [

        item.time,

        item.crowd,

        item.parking,

        item.temperature,

        item.alerts

      ])
    });

    doc.save("Analytics_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      style={{
        padding: "10px 20px",
        marginBottom: "20px",
        cursor: "pointer"
      }}
    >
      📄 Export PDF
    </button>
  );
}

export default ExportReport;