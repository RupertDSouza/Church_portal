const express = require("express");
const controller = require("../controller/crudController");
const parishcouncilModel = require("../models/mongodb/parishcouncilModel");
const router = express.Router();

router.use(
  "/parishcouncil",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = parishcouncilModel;
    next();
  },
  controller
);
module.exports = router;
