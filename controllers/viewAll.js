const connection = require('../config/db.js');
const cTablle = require('console.table');

// View all Departments
const viewAll = (table) => {
    const queryAll = `SELECT * FROM ${table}`;
    //const queryAll = "SELECT * FROM ?"; //Is this possible?

    connection.query(queryAll, { table }, function(err, res) {
        if (err) throw err;
        console.table('\n', res);
        // re-prompt the user for if they want to bid or post
        askTask(); //can't access this function**
    });
}

module.exports = { viewAll }