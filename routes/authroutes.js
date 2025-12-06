const express = require('express');
const {login, signUp, getme} = require('../controller/authcontroller');
const authRouter = express.Router();
const {validateSignup} = require('../valid.js');

authRouter.post('/login', login);
authRouter.post('/signup', validateSignup,signUp);
authRouter.get('/me', getme);

module.exports = authRouter;
