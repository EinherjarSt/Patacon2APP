const express = require('express');

const app = express();

app.use(require('./authentication'));
app.use(require('./user'));
app.use(require('./driver'));

module.exports = app;