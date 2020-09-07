const inquirer = require('inquirer');
const questions = require('./questions');

//From https://medium.com/@johnkolo/how-to-run-multiple-sql-queries-directly-from-an-sql-file-in-node-js-part-1-dce1e6dd2def

// databse connection
const db = require('./config/config');

// Connect to the db once the app is started
db.connect((err) => {
    if (err) throw err;
    console.log('connected to db');
    askTask();
});

// make the connection global:
global.db = db;

// To keep the connection alive, make frequent queries to SQL db
setInterval(function() {
    db.query('SELECT 1');
}, 5000);

const askTask = () => {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const task = answers.task;
            if (task === 'view information') {
                console.log('view info');
            } else if (task === 'add new information') {
                addToDb(answers);
            } else if (task === 'update existing information') {
                console.log('update');
            } else {
                process.exit();
            }
        });
};

module.exports = db;