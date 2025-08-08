const express = require('express');
const router = express.Router();
const applicationController = require('../controller/applicationController');
const validateApplication = require('../middlewares/validateApplication');

// Submit new application
router.post('/', validateApplication, applicationController.submitApplication);

// Get specific application
router.get('/:id', applicationController.getApplication);

// Get applications for a specific job
router.get('/job/:jobId', applicationController.getJobApplications);

// Get applications by a specific worker
router.get('/worker/:workerId', applicationController.getWorkerApplications);

// Update application status
router.put('/:id/status', validateApplication, applicationController.updateStatus);

// Delete application
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
