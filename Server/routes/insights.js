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


module.exports = app;
