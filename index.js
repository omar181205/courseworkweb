const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/authroutes.js');
const userRouter = require('./routes/userroutes.js');
const courseRouter = require('./routes/courseroutes.js');
const enrolmentRouter = require('./routes/enrolmentroutes.js');
const Path = require('path');
const cookieParser = require('cookie-parser')

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static(Path.join(__dirname,'public')));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/enrolments', enrolmentRouter);

module.exports = {
    app
};