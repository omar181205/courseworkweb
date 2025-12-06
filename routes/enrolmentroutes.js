const express = require('express');
const {
    getAllEnrolments,
    getStudentCourses,
    getStudentsByCourseid,
    enrollStudent
} = require('../controller/enrolmentcontroller');
const { verifyToken } = require('../controller/authcontroller');

const enrolmentRouter = express.Router();

// Get all enrollments
enrolmentRouter.get('/', getAllEnrolments);

// Get courses for logged in student
enrolmentRouter.get('/students/me/courses', verifyToken, getStudentCourses);

// Get students enrolled in a specific course
enrolmentRouter.get('/courses/:courseId/students', getStudentsByCourseid);

// Enroll a student in a course
enrolmentRouter.post('/courses/:courseId/enrollments', enrollStudent);

module.exports = enrolmentRouter;
