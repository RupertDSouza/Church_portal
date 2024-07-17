const express = require("express");
const paymentModel = require("../models/sequelize/paymentModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/payment",
  (req, res, next) => {
    req.access = ["admin", "priest"];
    req.model = paymentModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
