const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');

class Truck {
    constructor(id_truck, licencePlate, ref_driver, ref_gps, brand, model, year, maxLoad, owner, color, disabled, available) {
        this.id_truck = id_truck;
        this.ref_driver = ref_driver;
        this.ref_gps = ref_gps;
        this.licencePlate = licencePlate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.maxLoad = maxLoad;
        this.owner = owner;
        this.color = color;
        this.disabled = disabled;
        this.available = available
    }

    static getAllTrucks(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM truck WHERE disabled = 0`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let trucks = []
            for (const truck of results) {
                trucks.push(new Truck(truck.id_truck, truck.licencePlate, truck.ref_driver, truck.ref_gps, truck.brand, truck.model, 
                    truck.year, truck.maxLoad, truck.owner, truck.color, truck.disabled, truck.available));
            }
            return callback(null, trucks);
        });
    }


    static updateTruck(truck, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        else
        {
            if(truck.ref_gps == null && truck.ref_driver == null)
            {
                pool.query(`CALL update_truck3(?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color
                ], function (err, results, fields) {
                    if (err) {
                        return callback(err);
                    }
                    if(results.affectedRows == 0){
                        // If don't exist a row
                        return callback({ message: truck});
                    }
                    return callback(null, true);
                })
            }
            else if (truck.ref_gps == null)
            {
                pool.query(`CALL update_truck4(?, ?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color,
                    truck.ref_driver
                ], function (err, results, fields) {
                    if (err) {
                        return callback(err);
                    }
                    if(results.affectedRows == 0){
                        // If don't exist a row
                        return callback({ message: truck});
                    }
                    return callback(null, true);
                })
            }
            else if (truck.ref_driver == null)
            {
                pool.query(`CALL update_truck5(?, ?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color,
                    truck.ref_gps
                ], function (err, results, fields) {
                    if (err) {
                        return callback(err);
                    }
                    if(results.affectedRows == 0){
                        // If don't exist a row
                        return callback({ message: truck});
                    }
                    return callback(null, true);
                })
            }
            else
            {
                pool.query(`CALL update_truck2(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color,
                    truck.ref_gps,
                    truck.ref_driver
                ], function (err, results, fields) {
                    if (err) {
                        return callback(err);
                    }
                    if(results.affectedRows == 0){
                        // If don't exist a row
                        return callback({ message: truck});
                    }
                    return callback(null, true);
                })
            }
        
        };
    }

    static disableTruck(licencePlate, disabled, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL disable_truck2(?, ?)`, [
            licencePlate,
            disabled,
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code: ERROR.NOT_FOUND, message: `El camion ${licencePlate} no existe`});
            }
            return callback(null, true);
        });
    }


    static addTruck(truck, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        else
        {
            if(truck.ref_gps == 'undefined' && truck.ref_driver == 'undefined')
            {
                //Query to add a truck without references to a GPS and a driver
                pool.query(`CALL add_truck3(?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color
                ], function (err, results, fields) {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY"){
                            return callback({code: ERROR.ER_DUP_ENTRY, message : `Este camion ya se encuentra registrado`});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
            else if(truck.ref_gps == 'undefined')
            {
                //Query to add a truck without a GPS reference
                pool.query(`CALL add_truck4(?, ?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color,
                    truck.ref_driver
                ], function (err, results, fields) {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY"){
                            return callback({code: ERROR.ER_DUP_ENTRY, message : `Este camion ya se encuentra registrado`});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
            else if(truck.ref_driver == 'undefined')
            {
                //Query to add a truck without a driver reference
                pool.query(`CALL add_truck5(?, ?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color,
                    truck.ref_gps
                ], function (err, results, fields) {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY"){
                            return callback({code: ERROR.ER_DUP_ENTRY, message : `Este camion ya se encuentra registrado`});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
            else
            {
                //Query to add a truck with references to both GPS and a driver
                pool.query(`CALL add_truck2(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    truck.licencePlate, 
                    truck.brand, 
                    truck.model, 
                    truck.year, 
                    truck.maxLoad, 
                    truck.owner, 
                    truck.color,
                    truck.ref_gps,
                    truck.ref_driver
                ], function (err, results, fields) {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY"){
                            return callback({code: ERROR.ER_DUP_ENTRY, message : `Este camion ya se encuentra registrado`});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
        
        };
        
    }

    static getTruckByLicencePlate(licencePlate, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM truck WHERE licencePlate = ?`, [licencePlate], 
                                function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : `No existe el camion${licensePlate}`});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : `Existen multiples camiones con la misma licencia ${licencePlate}`});
            }
            let result = results[0];
            return callback(null, new Truck(result.id_truck, result.licencePlate, result.ref_driver, result.ref_gps, 
                result.brand, result.model, result.year, result.maxLoad, result.owner, result.color, result.disabled,
                result.available));
        });
    }
}

module.exports = Truck;