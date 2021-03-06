const express = require('express');
const app = express();

const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

app.put('/user/add', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("user/create");
    console.log(req.body);
    let body = req.body;
    let salt = parseInt(process.env.PATACON_BCRYPT_SALT);
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
                return next(err);
            }
            return res.json({
                message: "User has been added"
            });
        });
    });
})

app.post('/user/update', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("user/update");
    console.log(req.body);

    let body = req.body;
    if (body.password.trim() !== '') {
        let salt = parseInt(process.env.PATACON_BCRYPT_SALT);
        bcrypt.hash(body.password, salt, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            
            let newUser = new User(body.run, body.name, body.surname, body.surname2, body.email, hashedPassword, body.position);
            User.updateUser(newUser, (err, result) => {
                if (err) {
                    return next(err);
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
                return next(err);
            }
            return res.json({
                message: "User has been modified"
            });
        });
    }
})

app.post('/user/disable', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("user/disable");
    console.log(req.body);+
    console.log(req.body.status);
    let body = req.body;
    let disabled = body.disabled === 'true' ? true : false;
    User.disableUser(body.run, disabled, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "User has been modified"
        });
    });
})

app.get('/user/get/:run', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let run = req.params.run;
    User.getUserByRun(run, (err, user) => {
        if (err) {
            return next(err);
        }
        return res.json(user);
    });
})

app.get('/user/getall', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("user/getall");

    User.getAllUsers((err, users) =>{
        console.log(err);
        if (err){
            return next(err);
        }
        return res.json(users);
    });
})

app.post('/user/remove', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    User.removeUser(body.run, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "User has been removed"
        });
    });
})

app.post('/user/verifyPassword', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("user/verify");

    let body = req.body;
    User.verifyPassword2(body.run, body.password, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
    
})

app.post('/user/updatePassword', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("user/updatePass");
    let body = req.body;
    let salt = parseInt(process.env.PATACON_BCRYPT_SALT);
        bcrypt.hash(body.password, salt, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            
    User.updatePassword(body.run, hashedPassword, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
    });
})

module.exports = app;