const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const passport = require('passport');

/* POST login. */
app.post('/login', function (req, res, next) {
    console.log("/login")

    passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            console.log(err);
            if (err || !user) {
                return res.status(400).json({
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
                    process.env.JWT_SECRET, {
                        expiresIn: 60 * 60
                    }
                );

                return res.json({
                    user,
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