const mysql = require('mysql');
const inquirer = require('inquirer');

const questions = require('./questions');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
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
};

const addToDb = () => {
    const toAdd = answers.toAdd;
    if (toAdd === 'Employee') {
        addEmployee(answers);
    } else if (toAdd === 'Role') {
        addRole(answers);
    } else {
        console.log('add dept');
    }
};

const addEmployee = (answers) => {
    connection.query(
        "INSERT INTO employees SET ?",
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
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
}