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

// Create a new course (protected - only teachers and admins)
courseRouter.post('/', verifyToken, createCourse);

// Get all courses (public)
courseRouter.get('/', getAllCourses);

// Get course by ID (public)
courseRouter.get('/:id', getCourseById);

// Update course (protected)
courseRouter.put('/:id', verifyToken, updateCourse);

// Delete course (protected)
courseRouter.delete('/:id', verifyToken, deleteCourse);

module.exports = courseRouter;
