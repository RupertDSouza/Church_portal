const express = require("express");
const multer = require("multer");
const userModel = require("../models/mongodb/userModel");
const initializeRepo = require("../middleware/repoMiddleware");
const authController = require("../controller/authController");

const router = express.Router();
const upload = multer();

router.post(
  "/login",
  (req, res, next) => {
    req.model = userModel;
    next();
  },
  upload.none(),
  initializeRepo,
  authController.login
);

module.exports = router;
