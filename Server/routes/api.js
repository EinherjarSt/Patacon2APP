const express = require('express');
const app = express();

const passport = require('passport');

app.get('/camiones', passport.authenticate('jwt', { session: false}), (req, res) =>{
    let data = [{
        patente: 'ABC',
        chofer: 'Alfonso' 
    },{
        patente: 'CDE',
        chofer: 'Benjamin' 
    }]
    console.log("camiones: " + data);
    return res.json(data);
})

module.exports = app;