const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/user');
const ERROR = require('../common/error');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        //console.log(`LocalStrategy ${email} : ${password}`);
        User.getUserByEmail(email, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user.disabled) {
                return done(null, false, {
                    code: ERROR.LOGIN_FAILED,
                    message: "Login Failed (deshabilitado)"
                });
            }
            user.verifyPassword(password, (error, isPassword) => {
                if (error) {
                    console.log(error);
                    return done(null, false, {
                        code: ERROR.LOGIN_FAILED,
                        message: error.message
                    });
                }
                if (!isPassword) {
                    return done(null, false, {
                        code: ERROR.LOGIN_FAILED,
                        message: "Login Failed (password)"
                    });
                }
                return done(null, {
                    run: user.run,
                    name: user.name,
                    email: user.email,
                    position: user.position,
                });

            });
        });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (jwtPayload, done) {
        //console.log("JWTStrategy %j ", jwtPayload)
        done(null, true);
       
    }
));