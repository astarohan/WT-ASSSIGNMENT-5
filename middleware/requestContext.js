const { randomUUID } = require('crypto');

// Attaches a unique ID to every request for traceability.
module.exports = (req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader('X-Request-ID', req.requestId);
  next();
};
