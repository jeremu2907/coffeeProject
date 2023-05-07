//DRINKS CREATED BY USERS ADD MORE FIELDS LATER
const mongoose = require('mongoose');

const userCoffeeSchema = new mongoose.Schema
({
    user: {type: String, required: true},
    name: String,
    type: [{ type : String}],
    wtc_ratio: String
});

const UserCoffee = mongoose.model('UserCoffee', userCoffeeSchema, "User_Coffee");
module.exports = UserCoffee;