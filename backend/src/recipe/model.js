import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

import User from '#model/user';

const model = sequelize.define('User_Recipes', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'Users'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cover_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default model;
