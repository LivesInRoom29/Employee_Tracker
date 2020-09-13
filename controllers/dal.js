const cTablle = require('console.table');
const connection = require('../config/db.js');


const dal = {
    viewAll: function(query) {
        return new Promise((resolve, reject) => {

            connection.query(query, (err, result) => {
                if (err) reject(err);
                console.log('\n');
                console.table(result);
                console.log('\n');
                resolve(result);
            });
        });
    },
    viewAllBy: function(query, colToSearch, valueOfCol) {
        return new Promise((resolve, reject) => {
            connection.query(query, [colToSearch, valueOfCol], (err, result) => {
                if (err) reject(err);
                console.log('\n');
                console.table(result);
                console.log('\n');
                resolve(result);
            })
        })
    }
};

module.exports = dal