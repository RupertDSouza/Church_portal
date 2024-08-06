const express = require("express");
const commisionMemberModel = require("../models/mongodb/commisionMemberModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/commisionMember",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = commisionMemberModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
