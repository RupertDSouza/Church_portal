const express = require("express");
const controller = require("../controller/crudController");
const priestModel = require("../models/priestModel");
const router = express.Router();

router.use(
  "/priest",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = priestModel;
    next();
  },
  controller
);

module.exports = router;
