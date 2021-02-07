const con = require('../mysqlConnection');

const signUpQuery = (name, email, password) => `INSERT INTO thdb.users (Name,Email,Password) VALUES('${name}','${email}','${password}');`;
const loginQuery = (email, hashPassword) => `SELECT userId FROM users WHERE email = '${email}' AND password = '${hashPassword}';`;

const signup = (name, email, hashPassword) => {
    console.log("signing up...");
    return new Promise((res, rej) => {
        con.query(signUpQuery(name, email, hashPassword), (err, data, fields) => {
            if (err) {
                rej(err.code);
            } else {
                console.log("asdasd", data.affectedRows);
                res(data.affectedRows);
            }
        });
    });
};

const login = (name, hashPassword) => {
    console.log("logging in...");
    return new Promise((res, rej) => {
        con.query(loginQuery(name, hashPassword), (err, data) => {
            if (err) {
                console.log(err);
                rej(err);
            } else {
                res(data[0]);
            }
        });
    });
};

module.exports = {
    login,
    signup
};