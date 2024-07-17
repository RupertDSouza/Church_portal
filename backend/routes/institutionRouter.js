const express = require("express");
const institutionModel = require("../models/mongodb/institutionModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/institution",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = institutionModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
