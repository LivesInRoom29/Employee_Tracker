const inquirer = require('inquirer');

const { questTask } = require('./questions');
const { viewAll } = require('./controllers/viewAll')
const { addEmployee } = require('./controllers/addEmployees.js');
const { addRole } = require('./controllers/addRoles.js');
const { addDept } = require('./controllers/addDepartment.js');
const { updateEmployee } = require('./controllers/updateEmployee');


//const { askTask } = await require('./controllers/initialAsk');

const askTask = () => {
    inquirer
        .prompt(questTask)
        .then((answers) => {
            const task = answers.task;
            if (task === 'view employees') {
                viewAll('employees');
            } else if (task === 'view roles') {
                viewAll('roles');
            } else if (task === 'view departments') {
                viewAll('departments');
            } else if (task === 'view managers') {
                console.log('view managers');
            } else if (task === 'add employee') {
                addEmployee();
            } else if (task === 'add role') {
                addRole();
            } else if (task === 'add department') {
                addDept();
            } else if (task === 'update employee') {
                updateEmployee();
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