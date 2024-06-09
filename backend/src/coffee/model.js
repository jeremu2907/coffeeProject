import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const brewMethod = [
    'espresso',
    'pour over',
    'cold brew',
    'drip',
    'French press',
    'moka',
    'other'
]

export const roastLevel = [
    'green',
    'cinnamon',
    'light',
    'medium',
    'medium dark',
    'dark (French)',
    'dark (Italian)'
]

const Coffees = sequelize.define('Coffees', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
    },
    brew_method: {
        type: DataTypes.STRING,
        values: brewMethod,
        allowNull: false
    },
    coffee_roast_level: {
        type: DataTypes.STRING,
        values: roastLevel,
        allowNull: false
    },
})

export default Coffees;
