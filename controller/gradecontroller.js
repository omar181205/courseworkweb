const { db } = require('../db');

// Get all grades for logged in student
const getStudentGrades = (req, res) => {
    const studentId = req.user.id;

    const query = `SELECT * FROM GRADES WHERE STUDENT_ID = ? ORDER BY COURSE_ID ASC`;

    db.all(query, [studentId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Student grades retrieved successfully',
            grades: rows
        });
    });
};

// Get all grades for a specific course
const getCourseGrades = (req, res) => {
    const courseId = req.params.courseId;

    const query = `SELECT * FROM GRADES WHERE COURSE_ID = ? ORDER BY STUDENT_ID ASC`;

    db.all(query, [courseId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Course grades retrieved successfully',
            grades: rows
        });
    });
};

// Create a grade for a student
const createGrade = (req, res) => {
    const STUDENT_ID = req.body.STUDENT_ID;
    const COURSE_ID = req.body.COURSE_ID;
    const GRADE_VALUE = req.body.GRADE_VALUE;

    if (!STUDENT_ID || !COURSE_ID || !GRADE_VALUE) {
        return res.status(400).json({ error: 'STUDENT_ID, COURSE_ID and GRADE_VALUE are required' });
    }

    const query = `INSERT INTO GRADES (STUDENT_ID, COURSE_ID, GRADE_VALUE) VALUES (?, ?, ?)`;

    db.run(query, [STUDENT_ID, COURSE_ID, GRADE_VALUE], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
            status: 'success',
            message: 'Grade created successfully',
            gradeId: this.lastID
        });
    });
};

// Update a student's grade (for teachers)
const updateGrade = (req, res) => {
    const gradeId = req.params.gradeId;
    const GRADE_VALUE = req.body.GRADE_VALUE;

    if (!GRADE_VALUE) {
        return res.status(400).json({ error: 'GRADE_VALUE is required' });
    }

    const query = `UPDATE GRADES SET GRADE_VALUE = ? WHERE GRADE_ID = ?`;

    db.run(query, [GRADE_VALUE, gradeId], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Grade not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Grade updated successfully'
        });
    });
};

module.exports = {
    getStudentGrades,
    getCourseGrades,
    createGrade,
    updateGrade
};
