import express from 'express';
import { Sequelize } from 'sequelize';
// import { Op } from 'sequelize';

import Ingredients from '#models/ingredient';
import { UserRecipes, RecipeIngredients, RecipeCoffees } from './model.js';
import { verifyToken } from '#utils/token.js';
import { cleanString } from '#utils/common.js';
import sequelize from '#sql';

const router = express.Router();

// Creating a recipe
router.post('/create', verifyToken, async (req, res) => {
    const data = req.body;
    if (!data.title) {
        res.status(400).send('Title is empty');
        return;
    }

    const userId = req.userId;
    const ingredientList = data.ingredientList ?? [];
    const coffeeList = data.coffeeList ?? [];
    const transaction = await sequelize.transaction();

    try {
        // Create user recipe
        const userRecipe = await UserRecipes.create({
            user_id: userId,
            title: data.title,
            subtitle: data.subtitle ?? null,
            description: data.description ?? null,
        }, {
            transaction: transaction
        });

        const promises = [];

        if (ingredientList.length > 0) {
            const RecipeIngredientList = await Promise.all(ingredientList.map(async item => {
                const [ingredient] = await Ingredients.findOrCreate({
                    where: { name: cleanString(item.name) },
                });
                return {
                    recipe_id: userRecipe.id,
                    ingredient_id: ingredient.id,
                    ingredient_amount: item.amount,
                    ingredient_unit: item.unit,
                };
            }));

            const promise = RecipeIngredients.bulkCreate(
                RecipeIngredientList,
                {
                    validate: true,
                    transaction: transaction
                }
            );
            promises.push(promise);
        }

        if (coffeeList.length > 0) {
            const RecipeCoffeeList = await Promise.all(coffeeList.map(async item => {
                return {
                    recipe_id: userRecipe.id,
                    brew_method: item.brew_method,
                    coffee_roast_level: item.roast_level,
                    ratio_liquid_to_dry: item.ratio_liquid_to_dry ?? null,
                    bean_weight: item.bean_weight ?? null,
                };
            }));

            const promise = RecipeCoffees.bulkCreate(
                RecipeCoffeeList,
                {
                    validate: true,
                    transaction: transaction
                }
            );
            promises.push(promise);
        }

        await Promise.all(promises);
        await transaction.commit();
        res.sendStatus(201);
    } catch (err) {
        await transaction.rollback()
        if (err instanceof Sequelize.AggregateError) {
            res.status(400).send(err.errors[0].errors.errors[0].message);
        } else {
            res.sendStatus(500);
        }
    }
    return;
});

// Lists all recipe for user
router.get('/myRecipes', verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const recipeList = await UserRecipes.findAll({
            where: {
                user_id: userId
            }
        });
        res.send(recipeList);
    } catch (err) {
        res.sendStatus(500);
    }
});

// View recipe
router.get('/viewMyRecipe', verifyToken, async (req, res) => {
    
})

// Deleting a recipe

// Modify a recipe
router.patch('/update')

export default router;
