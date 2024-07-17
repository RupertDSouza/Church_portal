const express = require("express");
const parishcouncilModel = require("../models/mongodb/parishcouncilModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/parishcouncil",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = parishcouncilModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
