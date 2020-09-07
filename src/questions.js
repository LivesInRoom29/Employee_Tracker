const getAll = require('../getAll.js');
const db = require('./app.js');


const questions = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do with your database?',
        choices: [
            'view information',
            'add new information',
            'delete existing information',
            'update employee information',
            'exit application'
        ]
    },
    {
        type: 'list',
        name: 'toAdd',
        message: "What would you like to add?",
        choices: [
            'Employee',
            'Role',
            'Department'
        ],
        when: (answers) => answers.task === 'add new information'
    },
    {
        type: 'list',
        name: 'toUpdate',
        message: "What would you like to delete?",
        choices: [
            'Employee',
            'Role',
            'Department'
        ],
        when: (answers) => answers.task === 'delete existing information'
    },
    {
        type: 'list',
        name: 'toView',
        message: "What type of information would you like to view?",
        choices: [
            'Employee',
            'Role',
            'Department'
        ],
        when: (answers) => answers.task === 'view information'
    },

    // To ADD new EMPLOYEE:
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
        type: 'list',
        name: 'roleId',
        message: "What is the employee's role?",
        choices: function() { getAll('roles') },
        when: (answers) => answers.toAdd === 'Employee'
    },
    {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager? (leave blank if no manager)",
        default: null,
        choices: function() { getAll('managers') },
        // Use options from Managers table
        when: (answers) => answers.toAdd === 'Employee',
    },
    // To ADD new ROLE:
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
    },
    // To add new DEPARTMENT
    {
        type: 'input',
        name: 'deptName',
        message: "What is the name of the department?",
        when: (answers) => answers.toAdd === 'Department',
    },
]

module.exports = questions;