// This clases only are used to test how work the library

require('../config/config');
const pool = require('../mysql/mysql').pool;
const User = require('./user')

User.getAllUser((err, results) => {
    console.log("getAllUser");
    if(err){
        console.log(err);
    }
    console.log(results);
});

User.getUser("gsan@gmail.com" ,(err, results) => {
    console.log("getUser");
    if(err){
        console.log(err);
    }
    console.log(results);
});

User.addUser(new User(
    "123651242",
    "Alguienasdasd",
    "alguien@algo.cl",
    "password",
    "Gerente"
),(err, results) => {
    console.log("addUser");
    if(err){
        console.log(err);
    }
    console.log(results);
});

User.updateUser(new User(
    "123656850",
    "Gabriel Sanhueza",
    "gsan@gmail.cl",
    "password",
    "Gerente"
),(err, results) => {
    console.log("updateUser");
    if(err){
        console.log(err);
    }
    console.log(results);
});