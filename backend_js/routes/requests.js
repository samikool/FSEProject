var express = require('express');
var router = express.Router();
var verifyToken = require('../authorizer').verifyToken;

router.post('/', async function (req, res) {
    req = await req.body;
    let access = await verifyToken(req.token);
    let num_requested=0;
    let processed=0;
    if(access){
        let items = req.requestedItems;
        Object.keys(items).forEach(async function(key,i,array){
            let item = items[key];
            let num = await database.MakeRequest(
                req.disaster_id, 
                item.item_id, 
                item.quantity, 
                access.email
            );
            processed++;
            num_requested += +num;

            if(processed === array.length){
                console.log('for'+num_requested)
                res.json({num_requested: num_requested})
            }
        })

        
        
    }else{
        res.sendStatus(403);
    }
    

});
module.exports = router;