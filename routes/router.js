const express = require("express");
const router = express.Router();
const manageController = require("../controller/manageController");

// const app = express();

router.get("/get", manageController.getController);
router.post("/post", manageController.postController);

module.exports = router;
