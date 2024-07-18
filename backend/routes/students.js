const express = require('express');
const {
  getStudents,
  getStudentByRollNo,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const router = express.Router();
// console.log(getStudents);
router.route('/').get(getStudents).post(addStudent);
router.route('/:rollNo').get(getStudentByRollNo).put(updateStudent).delete(deleteStudent);

module.exports = router;
