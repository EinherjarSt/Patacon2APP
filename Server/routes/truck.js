const express = require('express');
const app = express();
const passport = require('passport');
const Truck = require('../models/truck');

app.put('/truck/add',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        console.log("truck/add");
        console.log(req.body);
        let body = req.body;
        let newTruck = new Truck(body.licencePlate, 
        body.brand, body.model, body.year, body.maxLoad, 
        body.owner, body.color);
        Truck.addTruck(newTruck, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Truck has been added"
            });
        });
    }
);

app.delete('/truck/delete', 
        passport.authenticate('jwt', {
        session: false
        }),
        (req, res) => {
            console.log("truck/delete");
            console.log(req.body);
            let body = req.body;
            let truckToDelete = new Truck(body.licencePlate);
            Truck.deleteTruck(truckToDelete, (err, result) => {
                if (err) {
                    return res.status(400).json(err);
                }
                return res.json({
                    message: "Truck has been deleted"
                });
            });
    }
);

app.post("/truck/update",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("truck/update");
        console.log(req.body);

        let body = req.body;
        let updatedTruck = new Truck(body.licencePlate, body.brand, body.model, body.year, body.maxLoad, body.owner, body.color);
        Truck.updateTruck(updatedTruck, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Truck has been modified"
            });
        });
    }
);

app.post('/truck/disable', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("truck/disable");
    console.log(req.body);+
    console.log("borrar");
    console.log(req.body.status);
    let body = req.body;
    let disabled = body.disabled === 'true' ? true : false;
    Truck.disableTruck(body.run, disabled, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Truck has been modified"
        });
    });
})

app.get("/truck/getall",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("truck/getall");
        Truck.getAllTrucks((err, trucks) => {
            console.log(err);
            if (err) {
                return res.status(400).json(err);
            }
            return res.json(trucks);
        });
    }
);

module.exports = app;