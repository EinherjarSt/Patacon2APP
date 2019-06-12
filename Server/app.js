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


// test routes with turff in backend
var polyline = require('@mapbox/polyline');
var turf = require('@turf/turf');

googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc'
});

let route = {
	"end_position" : {
		"lat" : -35.078144,
		"lng" : -71.260446
	},
	"start_position" : {
		"lat" : -35.955394,
		"lng" : -72.420513
	},
	"waypoint" : ["-35.6201617, -72.3830878", "-35.2739352, -72.15754720000001", "-35.2103306, -71.41166479999998"]
}


googleMapsClient.directions({
      origin: route.start_position,
      destination: route.end_position,
      waypoints : route.waypoint,
      mode: 'driving',
}, function (err, response) {
  if (response.status === 200) {
    console.log("Aqui debe imprimir");
    console.log(JSON.stringify(response.json.routes[0].overview_polyline.points));
    let decodedPoints = polyline.decode(response.json.routes[0].overview_polyline.points);
    //console.log(decodedPoints);

    console.log("Calculando");
    let pt = turf.point([-35.08159615000258, -71.2880129352319]);
    console.log(pt);
    let turfLine = turf.lineString(decodedPoints);
    let distance = turf.pointToLineDistance(pt, turfLine);
    console.log(distance + " KM");
    console.log("Deberia haber terminado de calcular");
  } else {
    alert('Could not display directions due to: ' + status);
  }
});

// point in polygon (geofence)
let center = [-35.07813750014691, -71.260408789525];
let radius = 2;
let options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
let circle = turf.circle(center, radius, options);

let pt = turf.point([-35.078475535126366, -71.2598133391237]);
console.log(turf.booleanPointInPolygon(pt, circle));
