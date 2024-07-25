const express = require("express");
const galleryModel = require("../models/mongodb/galleryModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/mass",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = galleryModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
