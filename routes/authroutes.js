const express = require('express');
const {login, signUp,getme} =  require('../controller/authcontroller');
const authrouter = express.Router();
authrouter.post('/login', login);
authrouter.post('/signup', signUp);
authrouter.get('/me', getme);
module.exports = authRouter;