const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//const passport = require('passport');
//const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
//const bcrypt = require('bcrypt');

app.get('/resetpassword/get/:email', function (req, res) {
    let email = req.params.email;
    ResetPassword.getUserByEmail(email, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        /*ResetPassword.createVerificationCode(email, user => {
            if (err){
                return res.status(400).json(err);
            }
        });*/
        //return true;
        return res.json(result);
    });
})

app.get('/resetpassword/get1/:verification_code', function (req, res) {
    let verification_code = req.params.verification_code;
    console.log("/resetpassword/get/verification_code");
    //console.log(verification_code);
    ResetPassword.getVerificationCode(verification_code, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(result);
    });
})

app.put('/resetpassword/addcode', function (req, res) {
    //console.log("user/create");
    //console.log("addcode");
    //console.log(req.body);
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

app.put('/resetpassword/addpassword', function (req, res) {
    //console.log("user/create");
    //console.log("addnewpassword");
    // console.log(req.body);
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
        let newPassword = new ResetPassword(null, hashedPassword, body.verification_code);
        ResetPassword.addNewPassword(newPassword, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Code and email has been added"
            });
        });
    })
})
    /* let salt = parseInt(process.env.BCRYPT_SALT);
    bcrypt.hash(body.password, salt, function (err, hashedPassword) {
        if (err) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }  */

/* app.get('/resetpassword/verification/:ver_code', function (req, res) {
    //console.log("user/create");
    console.log(req.body);
    //let body = req.body;
    /* let salt = parseInt(process.env.BCRYPT_SALT);
    bcrypt.hash(body.password, salt, function (err, hashedPassword) {
        if (err) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }  
    let code = req.params.code;
    ResetPassword.getEmailByCode(code, (err, resetPassword) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(resetPassword);
    });
    }) */

module.exports = app;