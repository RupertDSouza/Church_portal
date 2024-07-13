const express = require("express");
const controller = require("../controller/crudController");
const studentModel = require("../models/sequelize/studentModel");
const router = express.Router();

router.use(
  "/student",
  (req, res, next) => {
    req.model = studentModel;
    next();
  },
  controller
);

module.exports = router;
