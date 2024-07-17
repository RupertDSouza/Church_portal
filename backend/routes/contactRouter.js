const express = require("express");
const contactModel = require("../models/mongodb/contactModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/contact",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = contactModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
