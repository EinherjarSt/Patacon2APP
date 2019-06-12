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
let outInRouteTimer;

var server = gps.server(gpsOptions, function (device, connection) {

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
                route: gpsResult.route
            }

            this.login_authorized(true);
            device.emit("login");
        })

        if(geofenceTimer){
           geofenceTimer =  setInterval(geofence, 5*1000*60);
        }
        if (outInRoute){
            outInRouteTimer = setInterval(outInRoute, 5*1000*60);
        }
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
        // Global Object. Fill the information that is recived by gps
        GPS_DATA[device.uid].location = {
            signal: gpsData.signal,
            latitude: gpsData.latitude,
            longitude: gpsData.longitude,
            velocity: gpsData.velocity,
        };
    });

    connection.on('close', (hadError) => {
        console.log(`connection \with device ${device.uid} is close`);
        delete GPS_DATA[device.uid];
        if (!Object.hasOwnProperty(GPS_DATA)){
            clearInterval(geofenceTimer);
            clearInterval(outInRouteTimer)
        }
    })
});




// test routes with turff in backend
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc'
});

function outInRoute() {
    for (const key in GPS_DATA) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];

            googleMapsClient.directions({
                origin: element.start_position,
                destination: element.end_position,
                waypoints: cleanWaypoint(element.waypoint),
                mode: 'driving',
            }, function (err, response) {
                if (response.status === 200) {
                    console.log("Aqui debe imprimir");
                    console.log(JSON.stringify(response.json.routes[0].overview_polyline.points));
                    let decodedPoints = polyline.decode(response.json.routes[0].overview_polyline.points);
                    //console.log(decodedPoints);

                    console.log("Calculando");
                    let pt = turf.point([element.location.latitude, element.location.longitude]);
                    console.log(pt);
                    let turfLine = turf.lineString(decodedPoints);
                    let distance = turf.pointToLineDistance(pt, turfLine);
                    console.log(distance + " KM");
                    console.log("Deberia haber terminado de calcular");
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
    for (const key in GPS_DATA) {
        if (GPS_DATA.hasOwnProperty(key)) {
            const element = GPS_DATA[key];
            const route = element.route;
            let radius = 2;
            let options = {
                steps: 10,
                units: 'kilometers',
                properties: {
                    foo: 'bar'
                }
            };

            //evaluate geofence in start_position
            let center = route.start_position;
            let circle = turf.circle(center, radius, options);

            let pt = turf.point([element.location.latitude, element.location.longitude]);
            console.log(turf.booleanPointInPolygon(pt, circle));

            // Evaluate geofence in end_point.
            center = route.end_position;
            circle = turf.circle(center, radius, options);
            pt = turf.point([element.location.latitude, element.location.longitude]);
            console.log(turf.booleanPointInPolygon(pt, circle));
        }
    }
}


/*
// test routes with turff in backend
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc'
});

let route = {
    "end_position": {
        "lat": -35.078144,
        "lng": -71.260446
    },
    "start_position": {
        "lat": -35.955394,
        "lng": -72.420513
    },
    "waypoint": ["-35.6201617, -72.3830878", "-35.2739352, -72.15754720000001", "-35.2103306, -71.41166479999998"]
}


googleMapsClient.directions({
    origin: route.start_position,
    destination: route.end_position,
    waypoints: route.waypoint,
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
let options = {
    steps: 10,
    units: 'kilometers',
    properties: {
        foo: 'bar'
    }
};
let circle = turf.circle(center, radius, options);

let pt = turf.point([-35.078475535126366, -71.2598133391237]);
console.log(turf.booleanPointInPolygon(pt, circle));
*/