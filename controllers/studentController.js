const { validationResult } = require('express-validator');
const store = require('../data/students');

// Display all students
exports.listStudents = (req, res) => {
  res.render('index', {
    title: 'Student Directory',
    students: store.getAll(),
    requestId: req.requestId
  });
};

// Display the add student form
exports.showCreateForm = (req, res) => {
  res.render('new', {
    title: 'Add Student',
    errors: [],
    values: {},
    requestId: req.requestId
  });
};

// Create a new student
exports.createStudent = (req, res, next) => {
  const validation = validationResult(req);

  const values = {
    name: String(req.body.name || '').trim(),
    email: String(req.body.email || '').trim().toLowerCase(),
    prn: String(req.body.prn || '').trim(),
    mobile: String(req.body.mobile || '').trim(),
    course: String(req.body.course || '').trim()
  };

  const errors = validation.array().map(item => item.msg);

  if (store.findByPrn(values.prn)) {
    errors.push('A student with this PRN already exists.');
  }

  if (store.findByEmail(values.email)) {
    errors.push('A student with this email already exists.');
  }

  if (errors.length > 0) {
    return res.status(422).render('new', {
      title: 'Add Student',
      errors,
      values,
      requestId: req.requestId
    });
  }

  try {
    const student = store.create(values);
    return res.redirect(303, `/students/${student.id}?created=1`);
  } catch (error) {
    return next(error);
  }
};

// Display an individual student
exports.showStudent = (req, res) => {
  const student = store.findById(req.params.id);

  if (!student) {
    return res.status(404).render('error', {
      title: 'Student Not Found',
      status: 404,
      message: `No student record exists for ID ${req.params.id}.`,
      requestId: req.requestId
    });
  }

  res.render('show', {
    title: 'Student Profile',
    student,
    created: req.query.created === '1',
    requestId: req.requestId
  });
};

// Return student details as JSON
exports.getStudentJson = (req, res) => {
  const student = store.findById(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.'
    });
  }

  res.json({
    success: true,
    student
  });
};
