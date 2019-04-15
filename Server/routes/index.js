const express = require('express');

const app = express();

app.use(require('./authentication'));

module.exports = app;