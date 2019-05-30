const express = require("express");
const app = express();
const passport = require("passport");
const Dispatch = require("../models/dispatch");
const bcrypt = require('bcrypt');

app.get('/despachos/:planification_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Dispatch.getDispatches(req.params.planification_id, (err, dispatches) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(dispatches);
    });
})

app.get('/despachos_completos', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Dispatch.getDispatchesWithFullInfo((err, dispatches) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(dispatches);
    });
})

app.get('/despachos_completos/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Dispatch.getDispatchWithFullInfo(req.params.id, (err, dispatches) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(dispatches);
    });
})

app.get('/despachos/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Dispatch.getDispatchById(req.params.id, (err, dispatch) =>{
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

app.put('/despachos/editar/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(req.body);
    let body = req.body;
        

    let dispatch = new Dispatch(req.params.id, body.driverReference, body.truckReference, body.planificationReference, 
        body.shippedKilograms, body.arrivalAtPataconDatetime, body.arrivalAtVineyardDatetime,
        body.containerType, body.status);
    Dispatch.editDispatch(dispatch, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Dispatch has been modified"
        });
    });
    
})

app.delete('/despachos/eliminar/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
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