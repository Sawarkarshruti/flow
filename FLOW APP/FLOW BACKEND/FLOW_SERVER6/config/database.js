const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost:3000',
  user: "W2_89921_Shrutika",
  password: "manager",
  database: "project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
