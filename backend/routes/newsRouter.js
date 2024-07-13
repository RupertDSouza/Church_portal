const express = require("express");
const controller = require("../controller/crudController");
const newsModel = require("../models/mongodb/newsModel");
const router = express.Router();

router.use(
  "/news",
  (req, res, next) => {
    req.access = ["admin", "priest"];
    console.log(req.access);
    req.model = newsModel;
    next();
  },
  controller
);
module.exports = router;
