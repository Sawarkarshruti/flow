const express = require('express');
const skillRoutes = require('./routes/skillRoutes');
const { validateSkill } = require('./middleware/validateSkill');
const app = express();

app.use(express.json());

// Apply routes
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Skills API running on port ${PORT}`);
});
