const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: 'lms_schema',
    password: 'Baitulong1@',
});
const db = pool.promise();

module.exports.db = db;