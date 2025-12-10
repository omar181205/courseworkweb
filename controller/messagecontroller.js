const { db } = require('../db');

// Get messages for logged in user
const getMyMessages = (req, res) => {
    const userId = req.user.id;

    const query = `SELECT * FROM MESSAGES WHERE FROM_USER_ID = ? OR TO_USER_ID = ?`;

    db.all(query, [userId, userId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Messages retrieved successfully',
            messages: rows
        });
    });
};
const sendMessage = (req, res) => {
    const FROM_USER_ID = req.user.id;
    const TO_USER_ID = req.body.TO_USER_ID;
    const MESSAGE_TEXT = req.body.MESSAGE_TEXT;

    if (!TO_USER_ID || !MESSAGE_TEXT) {
        return res.status(400).json({ error: 'TO_USER_ID and MESSAGE_TEXT are required' });
    }

    const checkQuery = `SELECT * FROM MESSAGES WHERE FROM_USER_ID = ? AND TO_USER_ID = ?`;
    
    db.get(checkQuery, [FROM_USER_ID, TO_USER_ID], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            // Conversation exists, append message
            const currentHistory = row.MESSAGES_HISTORY || '';
            const newHistory = currentHistory ? `${currentHistory}|||${MESSAGE_TEXT}` : MESSAGE_TEXT;

            const updateQuery = `UPDATE MESSAGES SET MESSAGES_HISTORY = ? WHERE FROM_USER_ID = ? AND TO_USER_ID = ?`;

            db.run(updateQuery, [newHistory, FROM_USER_ID, TO_USER_ID], function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                }

                res.status(200).json({
                    status: 'success',
                    message: 'Message sent successfully'
                });
            });
        } else {
            // New conversation, create it
            const insertQuery = `INSERT INTO MESSAGES (FROM_USER_ID, TO_USER_ID, MESSAGES_HISTORY) VALUES (?, ?, ?)`;

            db.run(insertQuery, [FROM_USER_ID, TO_USER_ID, MESSAGE_TEXT], function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                }

                res.status(201).json({
                    status: 'success',
                    message: 'Message sent successfully'
                });
            });
        }
    });
};

module.exports = {
    getMyMessages,
    sendMessage
};
