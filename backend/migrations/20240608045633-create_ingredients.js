'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('Ingredients', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            type: {
                type: DataTypes.STRING
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Ingredients');
    }
};
