require('./config/config');
require('./config/passport');
var cleanup = require('./cleanup').Cleanup(cleanup);
const mysql = require('./mysql/mysql');
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

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});

mysql.pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

function cleanup() {
  console.log("Clean pool of connections");
  mysql.pool.end();
}

// --------------------------- GPS --------------------------------//
var gps = require("gps-tracking");
var gpsOptions = {
  'debug': true,
  'port': 9001,
  'device_adapter': require('./gps/adapter-tk103')
}

var server = gps.server(gpsOptions, function (device, connection) {
  device.on("login_request", function (device_id, msg_parts) {

    // Some devices sends a login request before transmitting their position
    // Do some stuff before authenticate the device... 

    // Accept the login request. You can set false to reject the device.
    console.log("login_request");
    console.log(msg_parts);
    this.login_authorized(true);
  });

  device.on("login", function () {
    console.log("Hi! i'm " + device.uid);
  });

  //PING -> When the gps sends their position  
  device.on("ping", function (gpsData) {

    //After the ping is received, but before the data is saved
    console.log('data');
    console.log(gpsData);
    return gpsData;
  });

  connection.on("data", function (data) {

    //After the ping is received, but before the data is saved
    // console.log("connection.data");
    // console.log(data.toString().trim());
    return data;
  })

});