function submitRequest() {

const studentName =
    document.getElementById("studentName").value;

const gradeSection =
    document.getElementById("gradeSection").value;

const documentUrl =
    document.getElementById("documentUrl").value;

const documentFile =
document.getElementById("documentFile").files[0];

const printType =
    document.getElementById("printType").value;

const copies =
    document.getElementById("copies").value;

const notes =
    document.getElementById("notes").value;

    if (studentName === "" || gradeSection === "") {

    alert("Please enter your name and section.");
    return;

}

if (printType === "") {

    alert("Please select a print type.");
    return;

}

if (!documentFile && documentUrl === "") {

    alert("Please upload a document or provide a document URL.");
    return;

}

   const printRequest = {
   id: "PRINT-" + Date.now(),
   studentName,
   gradeSection,
   documentUrl,

   fileName:
      documentFile
         ? documentFile.name
         : "No File Uploaded",

   printType,
   copies,
   notes,
   status: "Pending"
};

   let requests =
      JSON.parse(localStorage.getItem("printRequests")) || [];

   requests.push(printRequest);

   localStorage.setItem(
      "printRequests",
      JSON.stringify(requests)
   );

   document.getElementById("success-message").innerHTML = `
    ✅ Print request submitted successfully!

    <br><br>

    <strong>Your Tracking ID:</strong>

    <br>

    ${printRequest.id}

    <br><br>

    ⚠️ Save this Order ID to track your order.

    <br><br>

    <a href="index.html" class="home-btn">
        🏠 Back to Homepage
    </a>
`;
}