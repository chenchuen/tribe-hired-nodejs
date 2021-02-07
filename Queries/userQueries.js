const con = require('../mysqlConnection');

const getUsersQuery = (name) => `SELECT name,email FROM users WHERE Name LIKE "${name}%"`;

const getUsers = (name) => {
    console.log("getting users...");
    return new Promise((res, rej) => {
        con.query(getUsersQuery(name), (err, data) => {
            if (err) {
                console.log(err);
                rej(err);
            }
            res(data);
        });
    });
};
module.exports = {
    getUsers
};