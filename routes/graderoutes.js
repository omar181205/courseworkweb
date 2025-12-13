const express = require('express');
const {
    getStudentGrades,
    getCourseGrades,
    createGrade,
    updateGrade
} = require('../controller/gradecontroller');
const { verifyToken } = require('../controller/authcontroller');

const gradeRouter = express.Router();

gradeRouter.get('/students/me/grades', verifyToken, getStudentGrades);
gradeRouter.get('/courses/:courseId/grades', getCourseGrades);
gradeRouter.post('/', createGrade);
gradeRouter.put('/:gradeId', updateGrade);

module.exports = gradeRouter;
