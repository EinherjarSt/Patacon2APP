const express = require('express');
const app = express();

const Producer = require('../models/producer');
app.get('/producers', function(req, res){
    console.log("/producer");
    res.send('Hello!');
});