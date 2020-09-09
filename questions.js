const inquirer = require("inquirer");
const { allEmployees, allRoles, allDepts, allManagers } = require('./getAll');
console.log('qest all employees', allEmployees);
const questTask = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do with your database?',
        choices: [
            new inquirer.Separator('=== VIEW INFO ==='),
            'view employees',
            'view roles',
            'view departments',
            'view managers',
            new inquirer.Separator('=== ADD NEW INFO ==='),
            'add employee',
            'add role',
            'add department',
            'add manager',
            new inquirer.Separator('=== UPDATE INFO ==='),
            'update employee',
            new inquirer.Separator('=== DELETE INFO ==='),
            'delete employee',
            'delete role',
            'delete department',
            new inquirer.Separator('=== EXIT ==='),
            'exit application'
        ]
    }
];

// To ADD new EMPLOYEE:
const questAddEmpl = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        when: (answers) => answers.toAdd === 'Employee'
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        when: (answers) => answers.toAdd === 'Employee'
    },
    {
        type: 'input',
        name: 'roleId',
        message: "What is the employee's role?",
        // choices: ,
        when: (answers) => answers.toAdd === 'Employee'
    },
    {
        type: 'input',
        name: 'managerId',
        message: "What is the id of the employee's manager? (leave blank if no manager)",
        default: null,
        // Use options from Managers table
        when: (answers) => answers.toAdd === 'Employee',
    }
];

// To ADD new ROLE
const questAddRole = [
    {
        type: 'input',
        name: 'title',
        message: "What is the title of the role?",
        when: (answers) => answers.toAdd === 'Role',
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the salary for this role?",
        when: (answers) => answers.toAdd === 'Role',
    },
    {
        type: 'input',
        name: 'deptId',
        message: "What is the department ID for this role?",
        // Use options from departments table
        when: (answers) => answers.toAdd === 'Role',
    }
];

// To add new DEPARTMENT
const questAddDept = [
    {
        type: 'input',
        name: 'deptName',
        message: "What is the name of the department?",
        when: (answers) => answers.toAdd === 'Department',
    }
];

module.exports = { questTask, questAddEmpl, questAddRole, questAddDept };