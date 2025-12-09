const express = require('express');
const {
    getStudentGrades,
    getCourseGrades,
    createGrade,
    updateGrade
} = require('../controller/gradecontroller');
const { verifyToken } = require('../controller/authcontroller');

const gradeRouter = express.Router();

// Get grades for logged in student
gradeRouter.get('/students/me/grades', verifyToken, getStudentGrades);

// Get grades for a specific course
gradeRouter.get('/courses/:courseId/grades', getCourseGrades);

// Create a grade
gradeRouter.post('/', createGrade);

// Update a grade (for teachers)
gradeRouter.put('/:gradeId', updateGrade);

module.exports = gradeRouter;
