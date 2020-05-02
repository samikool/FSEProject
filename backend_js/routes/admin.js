var express = require('express');
var router = express.Router();
var verifyToken = require('../authorizer').verifyToken;

router.get('/', async function (req, res) {
    const authHeader = await req.headers['authorization'];
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    let response = await verifyToken(token);

    if(!response.access || !response.admin){
        res.sendStatus(403)
        console.log('Admin request for data denied')
        return;
    }

    let data = await database.GetAdminData();
    console.log('Admin reuqest for data accepted')

    res.json(data)
});

module.exports = router;