const queries = {
    allEmployees:
        `SELECT e.id, e.employee_firstname, e.employee_lastname, title, dept_name AS department, salary, CONCAT(m.employee_firstname, ' ', m.employee_lastname) AS manager
        FROM employees e
        INNER JOIN roles
        ON e.role_id = roles.id
        INNER JOIN departments
        ON roles.department_id = departments.id
        LEFT JOIN employees m
        ON e.manager_id = m.id;`,

    allEmployeesByMng: `SELECT e.id, e.employee_firstname, e.employee_lastname, title, dept_name AS department, salary, CONCAT(m.employee_firstname, ' ', m.employee_lastname) AS manager
        FROM employees e
        INNER JOIN roles
        ON e.role_id = roles.id
        INNER JOIN departments
        ON roles.department_id = departments.id
        LEFT JOIN employees m
        ON e.manager_id = m.id
        WHERE ?? = ?;`,


    allRoles:
        `SELECT roles.id, title, salary, dept_name AS department
        FROM roles
        INNER JOIN departments
        ON roles.department_id = departments.id`,

    allDepts: 'SELECT * FROM departments',
}

module.exports = queries;