const inforouter = require("./infoRouter");
const wardrouter = require("./wardRouter");
const express = require("express");
const router = express.Router();

router.use(inforouter);
router.use(wardrouter);

module.exports = router;
