// This clases only are used to test how work the library

require('../config/config');
const pool = require('../mysql/mysql').pool;
const Administrator = require('./administrator')

Administrator.getAllAdministrator((err, results) => {
    console.log("getAllAdministrator");
    if(err){
        console.log(err);
    }
    console.log(results);
});

Administrator.getAdministrator("gsan@gmail.com" ,(err, results) => {
    console.log("getAdministrator");
    if(err){
        console.log(err);
    }
    console.log(results);
});

Administrator.addAdministrator(new Administrator(
    "123651242",
    "Alguienasdasd",
    "alguien@algo.cl",
    "password",
    "Gerente"
),(err, results) => {
    console.log("addAdministrator");
    if(err){
        console.log(err);
    }
    console.log(results);
});

Administrator.updateAdministrator(new Administrator(
    "190840041",
    "Gabriel Sanhueza",
    "gsan@gmail.cl",
    "password",
    "Gerente"
),(err, results) => {
    console.log("getAllAdministrator");
    if(err){
        console.log(err);
    }
    console.log(results);
});