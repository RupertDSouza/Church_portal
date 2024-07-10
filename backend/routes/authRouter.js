const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const initializeRepo = require("../middleware/repoMiddleware");
const userModel = require("../models/userModel");

router.use(
  "/login",
  (req, res, next) => {
    req.model = userModel;
    next();
  },
  initializeRepo,
  authController
);

module.exports = router;
