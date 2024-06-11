import { DataTypes } from 'sequelize';
import sequelize from '#sql';

import User from '#models/user';
import { UNITS, BREWMETHOD, ROASTLEVEL } from '#utils/dbValues.js';

const UserRecipes = sequelize.define('User_Recipes', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cover_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

const RecipeIngredients = sequelize.define('Recipe_Ingredients', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User_Recipes',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Ingredients',
        },
        allowNull: true,
        onDelete: 'CASCADE',
    },
    ingredient_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ingredient_unit: {
        type: DataTypes.STRING,
        allowNull: true,
        values: UNITS,
    },
});

const RecipeCoffees = sequelize.define('Recipe_Coffees', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User_Recipes',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    brew_method: {
        type: DataTypes.STRING,
        values: BREWMETHOD,
        validate: {
            isIn: {
                args: [BREWMETHOD],
                msg: 'Invalid brew method'
            }
        },
        allowNull: false,
    },
    coffee_roast_level: {
        type: DataTypes.STRING,
        values: ROASTLEVEL,
        validate: {
            isIn: {
                args: [ROASTLEVEL],
                msg: 'Invalid roast level'
            }
        },
        allowNull: false,
    },
    ratio_liquid_to_dry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bean_weight: {
        type: DataTypes.FLOAT,
        description: 'in grams',
        allowNull: true,
        validate: {
            nonNegative(val) {
                if (parseFloat(val) < 0) {
                    throw new Error('Bean weight must be non-negative or empty');
                }
            }
        },
    },
});

User.hasMany(UserRecipes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
UserRecipes.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

UserRecipes.hasMany(RecipeIngredients, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
});
RecipeIngredients.belongsTo(UserRecipes, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
});

UserRecipes.hasMany(RecipeCoffees, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
});
RecipeCoffees.belongsTo(UserRecipes, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
});

export { UserRecipes, RecipeIngredients, RecipeCoffees };
