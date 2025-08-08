require('dotenv').config();
const express = require('express');
const app = express();
const applicationRoutes = require('./routes/applicationRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// Application routes
app.use('/api/applications', applicationRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application service running on port ${PORT}`);
});
