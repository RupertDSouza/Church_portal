const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Create a transporter using SMTP
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let info = await transporter.sendMail({
      from: `"From Website"<${email}>`,
      to: process.env.TO_EMAIL,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;
