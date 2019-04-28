const pool = require('../mysql/mysql').pool;

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

    verifyPassword(password) {
        return password === this.password;
    }

    static getAdministrator(email, callback) {
        let query = pool.query(`SELECT * FROM administrator WHERE email = ?`, [email], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback("There isn't result");
            }
            if (results.length > 1) {
                return callback("There is an error in database because the user is not unique");
            }
            let result = results[0];
            return callback(null, new Administrator(result.run, result.name, result.email, result.password, result.position));
        });
        console.log(query);
    }

    static getAllAdministrator(callback) {
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
        pool.query(`CALL update_administrator(?, ?, ?, ?, ?)`, [
            administrator.run,
            administrator.name,
            administrator.password,
            administrator.email,
            administrator.position
        ], function (err, results, fields) {
            console.log("update_Administrator");
            console.log("error:")
            console.log(err);
            console.log("results:");
            console.log(results);
            console.log("fields:");
            console.log(fields);
            if (err) {
                return callback(err);
            }
            return callback(null, true);
        });
    }

    static addAdministrator(administrator, callback) {
        pool.query(`CALL add_administrator(?, ?, ?, ?, ?)`, [
            administrator.run,
            administrator.name,
            administrator.password,
            administrator.email,
            administrator.position
        ], function (err, results, fields) {
            console.log("add_Administrator");
            console.log("error:")
            console.log(err);
            console.log("results:");
            console.log(results);
            console.log("fields:");
            console.log(fields);
            if (err) {
                return callback(err);
            }
            return callback(null, true);

        });
    }
}



module.exports = Administrator