const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');

class Location{
	constructor(id_location, ref_producer, address, latitude, longitude, manager, managerPhoneNumber){
		this.id_location = id_location;
        this.ref_producer = ref_producer;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.manager = manager;
		this.managerPhoneNumber = managerPhoneNumber;
	}

	static addLocation(location, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        pool.query('CALL add_location(?,?,?,?,?,?)',[
        	location.ref_producer,
        	location.address,
        	location.latitude,
        	location.longitude,
        	location.manager,
        	location.managerPhoneNumber
        ], function(err, result, fields){
        	if(err){
        		if(err.code == "ER_DUP:_ENTRY"){
        			return callback({code: err.code, message: `Esta localizacion esta duplicada`});
        		}
        		return callback(err);
        	}
        	return callback(null, true);
        });
	}

	static getAllLocations(ref_producer, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('SELECT * FROM location WHERE ref_producer = ?', [ref_producer], function(err, results, fields){
        	if(err){
        		return callback(err);
        	}

        	let locations = [];

        	for(const location of results){
        		locations.push( new Location(location.id_location, location.ref_producer, location.address, location.latitude,
        		 location.longitude, location.manager, location.managerPhoneNumber));
        	}

        	return callback(null, locations);
        });
	}

	static getLocation(id, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        let query = pool.query('SELECT * FROM location WHERE id = ?', [id], function(err, results, fields){
        	if(err){
        		return callback(err);
        	}
        	else if(results.length === 0){
        		return callback({message: `No existen localizacion con el id ${id}`});
        	}
        	else if(results.length > 1){
        		return callback({code: ERROR.NOT_UNIQUE, message: `La localizacion ${id} esta duplicada`});
        	}

        	let result = results[0];
        	let location = new Location(location.id_location, location.ref_producer, location.address, location.latitude,
        		 location.longitude, location.manager, location.managerPhoneNumber);

        	return callback(null, location);
        });
	}

	static deleteLocation(id_location, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }

        let query = pool.query('CALL delete_location(?)', [id_location], function(err, results, fields){
            if(err){
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code: ERROR.NOT_FOUND, message: "La localizacion no existe"});
            }
            
            return callback(null, true);
        });
	}

	static updateLocation(location, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('CALL update_location(?, ?, ?, ?, ?, ?, ?)', [
            location.id_location,
            location.ref_producer,
            location.address,
            location.latitude,
            location.longitude,
            location.manager,
            location.managerPhoneNumber
        ], function(err, result, fields){
            if(err){
                return callback(err);
            }

            if(result.affectedRows == 0){
                // If don't exist a row
                return callback({code: ERROR.NOT_FOUND, message: "La localizacion no existe"});
            }

            return callback(null, true);
        });
	}
}

module.exports = Location