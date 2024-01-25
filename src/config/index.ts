import * as process from 'process';

export default () => ({
    port: process.env.PORT,
    dbPort: process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    jwtSecret: process.env.SECRET_JWT_KEY,
    jwtExpire: process.env.EXPIRE_JWT,
});
