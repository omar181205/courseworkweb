const express = require('express');
const {
//   createuser,
//   retrieveuser,
//   retrieveuserbyid,
//   updateuserbyid,
//   deleteuserbyid,
Createuser,

} = require('../controller/usercontroller');

const userrouter = express.Router();

userrouter
.route('/')
.post(Createuser)
// .get(retrieveuser);

// userRouter
// .route('/:id')
// .get(retrieveuserbyid)
// .put(updateuserbyid)
// .delete(deleteuserbyid);

module.exports = userrouter;