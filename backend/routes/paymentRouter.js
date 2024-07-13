const express = require("express");
const controller = require("../controller/crudController");
const paymentModel = require("../models/sequelize/paymentModel");
const router = express.Router();

router.use(
  "/payment",
  (req, res, next) => {
    req.model = paymentModel;
    next();
  },
  controller
);

module.exports = router;
