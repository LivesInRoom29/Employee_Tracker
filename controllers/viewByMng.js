const inquirer = require('inquirer');

const { getAllManagers } = require('./getAll');
console.log(getAllManagers);

// Add a new employee to the db
// Instead of requiring askTask above, use it as a parameter. Otherwise it was being imported before it was actually being exported from the module.
const viewByMng = () => {
    return new Promise ((resolve, reject) => {
        // Call these 2 asyn functions to get an array of all the roles and all the managers
        // These will be used to populate the choices for the 3rd and 5th questions.
        // Promise.all([ getAllManagers()])
        getAllManagers()
        .then((allManagers) =>
            inquirer.prompt([
            {
                type: 'list',
                name: 'managerId',
                message: "For which manager would you like to see their employees?",
                choices: allManagers
            }
        ]))
        .then((answers) => resolve(answers))
        .catch((err) => reject(err))
    });
};

module.exports = viewByMng