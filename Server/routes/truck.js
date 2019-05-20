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

/* app.post('/truck/delete', 
        passport.authenticate('jwt', {
        session: false
        }),
        (req, res) => {
            console.log("truck/delete");
            console.log(req.body);
            let body = req.body;
            Truck.deleteTruck(body.licencePlate, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Truck has been deleted"
            });
    });
    }
); */

app.post('/truck/update',
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
    Truck.disableTruck(body.licencePlate, disabled, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Truck has been deleted (disabled)"
        });
    });
    console.log("Truck deleted (disabled");
})

app.get('/truck/getall',
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

app.get('/truck/get/:licencePlate', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let licencePlate = req.params.licencePlate;
    Truck.getTruckByLicencePlate(licencePlate, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(user);
    });
})

module.exports = app;