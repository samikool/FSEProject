var express = require('express');
var router = express.Router();
var veriyToken = require('../authorizer').verifyToken;

router.post('/', async function (req, res) {
    req = req.body;
    console.log(req);
    //first need to verify token, since this will be a guarded route
    let token = req.token;
    let response = await veriyToken(token);
    if(!response.access){
        return res.sendStatus(403);
    }

    //if token was verified get the donorID of the user
    console.log(response.email);
    let donor_id = await database.GetDonorID(response.email);

    //extra donation info and 'donate'
    let disaster_id = req.disaster_id;
    let item_id = req.item_id;
    let quantity = req.quantity;
    response = await database.DonateItem(donor_id, disaster_id, item_id, quantity);
    res.json(response)
});


module.exports = router;
