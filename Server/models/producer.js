const pool = require('../mysql/mysql').pool;

class Producer{
    constructor(name, rut, location, telephone, manager, ){
        this._name = name;
        this._rut = rut;
        this._location = location;
        this._telephone = telephone;
        this._manager = manager;
    }

    get name(){
        return this._name;
    }

    get rut(){
        return this._rut;
    }

    get location(){
        return this._location;
    }

    get telephone(){
        return this._telephone;
    }

    get manager(){
        return this.manager;
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

            return callback(null, new Producer(result._name, result._rut, result._location, result._telephone, result._manager));
        });
    }

    static getAllProducers(callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('SELECT * FROM producer', function(err, results, fields){
            if(err){
                return callback(err);
            }

            let producers = [];

            for(const producer of results){
                producers.push(new Producer(producer._name, producer._rut, producer._location, producer._telephone, producer._manager));
            }

            return callback(null, producers);
        });
    }

    static updateProducer(producer, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('CALL update_producer(?, ?, ?, ?, ?)', [
            producer._name,
            producer._rut,
            producer._location,
            producer._telephone,
            producer._manager
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

        pool.query('CALL add_producer(?, ?, ?, ?, ?)', [
            producer._name,
            producer._rut,
            producer._location,
            producer._telephone,
            producer._manager
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

module.exports = {
    Producer
}