const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const User = require('../models/administrator');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        console.log(`LocalStrategy ${email} : ${password}`);
        User.getAdministrator(email, (err, user) => {
            if (err) {
                return done(err);
            }
            user.verifyPassword(password, (error, isPassword) => {
                if (error){
                    return done(null, false, {
                        error: {
                            message: error.message
                        }
                    });
                }
                if (!isPassword) {
                    return done(null, false, {
                        error: {
                            message: "Username or (password) incorrect"
                        }
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
        console.log("JWTStrategy %j ", jwtPayload)
        done(null, true);
        // User.findOne({
        //     username: jwtPayload.name
        // }, function (err, user) {
        //     if (err) {
        //         console.log("err jwt %j ",err);
        //         return done(err);
        //     }
        //     if (!user) {
        //         return done(null, false);
        //     }
        //     return done(null, {name : user.name});
        // });
        // //find the user in db if needed
        // return UserModel.findOneById(jwtPayload.id)
        //     .then(user => {
        //         return done(null, user);
        //     })
        //     .catch(err => {
        //         return done(err);
        //     });
    }
));