const express = require("express");
const massModel = require("../models/mongodb/massModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/mass",
  (req, res, next) => {
    req.access = ["admin", "priest"];
    req.model = massModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
