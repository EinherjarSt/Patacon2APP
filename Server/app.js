require('./config/config');
require('./config/passport');
require('./gps/indexGPS');
var cleanup = require('./cleanup').Cleanup(cleanup);
const mysql = require('./common/mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});

mysql.pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

function cleanup() {
  console.log("Clean pool of connections");
  mysql.pool.end();
}