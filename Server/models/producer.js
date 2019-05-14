const pool = require('../mysql/mysql').pool;
const bcrypt = require('bcrypt');

class Producer{
    constructor(name, rut, telephone, manager ){
        this.name = name;
        this.rut = rut;
        this.manager = manager;
        this.telephone = telephone;
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
            let producer = new Producer(result.name, result.rut, result.telephone, result.manager);

            return callback(null, producer);
        });
    }

    static getLocationName(idLocation, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        let query = pool.query('SELECT location.address FROM location WHERE id_location = ?', [idLocation], function(err, results, fields){
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
        pool.query(`SELECT name, rut, telephone, manager FROM producer`, function(err, results, fields){
            if(err){
                return callback(err);
            }

            let producers = [];

            for(const producer of results){
                producers.push(new Producer(producer.name, producer.rut, producer.telephone, producer.manager));
            }

            return callback(null, producers);
        });
    }

    static updateProducer(producer, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('CALL update_producer(?, ?, ?, ?)', [
            producer.rut,
            producer.name,
            producer.telephone,
            producer.manager
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

        pool.query('CALL add_producer(?, ?, ?, ?)', [
            producer.name,
            producer.rut,
            producer.manager,
            producer.telephone
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