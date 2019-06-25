const mysql = require('mysql')

let connection = mysql.createConnection({
    host     : process.env.PATACON_MYSQL_HOST,
    port     : process.env.PATACON_MYSQL_PORT,
    user     : process.env.PATACON_MYSQL_USER,
    password : process.env.PATACON_MYSQL_PASSWORD,
    database : process.env.PATACON_MYSQL_DBNAME
});

let pool = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.PATACON_MYSQL_HOST,
    port     : process.env.PATACON_MYSQL_PORT,
    user     : process.env.PATACON_MYSQL_USER,
    password : process.env.PATACON_MYSQL_PASSWORD,
    database : process.env.PATACON_MYSQL_DBNAME
});

module.exports = {
    connection,
    pool
}