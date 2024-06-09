'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { UNITS, BREWMETHOD, ROASTLEVEL} = await import('../src/utils/dbValues.js');
        await queryInterface.createTable('User_Recipes', {
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

        await queryInterface.createTable('Recipe_Ingredients', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            recipe_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User_Recipes'
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            ingredient_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Ingredients'
                },
                allowNull: true,
                onDelete: 'CASCADE'
            },
            ingredient_amount: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ingredient_unit: {
                type: DataTypes.STRING,
                allowNull: true,
                values: UNITS
            },
        })

        await queryInterface.createTable('Recipe_Coffees', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            recipe_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User_Recipes'
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            brew_method: {
                type: DataTypes.STRING,
                values: BREWMETHOD,
                allowNull: false
            },
            coffee_roast_level: {
                type: DataTypes.STRING,
                values: ROASTLEVEL,
                allowNull: false
            },
            ratio_liquid_to_dry: {
                type: DataTypes.STRING,
                allowNull: true
            },
            bean_weight: {
                type: DataTypes.INTEGER,
                description: "in grams",
                allowNull: true
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('User_Recipes');
        await queryInterface.dropTable('Recipe_Ingredients');
        await queryInterface.dropTable('Recipe_Coffees');
    }
};
