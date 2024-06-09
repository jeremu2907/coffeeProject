import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const Ingredients = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    type: {
        type: DataTypes.STRING,
    },
});

export default Ingredients;
