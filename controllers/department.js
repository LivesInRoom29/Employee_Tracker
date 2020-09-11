const inquirer = require('inquirer');
const connection = require('../config/db.js');
//const { questAddRole } = require('../questions') DIDN"T WORK (need allDepts)

const { askTask } = require('./initialAsk');

// Add a new employee to the db
const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: "What is the name of the department?",
        }
    ])
    .then((answers) => {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                dept_name: answers.deptName,
            },
            function(err) {
                if (err) throw err;
                console.log("The department was added successfully!");
                // re-prompt the user for if they want to bid or post
                askTask(); //can't access this function**
            }
        );
    });
}

module.exports = { addDept }