const pool = require('../mysql/mysql').pool;
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

        let query = pool.query('SELECT * FROM producer WHERE rut = ?', [rut], function(err, results, fields){
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
            let producer = new Producer(result.name, result.rut);

            return callback(null, producer);
        });
    }

    static getAllProducers(callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query(`SELECT * FROM producer`, function(err, results, fields){
            if(err){
                return callback(err);
            }

            let producers = [];

            for(const producer of results){
                producers.push(new Producer(producer.name, producer.rut));
            }

            for(const producer of producers){
                let refProducer = producer.rut;

                Location.getAllLocations(refProducer, (err, locations) => {
                    if(err){
                        return res.status(400).json(err);
                    }

                    producer.locations = locations.slice();
                });
            }

            return callback(null, producers);
        });
    }

    static updateProducer(producer, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('CALL update_producer(?, ?)', [
            producer.rut,
            producer.name
        ], function(err, result, fields){
            if(err){
                return callback({message: "The producer doesn't exist"});
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