const express = require('express');
const cors = require('cors');
const ratingsRouter = require('./routes/ratings');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ratings', ratingsRouter);

// Error handling
app.use(errorHandler);

// Database connection test
app.get('/ping', (req, res) => {
  res.json({ message: 'API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
