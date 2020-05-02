var express = require('express');
var router = express.Router();
var verifyToken = require('../authorizer').verifyToken;

//get all the table data
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
    Object.keys(data.users).forEach((key) => {
        data.users[key].password = "classified";
    })

    res.json(data)
});

//edit some table data
router.post('/', async function (req, res) {
    req = await req.body
    //console.log(token)
    let response = await verifyToken(req.token);

    if(!response.access || !response.admin){
        res.sendStatus(403)
        console.log('Admin request for data denied')
        return;
    }

    console.log(req)
})

//remove some table data
router.delete('/', async function (req, res) {
    req = await req.body

    //console.log(token)
    let response = await verifyToken(req.token);

    if(!response.access || !response.admin){
        res.sendStatus(403)
        console.log('Admin request for data denied')
        return;
    }
    
    console.log(req)
    
})

module.exports = router;