const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid reference key' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  };
  
  module.exports = errorHandler;
  
