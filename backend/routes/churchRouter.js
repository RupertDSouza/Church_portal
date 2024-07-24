const express = require("express");
const churchModel = require("../models/mongodb/churchModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/church",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = churchModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
