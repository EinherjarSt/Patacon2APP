const pool = require('../mysql/mysql').pool;
const bcrypt = require('bcrypt');

class Dispatch {

    constructor(id, driverReference, truckReference, planificationReference, shippedKilograms,
        arrivalAtPataconDate, arrivalAtVineyardDate, containerType, status) {
        this.id = id;
        this.driverReference = driverReference;
        this.truckReference = truckReference;
        this.planificationReference = planificationReference;
        this.shippedKilograms = shippedKilograms;
        this.arrivalAtPataconDate = arrivalAtPataconDate;
        this.arrivalAtVineyardDate = arrivalAtVineyardDate;
        this.containerType = containerType;
        this.status = status;
    }

    static getDispatches(callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM dispatch`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let dispatches = []
            for (const dispatch of results) {
                dispatches.push(new Dispatch(dispatch.id_dispatch, dispatch.ref_driver, dispatch.ref_truck,
                    dispatch.ref_planification, dispatch.shippedKilograms,
                    dispatch.arrivalAtPataconDate, dispatch.arrivalAtVineyardDate,
                    dispatch.containerType, dispatch.status));
            }
            return callback(null, dispatches);
        });
    }

    static getDispatchById(dispatch_id, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM dispatch WHERE id_dispatch = ${dispatch_id}`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let dispatch = results[0];
            return callback(null, new Dispatch(dispatch.id_dispatch, dispatch.ref_driver, dispatch.ref_truck,
                parseInt(dispatch.ref_planification), parseInt(dispatch.shippedKilograms),
                dispatch.arrivalAtPataconDate, dispatch.arrivalAtVineyardDate,
                dispatch.containerType, dispatch.status));
        });
    }

    static deleteDispatch(dispatch_id, callback) {

        console.log("Llegó acá el IDDDD: "  + dispatch_id);
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`DELETE FROM dispatch WHERE id_dispatch = ${dispatch_id}`, function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);
        });
    }

    static registerDispatch(dispatch, callback) {

        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL register_dispatch(?,?,?,?,?,?,?,?)`, [
            dispatch.driverReference, dispatch.truckReference,
            parseInt(dispatch.planificationReference), parseInt(dispatch.shippedKilograms),
            dispatch.arrivalAtVineyardDate, dispatch.arrivalAtPataconDate,
            dispatch.containerType, dispatch.status
        ], function (err, results, fields) {

            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }

    static editDispatch(dispatch, callback) {

        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_dispatch(?,?,?,?,?,?,?,?,?)`, [
            dispatch.id, dispatch.driverReference, dispatch.truckReference,
            parseInt(dispatch.planificationReference), parseInt(dispatch.shippedKilograms),
            dispatch.arrivalAtVineyardDate, dispatch.arrivalAtPataconDate,
            dispatch.containerType, dispatch.status
        ], function (err, results, fields) {

            console.log("Errors");
            console.log(err);

            console.log("Results")
            console.log(results);

            console.log("fields");
            console.log(fields);

            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }
}

module.exports = Dispatch