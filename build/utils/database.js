"use strict";

var mysql = require('mysql2');
require('dotenv').config();
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: 'lms_schema',
  password: 'Baitulong1@'
});
console.log(process.env.DB_HOST);
var db = pool.promise();
module.exports.db = db;