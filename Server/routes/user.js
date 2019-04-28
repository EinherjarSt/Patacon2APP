const express = require('express');
const app = express();

const passport = require('passport');

app.get('/user/create', passport.authenticate('jwt', { session: false}), (req, res) =>{

    return res.json(data);
})

module.exports = app;