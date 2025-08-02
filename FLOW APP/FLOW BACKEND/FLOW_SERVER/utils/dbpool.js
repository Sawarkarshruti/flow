const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "W2_89921_Shrutika",
    password: "manager",
    database: "project"
})

module.exports = pool
