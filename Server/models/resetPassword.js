const pool = require('../common/mysql').pool;
const ERROR = require('../common/error');
const nodemailer = require('../../node_modules/nodemailer');

class ResetPassword
{
    /* constructor (email, password, verification_code)
    {
        //this.id_reset = id_reset;
        this.email = email;
        this.password = password;
        this.verification_code = verification_code;
    } */
    constructor(run, name, surname, surname2, email, password, position, disabled = false, verification_code) {
        this.run = run;
        this.name = name;
        this.surname = surname;
        this.surname2 = surname2;
        this.email = email;
        this.password = password;
        this.position = position;
        this.disabled = disabled;
        this.verification_code = verification_code;

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
                return callback({code: ERROR.NOT_FOUND, message : "No encuentro usuarios"});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "There is an error in database because the user is not unique"});
            }
            let result = results[0];
            //let thereIsAnUser = true;
            //return callback(thereIsAnUser);
            return callback(null, new ResetPassword(result.run, result.name, result.surname, result.surname2, result.email, result.password, result.position, result.disabled, result.verification_code));
            //return true;
        });
    }

    static getVerificationCode(verification_code, callback) {
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        let query = pool.query(`SELECT * FROM user WHERE verification_code = ?`, [verification_code], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback({code: ERROR.NOT_FOUND, message : "No encuentro nada"});
            }
            if (results.length > 1) {
                return callback({code: ERROR.NOT_UNIQUE, message : "No es unico el codigo de verificacion"});
            }
            let result = results[0];
            //let thereIsAnUser = true;
            //return callback(thereIsAnUser);
            return callback(null, new ResetPassword(result.run, result.name, result.surname, result.surname2, result.email, result.password, result.position, result.disabled, result.verification_code));
            //return true;
        });
    }

    static addVerificationCode(reset, callback)
    {
        var email_user = reset.email;
        var ver_code_for_email = reset.verification_code;
        //pool.query(`CALL add_ver_code2(?, ?)`, [
        pool.query(`CALL add_ver_code_in_user(?, ?)`, [
            reset.verification_code, 
            reset.email
        ], function (err, results, fields) {
            //console.log(err);
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            //if (results.length === 0)
            //{
              //  return callback({message : "No existe usuario con ese"});
            //}
            //var message = "<p style='font-weight:bold;'> Hi. My name is John </p>";
            var body = '<center>Su código de verificación es: <p style="font-weight:bold;">' + ver_code_for_email + '</p> </center>';
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'patacon.reset@gmail.com',
                pass: 'patacon2'
                }
            });

            var mailOptions = {
                from: 'patacon.reset@gmail.com',
                to: email_user,
                subject: 'Código de verificación para restablecer contraseña',
                //html: 'Embedded image: <img src="logoparamail"/>',
                html: body
                /*attachments: [
                    {
                      filename: 'LogoParaMail.png',
                      path: '/Frontend/src/assets/images/LogoParaMail.png',
                      cid: 'uniq-LogoParaMail.png' 
                    }
                  ]*/
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }

            });
            return callback(null, true);
        });
    }

    static addNewPassword(reset, callback)
    {
        //var new_password = reset.password;
        //var verification_code = reset.verification_code;
        //let ver_code_for_email =
        //console.log("asidjaskjasdkjdk en resetPassword.js models");
        //var verification_code = makeCode(8);
        //pool.query(`CALL add_new_password(?, ?)`, [
        pool.query(`CALL update_password_in_user(?, ?)`, [
            reset.verification_code, 
            reset.password
        ], function (err, results, fields) {
            //console.log(err);
            if (err) {
                if (err.code == "ER_DUP_ENTRY"){
                    return callback({message : err.sqlMessage});
                }
                return callback(err);
            }
            //if (results.length === 0)
            //{
              //  return callback({message : "No existe usuario con ese"});
            //}
            return callback(null, true);
        });
    }
}

module.exports = ResetPassword;

