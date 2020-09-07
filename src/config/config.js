// From tutorial: https://medium.com/@johnkolo/how-to-run-multiple-sql-queries-directly-from-an-sql-file-in-node-js-part-1-dce1e6dd2def

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "EmployeeTracker_DB",
    // Allows us to run multiple SQL statements at a time
    multipleStatements: true
});

module.exports = db;