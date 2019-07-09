const express = require('express');
const app = express();

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
        ).catch(err => {console.log(err)});
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