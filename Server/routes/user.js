const express = require('express');
const app = express();

const passport = require('passport');
const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
const bcrypt = require('bcrypt');

app.put('/user/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("user/create");
    console.log(req.body);
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

        let newUser = new User(body.run, body.name, body.surname, body.surname2, body.email, hashedPassword, body.position);
        User.addUser(newUser, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "User has been added"
            });
        });
    });
})

app.post('/user/update', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("user/update");
    console.log(req.body);

    let body = req.body;
    if (body.password.trim() !== '') {
        let salt = parseInt(process.env.BCRYPT_SALT);
        bcrypt.hash(body.password, salt, function (err, hashedPassword) {
            if (err) {
                return res.status(400).json(err);
            }
            
            let newUser = new User(body.run, body.name, body.surname, body.surname2, body.email, hashedPassword, body.position);
            User.updateUser(newUser, (err, result) => {
                if (err) {
                    return res.status(400).json(err);
                }
                return res.json({
                    message: "User has been modified"
                });
            });
        });
    } else {
        let updatedUser = new User(body.run, body.name, body.surname, body.surname2, body.email, body.password, body.position);
        User.updateUser(updatedUser, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "User has been modified"
            });
        });
    }
})

app.post('/user/disable', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("user/disable");
    console.log(req.body);+
    console.log("borrar");
    console.log(req.body.status);
    let body = req.body;
    let disabled = body.disabled === 'true' ? true : false;
    User.disableUser(body.run, disabled, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "User has been modified"
        });
    });
})

app.get('/user/get/:run', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let run = req.params.run;
    User.getUserByRun(run, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(user);
    });
})

app.get('/user/getall', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("user/getall");

    User.getAllUsers((err, users) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(users);
    });
})

app.post('/user/remove', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let body = req.body;
    User.removeUser(body.run, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "User has been removed"
        });
    });
})

app.post('/user/forgot-password', function (req, res) {
    const email = req.body.email
    User.getUserbyEmail(
        {
            where: {email: email},//checking if the email address sent by client is present in the db(valid)
        })
        .then(function (user) {
            if (!user) {
                return throwFailed(res, 'No hay usuarios con ese correo.')
            }
    //Agregar modelo para tabla de reset passwords en base de datos
    //Se necesita para poder ir haciendo los cambios        
    ResetPassword.findOneUserToChangePassword(
        { 
            where: {userId: user.id, status: 0},    
        }).then(function (resetPassword) 
            {
                if (resetPassword)
                    resetPassword.destroy({
                        where: {
                            id: resetPassword.id
                        }
                    })
                token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
                bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
                    ResetPassword.create({
                        userId: user.id,
                        resetPasswordToken: hash,
                        expire: moment.utc().add(config.tokenExpiry, 'seconds'),
                    }).then(function (item) {
                        if (!item)
                            return throwFailed(res, 'Oops problem in creating new password record')
                        let mailOptions = {
                            from: '"<Reset Password>" patacon.reset@gmail.com',
                            to: user.email,
                            subject: 'Reset your account password',
                            html: '<h4><b>Reset Password</b></h4>' +
                            '<p>To reset your password, complete this form:</p>' +
                            '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
                            '<a href='+ www.patacon.tk/reset-password1 + '></a>' +
                            '<br><br>' +
                            '<p>--Team</p>'
                        }
                        let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
                        if (mailSent) {
                            return res.json({success: true, message: 'Check your mail to reset your password.'})
                        } else {
                            return throwFailed(error, 'Unable to send email.');
                        }
                    })
                })
            });
        })
 })

module.exports = app;