const util = require('util');
const connection = require('./db.js');
// Async/await use From https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql#:~:text=if%20you%20happen%20to%20be,()%20with%20the%20node%20mysql.&text=Any%20promise%20can%20be%20used,an%20async%20function%20%22wrapper%22.
const queryAsync = util.promisify(connection.query).bind(connection);

// Use to create an array of all employees/roles/depts/managers
// Array to be used for choices in inquirer
const getAllEmployees = async () => {
    try {
        const rows = await queryAsync("SELECT * FROM employees");
        const allEmployees = rows.map((employee) => `${employee.employee_firstname} ${employee.employee_lastname}`);
        return allEmployees;
    } catch {
        console.log(err);
    }
};

const getAllRoles = () => {
    const query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err) throw err;
        return res.map((role) => role.title);
    })
};

const getAllDepts = () => {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        return res.map((department) => department.dept_name);;
    })
};

const getAllManagers = () => {
    const query = "SELECT * FROM managers";
    connection.query(query, (err, res) => {
        if (err) throw err;
        return res.map((managers) =>`${managers.manager_firstname} ${managers.manager_lastname}`);;
    })
};


const allEmployees = getAllEmployees();
const allRoles = getAllRoles();
const allDepts = getAllDepts();
const allmanagers = getAllManagers();

console.log(allEmployees);

module.exports = { getAllEmployees, getAllRoles, getAllDepts, getAllManagers, allEmployees, allRoles, allDepts, allmanagers };