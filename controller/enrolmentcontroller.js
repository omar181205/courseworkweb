const { db } = require('../db');

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
const enrollStudent = (req, res) => {
    const courseId = req.params.courseId;
    const STUDENT_ID = req.body.STUDENT_ID;
    const EMAIL = req.body.EMAIL;

    if (!STUDENT_ID || !EMAIL) {
        return res.status(400).json({ error: 'STUDENT_ID and EMAIL are required' });
    }

    // First, insert the enrollment
    const enrollQuery = `INSERT INTO ENROLMENT (COURSE_ID, STUDENT_ID, EMAIL) VALUES (?, ?, ?)`;

    db.run(enrollQuery, [courseId, STUDENT_ID, EMAIL], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Then, decrease the course capacity
        const updateCapacityQuery = `UPDATE COURSES SET CAPACITY = CAPACITY - 1 WHERE COURSE_ID = ?`;
        
        db.run(updateCapacityQuery, [courseId], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update capacity' });
            }

            res.status(201).json({
                status: 'success',
                message: 'Student enrolled successfully and capacity decreased'
            });
        });
    });
};
const removeStudent = (req, res) => {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;

    if (!courseId || !studentId) {
        return res.status(400).json({ error: 'COURSE_ID and STUDENT_ID are required' });
    }
    const deleteQuery = `DELETE FROM ENROLMENT WHERE COURSE_ID = ? AND STUDENT_ID = ?`;

    db.run(deleteQuery, [courseId, studentId], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        const updateCapacityQuery = `UPDATE COURSES SET CAPACITY = CAPACITY + 1 WHERE COURSE_ID = ?`;
        
        db.run(updateCapacityQuery, [courseId], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update capacity' });
            }

            res.status(200).json({
                status: 'success',
                message: 'Student removed from course successfully and capacity increased'
            });
        });
    });
};

module.exports = {
    getAllEnrolments,
    getStudentCourses,
    getStudentsByCourseid,
    enrollStudent,
    removeStudent
};
