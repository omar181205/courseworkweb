const express = require('express');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controller/coursecontroller');
const { verifyToken } = require('../controller/authcontroller');

const courseRouter = express.Router();
courseRouter.post('/', verifyToken, createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', verifyToken, updateCourse);
courseRouter.delete('/:id', verifyToken, deleteCourse);
module.exports = courseRouter;
