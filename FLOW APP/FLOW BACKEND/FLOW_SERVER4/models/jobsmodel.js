//const jobsModels = require('../models/');

const jobsModel = {
  getAllJobs: async (filters = {}) => {
    let sql = 'SELECT j.*, s.skill_name FROM jobs j LEFT JOIN skills s ON j.skill_required = s.skill_id WHERE 1=1';
    const params = [];
    
    if (filters.location) {
      sql += ' AND location LIKE ?';
      params.push(`%${filters.location}%`);
    }
    
    if (filters.skill_id) {
      sql += ' AND skill_required = ?';
      params.push(filters.skill_id);
    }
    
    if (filters.employer_id) {
      sql += ' AND employer_id = ?';
      params.push(filters.employer_id);
    }
    
    if (filters.title) {
      sql += ' AND title LIKE ?';
      params.push(`%${filters.title}%`);
    }
    
    sql += ' ORDER BY posted_at DESC';
    
    const [jobs] = await pool.execute(sql, params);
    return jobs;
  },

  getJobById: async (id) => {
    const [job] = await pool.execute(
      'SELECT j.*, s.skill_name FROM jobs j LEFT JOIN skills s ON j.skill_required = s.skill_id WHERE job_id = ?',
      [id]
    );
    return job[0] || null;
  },

  createJob: async ({ employer_id, title, description, location, skill_required, salary_range }) => {
    const [result] = await pool.execute(
      `INSERT INTO jobs 
       (employer_id, title, description, location, skill_required, salary_range)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [employer_id, title, description, location, skill_required, salary_range]
    );
    return result.insertId;
  },

  updateJob: async (id, updates) => {
    let sql = 'UPDATE jobs SET ';
    const updatesList = [];
    const params = [];
    
    if (updates.title) {
      updatesList.push('title = ?');
      params.push(updates.title);
    }
    
    if (updates.description) {
      updatesList.push('description = ?');
      params.push(updates.description);
    }
    
    if (updates.location) {
      updatesList.push('location = ?');
      params.push(updates.location);
    }
    
    if (updates.skill_required) {
      updatesList.push('skill_required = ?');
      params.push(updates.skill_required);
    }
    
    if (updates.salary_range) {
      updatesList.push('salary_range = ?');
      params.push(updates.salary_range);
    }
    
    sql += updatesList.join(', ') + ' WHERE job_id = ?';
    params.push(id);
    
    const [result] = await pool.execute(sql, params);
    return result.affectedRows;
  },

  deleteJob: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM jobs WHERE job_id = ?',
      [id]
    );
    return result.affectedRows;
  },

  searchJobs: async (keyword) => {
    const searchTerm = `%${keyword}%`;
    const [jobs] = await pool.execute(
      `SELECT j.*, s.skill_name FROM jobs j 
      LEFT JOIN skills s ON j.skill_required = s.skill_id
      WHERE title LIKE ? OR description LIKE ? OR location LIKE ?
      ORDER BY posted_at DESC`,
      [searchTerm, searchTerm, searchTerm]
    );
    return jobs;
  }
};

module.exports = jobsModel;
