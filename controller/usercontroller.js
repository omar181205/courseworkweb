const {db}=require('../db');

const Createuser = (req,res) => {
    const {
name,
ID,
email,
role,
Password,
address,
phonenumber,
gender,
passwordChangedAt,
country,


    }=req.body;
const newuser={
id:user.length+1,
name,
ID,
email,
role,
Password,
address,
phonenumber,
gender,
passwordChangedAt,
country,
};

user.push(newuser);
};
module.exports = {Createuser};