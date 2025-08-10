const db = require('../config/database');

class Rating {
  static async create({ worker_id, employer_id, rating, review }) {
    const [result] = await db.execute(
      'INSERT INTO ratings (worker_id, employer_id, rating, review) VALUES (?, ?, ?, ?)',
      [worker_id, employer_id, rating, review]
    );
    return result;
  }

  static async findByWorkerId(worker_id) {
    const [rows] = await db.execute(
      'SELECT * FROM ratings WHERE worker_id = ? ORDER BY rated_at DESC',
      [worker_id]
    );
    return rows;
  }

  static async findByEmployerId(employer_id) {
    const [rows] = await db.execute(
      'SELECT * FROM ratings WHERE employer_id = ? ORDER BY rated_at DESC',
      [employer_id]
    );
    return rows;
  }

  static async getAverageRating(worker_id) {
    const [result] = await db.execute(
      'SELECT AVG(rating) as average, COUNT(*) as count FROM ratings WHERE worker_id = ?',
      [worker_id]
    );
    return result[0];
  }

  static async update(rating_id, { rating, review }) {
    const [result] = await db.execute(
      'UPDATE ratings SET rating = ?, review = ? WHERE rating_id = ?',
      [rating, review, rating_id]
    );
    return result;
  }

  static async delete(rating_id) {
    const [result] = await db.execute(
      'DELETE FROM ratings WHERE rating_id = ?',
      [rating_id]
    );
    return result;
  }
}

module.exports = Rating;
