const util = require('util');
const connection = require('./config/db.js');
// Async/await use From https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql#:~:text=if%20you%20happen%20to%20be,()%20with%20the%20node%20mysql.&text=Any%20promise%20can%20be%20used,an%20async%20function%20%22wrapper%22.
const queryAsync = util.promisify(connection.query).bind(connection);

let allEmployees = [];
let allRoles = [];
let allDepts = [];
let allManagers = [];

const setAllEmp = async (value) => {
    try {
        const rows = await queryAsync("SELECT * FROM employees");
        return rows.map((employee) => ({ name: `${employee.employee_firstname} ${employee.employee_lastname}`, value: employee.id}));
    } catch {
        console.log('There was an error querying the databse to select all employees.');
    }
};

const setAllRoles = async () => {
    try {
        const rows = await queryAsync("SELECT * FROM roles");
        return rows.map((role) => ({name: role.title, value: role.id}));
    } catch {
        console.log(`Err at setAllRoles,`, err);
    }
};

const setAllDepts = async() => {
    try {
        const rows = await queryAsync("SELECT * FROM departments");
        return rows.map((dept) => ({name: dept.dept_name, value: dept.id}));
    } catch {
        console.log(`Err at setAllDepts,`, err);
    }
};

const setAllManagers = async () => {
    try {
        const rows = await queryAsync("SELECT * FROM employees WHERE manager_id IS NULL");
        return rows.map((manager) => ({name: `${manager.employee_firstname} ${manager.employee_lastname}`, value: manager.id}));
    } catch {
        console.log('Err at setAllManagers:', err);
    }
};

//Not sure this is even necessary.... put into other functions...
Promise.all([setAllEmp(), setAllRoles(), setAllDepts(), setAllManagers()])
.then((values) => {
    allEmployees = values[0];
    allRoles = values[1];
    allDepts = values[2];
    allManagers = values[3];
   // console.log('All employees:', allEmployees, 'All roles:', allRoles, 'All depts:', allDepts, 'all managers:', allManagers);
}).catch((err) => console.log(err));


module.exports = { setAllEmp, setAllRoles, setAllDepts, setAllManagers }
