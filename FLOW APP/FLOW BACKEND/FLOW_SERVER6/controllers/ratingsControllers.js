const Rating = require('../models/Rating');

exports.createRating = async (req, res, next) => {
  try {
    const { worker_id, employer_id, rating, review } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const result = await Rating.create({ worker_id, employer_id, rating, review });
    const newRating = await Rating.findById(result.insertId);
    
    res.status(201).json(newRating);
  } catch (err) {
    next(err);
  }
};

exports.getWorkerRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.findByWorkerId(req.params.worker_id);
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

exports.getEmployerRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.findByEmployerId(req.params.employer_id);
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

exports.getAverageRating = async (req, res, next) => {
  try {
    const { average, count } = await Rating.getAverageRating(req.params.worker_id);
    res.json({ 
      worker_id: req.params.worker_id,
      average_rating: parseFloat(average) || 0,
      total_ratings: count
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRating = async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    await Rating.update(req.params.rating_id, { rating, review });
    const updatedRating = await Rating.findById(req.params.rating_id);
    
    res.json(updatedRating);
  } catch (err) {
    next(err);
  }
};

exports.deleteRating = async (req, res, next) => {
  try {
    await Rating.delete(req.params.rating_id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
