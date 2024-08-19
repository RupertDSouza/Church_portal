const express = require("express");
const commissionMemberModel = require("../models/mongodb/commissionMemberModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/commissionMember",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = commissionMemberModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
