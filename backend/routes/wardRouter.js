const express = require("express");
const wardModel = require("../models/mongodb/wardModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/ward",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = wardModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
