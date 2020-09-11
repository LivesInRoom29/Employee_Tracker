const inquirer = require('inquirer');
const connection = require('../config/db.js');

const { askTask } = require('../app');
console.log('in empl asktask: ', askTask)

const { setAllEmp, setAllRoles, setAllDepts, setAllManagers } = require('../getAll');

// Add a new employee to the db
const addEmployee = () => {
    Promise.all([setAllEmp(), setAllRoles(), setAllDepts(), setAllManagers()])
    .then((values) => {
        //console.log(values)
        const allEmployees = values[0];
        const allRoles = values[1];
        const allDepts = values[2];
        const allManagers = values[3];
        //console.log('All employees:', allEmployees, 'All roles:', allRoles, 'All depts:', allDepts, 'all managers:', allManagers);
        return [allEmployees, allRoles, allDepts, allManagers]
    })
    .then(([ allEmployees, allRoles, allDepts, allManagers ]) =>
        //allManagers.push({name: 'NULL', value: 'NULL'}),
        inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            //when: (answers) => answers.toAdd === 'Employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            //when: (answers) => answers.toAdd === 'Employee'
        },
        {
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: allRoles,
            //when: (answers) => answers.toAdd === 'Employee'
        },
        {
            type: 'list',
            name: 'managerOrNo',
            message: "Does the employee have a manager?",
            choices: ['yes', 'no'],
            //when: (answers) => answers.toAdd === 'Employee',
        },
        {
            type: 'list',
            name: 'managerId',
            message: "Who is the employee's manager?",
            choices: allManagers,
            when: (answers) => answers.managerOrNo === 'yes',
            //when: (answers) => answers.toAdd === 'Employee',
            // need to add null to the options here**
        }
    ])).then((answers) => {
        if (answers.ManagerOrNo) {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    employee_firstname: answers.firstName,
                    employee_lastname: answers.lastName,
                    role_id: Number(answers.roleId),
                    manager_id: Number(answers.managerId) //|| DEFAULT??
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your employee was added successfully!");
                    // re-prompt the user for the next task (or to exit)
                    askTask();
                }
            );
        } else {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    employee_firstname: answers.firstName,
                    employee_lastname: answers.lastName,
                    role_id: Number(answers.roleId),
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your employee was added successfully!");
                    // re-prompt the user for the next task (or to exit)
                    askTask();
                }
            );
        }

    }).catch((err) => console.log(err));
}

module.exports = { addEmployee }