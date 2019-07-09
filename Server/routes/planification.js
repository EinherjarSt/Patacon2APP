const express = require("express");
const app = express();
const passport = require("passport");
const Planification = require("../models/planification");

app.put("/planification/add",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res, next) => {
        let body = req.body;
        let kg = parseInt(body.kilograms);
        let rlocation = parseInt(body.ref_location);
        let newPlanification = new Planification("",body.ref_producer,rlocation,kg,
            body.containerType,body.harvestingType,body.quality,body.freight,body.comment,body.grapeVariety,body.date);
        
            Planification.addPlanification(newPlanification, (err, result) => {
            if (err) {
                return next(err);
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
    (req, res, next) => {
        console.log("planification/update");
        console.log(req.body);
        let body = req.body;
        let kg = parseInt(body.kilograms);
        let rlocation = parseInt(body.ref_location);
        let planificationID = parseInt(body.planification_id);
        let updatedPlanification = new Planification(planificationID,body.ref_producer,rlocation,kg,
            body.containerType,body.harvestingType,body.quality,body.freight,body.comment,body.grapeVariety,body.date);

        Planification.updatePlanification(updatedPlanification, (err, result) => {
            if (err) {
                return next(err);
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
    (req, res, next) => {
        console.log("planification/getall");
        Planification.getAllPlanifications((err, planifications) => {
            console.log(err);
            if (err) {
                return next(err);
            }
            return res.json(planifications);
        });
    }
);
app.get("/planification/delete/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res, next) => {
        let idLocation = req.params.id;
        Planification.deletePlanification(idLocation,(err, resp) => {
            console.log(err);
            if (err) {
                return next(err);
            }
            return res.json(resp);
        });
    }
);

module.exports = app;