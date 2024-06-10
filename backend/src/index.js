import sequelize from '#sql';
import config from '#config';

// Sync the model with the database
async function asyncModels() {
    // eslint-disable-next-line no-undef
    if (!config.prod && process.argv.includes('--synchronize')) {
        console.log('Models synchronization.');
        try {
            await sequelize.sync({ alter: true });
            console.log('Models synchronized successfully.');
        } catch (error) {
            console.error('Error synchronizing models:', error);
        } finally {
            await sequelize.close();
            // eslint-disable-next-line no-undef
            process.exit();
        }
    }

    // eslint-disable-next-line no-undef
    if (process.argv.includes('--no-synchronization')) {
        return;
    } else {
        console.log('Did not migrate. Pass the --synchronize flag to confirm.');
        // eslint-disable-next-line no-undef
        process.exit();
    }
}

await asyncModels();

import express from 'express';
import UserRoutes from '#routes/user';
import RecipeRoutes from '#routes/recipe';

const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/user', UserRoutes);
app.use('/recipe', RecipeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
