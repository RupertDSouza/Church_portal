const express = require("express");
const controller = require("../controller/crudController");
const contactModel = require("../models/mongodb/contactModel");
const router = express.Router();

router.use(
  "/contact",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = contactModel;
    next();
  },
  controller
);
module.exports = router;
