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
