process.env.PATACON_JWT_SECRET = process.env.PATACON_JWT_SECRET || 'secret'
process.env.PATACON_PORT = process.env.PATACON_PORT || 3309;
process.env.PATACON_GPS_PORT = process.env.PATACON_GPS_PORT || 9001;


// MySQL Configuration
process.env.PATACON_MYSQL_HOST = process.env.PATACON_MYSQL_HOST || '138.121.170.110';
process.env.PATACON_MYSQL_PORT = process.env.PATACON_MYSQL_PORT || '3306';
process.env.PATACON_MYSQL_USER = process.env.PATACON_MYSQL_USER || 'patacon';
process.env.PATACON_MYSQL_PASSWORD = process.env.PATACON_MYSQL_PASSWORD || 'I1alYidExAAnl';
process.env.PATACON_MYSQL_DBNAME = process.env.PATACON_MYSQL_DBNAME || 'patacon';

// Password encrypt with bcrypt

process.env.PATACON_BCRYPT_SALT = process.env.PATACON_BCRYPT_SALT || 10;

process.env.PATACON_ACCOUNT_SID  = process.env.ACCOUNT_SID || 'AC93c9eef91158c04050aa829e3e6ad2c7';
process.env.PATACON_AUTH_TOKEN = process.env.AUTH_TOKEN  || '764a079c8586a64e339ed538d4705f0d';
process.env.PATACON_MY_PHONENUMBER  = process.env.MY_PHONENUMBER || '+19384448560';

// Config of out of route and geofence


process.env.PATACON_OUT_OF_ROUTE_DISTANCE = process.env.PATACON_OUT_OF_ROUTE_DISTANCE || 0.2; // Kilometers
process.env.PATACON_GEOFENCE_PATACON_DISTANCE = process.env.PATACON_GEOFENCE_PATACON_DISTANCE || 0.2; // Kilometers
process.env.PATACON_GEOFENCE_VINEYARD_DISTANCE = process.env.PATACON_GEOFENCE_VINEYARD_DISTANCE || 0.2; // Kilometers
