const pool = require('../config/db');

module.exports = {
  // Submit a new application
  createApplication: async (applicationData) => {
    const [result] = await pool.execute(
      `INSERT INTO applications (job_id, worker_id, status)
       VALUES (?, ?, ?)`,
      [applicationData.job_id, applicationData.worker_id, applicationData.status || 'applied']
    );
    return result.insertId;
  },

  // Get application by ID
  getApplicationById: async (id) => {
    const [application] = await pool.execute(
      `SELECT a.*, j.title AS job_title, w.name AS worker_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.job_id
       JOIN worker_profiles w ON a.worker_id = w.worker_id
       WHERE application_id = ?`,
      [id]
    );
    return application[0];
  },

  // Get all applications for a job
  getApplicationsForJob: async (jobId) => {
    const [applications] = await pool.execute(
      `SELECT a.*, w.name AS worker_name
       FROM applications a
       JOIN worker_profiles w ON a.worker_id = w.worker_id
       WHERE a.job_id = ?`,
      [jobId]
    );
    return applications;
  },

  // Get all applications by a worker
  getApplicationsByWorker: async (workerId) => {
    const [applications] = await pool.execute(
      `SELECT a.*, j.title AS job_title
       FROM applications a
       JOIN jobs j ON a.job_id = j.job_id
       WHERE a.worker_id = ?`,
      [workerId]
    );
    return applications;
  },

  // Update application status
  updateApplicationStatus: async (id, status) => {
    const [result] = await pool.execute(
      `UPDATE applications SET status = ? WHERE application_id = ?`,
      [status, id]
    );
    return result.affectedRows;
  },

  // Delete an application
  deleteApplication: async (id) => {
    const [result] = await pool.execute(
      `DELETE FROM applications WHERE application_id = ?`,
      [id]
    );
    return result.affectedRows;
  }
};


