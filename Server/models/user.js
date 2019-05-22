const pool = require('../common/mysql').pool;
const bcrypt = require('bcrypt');
const ERROR = require('../common/error');

class User {
    constructor(run, name, surname, surname2, email, password, position, disabled = false) {
        this.run = run;
        this.name = name;
        this.surname = surname;
        this.surname2 = surname2;
        this.email = email;
        this.password = password;
        this.position = position;
        this.disabled = disabled

    }

    verifyPassword(password, callback) {
        bcrypt.compare(password, this.password, function(err, res) {
            if(err){
                callback(err);
            }
            return callback(null, res);
        });
    }

    static getUserByEmail(email, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM user WHERE email = ?`, [email], function (err, results, fields) {
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
            return callback(null, new User(result.run, result.name, result.surname, result.surname2, result.email, result.password, result.position, result.disabled));
        });
    }

    static getUserByRun(run, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM user WHERE run = ?`, [run], function (err, results, fields) {
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
            return callback(null, new User(result.run, result.name, result.surname, result.surname2, result.email, undefined,result.position, result.disabled));
        });
    }

    static getAllUsers(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM user`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let users = [];
            let disabled;
            for (const user of results) {
                disabled = user.disabled === 0 ? false : true;
                users.push(new User(user.run, user.name, user.surname, user.surname2, user.email, undefined, user.position, disabled));
            }
            return callback(null, users);
        });
    }

    static updateUser(user, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL update_user(?, ?, ?, ?, ?, ?, ?)`, [
            user.run,
            user.name,
            user.surname,
            user.surname2,
            user.email,
            user.password,
            user.position
        ], function (err, results, fields) {
            // console.log("update_user");
            // console.log("error:")
            // console.log(err);
            // console.log("results:");
            // console.log(results);
            // console.log("fields:");
            // console.log(fields);
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({ code: ERROR.NOT_FOUND, message: "This user don't exist"});
            }
            return callback(null, true);
        });
    }

    static disableUser(run, disabled, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL disable_user(?, ?)`, [
           run,
           disabled
        ], function (err, results, fields) {
            // console.log("update_user");
            // console.log("error:")
            // console.log(err);
            // console.log("results:");
            // console.log(results);
            // console.log("fields:");
            // console.log(fields);
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code: ERROR.NOT_FOUND, message: "This user don't exist"});
            }
            return callback(null, true);
        });
    }

    static addUser(user, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL add_user(?, ?, ?, ?, ?, ?, ?)`, [
            user.run,
            user.name,
            user.surname,
            user.surname2,
            user.email,
            user.password,
            user.position
        ], function (err, results, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({code: ERROR.ER_DUP_ENTRY ,message : err.sqlMessage});
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }

    static removeUser(run, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL remove_user(?)`, [
           run
        ], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if(results.affectedRows == 0){
                // If don't exist a row
                return callback({code: ERROR.NOT_FOUND, message: "This user don't exist"});
            }
            return callback(null, true);
        });
    }

}

module.exports = User