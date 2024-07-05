const express = require("express");
const controller = require("../controller/crudController");
const manageModel = require("../models/indexModel");
const initializeRepo = require("../middleware/repoMiddleware");
const router = express.Router();

router.use(
  "/user",
  (req, res, next) => {
    req.model = manageModel;
    next();
  },
  initializeRepo,
  controller
);

router.use(
  "/admin",
  (req, res, next) => {
    req.model = manageModel;
    next();
  },
  controller
);

module.exports = router;
