process.env.JWT_SECRET = process.env.JSON_SECRET || 'secret'
process.env.PORT = process.env.PORT || 3309;

// MySQL Configuration
process.env.MYSQL_HOST = process.env.MYSQL_HOST || '138.121.170.110';
process.env.MYSQL_PORT = process.env.MYSQL_PORT || '3306';
process.env.MYSQL_USER = process.env.MYSQL_USER || 'patacon';
process.env.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'I1alYidExAAnl';
process.env.MYSQL_DBNAME = process.env.MYSQL_DBNAME || 'patacon';

// Password encrypt with bcrypt

process.env.BCRYPT_SALT = process.env.BCRYPT_SALT || 10;

process.env.ACCOUNT_SID  = process.env.ACCOUNT_SID || 'AC93c9eef91158c04050aa829e3e6ad2c7';
process.env.AUTH_TOKEN = process.env.AUTH_TOKEN  || '764a079c8586a64e339ed538d4705f0d';
process.env.MY_PHONENUMBER  = process.env.MY_PHONENUMBER || '+19384448560';