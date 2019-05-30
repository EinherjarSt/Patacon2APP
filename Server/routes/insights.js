const express = require("express");
const app = express();
const passport = require("passport");
const InsightsData = require("../models/insights");
const bcrypt = require('bcrypt');



app.get('/informacion/:dispatchId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let dispatchId = req.params.dispatchId;
    InsightsData.getDispatchInsightsData(dispatchId, (err, insightData) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(insightData);
    });
})

app.put('/despachos/informacion/:id', passport.authenticate('jwt', {
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


module.exports = app;
