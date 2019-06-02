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

    static getRoute(route_id, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM route WHERE route_id = ?`, [route_id], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({message : "There isn't result"});
            }
            if (results.length > 1) {
                return callback({message : "There is an error in database because the user is not unique"});
            }
            let result = results[0];
            return callback(null, new Route(result.id_route, result.routes,result.ref_location));
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
            console.log(producers);
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
            console.log(producers);
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

}module.exports = Route