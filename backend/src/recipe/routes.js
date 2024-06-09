import express from 'express';
import { Op } from 'sequelize';

import Ingredients from '#models/ingredient';
import { UserRecipes, RecipeIngredients, RecipeCoffees } from './model.js';
import { verifyToken } from '#utils/token.js';

const router = express.Router();

// Creating a recipe
router.post('/create', verifyToken, async (req, res) => {
    const data = req.body;
    if (!data.title) {
        res.status(400).send('Title is empty');
        return;
    }
    const userId = req.userId;
    try {
        await UserRecipes.create({
            user_id: userId,
            title: data.title,
            subtitle: data.subtitle ?? null,
            description: data.description ?? null
        });

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
