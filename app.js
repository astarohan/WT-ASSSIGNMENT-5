const path = require('path');
const express = require('express');
const morgan = require('morgan');

const studentRoutes = require('./routes/studentRoutes');
const requestContext = require('./middleware/requestContext');
const requireStaff = require('./middleware/requireStaff');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(requestContext);                  // Custom middleware
app.use(morgan('dev'));                   // Third-party logging middleware
app.use(express.urlencoded({ extended: false })); // Built-in middleware
app.use(express.json());                  // Built-in middleware
app.use(express.static(path.join(__dirname, 'public'))); // Static assets

app.get('/', (req, res) => res.redirect('/students'));
app.use('/students', studentRoutes);

// Demo role-check route. In Postman, send x-demo-role: faculty.
app.get('/admin/audit', requireStaff, (req, res) => {
  res.render('students/audit', { title: 'Audit Access', requestId: req.requestId });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).render('students/error', {
    title: 'Page Not Found',
    status: 404,
    message: `No route matches ${req.method} ${req.originalUrl}`,
    requestId: req.requestId
  });
});

// Centralized error handler must be registered after routes.
app.use(errorHandler);

module.exports = app;