require('dotenv').config();
const express = require('express');
const app = express();
const jobsRoutes = require('./routes/jobsRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/jobs', jobsRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
