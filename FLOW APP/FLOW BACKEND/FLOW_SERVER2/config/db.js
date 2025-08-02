const { Pool } = require('pg'); // Assuming you're using PostgreSQL

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'project',
    password: 'manager',
    port: 3000,
});

module.exports = pool;
