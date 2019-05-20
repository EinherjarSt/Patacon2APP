const pool = require('../mysql/mysql').pool;

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
        			return callback({message: err.sqlMessage});
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
        		return callback({message: "There are no registered locations with that id"});
        	}
        	else if(results.length > 1){
        		return callback({message: "There is a duplicate of the location or a location with the same id"});
        	}

        	let result = results[0];
        	let location = new Location(location.id_location, location.ref_producer, location.address, location.latitude,
        		 location.longitude, location.manager, location.managerPhoneNumber);

        	return callback(null, location);
        });
	}

	static deleteLocation(){

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
                return callback({message: "The location doesn't exist"});
            }

            if(result.affectedRows == 0){
                // If don't exist a row
                return callback({ message: "This Location doesn't exist"});
            }

            return callback(null, true);
        });
	}
}

module.exports = Location