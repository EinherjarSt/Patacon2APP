process.env.JWT_SECRET = process.env.JSON_SECRET || 'secret'
process.env.PORT = process.env.PORT || 3309;

// MySQL Configuration
process.env.MYSQL_HOST = process.env.MYSQL_HOST || '138.121.170.110';
process.env.MYSQL_PORT = process.env.MYSQL_PORT || '3306';
process.env.MYSQL_USER = process.env.MYSQL_USER || 'patacon';
process.env.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'pataconpassword';
process.env.MYSQL_DBNAME = process.env.MYSQL_DBNAME || 'patacon2';

// Password encrypt with bcrypt

process.env.BCRYPT_SALT = process.env.BCRYPT_SALT || 10;