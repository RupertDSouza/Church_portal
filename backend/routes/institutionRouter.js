const express = require("express");
const controller = require("../controller/crudController");
const institutionModel = require("../models/institutionModel");
const router = express.Router();

router.use(
  "/institution",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = institutionModel;
    next();
  },
  controller
);
module.exports = router;
