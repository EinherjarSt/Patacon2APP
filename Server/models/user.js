const pool = require('../mysql/mysql').pool;
const bcrypt = require('bcrypt');
class User {
    constructor(run, name, surname, surname2, email, password, position, status = true) {
        this.run = run;
        this.name = name;
        this.surname = surname;
        this.surname2 = surname2;
        this.email = email;
        this.password = password;
        this.position = position;
        this.status = status

    }

    verifyPassword(password, callback) {
        bcrypt.compare(password, this.password, function(err, res) {
            if(err){
                callback(err);
            }
            return callback(null, res);
        });
    }

    static getUser(email, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM user WHERE email = ?`, [email], function (err, results, fields) {
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
            return callback(null, new User(result.run, result.name, result.surname, result.surname2, result.email, result.password, result.position));
        });
        console.log(query);
    }

    static getAllUsers(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM user`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let users = []
            for (const user of results) {
                users.push(new User(user.run, user.name, user.surname, user.surname2, user.email, "", user.position));
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
                return callback({ message: "This user don't exist"});
            }
            return callback(null, true);
        });
    }

    static update_user_status(run, status, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL update_user_status(?, ?)`, [
           run,
           status
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
                return callback({ message: "This user don't exist"});
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
            // console.log("add_user");
            // console.log("error:")
            // console.log(err);
            // console.log("results:");
            // console.log(results);
            // console.log("fields:");
            // console.log(fields);
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

module.exports = User