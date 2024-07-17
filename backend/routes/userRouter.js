const express = require("express");
const userModel = require("../models/mongodb/userModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/user",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = userModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
