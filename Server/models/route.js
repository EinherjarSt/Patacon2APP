const pool = require('../common/mysql').pool;
const bcrypt = require('bcrypt');
const Location = require('../models/location');
const Producer = require('../models/producer');
class Route{
    constructor(id_route, routes, ref_location){
        this.id_route = id_route;
        this.routes = routes;
        this.ref_location = ref_location;
    }

    static addRoute(route, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback funtion. Please provide them');
        }
        pool.query('CALL add_route(?, ?)', [
            route.routes,
            route.ref_location
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

    static getRoute(location_id, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`CALL get_route(?)`, [location_id], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({message : "There isn't result"});
            }
            let result = results[0][0];
            console.log("aaaaa");
            console.log(results[0][0].refLocation);
            let loc = new Location(result.refLocation,result.refProducer,result.addressLocation,result.latitude,
                result.longitude,result.manager, result.managerPhoneNumber);

            return callback(null, new Route(result.idRoute, result.routes,loc));
        });
        console.log(query);
    }



    static getAllRoutesInfo(callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL get_info_routes()`, [], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            
            let producers = [];

            let previous_producer = [];

            for(const producer of results[0]){
                
                if(previous_producer.includes(producer.idProducer) == false){
                    producers.push(new Producer(producer.producerName, producer.idProducer));
                }

                previous_producer.push(producer.idProducer);
            }
            
            
            for(const producer of producers){
                for(const item of results[0]){
                    if(producer.rut == item.idProducer){
                        producer.locations.push(new Location(item.idLocation , item.idProducer, item.locationName, "","",
                            "", ""));
                    }
                }
            }
            let res =[]
            for(const producer of producers){
               res.push({
                        idProducer: producer.rut,
                        producerName: producer.name,
                        locations: producer.locations
                    });
            }
            return callback(null, res);
        });
    }

    static getProducersWithoutRoute(callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL get_producers_without_routes()`, [], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            
            let producers = [];

            let previous_producer = [];

            for(const producer of results[0]){
                
                if(previous_producer.includes(producer.idProducer) == false){
                    producers.push(new Producer(producer.producerName, producer.idProducer));
                }

                previous_producer.push(producer.idProducer);
            }
            
            
            for(const producer of producers){
                for(const item of results[0]){
                    if(producer.rut == item.idProducer){
                        producer.locations.push(new Location(item.idLocation , item.idProducer, item.locationName,
                            item.latitude,item.longitude, item.manager,item.managerPhoneNumber));
                    }
                }
            }
            let res =[]
            for(const producer of producers){
               res.push({
                        idProducer: producer.rut,
                        producerName: producer.name,
                        locations: producer.locations
                    });
            }
            return callback(null, res);
        });
    }

    static deleteRoute(idLocation, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`DELETE FROM route WHERE ref_location = ?`, [idLocation], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({message : "There isn't result"});
            }
            if (results.length > 1) {
                return callback({message : "There is an error in database because the user is not unique"});
            }
            return callback(null, true);
        });
        console.log(query);
    }

}module.exports = Route