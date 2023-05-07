require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

////////////////////Routing//////////////////////////////
const DefaultCoffeeRouter = require('./defaultDB.js');
app.use("/defaultCoffee", DefaultCoffeeRouter);
const UserCoffeeRouter = require('./userDB.js');
app.use("/userCoffee", UserCoffeeRouter);

////////////////////Handling Post Req//////////////////
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

/////////////////////Setting Mongoose////////////////////
const mongoose = require('mongoose');
const user_name = process.env.MDB_USER_NAME;
const password = process.env.MDB_PASSWORD;
console.log(user_name);
mongoose.connect(`mongodb+srv://${user_name}:${password}@cluster0.ucqezcl.mongodb.net/CoffeeDataBase?retryWrites=true&w=majority`);

///////////////////Schemas///////////////////////////////
const DefaultCoffee = require('./DefaultSchema.js');
const UserCoffee = require('./UserSchema.js');

//////////////////Variables//////////////////////////////
const DrinkType = {
    "1" : "hot",
    "2" : "cold",
    "3" : "espresso",
    "4" : "milk",
    "5" : "filtered",
    "6" : "other"
};


// [*******************     API     ********************]

app.get('/', (req, res) => 
{
    res.send('Hello World!');
});

//Search By Drink Name
app.get("/searchName", async (req, res) =>
{
    const defaultCoffees = await DefaultCoffee.find({ 
        name: new RegExp(req.query.prompt, 'i')
    });

    const userCoffees = await UserCoffee.find({ 
        name: new RegExp(req.query.prompt, 'i')
    });

    res.send([...defaultCoffees, ...userCoffees]);
});

//Ask for suggesetion
app.get("/suggestType", async (req, res) =>
{
    console.log(req.query.type);

    const defaultCoffees = await DefaultCoffee.find({ 
        type: {$all: req.query.type}
    });

    const userCoffees = await UserCoffee.find({ 
        type: {$all: req.query.type}
    });

    const data = [...defaultCoffees, ...userCoffees];

    if(data.length)
      res.send(data);
    else
      res.send("No Item Found");
})

app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`);
});