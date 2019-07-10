const express = require('express');
const app = express();

const passport = require('passport');
const GPSDevice = require('../models/gps');

app.put('/gps/add', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("gps/add");
    console.log(req.body);
    let body = req.body;

    let newGPS = new GPSDevice(body.imei, body.simNumber, body.brand, body.model);
    GPSDevice.addGPS(newGPS, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "GPS has been added"
        });
    });
})

app.post('/gps/update', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("gps/update");
    console.log(req.body);

    let body = req.body;
    
    let updatedGPS = new GPSDevice(body.imei, body.simNumber, body.brand, body.model);
    GPSDevice.updateGPS(updatedGPS, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "GPS has been modified"
        });
    });
})

app.get('/gps/get/:imei', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("gps/update");

    let imei = req.params.imei;
    GPSDevice.getGPS(imei, (err, gps) => {
        if (err) {
            return next(err);
        }
        return res.json(gps);
    });
})

app.get('/gps/getall', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    console.log("gps/getall");

    GPSDevice.getAllGPS((err, gps) =>{
        if (err){
            return next(err);
        }
        return res.json(gps);
    });
})

app.get('/gps/getposition', (req, res) => {
    let gps;
    try{
        gps = req.query['gps'];
        console.log("query gps/getposition: " + gps);
        if (gps === undefined || gps == '[]'){
            return res.json({});
        }
        let gpsArray = JSON.parse(gps);
        console.log(GPS_DATA);
        let sendData = {};
        for (const imei of gpsArray) {
            if(GPS_DATA[imei]){
                sendData[imei] = GPS_DATA[imei];
            }
        }
        return res.json(sendData);
    }
    catch{
        return res.status(400).json({message: "Error en los parametros enviados"});
    }
})

app.post('/gps/delete', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    GPSDevice.deleteGPS(body.imei, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "GPS device has been deleted"
        });
    });
})

module.exports = app;