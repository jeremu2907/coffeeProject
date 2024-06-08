import { Sequelize } from 'sequelize';
import { config } from 'config';

const sequelize = new Sequelize(
    // options = {
    //     host: process.env.DB_HOST,
    //     username: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    // },
    {
        host: config.host,
        username: config.username,
        password: config.password,
        database: config.name,
    },
);

export default sequelize;
