require('./config/config');
require('./config/passport');
require('./gps/indexGPS');
var cleanup = require('./cleanup').Cleanup(cleanup);
const mysql = require('./common/mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const ERROR = require('./common/error');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use((req, res,next) =>{
  // console.log(req.body);
  next();
})

// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

app.use((err, req, res, next) =>{
  if (!err.sql){
    return res.status(400).json(err);
  }
  next();
  return res.status(400).json({code: ERROR.UNKNOWN_ERROR , message:"Hubo un error al ejecutar la accion deseada"});
})

app.listen(process.env.PATACON_PORT, "0.0.0.0", () => {
  console.log('Escuchando puerto: ', process.env.PATACON_PORT);
});

mysql.pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

function cleanup() {
  console.log("Clean pool of connections");
  mysql.pool.end();
}