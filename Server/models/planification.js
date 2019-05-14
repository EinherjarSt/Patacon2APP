const pool = require('../mysql/mysql').pool;

class Planification {
    constructor(planification_id,ref_producer,ref_location,kilograms,containerType,harvestingType,
        quality,freight,comment,grapeVariety,date) {

        this.planification_id = planification_id;
        this.ref_producer = ref_producer;
        this.ref_location = ref_location;
        this.kilograms = kilograms;
        this.containerType = containerType;
        this.harvestingType = harvestingType;
        this.quality = quality;
        this.freight = freight;
        this.comment = comment;
        this.grapeVariety = grapeVariety;
        this.date =date;
    }

    static getAllPlanifications(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM planification`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let planifications =  [];
            for (const pln of results) {
                planifications.push(new Planification(pln.planification_id,pln.ref_producer,pln.ref_location,pln.kilograms,pln.containerType,
                pln.harvestingType,pln.quality,pln.freight,pln.comment,pln.grapeVariety,pln.date));
            }
            return callback(null, planifications);
        });
    }

    static getPlanification(planification_id, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM planification WHERE planification_id = ?`, [planification_id], function (err, results, fields) {
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
            return callback(null, new Planification(result.planification_id, result.ref_producer,result.ref_location,
                result.kilograms,result.containerType, result.harvestingType,result.quality,result.freight,result.comment, result.grapeVariety,result.date));
        });
        console.log(query);
    }

    static updatePlanification(planification, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL update_planification(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            planification.planification_id,
            planification.ref_location,
            planification.grapeVariety,
            planification.harvestingType,
            planification.containerType,
            planification.kilograms,
            planification.quality,
            planification.freight,
            planification.comment,
            planification.date
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({ message: "This planification don't exist"});
            }
            return callback(null, true);
        });
    }

    static addPlanification(planification, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL add_planification( ?, ?, ?, ?, ?, ?, ?, ? ,?)`, [
            planification.ref_location,
            planification.grapeVariety,
            planification.harvestingType,
            planification.containerType,
            planification.kilograms,
            planification.quality,
            planification.freight,
            planification.comment,
            planification.date
        ], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }
    static deletePlanification(planification_id, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`DELETE FROM planification WHERE planification_id = ?`, [planification_id], function (err, results, fields) {
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

}

module.exports = Planification