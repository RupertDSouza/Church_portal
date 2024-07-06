const express = require("express");
const controller = require("../controller/crudController");
const manageModel = require("../models/manageModel");
const router = express.Router();

router.use(
  "/user",
  (req, res, next) => {
    req.model = manageModel;
    next();
  },
  controller
);

module.exports = router;
