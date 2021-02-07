const mysql = require('mysql');
const con = mysql.createPool({
    host: "ec2-13-251-160-247.ap-southeast-1.compute.amazonaws.com",
    user: "thuser",
    password: "1qaz@WSX",
    database: "thdb"
});

module.exports = con;