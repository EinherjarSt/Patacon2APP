const pool = require('../common/mysql').pool;
const bcrypt = require('bcrypt');
const Location = require('../models/location');

class Producer{
    constructor(name, rut){
        this.name = name;
        this.rut = rut;
        this.locations = [];
    }

    static getProducer(rut, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        let query = pool.query('SELECT * FROM producer, location WHERE rut = ? AND location.ref_producer = producer.rut', [rut], function(err, results, fields){
            if(err){
                return callback(err);
            }
            else if(results.length === 0){
                return callback({message: "There are no registered producers with that RUT."});
            }

            let result = results[0];
            let producer = new Producer(result.name, result.rut);

            for(const item of results){
                producer.locations.push(new Location(item.id_location, item.ref_producer, item.address, item.latitude, item.longitude,
                        item.manager, item.managerPhoneNumber));
            }

            return callback(null, producer);
        });
    }

    static getLocation(idLocation, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        let query = pool.query('SELECT * FROM location WHERE id_location = ?', [idLocation], function(err, results, fields){
            if(err){
                return callback(err);
            }
            else if(results.length === 0){
                return callback({message: "There are no registered producers with that RUT."});
            }
            else if(results.length > 1){
                return callback({message: "There is an error in the database because the producer's RUT is not unique"});
            }

            let result = results[0];
            
            return callback(null, result);
        });
    }
    static getAllProducers(callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query(`SELECT * FROM producer, location WHERE location.ref_producer = producer.rut`, function(err, results, fields){
            if(err){
                return callback(err);
            }

            let producers = [];

            let previous_producer = "";

            for(const producer of results){
                if(producer.rut != previous_producer){
                    producers.push(new Producer(producer.name, producer.rut));
                }

                previous_producer = producer.rut;
            }

            for(const producer of producers){
                for(const item of results){
                    if(producer.rut == item.ref_producer){
                        producer.locations.push(new Location(item.id_location , item.ref_producer, item.address, item.latitude, item.longitude,
                            item.manager, item.managerPhoneNumber));
                    }
                }
            }

            return callback(null, producers);
        });
    }

    static updateProducer(producer, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('CALL update_producer(?, ?)', [
            producer.name,
            producer.rut
        ], function(err, result, fields){
            if(err){
                return callback({message: "The producer doesn't exist"});
            }

            if(result.affectedRows == 0){
                // If don't exist a row
                return callback({ message: "The producer doesn't exist"});
            }

            return callback(null, true);
        });
    }

    static addProducer(producer, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        pool.query('CALL add_producer(?, ?)', [
            producer.name,
            producer.rut
        ], function(err, result, fields){
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    return callback({message: err.sqlMessage});
                }
                return callback(err);
            }

            return callback(null, true);
        });
    }

}

module.exports = Producer