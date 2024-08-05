const express = require("express");
const documentModel = require("../models/mongodb/documentModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/document",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = documentModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
