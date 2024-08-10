const authrouter = require("./authRouter");
const wardrouter = require("./wardRouter");
const priestrouter = require("./priestRouter");
const associationrouter = require("./associationRouter");
const newsrouter = require("./newsRouter");
const institutionrouter = require("./institutionRouter");
const obituaryrouter = require("./obituaryRouter");
const parishcouncilrouter = require("./parishcouncilRouter");
const studentrouter = require("./studentRouter");
const paymentrouter = require("./paymentRouter");
const userrouter = require("./userRouter");
const adminrouter = require("./adminRouter");
const massrouter = require("./massRouter");
const churchrouter = require("./churchRouter");
const documentrouter = require("./documentRouter");
const readingsrouter = require("./readingsRouter");
const posterrouter = require("./posterRouter");
const emailRouter = require("./emailRouter");
const express = require("express");
const router = express.Router();

router.use(
  authrouter,
  wardrouter,
  priestrouter,
  associationrouter,
  newsrouter,
  institutionrouter,
  obituaryrouter,
  parishcouncilrouter,
  userrouter,
  studentrouter,
  paymentrouter,
  adminrouter,
  massrouter,
  churchrouter,
  documentrouter,
  readingsrouter,
  posterrouter,
  emailRouter
);

module.exports = router;
