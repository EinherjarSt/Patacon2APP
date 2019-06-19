var gps = require("gps-tracking");
var GPSDevice = require("../models/gps");
var gpsOptions = {
    'debug': true,
    'port': 9001,
    'device_adapter': require('./adapter-tk103'),
    'host': '0.0.0.0'
}

// Global var that contain the route and info of gps
GPS_DATA = {};
let geofenceTimer;
let outOfRouteTimer;

var server = gps.server(gpsOptions, function (device, connection) {
    geofenceTimer = setInterval(geofence, 1 * 1000 * 60);
    outOfRouteTimer = setInterval(outOfRoute, 1 * 1000 * 60);

    device.on("login_request", function (device_id, msg_parts) {
        GPSDevice.getGPSWithRoute(device_id, (err, gpsResult) => {
            if (err) {
                console.log("gps error");
                console.log(err);
                return;
            }

            // Fill the basic of information to send
            GPS_DATA[device.uid] = {
                location: null,
                route: JSON.parse(gpsResult.route),
                dispatch: gpsResult.dispatch
            }

            this.login_authorized(true);
            device.emit("login");
        })

    });

    device.on("login", function () {
        console.log("Hi! i'm " + device.uid);
        device.send(`**,imei:${device.uid},C,5s`);
        device.send(`**,imei:${device.uid},I,-4`);
    });

    //PING -> When the gps sends their position  
    device.on("ping", function (gpsData) {

        //After the ping is received, but before the data is saved
        console.log('data');
        console.log(gpsData);

        if (gpsData.signal === 'F'){
            GPS_DATA[device.uid].location = {
                updated: true,
                latitude: gpsData.latitude,
                longitude: gpsData.longitude,
                velocity: gpsData.velocity,
            };
        }
        else if (GPS_DATA[device.uid].location){
            GPS_DATA[device.uid].location.updated = false;
        }
    });

    connection.on('close', (hadError) => {
        console.log(`connection \with device ${device.uid} is close`);
        delete GPS_DATA[device.uid];
    })
});




// test routes with turff in backend
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc'
});
const dispatch = require('../models/dispatch');
const lastEvent = require('../models/lastEvent');

const STATUS = {
    LOADING: 'Cargando',
    TRAVELING_TO_PATACON: 'En camino a Patacon',
    IN_PATIO: 'En patio',
    TRAVELING_TO_VINEYARD: 'En camino a viña'
}

function outOfRoute() {
    for (const key in GPS_DATA) {
        if (GPS_DATA.hasOwnProperty(key)) {
            const element = GPS_DATA[key];
            const location = element.location;
            const route = element.route;
            const dispatchInfo = element.dispatch;
            console.log("outOfRoute antes de if")
            if (!location || dispatchInfo.status !== STATUS.TRAVELING_TO_PATACON) continue;
            console.log("outOfRoute antes de if")

            googleMapsClient.directions({
                origin: route.start_position,
                destination: route.end_position,
                waypoints: cleanWaypoint(route.waypoint),
                mode: 'driving',
            }, function (err, response) {
                if (response.status === 200) {
                    console.log(response.query);
                    console.log(JSON.stringify(response.json.routes[0].overview_polyline.points));
                    let decodedPoints = polyline.decode(response.json.routes[0].overview_polyline.points);
                    //console.log(decodedPoints);

                    console.log("Calculando");
                    let pt = turf.point([location.latitude, location.longitude]);
                    console.log(pt);
                    let turfLine = turf.lineString(decodedPoints);
                    let distance = turf.pointToLineDistance(pt, turfLine);
                    console.log(distance + " KM");
                    console.log("Deberia haber terminado de calcular");
                    if (distance > 0.5 ){
                        console.log("Escribiendo en last");
                        lastEvent.insertOutOfRouteEvent(dispatchInfo.id_truck, dispatchInfo.id_dispatch, (err, res) => {
                            if (err) {
                                console.log(err);
                            }

                            console.log(res);
                        });
                    }
                } else {
                    alert('Could not display directions due to: ' + status);
                }
            });
        }
    }
}

function cleanWaypoint(waypoints) {
    let cleanWaypoints = [];
    for (const waypoint of waypoints) {
        cleanWaypoints.push(waypoint.location);
    }
    return cleanWaypoints;
}

function geofence() {
    console.log("geofence");
    for (const key in GPS_DATA) {
        if (GPS_DATA.hasOwnProperty(key)) {
            const element = GPS_DATA[key];
            const location = element.location;
            const route = element.route;
            const dispatchInfo = element.dispatch;
            console.log("geofence antes de if")
            if (!location) continue;
            console.log("geofence despues de if")

            let radius = 0.5;
            let options = {
                steps: 10,
                units: 'kilometers',
                properties: {
                    foo: 'bar'
                }
            };
            console.log(location);
            let pt = turf.point([location.latitude, location.longitude]);

            //evaluate geofence in start_position
            let center = [route.start_position.lat, route.start_position.lng];
            console.log("start_position geofence " + center);
            let geofence_vineyard = turf.circle(center, radius, options);

            console.log(turf.booleanPointInPolygon(pt, geofence_vineyard));

            // Evaluate geofence in end_point.
            center = [route.end_position.lat, route.end_position.lng];
            console.log("end_positions geofence " + center);
            let geofence_patacon = turf.circle(center, radius, options);
            console.log(turf.booleanPointInPolygon(pt, geofence_patacon));

            if (turf.booleanPointInPolygon(pt, geofence_vineyard)) {
                if (dispatchInfo.status === STATUS.TRAVELING_TO_VINEYARD) {

                    dispatch.editDispatchStatus(dispatchInfo.id_dispatch, STATUS.LOADING, (err, res) => {
                        console.log("Loading")
                        if (err) {
                            console.log("Error al cambiar estado automaticamente");
                            return;
                        }
                        if (res) {
                            element.dispatch.status = STATUS.LOADING;
                        }
                    })
                }
            } else if (turf.booleanPointInPolygon(pt, geofence_patacon)) {
                if (dispatchInfo.status === STATUS.TRAVELING_TO_PATACON) {
                    dispatch.editDispatchStatus(dispatchInfo.id_dispatch, STATUS.IN_PATIO, (err, res) => {
                        console.log("En patio")
                        if (err) {
                            console.log("Error al cambiar estado automaticamente");
                            return;
                        }
                        if (res) {
                            element.dispatch.status = STATUS.IN_PATIO;
                        }
                    })
                }
            } else if (dispatchInfo.status === STATUS.LOADING) {

                dispatch.editDispatchStatus(dispatchInfo.id_dispatch, STATUS.TRAVELING_TO_PATACON, (err, res) => {
                    console.log("Camino a patacon")
                    if (err) {
                        console.log("Error al cambiar estado automaticamente");
                        return;
                    }
                    if (res) {
                        element.dispatch.status = STATUS.TRAVELING_TO_PATACON;
                    }
                })
            }
        }
    }
}
