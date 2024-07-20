const express = require("express");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.use(
  "/admin", auth,
  (req, res, next) => {
    req.access = ["admin"];
    req.model = userModel;
    next();
  },
  initializeRepo,
  crudRouter
);

module.exports = router;