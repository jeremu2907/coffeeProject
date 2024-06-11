import { DataTypes } from 'sequelize';
import sequelize from '#sql';

const model = sequelize.define('Ingredients', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

export default model;
