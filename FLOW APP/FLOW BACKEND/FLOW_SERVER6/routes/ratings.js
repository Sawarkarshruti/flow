const express = require('express');
const router = express.Router();
const {
  createRating,
  getWorkerRatings,
  getEmployerRatings,
  getAverageRating,
  updateRating,
  deleteRating
} = require('../controllers/ratingsControllers');

// Create a new rating
router.post('/', createRating);

// Get all ratings for a worker
router.get('/worker/:worker_id', getWorkerRatings);

// Get all ratings from an employer
router.get('/employer/:employer_id', getEmployerRatings);

// Get average rating for a worker
router.get('/worker/:worker_id/average', getAverageRating);

// Update a rating
router.put('/:rating_id', updateRating);

// Delete a rating
router.delete('/:rating_id', deleteRating);

module.exports = router;
