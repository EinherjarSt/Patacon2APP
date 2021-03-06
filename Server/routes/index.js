const express = require('express');

const app = express();
app.get("/", (req, res, next) => res.json({message: "It is api for patacon"}));
app.use(require('./authentication'));
app.use(require('./user'));
app.use(require('./driver'));
app.use(require('./dispatch'));
app.use(require('./truck'));
app.use(require('./producers'));
app.use(require('./gps'));
app.use(require('./resetPassword'));
app.use(require('./lastEvent'));
app.use(require('./insights'));
app.use(require('./sms'));
app.use(require('./route'));
app.use(require('./planification'));

//app.use(require('./reset-password'));

module.exports = app;