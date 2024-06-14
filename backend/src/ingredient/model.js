import { DataTypes } from 'sequelize';
import sequelize from '#sql';
import { RecipeIngredients } from '#models/recipe';

const model = sequelize.define('ingredients', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

model.hasMany(RecipeIngredients, {
    foreignKey: 'ingredient_id',
    onDelete: 'CASCADE',
});
RecipeIngredients.belongsTo(model, {
    foreignKey: 'ingredient_id',
    onDelete: 'CASCADE',
})

export default model;
