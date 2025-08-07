const validateJobInput = (req, res, next) => {
    if (req.method === 'POST') {
      const { employer_id, title, description, location, skill_required, salary_range } = req.body;
      if (!employer_id || !title || !description || !location || !skill_required || !salary_range) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    }
    
    if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    next();
  };
  
  module.exports = {
    validateJobInput
  };
  
