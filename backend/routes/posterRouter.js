const express = require("express");
const posterModel = require("../models/mongodb/posterModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/mass",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = posterModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
