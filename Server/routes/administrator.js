const express = require('express');
const app = express();

const passport = require('passport');
const Administrator = require('../models/administrator');
const bcrypt = require('bcrypt');

app.post('/administrator/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("administrator/create");
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

        let newAdministrator = new Administrator(body.run, body.name, body.email, hashedPassword, body.position);
        Administrator.addAdministrator(newAdministrator, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "User has been added"
            });
        });
    });
})

app.post('/administrator/update/:run', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("administrator/update");
    console.log(req.params);
    console.log(req.body);

    let body = req.body;
    if (body.password.trim() !== '') {
        let salt = parseInt(process.env.BCRYPT_SALT);
        bcrypt.hash(body.password, salt, function (err, hashedPassword) {
            if (err) {
                return res.status(400).json(err);
            }
            let newAdministrator = new Administrator(body.run, body.name, body.email, hashedPassword, body.position);
            Administrator.addAdministrator(newAdministrator, (err, result) => {
                if (err) {
                    return res.status(400).json(err);
                }
                return res.json({
                    message: "User has been added"
                });
            });
        });
    } else {
        let updatedAdministrator = new Administrator(req.params.run, body.name, body.email, body.password, body.position);
        Administrator.updateAdministrator(updatedAdministrator, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "User has been modified"
            });
        });
    }
})


module.exports = app;