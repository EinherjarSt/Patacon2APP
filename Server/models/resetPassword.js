const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');

class ResetPassword
{
    constructor (email, password)
    {
        this.email = email;
        this.password = password;
    }

    static findOneUserToChangePassword(email, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM user WHERE email = ?`, [run], function (err, results, fields) {
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
            return callback(null, new User(result.run, result.name, result.surname, result.surname2, result.email, undefined,result.position, result.disabled));
        });
    }

    static makeCode(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        //console.log(makeCode(5));
        return result;
     }

    static createVerificationCode(email, callback)
    {
        var verification_code = makeCode(8);
        pool.query(`CALL add_ver_code(?, ?)`, [
            verification_code, 
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
    }
}

module.exports = ResetPassword;

