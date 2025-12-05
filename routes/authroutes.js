const express = require('express');
const {login, signUp, getme} = require('../controller/authcontroller');
const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signUp);
authRouter.get('/me', getme);

module.exports = authRouter;