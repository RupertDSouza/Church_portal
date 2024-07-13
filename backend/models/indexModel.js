const userModel = require("./mongodb/userModel");
const wardModel = require("./mongodb/wardModel");
const eventModel = require("./eventModel");
const associationModel = require("./mongodb/associationModel");
const newsModel = require("./mongodb/newsModel");
const studentModel = require("./sequelize/studentModel");
const paymentModel = require("./sequelize/paymentModel");

module.exports = {
  userModel,
  wardModel,
  eventModel,
  associationModel,
  newsModel,
  studentModel,
  paymentModel,
};
