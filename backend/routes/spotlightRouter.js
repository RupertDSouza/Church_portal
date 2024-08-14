const express = require("express");
const spotlightModel = require("../models/mongodb/spotlightModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/spotlight",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = spotlightModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
