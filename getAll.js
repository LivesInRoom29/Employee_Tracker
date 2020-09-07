
const connection = require('./src/app');

// Use to create an array of all employees/roles/depts/managers
// Array to be used for choices in inquirer
const getAll = (table) => {
    const query = "SELECT * FROM ?";
    connection.query(query, table, (err, res) => {
        if (err) throw err;
        let allArray = [];
        if (table === 'employees') {
            allArray = res.map((employee) => `${employee.employee_firstname} ${employee.employee_lastname}`);
        }
        else if (table === 'roles') {
            allArray = res.map((role) => role.title);
        }
        else if (table === 'departments') {
            allArray = res.map((department) => department.dept_name);
        }
        else {
            allArray = res.map((managers) =>`${managers.manager_firstname} ${managers.manager_lastname}`);
        }

        return allArray;
    })
};

module.exports = getAll;