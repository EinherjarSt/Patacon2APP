const express = require('express');

const app = express();

app.use(require('./authentication'));
app.use(require('./api'));
app.use(require('./user'));

module.exports = app;