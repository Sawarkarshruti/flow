const express = require('express');
const router = express.Router();
const {
  createWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker
} = require('../controllers/workerController');

// Worker Profile Routes
router.post('/', createWorker);
router.get('/', getAllWorkers);
router.get('/:id', getWorkerById);
router.put('/:id', updateWorker);
router.delete('/:id', deleteWorker);

module.exports = router;
