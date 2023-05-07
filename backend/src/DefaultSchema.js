//SCHEMA FOR DEFAULT DRINKS - NOT AFFILIATED WITH USER
const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    name: String,
    type: [{ type : String}],
    wtc_ratio: String,
    mtc_ratio: String,
    ingredients: [{ type : String}],
    description: String
});

const DefaultCoffee = mongoose.model('DefaultCoffee', coffeeSchema, "Default_Coffee");
module.exports = DefaultCoffee;