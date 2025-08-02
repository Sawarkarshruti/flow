const pool = require('../config/db');

const Worker = {
  // Create new worker profile
  async create(workerData) {
    const query = `
      INSERT INTO worker_profiles 
      (worker_id, gender, age, experience_years, location, bio) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    const values = [
      workerData.worker_id,
      workerData.gender,
      workerData.age,
      workerData.experience_years,
      workerData.location,
      workerData.bio
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Get all workers
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM worker_profiles');
    return rows;
  },

  // Get worker by ID
  async findById(workerId) {
    const { rows } = await pool.query('SELECT * FROM worker_profiles WHERE worker_id = $1', [workerId]);
    return rows[0];
  },

  // Update worker
  async update(workerId, updates) {
    const query = `
      UPDATE worker_profiles 
      SET 
        gender = $1,
        age = $2,
        experience_years = $3,
        location = $4,
        bio = $5
      WHERE worker_id = $6
      RETURNING *
    `;
    const values = [
      updates.gender,
      updates.age,
      updates.experience_years,
      updates.location,
      updates.bio,
      workerId
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Delete worker
  async delete(workerId) {
    await pool.query('DELETE FROM worker_profiles WHERE worker_id = $1', [workerId]);
  }
};

module.exports = Worker;
