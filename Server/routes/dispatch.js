const express = require("express");
const app = express();
const passport = require("passport");
const Dispatch = require("../models/dispatch");
const bcrypt = require('bcrypt');

app.get('/despachos', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Dispatch.getDispatches((err, dispatches) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(dispatches);
    });
})

app.get('/despachos/despacho', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Dispatch.getDispatch(req.params.id, (err, dispatch) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(dispatch);
    });
})


app.put('/despachos/registrar', passport.authenticate('jwt', {
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

app.delete('/despachos/eliminar/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("ACCAAAA");
    console.log(req);
    Dispatch.deleteDispatch(req.params.id, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Dispatch has been deleted"
        });
    });
    
})


module.exports = app;