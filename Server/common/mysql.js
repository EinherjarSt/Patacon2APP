const mysql = require('mysql')

let connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DBNAME
});

let pool = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DBNAME
});

module.exports = {
    connection,
    pool
}