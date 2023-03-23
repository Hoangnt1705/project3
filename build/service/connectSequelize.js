"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
});
module.exports = {
  sequelize: sequelize,
  DataTypes: DataTypes
};