const jobsModel = require('../models/jobsModel');

const jobsControllers = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await jobsModel.getAllJobs(req.query);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  },

  getJobById: async (req, res) => {
    try {
      const job = await jobsModel.getJobById(req.params.id);
      if (!job) return res.status(404).json({ error: 'Job not found' });
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  },

  createJob: async (req, res) => {
    try {
      const jobId = await jobsModel.createJob(req.body);
      res.status(201).json({ message: 'Job created successfully', job_id: jobId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job' });
    }
  },

  updateJob: async (req, res) => {
    try {
      const affectedRows = await jobsModel.updateJob(req.params.id, req.body);
      if (affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
      res.json({ message: 'Job updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job' });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const affectedRows = await jobsModel.deleteJob(req.params.id);
      if (affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete job' });
    }
  },

  searchJobs: async (req, res) => {
    try {
      if (!req.query.keyword) {
        return res.status(400).json({ error: 'Missing search keyword' });
      }
      const jobs = await jobsModel.searchJobs(req.query.keyword);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search jobs' });
    }
  }
};

module.exports = jobsControllers;
