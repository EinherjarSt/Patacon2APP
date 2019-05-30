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

    static editStoppedTime(dispatchId, timeInMinutes, callback) {
        
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_stopped_time(?,?)`, [dispatchId, timeInMinutes], function (err, results, fields) {

            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }

    static editInUnloadYardTime(dispatchId, timeInMinutes, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_unload_yard_time(?,?)`, [dispatchId, timeInMinutes], function (err, results, fields) {

            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }

    static editLastMessageSentDate(dispatchId, date) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL edit_last_message_sent_date(?,?)`, [dispatchId, date], function (err, results, fields) {

            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return callback({ message: err.sqlMessage });
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }

    static incrementNumberOfMessagesSent(dispatchId, callback) {
        if (!callback || !(typeof callback === 'function')) {
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL increment_text_messages_sent(?)`, [dispatchId], function (err, results, fields) {
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