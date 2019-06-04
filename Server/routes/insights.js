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


app.put('/informacion/editar_tiempo_por_estado/:dispatchId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("Llega para editar el tiempo de los estados");
    console.log("Tiempo detenido: " + body.stoppedTime);
    console.log("Tiempo en patio: " + body.inUnloadYardTime);
    InsightsData.editTimesPerStatusOfDispatch(req.params.dispatchId, body.stoppedTime, body.inUnloadYardTime, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "El tiempo que estuve cada el despacho en cada estado ha sido actualizado"
        });
    });
    
})

app.put('/informacion_mensaje/editar/:id_despacho', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let body = req.body;
    
    InsightsData.editLastMessageSentData(req.params.id_despacho, body.messageDateTime, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Dispatch has been modified"
        });
    });
    
})


module.exports = app;
