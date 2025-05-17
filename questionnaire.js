function downloadResponses() {
    const form = document.getElementById("questionnaire");
    const data = new FormData(form);
    const headers = [];
    const values = [];
  
    for (let [key, value] of data.entries()) {
      headers.push(key);
      values.push('"' + value.replace(/"/g, '""') + '"'); // escape quotes
    }
  
    const csv = headers.join(",") + "\n" + values.join(",") + "\n";
  
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    const now = new Date().toISOString().replace(/[-:]/g, "").slice(0,15);
    a.href = url;
    a.download = `questionnaire_${now}.csv`;
    a.click();
  
    URL.revokeObjectURL(url);
  }
  