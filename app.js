const mysql = require('mysql');
const inquirer = require('inquirer');

const questions = require('./questions');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Yarrow017!ms",
    database: "EmployeeTracker"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the askTask function after the connection is made to prompt the user
    askTask();
});

const askTask = () => {
    inquirer.prompt(questions)
        .then(answers => {
            const task = answers.task;
            if (task === 'view information') {
                console.log('view info');
            } else if (task === 'add new information') {
                addToDb();
            } else if (task === 'update existing information') {
                console.log('update');
            } else {
                process.exit();
            }
        });
}