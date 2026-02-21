const express = require("express");
const priestMessageModel = require("../models/mongodb/priestMessageModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/priestMessage",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = priestMessageModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
