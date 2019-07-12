const express = require('express');
const app = express();
const ERROR = require('../common/error');
const passport = require('passport');

const accountSid = process.env.PATACON_ACCOUNT_SID;
const authToken = process.env.PATACON_AUTH_TOKEN;
const myPhone = process.env.PATACON_MY_PHONENUMBER;

const client = require('twilio')(accountSid,authToken);

var sms= {
    sendMessage: function(phoneNumber,msg, callback) {
        let phone = '+56'+phoneNumber;
        client.messages.create({
            to: phone,
            from: myPhone,
            body: msg,
        })
        .then(message => {
            return callback(null, message.sid);
        }
        ).catch(err => {
            if(err.code == 21211 ||err.code == 21212){
                return callback({code: ERROR.NUMBER_NOT_VALID, message: "El número "+ phone+ " no es válido. Por favor, verifíquelo"});
            }
            else if(err.code == 21213){
                return callback({code: err.code, message: "Debe ingresar un número de telefono"});
            }
            else if(err.code == 21214){
                return callback({code: err.code, message: "No se ha podido encontrar el número de telfono"});
            }
            else if(err.code == 21421){
                return callback({code: err.code, message: "Número no válido"});
            }
            else if(err.code == 21422){
                return callback({code: err.code, message: "Número no disponible"});
            }
            else if(err.code == 21604){
                return callback({code: err.code, message: "No se ha ingresado un número de telefono"});
            }
            else{
                return callback(err);
            }
            
        });
    }
}

app.post('/sms/send', 
passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let body = req.body;
    sms.sendMessage(body.phoneNumber, body.message, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            msg: result
        });
    });
    
})


module.exports = app;