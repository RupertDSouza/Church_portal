const express = require("express");
const contoller = require("../controller/crudController");
const manageModel = require("../models/indexModel");
const router = express.Router();

router.use(
  "/user",
  (req, res, next) => {
    req.model = manageModel;
    next();
  },
  contoller
);

router.use(
  "/admin",
  (req, res, next) => {
    req.model = manageModel;
    next();
  },
  contoller
);

module.exports = router;
