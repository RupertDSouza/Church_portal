const express = require("express");
const readingsModel = require("../models/mongodb/readingsModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/mass",
  (req, res, next) => {
    req.access = ["admin", "priest"];
    req.model = readingsModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
