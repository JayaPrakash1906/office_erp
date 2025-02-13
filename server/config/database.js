const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database Name
  process.env.DB_USER,  // Database User
  process.env.DB_PASS,  // Database Password
  {
    host: process.env.DB_HOST,  // Database Host
    dialect: "postgres",  // Using PostgreSQL
  }
);

module.exports = sequelize;
