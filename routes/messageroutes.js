const express = require('express');
const {
    getMyMessages,
    sendMessage
} = require('../controller/messagecontroller');
const { verifyToken } = require('../controller/authcontroller');

const messageRouter = express.Router();

// Get messages for logged in user
messageRouter.get('/me', verifyToken, getMyMessages);

// Send a message
messageRouter.post('/', verifyToken, sendMessage);

module.exports = messageRouter;
