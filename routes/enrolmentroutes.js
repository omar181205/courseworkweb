const express = require('express');
const {
    getAllEnrolments,
    getStudentCourses,
    getStudentsByCourseid,
    enrollStudent,
    removeStudent
} = require('../controller/enrolmentcontroller');
const { verifyToken } = require('../controller/authcontroller');

const enrolmentRouter = express.Router();
enrolmentRouter.get('/', getAllEnrolments);
enrolmentRouter.get('/students/me/courses', verifyToken, getStudentCourses);
enrolmentRouter.get('/courses/:courseId/students', getStudentsByCourseid);

enrolmentRouter.post('/courses/:courseId/enroll', enrollStudent);
enrolmentRouter.delete('/courses/:courseId/students/:studentId', removeStudent);

module.exports = enrolmentRouter;
enrolmentRouter.post('/courses/:courseId/enrollments', enrollStudent);

module.exports = enrolmentRouter;
