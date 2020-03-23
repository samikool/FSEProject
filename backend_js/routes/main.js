var express = require('express');
var router = express.Router();

async function authenticateToken(req, res, nex){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    console.log(jwt.verify(token, process.env.ACCESS_TOKEN_SECRET))
}

module.exports = router;