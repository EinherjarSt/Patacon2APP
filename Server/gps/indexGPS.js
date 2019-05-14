var gps = require("gps-tracking");
var GPSDevice = require("../models/gps");
var gpsOptions = {
    'debug': true,
    'port': 9001,
    'device_adapter': require('./adapter-tk103'),
    'host': '0.0.0.0'
}

// Global Variable
GPS_POSITIONS = {};

var server = gps.server(gpsOptions, function (device, connection) {
    
    device.on("login_request", function (device_id, msg_parts) {
        GPSDevice.getGPS(device_id, (err, gpsDevice) => {
            if (err) {
                console.log("gps error");
                console.log(err);
                return;
            }

            this.login_authorized(true);
            device.emit("login");
        })
    });

    device.on("login", function () {
        console.log("Hi! i'm " + device.uid);
        device.send(`**,imei:${device.uid},C,15s`);
        device.send(`**,imei:${device.uid},I,-4`);
        device.send(`**,imei:${device.uid},B`);

    });

    //PING -> When the gps sends their position  
    device.on("ping", function (gpsData) {

        //After the ping is received, but before the data is saved
        console.log('data');
        console.log(gpsData);
        // Global Object
        GPS_POSITIONS[device.uid] = {
            signal: gpsData.signal,
            latitude: gpsData.latitude,
            longitude: gpsData.longitude,
            velocity: gpsData.velocity,
        };
        return gpsData;
    });

    connection.on('close', (hadError) =>{
        console.log(`connection \with device ${device.uid} is close`);
        delete GPS_POSITIONS[device.uid];
    })
});