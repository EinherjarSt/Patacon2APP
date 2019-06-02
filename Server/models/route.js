const pool = require('../common/mysql').pool;
const bcrypt = require('bcrypt');

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
            let info =[];
            for(const rt of results[0]){
               info.push({
                   idProducer: rt.idProducer,
                   producerName: rt.producerName,
                   idLocation:rt.idLocation,
                   locationName: rt.locationName
               })
            }
            return callback(null, info);
        });
    }

}module.exports = Route