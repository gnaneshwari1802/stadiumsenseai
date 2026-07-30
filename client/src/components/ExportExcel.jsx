import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportExcel({ analytics }) {

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(analytics);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Analytics"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(data, "Analytics_Report.xlsx");
  };

  return (

    <button
      onClick={exportExcel}
      style={{
        padding: "10px 20px",
        marginLeft: "15px",
        cursor: "pointer"
      }}
    >
      📊 Export Excel
    </button>

  );
}

export default ExportExcel;