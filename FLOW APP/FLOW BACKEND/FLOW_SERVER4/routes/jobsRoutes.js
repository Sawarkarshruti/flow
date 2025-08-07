const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsControllers');
const { validateJobInput } = require('../middlewares/validateRequest');

router.get('/', jobsController.getAllJobs);
router.post('/', validateJobInput, jobsController.createJob);
router.get('/search', jobsController.searchJobs);
router.get('/:id', jobsController.getJobById);
router.put('/:id', validateJobInput, jobsController.updateJob);
router.delete('/:id', jobsController.deleteJob);

module.exports = router;
