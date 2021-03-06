const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');
class Driver {
    constructor(run, name, surname, surname2, phoneNumber, disabled) {
        this.run = run;
        this.name = name;
        this.surname = surname;
        this.surname2 = surname2;
        this.phoneNumber = phoneNumber;
        this.disabled = disabled;
    }

    static getDriver(run, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM driver WHERE run = ?`, [run], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : "There isn't result"});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "There is an error in database because the user is not unique"});
            }
            let result = results[0];
            return callback(null, new Driver(result.run, result.name, result.surname, result.surname2, result.phoneNumber, result.disabled));
        });
    }


    static getAllDrivers(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM driver`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let drivers = [];
            let disabled;
            for (const driver of results) {
                disabled = driver.disabled === 0 ? false: true;
                drivers.push(new Driver(driver.run, driver.name, driver.surname, driver.surname2, driver.phoneNumber, disabled));
            }
            return callback(null, drivers);
        });
    }
    
    static getAllDrivers2(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM driver WHERE has_truck_assigned = 0`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let drivers = [];
            let disabled;
            for (const driver of results) {
                disabled = driver.disabled === 0 ? false: true;
                drivers.push(new Driver(driver.run, driver.name, driver.surname, driver.surname2, driver.phoneNumber, disabled));
            }
            return callback(null, drivers);
        });
    }

    static updateDriver(driver, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL update_driver(?, ?, ?, ?, ?)`, [
            driver.run,
            driver.name,
            driver.surname,
            driver.surname2,
            driver.phoneNumber,
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code:ERROR.NOT_FOUND, message: `El conductor con run ${run} no existe`});
            }
            return callback(null, true);
        });
    }

    static addDriver(driver, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL add_driver(?, ?, ?, ?, ?)`, [
            driver.run,
            driver.name,
            driver.surname,
            driver.surname2,
            driver.phoneNumber,
        ], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({code: ERROR.ER_DUP_ENTRY, message : `El conductor con run ${driver.run} ya existe`});
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }

    static disableDriver(run, disabled, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL disable_driver(?, ?)`, [
           run,
           disabled
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code:ERROR.NOT_FOUND, message: `El conductor con run ${run} no existe`});
            }
            return callback(null, true);
        });
    }

    static deleteDriver(run, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL delete_driver(?)`, [
           run
        ], function (err, results, fields){
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code:ERROR.NOT_FOUND, message: `El conductor con run ${run} no existe`});
            }
            return callback(null, true);
        });
    }
}

module.exports = Driver