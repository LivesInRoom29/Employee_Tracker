const inquirer = require('inquirer');
const connection = require('../config/db.js');
//const { questAddRole } = require('../questions') DIDN"T WORK (need allDepts)

const { askTask } = require('./initialAsk');

const { setAllDepts } = require('../getAll');

// Add a new employee to the db
const addRole = () => {
    Promise.all([ setAllDepts() ])
    .then((values) => {
        //console.log(values)
        const allDepts = values[0];
        return allDepts
    })
    .then((allDepts) =>
        //allManagers.push({name: 'NULL', value: 'NULL'}),
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the title of the role?",
                //when: (answers) => answers.toAdd === 'Role',
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary for this role?",
                //when: (answers) => answers.toAdd === 'Role',
            },
            {
                type: 'list',
                name: 'deptId',
                message: "What is the department of this role?",
                // Use options from departments table
                choices: allDepts
                //when: (answers) => answers.toAdd === 'Role',
            }
        ]))
        .then((answers) => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: Number(answers.deptId),
                },
                function(err) {
                    if (err) throw err;
                    console.log("The role was added successfully!");
                    // re-prompt the user for if they want to bid or post
                    askTask(); //can't access this function**
                }
            );
        }
    ).catch((err) => console.log(err));
}

module.exports = { addRole }