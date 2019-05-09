// This clases only are used to test how work the library


require('../config/config');
const pool = require('./mysql').pool;


// Examples

// mysql.executeQuery("SELECT * FROM driver", (err, result) =>{
//     if (err){
//         console.log(err);
//     }
//     console.log(result)
// })

// mysql.executeQuery("INSERT INTO `driver` (`run`, `name`) VALUES ('123656857', 'Teletube')", (err, result) =>{
//     if (err){
//         console.log(err);
//     }
//     console.log(result)
// })

// mysql.instance;


// pool.query("SELECT * FROM driver", (err, result, field) => {
//     if (err) {
//         console.log(err);
//     }
//     // console.log("field\n");
//     // console.log(field);

//     console.log("result driver\n");
//     console.log(result);
//     console.log("\n\n");

// })

pool.query("SELECT * FROM administrator", (err, result, field) => {
    if (err) {
        console.log(err);
    }
    // console.log("field\n");
    // console.log(field);

    console.log("result administrador\n");
    console.log(result);
    console.log(result.length);
    // console.log(result[0].name);
    console.log("\n\n");

    for (const iterator of result) {
        console.log(iterator);
    }

})

// pool.query("UPDATE `administrator` SET `name` = 'GabrielS', `email` = 'gsanhuezaf@gmail.com', `password` = 'jaja', `position` = 'no lo se2' WHERE `administrator`.`run` = '190840042'", (err, result, field) => {
//     if (err) {
//         console.log(err);
//     }
//     // console.log("field\n");
//     // console.log(field);

//     console.log("result update administrador\n");
//     console.log(result);
// })

