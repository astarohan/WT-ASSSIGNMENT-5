// Demonstration-only role middleware. Not a production authentication system.
module.exports = (req, res, next) => {
  if (req.get('x-demo-role') !== 'faculty') {
    return res.status(401).render('students/error', {
      title: 'Access Restricted',
      status: 401,
      message: 'This demonstration route requires the x-demo-role: faculty header.',
      requestId: req.requestId
    });
  }
  next();
};