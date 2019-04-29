const pool = require('../mysql/mysql').pool;
const bcrypt = require('bcrypt');
class Administrator {
    constructor(run, name, email, password, position) {
        this._run = run;
        this._name = name;
        this._email = email;
        this._password = password;
        this._position = position;

    }

    //#region getters

    get run() {
        return this._run;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get position() {
        return this._position;
    }
    //#endregion

    verifyPassword(password, callback) {
        bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            callback(res);
        });
    }

    static getAdministrator(email, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM administrator WHERE email = ?`, [email], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({error: {message : "There isn't result"}});
            }
            if (results.length > 1) {
                return callback({error: {message : "There is an error in database because the user is not unique"}});
            }
            let result = results[0];
            return callback(null, new Administrator(result.run, result.name, result.email, result.password, result.position));
        });
        console.log(query);
    }

    static getAllAdministrator(callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`SELECT * FROM administrator`, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            let administrators = []
            for (const administrator of results) {
                administrators.push(new Administrator(administrator.run, administrator.name, administrator.email, administrator.password, administrator.position));
            }
            return callback(null, administrators);
        });
    }

    static updateAdministrator(administrator, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL update_administrator(?, ?, ?, ?, ?)`, [
            administrator.run,
            administrator.name,
            administrator.email,
            administrator.password,
            administrator.position
        ], function (err, results, fields) {
            // console.log("update_Administrator");
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
                return callback({error : { message: "This user don't exist"}});
            }
            return callback(null, true);
        });
    }

    static addAdministrator(administrator, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        pool.query(`CALL add_administrator(?, ?, ?, ?, ?)`, [
            administrator.run,
            administrator.name,
            administrator.email,
            administrator.password,
            administrator.position
        ], function (err, results, fields) {
            // console.log("add_Administrator");
            // console.log("error:")
            // console.log(err);
            // console.log("results:");
            // console.log(results);
            // console.log("fields:");
            // console.log(fields);
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({error: {messege : err.sqlMessage}});
                }
                return callback(err);
            }
            return callback(null, true);

        });
    }
}

module.exports = Administrator