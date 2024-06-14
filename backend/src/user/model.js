import { DataTypes } from 'sequelize';
import sequelize from '#sql';

const model = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pfp_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    followers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },
});

export default model;
