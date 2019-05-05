const express = require('express');
const app = express();

const passport = require('passport');
const User = require('../models/user');
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
    console.log(req.params);
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
        let updatedUser = new User(req.params.run, body.name, body.surname, body.surname2, body.email, body.password, body.position);
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

app.post('/user/update-status', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("user/update");
    console.log(req.params);
    console.log(req.body);

    let body = req.body;
    let status = body.status == 'true' ? true:false;
    User.update_user_status(body.run, status, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "User has been modified"
        });
    });
})

app.get('/user/getall', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("user/getall");
    console.log(req.body);

    let body = req.body;

    User.getAllUsers((err, users) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(users);
    });
})


module.exports = app;