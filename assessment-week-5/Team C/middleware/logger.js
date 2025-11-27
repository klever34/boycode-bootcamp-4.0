// Middleware that logs each request with method, URL, and timestamp
module.exports = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);

  next(); 
};
