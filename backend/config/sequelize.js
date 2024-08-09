// config/sequelize.js
// config/sequelize.js
const { Sequelize } = require("sequelize");
const pg = require("pg"); // Add this line to import pg

const connectionString = process.env.POSTGRESQL_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectModule: pg, // Add this line to explicitly use pg
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
// const config = require("./config")[process.env.NODE_ENV || "development"];

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect,
//   }
// );

// module.exports = sequelize;
