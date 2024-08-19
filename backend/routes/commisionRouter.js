const express = require("express");
const commissionModel = require("../models/mongodb/commissionModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/commission",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = commissionModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
