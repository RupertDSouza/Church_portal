const express = require("express");
const obituaryModel = require("../models/mongodb/obituaryModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/obituary",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = obituaryModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
