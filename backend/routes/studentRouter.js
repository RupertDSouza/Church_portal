const express = require("express");
const studentModel = require("../models/sequelize/studentModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/student",
  (req, res, next) => {
    req.access = ["admin", "priest"];
    req.model = studentModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
