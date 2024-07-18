const asyncHandler = require('express-async-handler');
const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

// @desc    Fetch all students
// @route   GET /api/students
// @access  Public
const getStudents = asyncHandler(async (req, res) => {
  const students = await sequelize.query('SELECT * FROM students', { type: QueryTypes.SELECT });
  res.json(students);
});

// @desc    Fetch single student by rollNo
// @route   GET /api/students/:rollNo
// @access  Public
const getStudentByRollNo = asyncHandler(async (req, res) => {
  const { rollNo } = req.params;
  const student = await sequelize.query('SELECT * FROM students WHERE rollNo = ?', {
    replacements: [rollNo],
    type: QueryTypes.SELECT,
  });

  if (student.length > 0) {
    res.json(student[0]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// @desc    Add a student
// @route   POST /api/students
// @access  Public (for now, should be protected)
const addStudent = asyncHandler(async (req, res) => {
  const { rollNo, name, section, qualified } = req.body;
  const student = await sequelize.query(
    'INSERT INTO students (rollNo, name, section, qualified) VALUES (?, ?, ?, ?)',
    {
      replacements: [rollNo, name, section, qualified],
      type: QueryTypes.INSERT,
    }
  );
  res.status(201).json({ rollNo, name, section, qualified });
});

// @desc    Update a student by rollNo
// @route   PUT /api/students/:rollNo
// @access  Public (for now, should be protected)
const updateStudent = asyncHandler(async (req, res) => {
  const { rollNo } = req.params;
  const { name, section, qualified } = req.body;

  const student = await sequelize.query('SELECT * FROM students WHERE rollNo = ?', {
    replacements: [rollNo],
    type: QueryTypes.SELECT,
  });

  if (student.length > 0) {
    await sequelize.query(
      'UPDATE students SET name = ?, section = ?, qualified = ? WHERE rollNo = ?',
      {
        replacements: [name || student[0].name, section || student[0].section, qualified || student[0].qualified, rollNo],
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ rollNo, name, section, qualified });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// @desc    Delete a student by rollNo
// @route   DELETE /api/students/:rollNo
// @access  Public (for now, should be protected)
const deleteStudent = asyncHandler(async (req, res) => {
  const { rollNo } = req.params;

  const student = await sequelize.query('SELECT * FROM students WHERE rollNo = ?', {
    replacements: [rollNo],
    type: QueryTypes.SELECT,
  });

  if (student.length > 0) {
    await sequelize.query('DELETE FROM students WHERE rollNo = ?', {
      replacements: [rollNo],
      type: QueryTypes.DELETE,
    });
    res.json({ message: 'Student removed' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

module.exports = {
  getStudents,
  getStudentByRollNo,
  addStudent,
  updateStudent,
  deleteStudent,
};
