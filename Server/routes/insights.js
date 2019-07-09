const express = require("express");
const app = express();
const passport = require("passport");
const InsightsData = require("../models/insights");
const bcrypt = require('bcrypt');



app.put('/informacion/cantidad_de_mensajes', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    
    InsightsData.getNumberOfMessagesSentInDateRange(body.startDate, body.endDate, (err, insightData) => {
        if (err) {
            return next(err);
        }
        return res.json(insightData);
    });
})


app.put('/informacion/cantidad_despachos_exitosos', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    
    InsightsData.getDispatchesCountInDateRange('Terminado', body.startDate, body.endDate, (err, insightData) => {
        if (err) {
            return next(err);
        }
        return res.json(insightData);
    });
})

app.put('/informacion/cantidad_despachos_cancelados', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    
    InsightsData.getDispatchesCountInDateRange('Cancelado', body.startDate, body.endDate, (err, insightData) => {
        if (err) {
            return next(err);
        }
        return res.json(insightData);
    });
})

app.put('/informacion/despachos_por_fecha', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    InsightsData.getDispatchesInDateRangeInsights(body.startDate, body.endDate, (err, insightData) => {
        if (err) {
            return next(err);
        }
        return res.json(insightData);
    });
})

app.get('/informacion/:dispatchId', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let dispatchId = req.params.dispatchId;
    InsightsData.getDispatchInsightsData(dispatchId, (err, insightData) => {
        if (err) {
            return next(err);
        }
        return res.json(insightData);
    });
})

app.put('/informacion/editar_tiempo_por_estado/:dispatchId', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;

    InsightsData.editTimesPerStatusOfDispatch(req.params.dispatchId, body.stoppedTime, body.inUnloadYardTime, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "El tiempo que estuve cada el despacho en cada estado ha sido actualizado"
        });
    });
    
})

app.put('/informacion_mensaje/editar/:id_despacho', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    
    InsightsData.editLastMessageSentData(req.params.id_despacho, body.messageDateTime, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Dispatch has been modified"
        });
    });
    
})

app.put('/despachos/:id/incrementar_contador_de_visitas', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let body = req.body;
    
    InsightsData.incrementDispatchVisitsCounter(req.params.id, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Dispatch has been modified"
        });
    });
    
})


module.exports = app;
