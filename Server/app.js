require('./config/config');
require('./config/passport');
var cleanup = require('./cleanup').Cleanup(cleanup);
const mysql = require('./mysql/mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

function cleanup (){
    console.log("Clean pool of connections");
    mysql.pool.end();
}

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

mysql.pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
  });