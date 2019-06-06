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

            let data = results[0];
            return callback(null, new InsightsData(data.dispatchReference, data.stoppedTime, data.unloadYardTime,
                data.textMessagesSent, data.lastMessageSentDate));
        });
    }

    static editTimesPerStatusOfDispatch(dispatchId, stoppedTime, inUnloadYardTime, callback) {


        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_time_per_status(?, ?, ?)`, [dispatchId, stoppedTime, inUnloadYardTime], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
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
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);
        });
    }

    

}


module.exports = InsightsData