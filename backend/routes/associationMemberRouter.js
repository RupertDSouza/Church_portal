const express = require("express");
const associatonMemberModel = require("../models/mongodb/associatonMemberModel");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const router = express.Router();

router.use(
  "/associatonMember",
  (req, res, next) => {
    req.access = ["admin"];
    req.model = associatonMemberModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;
