const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');

class ResetPassword
{
    constructor (email, password, verification_code)
    {
        //this.id_reset = id_reset;
        this.email = email;
        this.password = password;
        this.verification_code = verification_code;
    }

    /* static getUserByEmail(email, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT COUNT(email) FROM user WHERE email = ?`, [email], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : "There isn't result"});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "There is an error in database because the user is not unique"});
            }
            let result = results[0];
            let thereIsAnUser = true;
            return callback(thereIsAnUser);
        });
    } */

    static addVerificationCode(reset, callback)
    {
        console.log("asidjaskjasdkjdk en resetPassword.js models");
        //var verification_code = makeCode(8);
        pool.query(`CALL add_ver_code1(?, ?)`, [
            reset.verification_code, 
            reset.email
        ], function (err, results, fields) {
            console.log(err);
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);
        });
    }

    static getEmailByCode(code, callback) {
        console.log("resetPassword.js en models");
        console.log(code);
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM user WHERE verification_code = ?`, [code], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : "There isn't result"});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "There is an error in database because the email is not unique"});
            }
            let result = results[0];
            return callback(null, new ResetPassword(result.email, result.password, result.verification_code));
        });
    }

    /* static getEmailVerificationCode(reset, callback)
    {
        console.log("asidjaskjasdkjdk en resetPassword.js models");
        //var verification_code = makeCode(8);
        pool.query(`CALL get_email_ver_code1(?, ?)`, [
            reset.verification_code
        ], function (err, results, fields) {
            console.log(err);
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);
        });
    } */

    /* static addNewPasswordToResetPassword(password, email, callback)
    {
        //var verification_code = makeCode(8);
        pool.query(`CALL add_password(?, ?)`, [
            password, 
            email
        ], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);
    });
    } */
}

module.exports = ResetPassword;

