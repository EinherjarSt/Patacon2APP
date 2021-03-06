const express = require("express");
const app = express();
const passport = require("passport");
const Dispatch = require("../models/dispatch");
const bcrypt = require('bcrypt');

app.get('/despachos/:planification_id', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    Dispatch.getDispatches(req.params.planification_id, (err, dispatches) =>{
        if (err){
            console.log(err);
            return next(err);
        }
        return res.json(dispatches);
    });
})

app.get('/despachos_completos', (req, res, next) => {

    Dispatch.getDispatchesWithFullInfo((err, dispatches) =>{
        if (err){
            console.log(err);
            return next(err);
        }
        return res.json(dispatches);
    });
})

app.get('/despachos_completos/:id', (req, res, next) => {

    Dispatch.getDispatchWithFullInfo(req.params.id, (err, dispatches) =>{
        console.log(err);
        if (err){
            return next(err);
        }
        return res.json(dispatches);
    });
})



app.get('/despachos/:id', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {

    Dispatch.getDispatchById(req.params.id, (err, dispatch) =>{
        if (err){
            console.log(err);
            return next(err);
        }
        return res.json(dispatch);
    });
})


app.put('/despachos/registrar', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
        

    let newDispatch = new Dispatch(-1, body.driverReference, body.truckReference, body.planificationReference, 
        body.shippedKilograms, body.arrivalAtPataconDatetime, body.arrivalAtVineyardDatetime,
        body.containerType, body.status);
    Dispatch.registerDispatch(newDispatch, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Dispatch has been added"
        });
    });
    
})

app.put('/despachos/editar/:id', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
        

    let dispatch = new Dispatch(req.params.id, body.driverReference, body.truckReference, body.planificationReference, 
        body.shippedKilograms, body.arrivalAtPataconDatetime, body.arrivalAtVineyardDatetime,
        body.containerType, body.status);
    Dispatch.editDispatch(dispatch, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Dispatch has been modified"
        });
    });
    
})



app.put('/despachos/empezar/:idDispatch', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    Dispatch.startDispatch(req.params.idDispatch, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Dispatch is terminated."
        });
    });
    
})

app.put('/despachos/terminar/:id', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {

    let body = req.body;
    Dispatch.terminateDispatch(req.params.id, body.endStatus, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Dispatch is terminated."
        });
    });
    
})

app.delete('/despachos/eliminar/:id', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    Dispatch.deleteDispatch(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Dispatch has been deleted"
        });
    });
    
})


module.exports = app;