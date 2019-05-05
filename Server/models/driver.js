const pool = require('../mysql/mysql').pool;

class Driver {
    constructor(run, name, surname, surname2, phone_number) {
        this.run = run;
        this.name = name;
        this.surname = surname;
        this.surname2 = surname2;
        this.phoneNumber = phone_number;
    }

    static getAllDrivers(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM driver`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let drivers = []
            for (const driver of results) {
                drivers.push(new Driver(driver.run, driver.name, driver.surname, driver.surname2, driver.phone_number));
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
                return callback({ message: "This driver don't exist"});
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
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }
}

module.exports = Driver