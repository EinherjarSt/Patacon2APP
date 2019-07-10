const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');

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
                return callback({code: ERROR.NOT_FOUND, message : `El gps ${imei} no se encuentra guardado`});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "El gps ${imei} se encuentra duplicado"});
            }
            let result = results[0];
            return callback(null, new GPSDevice(result.imei, result.simNumber, result.brand, result.model));
        });
    }

    static getGPSWithRoute(imei, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`
            SELECT DISTINCT imei, routes, dispatch.id_dispatch, dispatch.status, truck.licencePlate FROM 
            gps INNER JOIN truck ON gps.imei = truck.ref_gps
            INNER JOIN dispatch ON truck.id_truck = dispatch.ref_truck
            INNER JOIN planification ON dispatch.ref_planification = planification.planification_id
            INNER JOIN route ON planification.ref_location = route.ref_location
            WHERE imei = ? AND dispatch.status <> 'Pendiente' && dispatch.status <> 'Cancelado' && dispatch.status <> 'Terminado'`, [imei], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : `El gps ${imei} no se encuentra guardado`});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : `El gps ${imei} se encuentra duplicado`});
            }
            let result = results[0];
            return callback(null, {imei : result.imei, route: result.routes, dispatch:{id_dispatch: result.id_dispatch, licensePlate: result.licencePlate, status: result.status}});
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

    static getAllGPS2(callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM gps WHERE has_truck_assigned = 0`, function (err, results, fields) {
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
                return callback({code: ERROR.NOT_FOUND, message: "El gps ${imei} no existe"});
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
                    return callback({code: ERROR.ER_DUP_ENTRY, message : 'El IMEI ya se encuentra utilizado.'});
                }
                return callback(err);
            }
            return callback(null, true);
        });
    }

    static deleteGPS(imei, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL delete_gps(?)`, [
        imei
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code: ERROR.NOT_FOUND, message: "El gps ${imei} no existe"});
            }
            return callback(null, true);
        });
    }

    static getGPSWithTruckAndDriverData(imei, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM gps WHERE imei = ?`, [imei], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : `El gps ${imei} no se encuentra guardado`});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "El gps ${imei} se encuentra duplicado"});
            }
            let result = results[0];
            return callback(null, new GPSDevice(result.imei, result.simNumber, result.brand, result.model));
        });
    }

}

module.exports = GPSDevice;