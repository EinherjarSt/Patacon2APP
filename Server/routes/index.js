const express = require('express');

const app = express();
app.get("/", (req, res) => res.json({message: "It is api for patacon"}));
app.use(require('./authentication'));
app.use(require('./user'));
app.use(require('./driver'));
app.use(require('./dispatch'));
app.use(require('./trucks'));
app.use(require('./producers'));
app.use(require('./gps'));
app.use(require('./lastEvent'));

module.exports = app;