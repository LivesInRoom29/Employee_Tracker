const inquirer = require('inquirer');
const { addEmployee } = require('./controllers/employees.js');
const {addRole } = require('./controllers/roles.js');
const { questTask } = require('./questions');

//const { askTask } = await require('./controllers/initialAsk');

const askTask = () => {
    inquirer
        .prompt(questTask)
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


// const init = () => {
//     askTask();
// }

// init();

askTask();

module.exports = { askTask };