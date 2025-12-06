const { db } = require('../db');

// Get all enrollments
const getAllEnrolments = (req, res) => {
    const query = `SELECT * FROM ENROLMENT`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Enrollments retrieved successfully',
            enrollments: rows
        });
    });
};

// Get courses for logged in student
const getStudentCourses = (req, res) => {
    const studentId = req.user.id;

    const query = `SELECT * FROM ENROLMENT WHERE STUDENT_ID = ?`;

    db.all(query, [studentId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Student courses retrieved successfully',
            courses: rows
        });
    });
};

// Get students enrolled in a specific course
const getStudentsByCourseid = (req, res) => {
    const courseId = req.params.courseId;

    const query = `SELECT * FROM ENROLMENT WHERE COURSE_ID = ?`;

    db.all(query, [courseId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Students retrieved successfully',
            students: rows
        });
    });
};

// Enroll a student in a course
const enrollStudent = (req, res) => {
    const courseId = req.params.courseId;
    const STUDENT_ID = req.body.STUDENT_ID;
    const EMAIL = req.body.EMAIL;

    if (!STUDENT_ID || !EMAIL) {
        return res.status(400).json({ error: 'STUDENT_ID and EMAIL are required' });
    }

    const query = `INSERT INTO ENROLMENT (COURSE_ID, STUDENT_ID, EMAIL) VALUES (?, ?, ?)`;

    db.run(query, [courseId, STUDENT_ID, EMAIL], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
            status: 'success',
            message: 'Student enrolled successfully'
        });
    });
};

module.exports = {
    getAllEnrolments,
    getStudentCourses,
    getStudentsByCourseid,
    enrollStudent
};
