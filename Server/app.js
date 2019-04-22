require('./config/config');
require('./config/passport');

const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(function (req,res, next){
   res.setHeader('Access-Control-Allow-Origin','*')
   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,PUT,DELETE,PATH')
   res.setHeader('Access-Control-Allow-Header','Content-Type')
   next();
})

app.use(function (req,res, next){
    console.log(req.body);
    next();
})

// Configuración global de rutas
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});