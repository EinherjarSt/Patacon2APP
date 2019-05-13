const express = require("express");
const app = express();
const passport = require("passport");
const Dispatch = require("../models/dispatch");
const bcrypt = require('bcrypt');

app.get('/despachos', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("despachos");

    Dispatch.getDispatches((err, dispatches) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(dispatches);
    });
})


app.put('/dispatches/register', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(req.body);
    let body = req.body;
        

    let newDispatch = new Dispatch(-1, body.driverReference, body.truckReference, body.planificationReference, 
        body.shippedKilograms, body.arrivalAtPataconDatetime, body.arrivalAtVineyardDatetime,
        body.containerType, body.status);
    Dispatch.registerDispatch(newDispatch, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Dispatch has been added"
        });
    });
    
})


module.exports = app;