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
};

const addToDb = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'toAdd',
            message: "What would you like to add?",
            choices: [
                "Employee",
                "Role",
                "Department"
            ]
        }
    ]).then(answers => {
        const toAdd = answers.toAdd;
        if (toAdd === 'Employee') {
            addEmployee();
        } else if (toAdd === 'Role') {
            addRole();
        } else {
            console.log('add dept');
        }
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'roleId',
            message: "What is the employee's role id?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the id of the employee's manager? (leave blank if no manager)",
            default: null
        }
    ]).then(answers => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: Number(answers.roleId),
              manager_id: Number(answers.managerId)
            },
            function(err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              // re-prompt the user for if they want to bid or post
              askTask();
            }
          );
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the title of the role?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?"
        },
        {
            type: 'input',
            name: 'deptId',
            message: "What is the department ID for this role?"
        },
    ]).then(answers => {
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
    })
}