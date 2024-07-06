const express = require("express");
const controller = require("../controller/crudController");
const wardModel = require("../models/wardModel");
const router = express.Router();

router.use(
  "/ward",
  (req, res, next) => {
    req.model = wardModel;
    next();
  },
  controller
);

module.exports = router;
