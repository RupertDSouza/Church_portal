const express = require("express");
const associationModel = require("../models/mongodb/associationModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/association",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = associationModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
