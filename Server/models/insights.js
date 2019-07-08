const pool = require('../common/mysql').pool;
const bcrypt = require('bcrypt');


class InsightsData {
    constructor(dispatchReference, stoppedTime, unloadYardTime, textMessagesSent, lastMessageSentDate) {

        this.dispatchReference = dispatchReference;
        this.stoppedTime = stoppedTime;
        this.unloadYardTime = unloadYardTime;
        this.textMessagesSent = textMessagesSent;
        this.lastMessageSentDate = lastMessageSentDate;

    }

    static getDispatchInsightsData(dispatchId, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }        
        let query = pool.query(`SELECT * FROM insights_data WHERE refDispatch = ?`, [dispatchId], function (err, results, fields) {
            if(results==null){
                return callback(err);
            }
            else if (results[0]==null) {
                return callback(err);
            }else{
                let data = results[0];
                return callback(null, new InsightsData(data.dispatchReference, data.stoppedTime, data.unloadYardTime,
                    data.textMessagesSent, data.lastMessageSentDate));
            }
        });
    }


    static getDispatchesCountInDateRange(status, startDate, endDate, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }        
        let query = pool.query(`CALL count_dispatches(?,?,?)`, [status, startDate, endDate], function (err, results, fields) {
            if(results==null){
                return callback(err);
            }
            else if (results[0]==null) {
                return callback(err);
            }else{
                if(results.length == 0 ) {
                    return callback(null, {dispatchCount: 0});
                }
                else {
                    return callback(null, {dispatchCount: results[0][0].dispatchCount});
                }
            }
        });
    }


    static getNumberOfMessagesSentInDateRange(startDate, endDate, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }        
        let query = pool.query(`CALL count_text_messages_sent(?,?)`, [startDate, endDate], function (err, results, fields) {
            if(results==null){
                return callback(err);
            }
            else if (results[0]==null) {
                return callback(err);
            }else{
                if(results.length == 0 ) {
                    return callback(null, {messageCount: 0});
                }
                else {
                    return callback(null, {messageCount: results[0][0].textMessageCount});
                }
            }
        });
    }

   

    static getDispatchesInDateRangeInsights(startDate, endDate, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }        
        pool.query(`CALL get_dispatches_insights(?,?)`, [startDate, endDate], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let dispatchesInsights = []
            for (const dispatchInsight of results[0]) {
                dispatchesInsights.push({
                    driverRun: dispatchInsight.driverRun,
                    driverName: dispatchInsight.driverName,
                    driverSurname: dispatchInsight.driverSurname,
                    producerName: dispatchInsight.producerName,
                    truckLicensePlate: dispatchInsight.truckLicensePlate,
                    dispatchDate: dispatchInsight.dispatchDate,
                    textMessagesSent: dispatchInsight.textMessagesSent,
                    lastMessageSentDate: dispatchInsight.lastMessageSentDate,
                    stoppedTime: dispatchInsight.stoppedTime,
                    unloadYardTime: dispatchInsight.unloadYardTime
                });
            }

            return callback(null, dispatchesInsights);
        });
    }

    static editTimesPerStatusOfDispatch(dispatchId, stoppedTime, inUnloadYardTime, callback) {


        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_time_per_status(?, ?, ?)`, [dispatchId, stoppedTime, inUnloadYardTime], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ code:err.code, message: `El despacho ${dispatchId} ya existe` });
                }
                return callback(err);
            }
            return callback(null, true);
        });

    }

    static editLastMessageSentData(dispatchId, datetime, callback) {
        
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_last_message_sent_data(?, ?)`, [dispatchId, datetime], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ code:err.code, message: `El despacho ${dispatchId} ya existe` });
                }
                return callback(err);
            }
            return callback(null, true);
        });
    }

    

}


module.exports = InsightsData