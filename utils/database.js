const mysql = require("mysql2");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "lms_schema",
    password: "Baitulong1@",
});
const db = pool.promise();

module.exports.db = db;