const questions = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do with your database?',
        choices: [
            "view information",
            "add new information",
            "update existing information",
            "exit application"
        ]
    }
]

module.exports = questions;