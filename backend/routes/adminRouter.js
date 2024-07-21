const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/admin", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/admin"));
});

module.exports = router;
