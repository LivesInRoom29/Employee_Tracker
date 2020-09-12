const inquirer = require("inquirer");

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

module.exports = questTask;