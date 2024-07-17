const express = require("express");
const userModel = require("../models/mongodb/userModel");
const initializeRepo = require("../middleware/repoMiddleware");
const authController = require("../controller/authController");
const router = express.Router();

router.post(
  "/login",
  (req, res, next) => {
    req.model = userModel;
    next();
  },
  initializeRepo,
  authController.login
);

module.exports = router;
