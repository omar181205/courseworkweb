const express = require('express')
const app = express();
// const TripRouter=require('./routes/TripRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/authroutes.js');
const userrouter = require('./routes/userrouter.js');
const Path = require('path');
// const UserRouter=require('./routes/UserRouter');
dotenv.config();
app.use(cors());

app.use(express.json());

// app.use('/api/v1/trips',TripRouter);
app.use(express.static(Path.join(__dirname,'public')));
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use('/auth', authRouter);
// app.use('/apl/v1/users',UserRouter);
module.exports=
{
    app
};