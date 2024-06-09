import dotenv from 'dotenv';

dotenv.config();

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 6543,
        dialect: 'postgres',
    },
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    jwt_secret: process.env.JWT_SECRET_KEY
};

export default config;
