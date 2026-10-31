const express = require('express');
const { body } = require('express-validator');
const studentController = require('../controllers/studentController');

const router = express.Router();

const registrationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Name must contain 2 to 60 characters.'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Enter a valid email address.'),

  body('prn')
    .trim()
    .matches(/^\d{12}$/)
    .withMessage('PRN must contain exactly 12 digits.'),

  body('mobile')
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Mobile must be 10 digits and start with 6, 7, 8, or 9.'),

  body('course')
    .isIn(['B.Tech', 'M.Tech', 'BCA', 'MCA'])
    .withMessage('Select a course from the available options.')
];

// Route table is documented in the report and README.
router.get('/', studentController.listStudents);
router.get('/new', studentController.showCreateForm);
router.post('/', registrationRules, studentController.createStudent);
router.get('/:id/json', studentController.getStudentJson);
router.get('/:id', studentController.showStudent);

module.exports = router;
