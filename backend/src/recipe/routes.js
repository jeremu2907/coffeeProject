import express from 'express';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

import Ingredients from '#models/ingredient';
import Users from '#models/user';
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
router.get('/my-recipe', verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const recipeList = await UserRecipes.findAll({
            where: {
                user_id: userId
            }
        })
        res.send(recipeList);
    } catch (err) {
        res.sendStatus(500);
    }
});

// Helper function to get recipe
async function getRecipe(recipeId, isMy = false, userId) {
    const findCondition = isMy ? [
        {id: recipeId},
        {user_id: userId}
    ] : [
        {private: false},
        {id: recipeId}
    ]

    const recipe = await UserRecipes.findOne({
        include: [
            {
                model: RecipeIngredients,
                attributes: {
                    exclude: [
                        'id',
                        'recipe_id',
                    ]
                },
                include: {
                    model: Ingredients,
                    attributes: ['name']
                }
            },
            {
                model: RecipeCoffees,
                attributes: {
                    exclude: [
                        'id',
                        'recipe_id',
                    ]
                }
            },
        ],
        where: {
            [Op.and]: findCondition
        }
    });
    
    if (recipe === null && !isMy) {
        throw new Error('This recipe is private');
    }

    return recipe;
}

// View my recipe
router.get('/view-my-recipe', verifyToken, async (req, res) => {
    const recipeId = req.query.recipeId;
    try {
        res.send(await getRecipe(recipeId, true, req.userId));
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// View other user recipe
router.get('/view-recipe', async (req, res) => {
    const recipeId = req.query.recipeId;
    try {
        res.send(await getRecipe(recipeId));
    } catch (err) {
        if (err.message === 'This recipe is private') {
            res.status(403);
        } else {
            res.status(500);
        }
        res.send(err.message);
    }
})

// Deleting a recipe

// Modify a recipe
router.patch('/update', verifyToken, async (req, res) => {
    const userId = req.userId;
    const data = req.body;

    const recipeId = data.recipeId;
    const ingredientList = data.ingredientList ?? [];
    const coffeeList = data.coffeeList ?? [];

    try {
        let recipeIngredients = await RecipeIngredients.findAll({
            include: {
                model: Ingredients,
                attributes: ['name']
            },
            where: {
                recipe_id: recipeId
            },
            attributes: []
        });

        recipeIngredients = new Set(recipeIngredients.map(ingred => ingred.ingredient.name));
        console.log(recipeIngredients);
        const updatedIngreds = new Set(ingredientList.map(ingred => cleanString(ingred.name)));
        console.log(updatedIngreds);
        const ingredsToDelete = recipeIngredients.difference(updatedIngreds);
        console.log(ingredsToDelete)


        if (recipeIngredients.length === 0) {
            throw new Error('Recipe not found')
        }

        res.send([...ingredsToDelete]);
    } catch (err) {
        if (err.message === 'Recipe not found') {
            res.status(404);
        } else {
            res.status(500);
        }
        res.send(err.message);
    }
    return;
})

export default router;
