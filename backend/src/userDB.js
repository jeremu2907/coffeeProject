const express = require('express');
const router=express.Router();

/////////////////////Schemas///////////////////////////
const UserCoffee = require('./UserSchema.js');

////////////////////Handling Post Req//////////////////
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

///////////////////User Error Code/////////////////////
/*
    1   Conflict Naming
    2   Missing Parameter
    3   Item Exists
*/

//User setting new item
router.post("/addMyItem", async (req, res) => 
{
    if(!req.body.user || !req.body.name) //No username
    {
        console.log("Post attempt failed");
        res.send(400, {"reason":2});
        return;
    }

    console.log(req.body);
    const data = new UserCoffee({
        user: req.body.user,
        name: req.body.name,
        type: req.body.type,
        wtc_ratio: req.body.ratio
    });

    if(! await UserCoffee.exists({name: data.name}))
    {
        res.send(await data.save());
    } 
    else
    {
        res.send({"reason":3});
    }
});

//User get all their recipes
router.get("/getAllMyItems", async (req, res) =>
{
    if(!req.query.user)
    {
        console.log("Post attempt failed");
        res.send(400, {"reason":2});
        return;
    }

    res.send(await UserCoffee.find({user: req.query.user}));
})

//User modify their recipe
router.post("/editMyItem", async (req, res) => 
{   
    const found = await UserCoffee.find({name: req.body.newName});
    if(!found || found.length != 0)
    {
        res.status(400).send({"reason": 1});
        return;
    }

    if(!req.body.user || !req.body.name) //No username
    {
        console.log("Post attempt failed");
        res.send(400,{"reason":2});
        return;
    }

    console.log(req.body);
    const data = {
        user: req.body.user,
        name: req.body.newName,
        type: req.body.newType,
        wtc_ratio: req.body.newRatio
    };

    res.send(
        await UserCoffee.findOneAndReplace(
            {
                user: req.body.user,
                name: req.body.name
            },
            data,
            {
                returnDocument: "after"
            }
        )
    );
});

module.exports=router;