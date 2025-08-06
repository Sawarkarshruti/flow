require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:3000,
  user:W2_89921_Shrutika ,
  password: manager,
  database: project,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
