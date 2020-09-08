const mysql = require('mysql');
const inquirer = require('inquirer');
const questions = require('./questions');

// // create the connection information for the sql database
// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root1234",
//     database: "EmployeeTracker_DB"
// });

const connection = require('./db.js');
const { getAllEmployees, getAllRoles, getAllDepts } = require('./getAll');

// //====================
// // connect to the mysql server and sql database
// connection.connect(function (err) {
//     if (err) throw err;
//     // run the askTask function after the connection is made to prompt the user
//     askTask();
// });
const allEmployees = getAllEmployees();

const askTask = () => {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const task = answers.task;
            if (task === 'view employees') {
                console.log('view employees');
            } else if (task === 'view roles') {
                console.log('view roles');
            } else if (task === 'view departments') {
                console.log('view departments');
            } else if (task === 'view managers') {
                console.log('view managers');
            } else if (task === 'add employee') {
                addEmployee();
            } else if (task === 'add role') {
                addRole();
            } else if (task === 'add department') {
                console.log('add department');
            } else if (task === 'add manager') {
                console.log('add manager');
            } else if (task === 'update employee') {
                console.log('update employee');
            } else if (task === 'delete  employee') {
                console.log('delete  employee');
            } else if (task === 'delete  role') {
                console.log('delete  role');
            } else if (task === 'delete  department') {
                console.log('delete  department');
            } else {
                process.exit();
            }
        });
};

const addEmployee = (answers) => {
    connection.query(
        "INSERT INTO employees SET ?",
        {
            employee_firstname: answers.firstName,
            employee_lastname: answers.lastName,
            role_id: Number(answers.roleId),
            manager_id: Number(answers.managerId)
        },
        function(err) {
            if (err) throw err;
            console.log("Your employee was added successfully!");
            // re-prompt the user for the next task (or to exit)
            askTask();
        }
    );
};

const addRole = (answers) => {
    connection.query(
        "INSERT INTO role SET ?",
        {
            title: answers.title,
            salary: answers.salary,
            department_id: Number(answers.deptId),
        },
        function(err) {
            if (err) throw err;
            console.log("The role was added successfully!");
            // re-prompt the user for if they want to bid or post
            askTask();
        }
    );
};


console.log(getAllEmployees());