const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'W2_89921_Shrutika',
  database: 'project',
  password: 'manager',
  port: 3306, // default MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); // use promise-based API
