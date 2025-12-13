const express = require('express');
const {
    getMyMessages,
    sendMessage
} = require('../controller/messagecontroller');
const { verifyToken } = require('../controller/authcontroller');

const messageRouter = express.Router();

messageRouter.get('/me', verifyToken, getMyMessages);

messageRouter.post('/', verifyToken, sendMessage);

module.exports = messageRouter;
