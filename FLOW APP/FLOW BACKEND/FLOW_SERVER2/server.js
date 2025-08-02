const express = require('express');
const bodyParser = require('body-parser');
const workerRoutes = require('./routes/workerRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/workers', workerRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
