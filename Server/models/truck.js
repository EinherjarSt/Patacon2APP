const pool = require('../common/mysql').pool;

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

    /* static getAllTrucksIncludeDisabled(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM truck`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let trucks = []
            for (const truck of results) {
                trucks.push(new Truck(truck.id_truck, truck.licencePlate, truck.brand, truck.model, 
                    truck.year, truck.maxLoad, truck.owner, truck.color, truck.disabled, truck.available));
            }
            return callback(null, trucks);
        });
    } */

    /*static deleteTruck(licencePlate, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL delete_truck(?)`,[licencePlate], 
        function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }*/


    static updateTruck(truck, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        else
        {
            if(truck.ref_gps == 'undefined' && truck.ref_driver == 'undefined')
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
                return callback({ message: "This truck don't exist"});
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
                            return callback({message : err.sqlMessage});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
            else if(truck.ref_gps == 'undefined')
            {
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
                            return callback({message : err.sqlMessage});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
            else if(truck.ref_driver == 'undefined')
            {
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
                            return callback({message : err.sqlMessage});
                        }
                        return callback(err);
                    }
                    return callback(null, true);
        
                });
            }
            else
            {
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
                            return callback({message : err.sqlMessage});
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
                return callback({message : "There isn't result"});
            }
            if (results.length > 1) {
                return callback({message : "There is an error in database because the truck is not unique"});
            }
            let result = results[0];
            console.log(result.licencePlate)
            return callback(null, new Truck(result.id_truck, result.licencePlate, result.ref_driver, result.ref_gps, 
                result.brand, result.model, result.year, result.maxLoad, result.owner, result.color, result.disabled,
                result.available));
        });
    }
}

module.exports = Truck;