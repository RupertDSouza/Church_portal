document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact_form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.querySelector(".contacts_input_name").value;
    const email = document.querySelector(".contact_input_email").value;
    const message = document.querySelector("#contact_text_area").value;

    // Create data object
    const formData = {
      name: name,
      email: email,
      message: message,
    };

    // Send data to backend
    fetch("/app/send-email", {
      // Replace with your actual backend endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Email sent successfully!");
          form.reset(); // Clear the form
        } else {
          alert("Failed to send email. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  });
});
