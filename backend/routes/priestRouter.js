const express = require("express");
const priestModel = require("../models/mongodb/priestModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/priest",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = priestModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
