const express = require("express");
const controller = require("../controller/crudController");
const wardModel = require("../models/mongodb/wardModel");
const router = express.Router();

router.use(
  "/ward",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = wardModel;
    next();
  },
  controller
);

module.exports = router;
