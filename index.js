const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/authroutes.js');
const courseRouter = require('./routes/courseroutes.js');
const enrolmentRouter = require('./routes/enrolmentroutes.js');
const gradeRouter = require('./routes/graderoutes.js');
const messageRouter = require('./routes/messageroutes.js');
const Path = require('path');
const cookieParser = require('cookie-parser')

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static(Path.join(__dirname,'public')));
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/courses', courseRouter);
app.use('/enrolments', enrolmentRouter);
app.use('/grades', gradeRouter);
app.use('/messages', messageRouter);

module.exports = {
    app
};