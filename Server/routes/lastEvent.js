const express = require('express');
const app = express();

const passport = require('passport');
const LastEvent = require('../models/lastEvent');


app.get('/event/getall', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    LastEvent.getAllEvents((err, event) =>{
        if (err){
            console.log(err);
            return res.status(400).json(err);
        }
        return res.json(event);
    });
})

app.get('/eventos/:dispatchId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {


    LastEvent.getAllEventsOfDispatch(req.params.dispatchId, (err, event) =>{
        console.log(err);
        if (err){
            return res.status(400).json(err);
        }
        return res.json(event);
    });
})


app.get('/event/get/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    let id_event = req.params.id;
    LastEvent.getEvent(id_event, (err, event) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(event);
    });
})


module.exports = app;