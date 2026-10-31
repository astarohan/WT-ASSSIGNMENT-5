module.exports = (err, req, res, next) => {
  console.error(`[${req.requestId}]`, err);
  const status = Number(err.status) || 500;

  if (res.headersSent) return next(err);

  res.status(status).render('students/error', {
    title: 'Application Error',
    status,
    message: status === 500 ? 'An unexpected server error occurred.' : err.message,
    requestId: req.requestId
  });
};
