import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const Ingredients = sequelize.define('Ingredients', {
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
});

export default Ingredients;
