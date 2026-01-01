const logger = (req, res, next) => {
  if (req.method === 'POST') {
    const timestamp = new Date().toISOString();
    const userId = req.session.userId || 'Guest (Not logged in)';
    
    console.log(`[${timestamp}] Successful POST to ${req.originalUrl} by User: ${userId}`);
  }
  next();
};

module.exports = logger;