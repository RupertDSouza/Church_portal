const express = require("express");
const newsModel = require("../models/mongodb/newsModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/news",
  (req, res, next) => {
    req.access = ["admin", "priest"];
    console.log(req.access);
    req.model = newsModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
