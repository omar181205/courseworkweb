const { db } = require('../db');

// Create a new course
const createCourse = (req, res) => {
    const COURSE_NAME = req.body.COURSE_NAME;
    const USER_ID = req.body.USER_ID;
    const CAPACITY = req.body.CAPACITY;

    if (!COURSE_NAME || !USER_ID || !CAPACITY) {
        return res.status(400).json({ error: 'COURSE_NAME, USER_ID and CAPACITY are required' });
    }

    const query = `INSERT INTO COURSES (COURSE_NAME, USER_ID, CAPACITY) VALUES (?, ?, ?)`;

    db.run(query, [COURSE_NAME, USER_ID, CAPACITY], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
            status: 'success',
            message: 'Course created successfully',
            courseId: this.lastID
        });
    });
};

// Get all courses
const getAllCourses = (req, res) => {
    const query = `SELECT * FROM COURSES`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Courses retrieved successfully',
            courses: rows
        });
    });
};

// Get course by ID
const getCourseById = (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM COURSES WHERE COURSE_ID = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Course retrieved successfully',
            course: row
        });
    });
};

// Update course
const updateCourse = (req, res) => {
    const id = req.params.id;
    const CAPACITY = req.body.CAPACITY;

    if (!CAPACITY) {
        return res.status(400).json({ error: 'CAPACITY is required' });
    }

    const query = `UPDATE COURSES SET CAPACITY = ? WHERE COURSE_ID = ?`;

    db.run(query, [CAPACITY, id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Course updated successfully'
        });
    });
};

// Delete course
const deleteCourse = (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM COURSES WHERE COURSE_ID = ?`;

    db.run(query, [id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Course deleted successfully'
        });
    });
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
