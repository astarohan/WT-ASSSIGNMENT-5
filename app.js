const express = require('express');
const path = require('path');
const morgan = require('morgan');

const studentRoutes = require('./routes/studentRoutes');
const requestContext = require('./middleware/requestContext');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// View engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(requestContext);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Student routes
app.use('/', studentRoutes);

// Error handling (must be last)
app.use(errorHandler);

module.exports = app;
