let uploadedImage = null;

document.getElementById("photo").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add a title
  doc.setFontSize(18);
  doc.text("Holy Spirit School", 105, 15, null, null, "center");

  doc.setFontSize(14);
  doc.text("Admission Form", 105, 25, null, null, "center");

  // Add a subtitle with the date
  doc.setFontSize(12);
  doc.text(
    "Application Date: " + new Date().toLocaleDateString(),
    105,
    30,
    null,
    null,
    "center"
  );

  // Add the photo
  if (uploadedImage) {
    doc.addImage(uploadedImage, "JPEG", 14, 30, 40, 40);
  }

  // Function to add a section of fields
  function addSection(title, fields, startY) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255); // Blue color for section titles
    doc.text(title, 14, startY);
    doc.setTextColor(0, 0, 0); // Reset to black for table content
    doc.setFontSize(12);

    const tableData = fields.map((field) => [
      field.label,
      document.getElementById(field.id).value,
    ]);

    doc.autoTable({
      startY: startY + 5,
      head: [["Field", "Value"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [200, 220, 255], textColor: 0 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: "auto" },
      },
      margin: { left: 14, right: 14 },
    });

    return doc.lastAutoTable.finalY;
  }

  // Personal Information
  let currentY = addSection(
    "Personal Information",
    [
      { label: "Name", id: "name" },
      { label: "Admission Class", id: "admissionClass" },
      { label: "Date of Birth", id: "dob" },
      { label: "Gender", id: "gender" },
      { label: "Mother Tongue", id: "mother_tongue" },
      { label: "Other Language", id: "other_language" },
      { label: "Number of Brothers", id: "no_of_brothers" },
      { label: "Number of Sisters", id: "no_of_sisters" },
    ],
    75
  ); // Start below the photo

  // Address Information
  currentY = addSection(
    "Address Information",
    [
      { label: "Address", id: "address" },
      { label: "City/Village/Town", id: "city_village_town" },
      { label: "Locality", id: "locality" },
      { label: "Pincode", id: "pincode" },
      { label: "District", id: "district" },
      { label: "Taluk", id: "taluk" },
    ],
    currentY + 15
  );

  // Identification Information
  currentY = addSection(
    "Identification Information",
    [
      { label: "Aadhar Number", id: "aadhar_number" },
      { label: "Religion", id: "religion" },
      { label: "Caste", id: "caste" },
      { label: "Social Category", id: "social_category" },
      { label: "Belong to BPL", id: "belong_to_bpl" },
      { label: "BPL Card Number", id: "bpl_card_number" },
      { label: "SATS Number", id: "sats_number" },
    ],
    currentY + 15
  );

  // Bank Information
  currentY = addSection(
    "Bank Information",
    [
      { label: "Bank Name", id: "bank_name" },
      { label: "Account Number", id: "account_number" },
      { label: "IFSC Code", id: "ifsc_code" },
    ],
    currentY + 15
  );

  // Add a new page if needed
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }

  // Parent Information
  currentY = addSection(
    "Parent Information",
    [
      { label: "Father's Name", id: "father_name" },
      { label: "Mother's Name", id: "mother_name" },
      { label: "Father's Aadhar Number", id: "father_aadhar_number" },
      { label: "Mother's Aadhar Number", id: "mother_aadhar_number" },
      { label: "Father's Qualification", id: "father_qualification" },
      { label: "Mother's Qualification", id: "mother_qualification" },
      { label: "Father's Occupation", id: "father_occupation" },
      { label: "Mother's Occupation", id: "mother_occupation" },
      { label: "Annual Income", id: "annual_income" },
      { label: "Number of Dependents", id: "no_of_dependents" },
      { label: "Father's Phone Number", id: "father_phone_number" },
      { label: "Mother's Phone Number", id: "mother_phone_number" },
    ],
    currentY + 15
  );

  // Previous School Information
  currentY = addSection(
    "Previous School Information",
    [
      {
        label: "Previous School Affiliation",
        id: "previous_school_affiliation",
      },
      {
        label: "Transfer Certificate Number",
        id: "transfer_certificate_number",
      },
      { label: "Transfer Certificate Date", id: "transfer_certificate_date" },
      { label: "Previous School Name", id: "previous_school_name" },
      { label: "Pincode of Previous School", id: "pincode_of_previous_school" },
      { label: "DISE Number", id: "dise_no" },
      { label: "Previous School District", id: "previous_school_district" },
      { label: "Previous School Taluk", id: "previous_school_taluk" },
      {
        label: "Previous School Village/City/Town",
        id: "previous_school_village_city_town",
      },
    ],
    currentY + 15
  );

  // Save the PDF
  doc.save("admission_application.pdf");
}

function showConfirmationPopup() {
  return new Promise((resolve) => {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.border = "1px solid black";
    popup.style.zIndex = "1000";

    popup.innerHTML = `
        <h2>Confirm Submission</h2>
        <p>Are you sure you want to submit this form?</p>
        <button id="confirmYes">Yes</button>
        <button id="confirmNo">No</button>
      `;

    document.body.appendChild(popup);

    document.getElementById("confirmYes").onclick = () => {
      document.body.removeChild(popup);
      resolve(true);
    };

    document.getElementById("confirmNo").onclick = () => {
      document.body.removeChild(popup);
      resolve(false);
    };
  });
}

async function performSubmit(e) {
  e.preventDefault();

  const confirmed = await showConfirmationPopup();

  if (confirmed) {
    // Gather form data
    const formData = new FormData(e.target);

    try {
      const response = await fetch("/app/student/admission", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        generatePDF();
        alert("Form submitted successfully!");
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  } else {
    alert("Form submission cancelled.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".comment_form");
  if (form) {
    form.addEventListener("submit", performSubmit);
  }
});
