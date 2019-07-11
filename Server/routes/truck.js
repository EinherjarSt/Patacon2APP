const express = require('express');
const app = express();
const passport = require('passport');
const Truck = require('../models/truck');

app.put('/truck/add',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res, next) => {
        let body = req.body;
        let newTruck = new Truck(0, body.licencePlate, body.ref_driver, body.ref_gps,
        body.brand, body.model, body.year, body.maxLoad, 
        body.owner, body.color);
        Truck.addTruck(newTruck, (err, result) => {
            if (err) {
                return next(err);
            }
            return res.json({
                message: "Truck has been added",
                result: result
            });
        });
    }
);
app.post('/truck/update',
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res, next) => {
        let body = req.body;
        let updatedTruck = new Truck(body.id_truck, body.licencePlate, body.driverReference, body.gpsReference,
                            body.brand, body.model, body.year, body.maxLoad, body.owner, body.color);
        Truck.updateTruck(updatedTruck, (err, result) => {
            if (err) {
                return next(err);
            }
            return res.json({
                message: "Truck has been modified"
            });
        });
    }
);

app.post('/truck/disable', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    let disabled = body.disabled === 'true' ? true : false;
    Truck.disableTruck(body.licencePlate, disabled, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: "Truck has been deleted (disabled)"
        });
    });
})

app.get('/truck/getall',
    passport.authenticate("jwt", {
        session: false
    }),

    (req, res, next) => {
        Truck.getAllTrucks((err, trucks) => {
            if (err) {
                return next(err);
            }
            return res.json(trucks);
        });
    }
);

app.get('/truck/get/:licencePlate', (req, res, next) => {
    let licencePlate = req.params.licencePlate;
    Truck.getTruckByLicencePlate(licencePlate, (err, truck) => {
        if (err) {
            return next(err);
        }
        return res.json(truck);
    });
})

module.exports = app;