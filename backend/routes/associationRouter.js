const express = require("express");
const controller = require("../controller/crudController");
const associationModel = require("../models/associationModel");
const router = express.Router();

router.use(
  "/association",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = associationModel;
    next();
  },
  controller
);

module.exports = router;
