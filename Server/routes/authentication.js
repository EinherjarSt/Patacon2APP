const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const ERROR = require('../common/error');

/* POST login. */
app.post('/login', function (req, res) {
    passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            //console.log("login error: %j", err);
            //console.log("login user: %j", user);
            if (err || !user) {
                return res.status(400).json({
                    code: info ? info.code: ERROR.LOGIN_FAILED, 
                    message: info ? info.message : 'Login failed',
                    user: user
                });
            }

            req.login(user, {
                session: false
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(user,
                    process.env.PATACON_JWT_SECRET, {
                        expiresIn: 60 * 60
                    }
                );

              
                return res.json({
                    token
                });
            });
        })
        (req, res);

});


app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).end();
});

module.exports = app;