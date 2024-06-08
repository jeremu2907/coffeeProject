import express from 'express';
import bcrypt from 'bcrypt';

import User from './model.js';
import { Op } from 'sequelize';
import { generateToken } from '#utils/token.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const data = req.body;

    if (!(data.username && data.password && data.email)) {
        res.status(400).send('Please fill in all required fields');
        return;
    }
    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {email: data.email},
                    {username: data.username}
                ]
            }
        });
        if (existingUser != null) {
            res.status(400).send('Email or username already taken');
            return;
        }
        const SALT = 10;
        const hashedPassword = await bcrypt.hash(data.password, SALT);
        await User.create({
            username: data.username,
            password: hashedPassword,
            email: data.email,
        })
        res.send(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    return;
});

router.post('/signin', async (req, res) => {
    const data = req.body;
    if (!(data.user && data.password)) {
        res.status(400).send('Missing credentials');
        return
    }
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email: data.user},
                    {username: data.user}
                ],
            }
        });
        
        if (!(await bcrypt.compare(data.password, user.password))) {
            res.status(403).send('Invalid credentials');
            return;
        }

        res.send(generateToken());
    } catch (err) {
        console.error(err);
        res.status(404).send('User not found');
    }
    return;
})

export default router;
