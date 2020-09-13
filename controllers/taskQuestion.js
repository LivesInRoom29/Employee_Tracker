const inquirer = require("inquirer");

const questTask = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do with your database?',
        choices: [
            new inquirer.Separator('=== VIEW INFO ==='),
            'view all employees',
            'view employees by manager',
            'view all roles',
            'view all departments',
            'view all managers',
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

module.exports = questTask;