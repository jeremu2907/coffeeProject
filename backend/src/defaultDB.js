const express = require('express');
const router=express.Router();

/////////////////////Schemas///////////////////////////
const DefaultCoffee = require('./DefaultSchema.js');

////////////////////Handling Post Req//////////////////
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

router.post("/setItem", async (req, res) => 
{
    console.log(req.body);
    const data = new DefaultCoffee({
        name: req.body.name,
        type: req.body.type,
        wtc_ratio: req.body.ratio
    });

    // const exist = await DefaultCoffee.exists({name: data.name});

    if(! await DefaultCoffee.exists({name: data.name}))
    {
        res.send(await data.save());
    } 
    else
    {
        res.send({});
    }
});

module.exports=router;