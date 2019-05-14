const express = require("express");
const app = express();
const passport = require("passport");
const Driver = require("../models/driver");

app.put("/driver/add",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log(req.body);
        let body = req.body;
        let newDriver = new Driver(body.run, body.name, body.surname, body.surname2, body.phoneNumber);
        Driver.addDriver(newDriver, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Driver has been added"
            });
        });
    }
);

app.post("/driver/update",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("driver/update");
        console.log(req.body);

        let body = req.body;
        let updatedDriver = new Driver(body.run, body.name, body.surname, body.surname2, body.phoneNumber);
        Driver.updateDriver(updatedDriver, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Driver has been modified"
            });
        });
    }
);

app.post('/driver/disable', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("driver/disable");
    console.log(req.body);+
    console.log("borrar");
    console.log(req.body.status);
    let body = req.body;
    let disabled = body.disabled === 'true' ? true : false;
    Driver.disableDriver(body.run, disabled, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            message: "Driver has been modified"
        });
    });
})

app.get('/driver/get/:run', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let run = req.params.run;
    Driver.getDriver(run, (err, driver) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(driver);
    });
})

app.get("/driver/getall",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("driver/getall");
        Driver.getAllDrivers((err, drivers) => {
            console.log(err);
            if (err) {
                return res.status(400).json(err);
            }
            return res.json(drivers);
        });
    }
);

module.exports = app;