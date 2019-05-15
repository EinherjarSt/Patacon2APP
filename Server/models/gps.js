const pool = require('../mysql/mysql').pool;

class GPSDevice {
    constructor(imei, simNumber, brand, model) {
        this.imei = imei;
        this.simNumber = simNumber;
        this.brand = brand;
        this.model = model;
    }

    static getGPS(imei, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM gps WHERE imei = ?`, [imei], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({message : `Imei ${imei} don't registered`});
            }
            if (results.length > 1) {
                return callback({message : "There is an error in database because the gps imei is not unique"});
            }
            let result = results[0];
            return callback(null, new GPSDevice(result.imei, result.simNumber, result.brand, result.model));
        });
    }

    static getAllGPS(callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM gps`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let gpsDevice = []
            for (const device of results) {
                gpsDevice.push(new GPSDevice(device.imei, device.simNumber, device.brand, device.model));
            }
            return callback(null, gpsDevice);
        });
    }

    static updateGPS(gpsDevice, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL update_gps(?, ?, ?, ?)`, [
            gpsDevice.imei,
            gpsDevice.simNumber,
            gpsDevice.brand,
            gpsDevice.model
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({ message: "This gps don't exist"});
            }
            return callback(null, true);
        });
    }

    static addGPS(gpsDevice, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL add_gps(?, ?, ?, ?)`, [
            gpsDevice.imei,
            gpsDevice.simNumber,
            gpsDevice.brand,
            gpsDevice.model
        ], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);
        });
    }

    static deleteGPS(run, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL delete_gps(?)`, [
           run
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({ message: "This gps don't exist"});
            }
            return callback(null, true);
        });
    }

}

module.exports = GPSDevice;