import express from 'express';
import { Op } from 'sequelize';

import Ingredients from '#models/ingredient';
import { UserRecipes, RecipeIngredients, RecipeCoffees } from './model.js';
import { verifyToken } from '#utils/token.js';
import { cleanString } from '#utils/common.js';

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
    const coffeeList = data.coffeeList;

    try {
        // Create user recipe
        const userRecipe = await UserRecipes.create({
            user_id: userId,
            title: data.title,
            subtitle: data.subtitle ?? null,
            description: data.description ?? null
        });

        if (ingredientList.length > 0) {
            if (ingredientList.length > 0) {
                const RecipeIngredientList = await Promise.all(ingredientList.map(async item => {
                    const [ingredient] = await Ingredients.findOrCreate({
                        where: { name: cleanString(item.name) }
                    });
                    return {
                        recipe_id: userRecipe.id,
                        ingredient_id: ingredient.id,
                        ingredient_amount: item.amount,
                        ingredient_unit: item.unit
                    };
                }));
            
                await RecipeIngredients.bulkCreate(RecipeIngredientList);
            } 
        }

        res.sendStatus(201);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
    return;
})

// Deleting a recipe

// Modify a recipe

export default router;
