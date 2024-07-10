const authrouter = require("./authRouter");
const inforouter = require("./infoRouter");
const wardrouter = require("./wardRouter");
const priestrouter = require("./priestRouter");
const associationrouter = require("./associationRouter");
const contactrouter = require("./contactRouter");
const newsrouter = require("./newsRouter");
const institutionrouter = require("./institutionRouter");
const obituaryrouter = require("./obituaryRouter");
const parishcouncilrouter = require("./parishcouncilRouter");
const userrouter = require("./userRouter");
const express = require("express");
const router = express.Router();

router.use(
  authrouter,
  inforouter,
  wardrouter,
  priestrouter,
  associationrouter,
  newsrouter,
  contactrouter,
  institutionrouter,
  obituaryrouter,
  parishcouncilrouter,
  userrouter
);

module.exports = router;
