const express = require("express");
const app = express();
const passport = require("passport");
const Planification = require("../models/planification");

app.put("/planification/add",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log(req.body);
        let body = req.body;
        let newPlanification = new Planification(body.planification_id,body.ref_producer,body.ref_location,body.kilograms,
            body.containerType,body.harvestingType,body.quality,body.freight,body.comment,body.grapeVariety,body.date);
        
            Planification.addPlanification(newPlanification, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Planification has been added"
            });
        });
    }
);

app.post("/planification/update",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("planification/update");
        console.log(req.body);

        let body = req.body;
        let updatedPlanification = new Planification(body.planification_id,body.ref_producer,body.ref_location,body.kilograms,
            body.containerType,body.harvestingType,body.quality,body.freight,body.comment,body.grapeVariety,body.date);

        Planification.updatePlanification(updatedPlanification, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json({
                message: "Planification has been modified"
            });
        });
    }
);

app.get("/planification/getall",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("planification/getall");
        Planification.getAllPlanifications((err, planifications) => {
            console.log(err);
            if (err) {
                return res.status(400).json(err);
            }
            return res.json(planifications);
        });
    }
);

module.exports = app;