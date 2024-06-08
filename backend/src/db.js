import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const sequelize = new Sequelize(
    {
        ...config.development,
        define: {
            timestamps: false
        },
    }
);

export default sequelize;
