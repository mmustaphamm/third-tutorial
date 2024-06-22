const mysql = require("mysql")

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "bank"
})

module.exports = dbConnection