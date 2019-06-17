const express = require('express');
const app = express();

//const passport = require('passport');
//const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
//const bcrypt = require('bcrypt');

/* app.get('/resetpassword/get/:email', function (req, res) {
    let email = req.params.email;
    ResetPassword.getUserByEmail(email, (err, thereIsAnUser) => {
        if (err) {
            return res.status(400).json(err);
        }
        ResetPassword.createVerificationCode(email, user => {
            if (err){
                return res.status(400).json(err);
            }
        }); 
        return thereIsAnUser;
        //return true;
    });
}) */

app.put('/resetpassword/add', function (req, res) {
    //console.log("user/create");
    console.log(req.body);
    let body = req.body;
    /* let salt = parseInt(process.env.BCRYPT_SALT);
    bcrypt.hash(body.password, salt, function (err, hashedPassword) {
        if (err) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }  */

        let newCode = new ResetPassword(body.email, null, body.verification_code);
        ResetPassword.addVerificationCode(newCode, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Code and email has been added"
            });
        });
    })  

module.exports = app;