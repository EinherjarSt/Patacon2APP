require ('dotenv').config();
const express = require('express');
const app = express();

const passport = require('passport');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myPhone = process.env.MY_PHONENUMBER;

const client = require('twilio')(accountSid,authToken);

var sms= {
    sendMessage: function(phoneNumber,msg, callback) {
        let phone = '+'+phoneNumber;
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
}), (req, res) => {
    let body = req.body;
    sms.sendMessage(body.phoneNumber, body.message, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json({
            msg: result
        });
    });
    
})


module.exports = app;