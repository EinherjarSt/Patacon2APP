const pool = require('../common/mysql').pool;

class LastEvent {
    constructor(id_event,time,description,ref_Dispach, status) {
        this.id_event = id_event;
        this.time = time;
        this.description = description;
        this.ref_Dispach = ref_Dispach;
        this.status = status;
    }

    static getEvent(id_event, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM recent_events WHERE id_event= ?`, [id_event], function (err, results, fields) {
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
            return callback(null, new LastEvent(result.id_event,result.time,result.description,result.ref_Dispatch, result.status));
        });
    }

    static getNevents(count, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`CALL get_last_n_events(?)`, [count], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let events = []
            for (const event of results[0]) {
                events.push(new LastEvent(event.id_event,event.time,event.description,event.ref_Dispatch, event.status));
            }
            return callback(null, events);
        });
    }

    static getAllEvents(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query("SELECT id_event, time, description, ref_Dispatch FROM recent_events ORDER BY time DESC LIMIT 15", function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let events = []
            for (const event of results) {
                events.push(new LastEvent(event.id_event,event.time,event.description,event.ref_Dispach, event.status));
            }
            return callback(null, events);
        });
    }

    static getAllEventsOfDispatch(dispatchId, callback) {

        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM recent_events WHERE ref_Dispatch=${dispatchId} ORDER BY time`, function (err, results, fields) {

            if (err) {
                return callback(err);
            }
            let events = []
            for (const event of results) {
                events.push(new LastEvent(event.id_event,event.time,event.description,event.ref_Dispach, event.status));
            }
            return callback(null, events);
        });
    }

    static insertOutOfRouteEvent(ref_truck, id_dispatch, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL insert_last_event(?, ?)`, [
            ref_truck,
            id_dispatch
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            return callback(null, true);
        });
    }
}

module.exports = LastEvent