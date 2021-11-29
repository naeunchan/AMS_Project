const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "bccard",
    password: "qwer1234",
    database: "bccard",
});

module.exports = db;
