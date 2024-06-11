'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('User_Recipes', {
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
    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('User_Recipes')
    }
};
