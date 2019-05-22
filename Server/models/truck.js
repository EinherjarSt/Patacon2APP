const pool = require('../mysql/mysql').pool;

class Truck {
    constructor(id_truck, licencePlate, brand, model, year, maxLoad, owner, color, disabled, available) {
        this.id_truck = id_truck;
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
                trucks.push(new Truck(truck.id_truck, truck.licencePlate, truck.brand, truck.model, 
                    truck.year, truck.maxLoad, truck.owner, truck.color, truck.disabled, truck.available));
            }
            return callback(null, trucks);
        });
    }

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
        pool.query(`CALL update_truck(?, ?, ?, ?, ?, ?, ?)`, [
            truck.licencePlate, 
            truck.brand, 
            truck.model, 
            truck.year, 
            truck.maxLoad, 
            truck.owner, 
            truck.color,
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
        pool.query(`CALL add_truck2(?, ?, ?, ?, ?, ?, ?)`, [
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
            console.log(result.licencePlate);
            return callback(null, new Truck(result.licencePlate, result.brand, 
                result.model, result.year, result.maxLoad, result.owner, result.color));
        });
    }
}

module.exports = Truck;