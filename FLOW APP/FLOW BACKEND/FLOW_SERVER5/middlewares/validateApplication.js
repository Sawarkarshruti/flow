const validateApplication = (req, res, next) => {
    const { job_id, worker_id } = req.body;
    
    // For POST requests
    if (req.method === 'POST') {
      if (!job_id || !worker_id) {
        return res.status(400).json({ 
          success: false, 
          message: 'job_id and worker_id are required' 
        });
      }
    }
    
    // For PUT requests (status updates)
    if (req.method === 'PUT') {
      if (!req.body.status) {
        return res.status(400).json({ 
          success: false, 
          message: 'status is required' 
        });
      }
      
      const validStatuses = ['applied', 'selected', 'rejected'];
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid status value' 
        });
      }
    }
    
    next();
  };
  
  module.exports = validateApplication;
  
