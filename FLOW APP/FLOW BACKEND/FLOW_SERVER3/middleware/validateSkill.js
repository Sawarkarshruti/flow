exports.validateSkill = (req, res, next) => {
    if (!req.body.skill_name || req.body.skill_name.trim().length < 2) {
      return res.status(400).json({ 
        message: 'Skill name must be at least 2 characters long' 
      });
    }
    next();
  };
  
