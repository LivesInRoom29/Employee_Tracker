const inquirer = require('inquirer');
const questTask= require('./controllers/taskQuestion');
const addEmployee = require('./controllers/addEmployees.js');
const addRole = require('./controllers/addRoles.js');
const addDept = require('./controllers/addDepartment.js');
const updateEmployee = require('./controllers/updateEmployee');
const viewByMng = require('./controllers/viewByMng')
const dal = require('./controllers/dal');
const queries = require('./db/queries.js');


// Ask the user what taks they'd like to complete. Depending on the task, different functions will be calledconst askTask = () => {
const askTask = () => {
    inquirer
        .prompt(questTask)
        .then((answers) => {
            const task = answers.task;
            if (task === 'view all employees') {
                dal.viewAll(queries.allEmployees).then((res) => askTask());
            } else if (task === 'view employees by manager') {
                viewByMng()
                .then((answers) => dal.viewAllBy(queries.allEmployeesByMng, 'm.id', answers.managerId))
                .then((res) => askTask());
            }else if (task === 'view all roles') {
                dal.viewAll(queries.allRoles).then((res) => askTask());
            } else if (task === 'view departments') {
                dal.viewAll(queries.allDepts).then((res) => askTask());
            } else if (task === 'view managers') {
                console.log('view managers');
            } else if (task === 'add employee') {
                addEmployee(askTask);
            } else if (task === 'add role') {
                addRole(askTask);
            } else if (task === 'add department') {
                addDept(askTask);
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

askTask();

module.exports = askTask;