function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    if (err.message.includes('invalid input syntax')) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    
    res.status(500).json({ message: 'Something went wrong' });
  }
  
  module.exports = errorHandler;
  