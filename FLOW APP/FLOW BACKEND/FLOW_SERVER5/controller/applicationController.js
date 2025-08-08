const applicationModel = require('../models/applicationModel');

const handleErrors = (err, res) => {
  console.error(err);
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid job_id or worker_id' 
    });
  }
  res.status(500).json({ 
    success: false, 
    message: 'Server error' 
  });
};

module.exports = {
  submitApplication: async (req, res) => {
    try {
      const applicationId = await applicationModel.createApplication(req.body);
      res.status(201).json({ 
        success: true, 
        message: 'Application submitted successfully', 
        application_id: applicationId 
      });
    } catch (err) {
      handleErrors(err, res);
    }
  },

  getApplication: async (req, res) => {
    try {
      const application = await applicationModel.getApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ 
          success: false, 
          message: 'Application not found' 
        });
      }
      res.json({ 
        success: true, 
        data: application 
      });
    } catch (err) {
      handleErrors(err, res);
    }
  },

  getJobApplications: async (req, res) => {
    try {
      const applications = await applicationModel.getApplicationsForJob(req.params.jobId);
      res.json({ 
        success: true, 
        count: applications.length, 
        data: applications 
      });
    } catch (err) {
      handleErrors(err, res);
    }
  },

  getWorkerApplications: async (req, res) => {
    try {
      const applications = await applicationModel.getApplicationsByWorker(req.params.workerId);
      res.json({ 
        success: true, 
        count: applications.length, 
        data: applications 
      });
    } catch (err) {
      handleErrors(err, res);
    }
  },

  updateStatus: async (req, res) => {
    try {
      const affectedRows = await applicationModel.updateApplicationStatus(
        req.params.id, 
        req.body.status
      );
      
      if (affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Application not found' 
        });
      }
      
      res.json({ 
        success: true, 
        message: 'Application status updated successfully' 
      });
    } catch (err) {
      handleErrors(err, res);
    }
  },

  deleteApplication: async (req, res) => {
    try {
      const affectedRows = await applicationModel.deleteApplication(req.params.id);
      if (affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Application not found' 
        });
      }
      res.json({ 
        success: true, 
        message: 'Application deleted successfully' 
      });
    } catch (err) {
      handleErrors(err, res);
    }
  }
};
