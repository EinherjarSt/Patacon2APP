const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');

app.get('/resetpassword/get/:email', function (req, res) {
    let email = req.params.email;
    ResetPassword.getUserByEmail(email, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
})

app.get('/resetpassword/get1/:verification_code', function (req, res) {
    let verification_code = req.params.verification_code;
    console.log("/resetpassword/get/verification_code");
    ResetPassword.getVerificationCode(verification_code, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
})

app.put('/resetpassword/addcode', function (req, res) {
    let body = req.body;

        let newCode = new ResetPassword(null, null, null, null, body.email, null, null, null, body.verification_code)
        //let newCode = new ResetPassword(body.email, null, body.verification_code);
        ResetPassword.addVerificationCode(newCode, (err, result) => {
            if (err) {
                return next(err);
            }
            return res.json({
                message: "Code and email has been added"
            });
        });
    })  

app.put('/resetpassword/addpassword', function (req, res) {
    let body = req.body;
    let salt = parseInt(process.env.BCRYPT_SALT);
    bcrypt.hash(body.password, salt, function (err, hashedPassword) {
        if (err) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
        let newPassword = new ResetPassword(null, null, null, null, body.email, hashedPassword, null, null, body.verification_code);
        //let newPassword = new ResetPassword(null, hashedPassword, body.verification_code);
        ResetPassword.addNewPassword(newPassword, (err, result) => {
            if (err) {
                return next(err);
            }
            return res.json({
                message: "Code and email has been added"
            });
        });
    })
})

module.exports = app;