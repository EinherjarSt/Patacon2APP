const pool = require('../common/mysql').pool;
const bcrypt = require('bcrypt');
const Location = require('../models/location');
const ERROR = require('../common/error');

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
                return callback({message: "No existe ese productor"});
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
                return callback({code: ERROR.NOT_FOUND, message: "No existe esta localizacion"});
            }
            else if(results.length > 1){
                return callback({code: ERROR.NOT_UNIQUE, message: "La localizacion no es unica"});
            }

            let result = results[0];
            
            return callback(null, result);
        });
    }

    static getAllProducers(callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query(`SELECT * FROM producer, location WHERE location.ref_producer = producer.rut AND producer.disabled = 0`, function(err, results, fields){
            if(err){
                return callback(err);
            }

            let producers = [];

            let previous_producer = [];

            for(const producer of results){
                if(previous_producer.includes(producer.rut) == false){
                    producers.push(new Producer(producer.name, producer.rut));
                }

                previous_producer.push(producer.rut);
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
                return callback(err);
            }

            if(result.affectedRows == 0){
                // If don't exist a row
                return callback({ code: ERROR.NOT_FOUND ,message: "El producto no existe"});
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
                    return callback({code: ERROR.ER_DUP_ENTRY, message: `Este productor ya existe`});
                }
                return callback(err);
            }

            return callback(null, true);
        });
    }

    static deleteProducer(rut, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        pool.query('CALL delete_producer(?)', [rut], function(err, result, fields){
            if(err){
                return callback(err);
            }

            return callback(null, true);
        });
    }

}

module.exports = Producer