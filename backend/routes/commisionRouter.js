const express = require("express");
const commisionModel = require("../models/mongodb/commisionModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/commision",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = commisionModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
